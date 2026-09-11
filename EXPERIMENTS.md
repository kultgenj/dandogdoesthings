# Business inquiry experiment

Flag key: `business-multi-package-inquiry`

In Amplitude Feature Experiment, create this flag in the all-activity project used by `src/amplitude.js`. Attach the default project API-key deployment. Use variant values `control` and `treatment`, then configure your audience and traffic allocation. The implementation uses the existing Unified SDK and its analytics identity; `variant()` records exposure when an inquiry opens. See https://amplitude.com/docs/sdks/experiment-sdks/experiment-javascript.

Missing, unrecognized, or not-yet-loaded assignments use control. Each open form keeps its assigned variant until closed. Control retains the existing single-service form. Treatment preselects the clicked service and allows one or more packages without adding a step. Turning off the flag affects newly opened forms.

Variant attribution comes from the SDK's automatic `[Experiment] Exposure` and assignment events — the funnel events carry no manual variant property. Completion is one event containing all selected offerings in the existing `products` array and a `package_count`. Keep the completion metric at inquiry level; use the products array for service-level analysis. Contact details and campaign text are not sent to analytics.

## Local preview

In PowerShell:

```powershell
$env:VITE_ANALYTICS_VALIDATE='true'
$env:VITE_INQUIRY_VARIANT='treatment'
npm run dev
```

Open `/business` (or `/#/business` for the hash router). Use `control` to compare, restarting Vite after changes. The override works only in development. Validation mode captures analytics locally without event uploads.

Check each service opens preselected; selecting multiple packages retains contact fields; zero selections disables submission; submission emits one completion with all selected products; closing/reopening resets selections; and narrow screens and keyboard checkbox navigation work.

## Rollout dependency

This repository has no lead-processing endpoint or CRM integration. Submission currently records an analytics event and shows the existing demo confirmation. This change preserves that behavior and does not implement backend fan-out. Before using this for real lead processing, integrate one lead payload with all packages and verify downstream routing produces the required CRM records. Keep production treatment traffic disabled until that dependency is satisfied.
