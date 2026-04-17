# Amplitude post-wizard report

The wizard has completed a full Amplitude analytics integration for **Dan Dog Does Things** — a React + Vite e-commerce and services site. The `@amplitude/unified` SDK was installed, a single initialization module (`src/amplitude.js`) was created, and 10 custom events were instrumented across 8 files. Autocapture is enabled, so page views, clicks, and form interactions are tracked automatically from day one.

## Instrumented events

| Event | When it fires | Properties | File |
|---|---|---|---|
| `User Signed Up` | After `signUp()` resolves successfully | `signup_method: 'email'` | `src/pages/SignUp.jsx` |
| `User Signed In` | After `signIn()` resolves successfully | `signin_method: 'email'` | `src/pages/SignIn.jsx` |
| `User Signed Out` | When user clicks Sign Out on Account page | _(none)_ | `src/pages/Account.jsx` |
| `Product Added to Cart` | When user clicks Add to Cart on Store page | `product_id`, `product_name`, `price`, `is_featured` | `src/pages/Store.jsx` |
| `Cart Viewed` | When the cart drawer opens (isOpen: false → true) | `cart_item_count`, `cart_total` | `src/components/CartDrawer.jsx` |
| `Checkout Started` | When user clicks Checkout inside the cart drawer | `cart_item_count`, `cart_total` | `src/components/CartDrawer.jsx` |
| `Checkout Step Completed` | When user advances from Shipping step to Payment | `step_name: 'Shipping'`, `step_number: 1`, `shipping_method` | `src/pages/Checkout.jsx` |
| `Order Placed` | After `placeOrder()` resolves (post-simulated delay) | `order_number`, `item_count`, `subtotal`, `shipping_cost`, `total`, `shipping_method`, `is_authenticated` | `src/pages/Checkout.jsx` |
| `Business Inquiry Opened` | When user clicks a service CTA on the Business page | `service_type` (instagram \| appearances \| consulting) | `src/pages/Business.jsx` |
| `Business Inquiry Submitted` | When user submits the inquiry modal form | `service_type`, `has_org` | `src/components/InquiryModal.jsx` |

User identity is set on sign-up and sign-in via `amplitude.setUserId(email)`. On sign-out, `amplitude.reset()` is called to unlink the session from the identified user. A user property `signup_method: 'email'` is set via `amplitude.identify()` at sign-up.

## Files modified

| File | Change |
|---|---|
| `package.json` | Added `@amplitude/unified` dependency |
| `.env` | Added `VITE_PUBLIC_AMPLITUDE_API_KEY` and `VITE_PUBLIC_AMPLITUDE_SERVER_URL` |
| `src/amplitude.js` | Created — single initialization module |
| `src/main.jsx` | Added `import './amplitude.js'` for early init |
| `src/pages/SignUp.jsx` | Added user identification + `User Signed Up` event |
| `src/pages/SignIn.jsx` | Added user identification + `User Signed In` event |
| `src/pages/Account.jsx` | Added `User Signed Out` + `amplitude.reset()` |
| `src/pages/Store.jsx` | Added `Product Added to Cart` event |
| `src/components/CartDrawer.jsx` | Added `Cart Viewed` (on open) + `Checkout Started` |
| `src/pages/Checkout.jsx` | Added `Checkout Step Completed` + `Order Placed` |
| `src/pages/Business.jsx` | Added `Business Inquiry Opened` |
| `src/components/InquiryModal.jsx` | Added `Business Inquiry Submitted` |

## Analytics dashboard

Dashboard: **[Dan Dog Does Things Analytics — 2026](https://app.amplitude.com/analytics/jpk/dashboard/ooidot49)**

Charts created:

| Chart | Type | Link |
|---|---|---|
| Daily Active Users | Line (uniques) | [Open](https://app.amplitude.com/analytics/jpk/chart/esir9ylo) |
| New Users Over Time | Line (uniques) | [Open](https://app.amplitude.com/analytics/jpk/chart/4jgjygn4) |
| Top Pages by Volume (Autocapture) | Line (totals by URL) | [Open](https://app.amplitude.com/analytics/jpk/chart/sve1a8ya) |
| Top Clicks by Element (Autocapture) | Line (totals by element) | [Open](https://app.amplitude.com/analytics/jpk/chart/a7dgx5j6) |
| 7-Day Retention (New Users) | Retention | [Open](https://app.amplitude.com/analytics/jpk/chart/femn3fho) |

The following charts use **Autocapture** and will populate as soon as any user visits the app (no additional instrumentation required):
- Top Pages by Volume (Autocapture)
- Top Clicks by Element (Autocapture)
- Daily Active Users
- New Users Over Time
- 7-Day Retention (New Users)

The following custom event funnels (Commerce, Onboarding, Business Leads) are documented in the dashboard with rich text panels and will auto-populate once users trigger the instrumented flows. The events are already instrumented — no further code changes needed.

## Next steps

### Environment variable configuration

The Amplitude API key is set in `.env` as `VITE_PUBLIC_AMPLITUDE_API_KEY`. This file is for **local development only** — add this variable to your deployment platform (Vercel, Netlify, etc.) before going to production.

- **Vercel**: Project Settings → Environment Variables → add `VITE_PUBLIC_AMPLITUDE_API_KEY`
- **Netlify**: Site Settings → Environment Variables → add `VITE_PUBLIC_AMPLITUDE_API_KEY`

The `.env` file must not be committed to version control (it is already in `.gitignore` via `wizard-tools`).

### Agent skill

The integration skill files are in `.claude/skills/integration-javascript_web/`. You can reference them for further agent development when using Claude Code.
