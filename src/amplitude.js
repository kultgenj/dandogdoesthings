import { createInstance } from '@amplitude/unified'
import { pageTitle, routePath, sessionClassifier } from './analytics/schema.js'

const ALL_KEY = '4acddc9bd2981674d9732c8800b491cf'
const HUMAN_KEY = '1ace93105d2914a01a1e207e93f070e4'
const EXPLICIT_CLICK_SELECTOR = '[data-amplitude-explicit-click]'
const autocaptureElementSelectors = [
  'a', 'button', 'input', 'select', 'textarea', 'label', 'video', 'audio',
  '[contenteditable="true" i]', '[data-amp-default-track]', '.amp-default-track',
  '.cart-overlay', '.modal-overlay', '.lightbox__overlay',
].map(selector => `${selector}:not(${EXPLICIT_CLICK_SELECTOR})`)
const all = createInstance()
let human
let humanReady
const classify = sessionClassifier(window.localStorage)
const localValidation = import.meta.env.DEV && import.meta.env.VITE_ANALYTICS_VALIDATE === 'true'
const captured = []
if (localValidation) {
  window.__analyticsEvents = captured
  const panel = document.createElement('details')
  panel.id = 'analytics-validation'
  panel.innerHTML = '<summary>Local analytics validation (no event uploads)</summary><pre></pre>'
  document.body.append(panel)
  setInterval(() => { panel.querySelector('pre').textContent = JSON.stringify(captured, null, 2) }, 250)
}
const transportProvider = localValidation ? {
  async send(_url, payload) {
    captured.push(...payload.events.map(event => ({ project: payload.api_key === ALL_KEY ? 'all' : 'human', ...event })))
    return { status: 'success', statusCode: 200, body: { code: 200, eventsIngested: payload.events.length } }
  },
} : undefined

function captureLocally(client) {
  if (localValidation) client.add({
    name: 'local-transport', type: 'before',
    async setup(config) { config.transportProvider = transportProvider },
    async execute(event) { return event },
  })
}
captureLocally(all)

async function humanClient() {
  if (!human) {
    human = createInstance()
    captureLocally(human)
    // Analytics only: Unified's replay plugin shares a global recorder.
    humanReady = human.init(HUMAN_KEY, undefined, {
      instanceName: 'primary', autocapture: false, defaultTracking: false,
      fetchRemoteConfig: false, transportProvider, flushIntervalMillis: 250,
    }).promise
  }
  await humanReady
  return human
}

// Run after SDK enrichment: preserve event identity/session and normalize paths
// from the event's own URL, not the URL at a later flush time.
all.add({
  name: 'route-and-audience', type: 'enrichment',
  async execute(event) {
    const location = event.event_properties?.['[Amplitude] Page Location'] || window.location.href
    const bot = classify(event.session_id, location)
    event.event_properties = { ...event.event_properties,
      '[Amplitude] Page Location': location,
      '[Amplitude] Page Path': routePath(location),
      '[Amplitude] Page Title': pageTitle(routePath(location)),
      ampli_bot: bot,
    }
    return event
  },
})
all.add({
  name: 'human-project-delivery', type: 'destination',
  async execute(event) {
    if (!event.event_properties?.ampli_bot) {
      const client = await humanClient()
      const copy = structuredClone(event)
      // Replay belongs to the all-activity project, not the human project.
      delete copy.event_properties['[Amplitude] Session Replay ID']
      client.track(copy)
    }
    return { event, code: 200, message: 'Audience routing complete' }
  },
})

// The npm Unified SDK includes Feature Experiment but not the visual Web
// Experiment runtime. Its project configuration is fetched after startup.
if (!localValidation && window.WebExperiment?.initialize) {
  window.WebExperiment.initialize(ALL_KEY, {
    initialFlags: '[]',
    pageObjects: '{}',
    behavioralTargetingRules: '{}',
  }, {
    instanceName: 'secondary',
    serverZone: 'US',
  })
  all.add(window.webExperiment.plugin())
}

void all.initAll(ALL_KEY, {
  instanceName: 'secondary',
  analytics: {
    transportProvider, flushIntervalMillis: 250,
    fetchRemoteConfig: !localValidation,
    autocapture: {
      attribution: true, pageViews: true, sessions: false,
      formInteractions: false,
      // Autocapture ordinary controls while explicit click events remain canonical.
      // Action-click inference is disabled so a marked control cannot be recaptured
      // through a parent div after its click changes the DOM or route.
      elementInteractions: {
        cssSelectorAllowlist: autocaptureElementSelectors,
        actionClickAllowlist: [],
      },
      fileDownloads: true, frustrationInteractions: true,
      webVitals: true, networkTracking: true,
    },
  },
  sessionReplay: { sampleRate: localValidation ? 0 : 1 },
  engagement: { skip: localValidation },
})

const track = (event, properties = {}, options) => {
  const location = window.location.href
  return all.track(event, {
    ...properties,
    '[Amplitude] Page Location': location,
    '[Amplitude] Page Path': routePath(location),
  }, options)
}

export const trackClick = (event, properties) => () => track(event, properties)
export default { track, setUserId: all.setUserId }
