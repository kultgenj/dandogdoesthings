/**
 * Amplitude Unified SDK — dual-project setup.
 *
 * Initializes both projects on app boot with the full feature bundle:
 *   - Autocapture (page views, sessions, clicks, forms, file downloads, attribution)
 *   - Session Replay (100% sample rate; tune down for production traffic)
 *   - Web Experimentation (auto-fetched on init)
 *   - Guides & Surveys (auto-initialized)
 *
 * Every event is sent to both projects independently. No custom track()
 * calls are used — everything flows through autocapture.
 */
import * as amplitude from '@amplitude/unified'

const PROJECTS = [
  { apiKey: '1ace93105d2914a01a1e207e93f070e4', instanceName: 'primary' },
  { apiKey: '4acddc9bd2981674d9732c8800b491cf', instanceName: 'secondary' },
]

const sharedOptions = {
  // Analytics / autocapture config goes under `analytics` for initAll().
  // Element / form / file-download / frustration interactions are opt-in
  // (they default to false even when autocapture:true is passed).
  analytics: {
    autocapture: {
      attribution:             true,
      pageViews:               true,
      sessions:                false,
      formInteractions:        true,
      fileDownloads:           true,
      elementInteractions:     true,
      frustrationInteractions: true,
    },
  },
  sessionReplay: {
    sampleRate: 1.0,
  },
}

for (const project of PROJECTS) {
  void amplitude.initAll(project.apiKey, {
    ...sharedOptions,
    instanceName: project.instanceName,
  })
}

// Small helper for tagging click handlers without inline arrow clutter.
// Usage: onClick={trackClick('Donate Link Clicked', { source_page: 'home' })}
export const trackClick = (event, properties) => () => amplitude.track(event, properties)

export default amplitude
