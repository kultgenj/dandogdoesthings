/**
 * Amplitude initialization for Dan Dog Does Things.
 *
 * Initializes @amplitude/unified once and exports the instance for use across the app.
 * Import this module wherever Amplitude methods are needed.
 */
import * as amplitude from '@amplitude/unified';

const apiKey = import.meta.env.VITE_PUBLIC_AMPLITUDE_API_KEY;
const serverUrl = import.meta.env.VITE_PUBLIC_AMPLITUDE_SERVER_URL;

if (!apiKey) {
  console.warn(
    'Amplitude not configured (VITE_PUBLIC_AMPLITUDE_API_KEY not set).',
    'App will work but analytics will not be tracked.',
  );
} else {
  void amplitude.initAll(apiKey, {
    analytics: {
      serverUrl,
      autocapture: true,
    },
    sessionReplay: {
      sampleRate: 0.1,
    },
  });
}

export default amplitude;
