# SUIRO 5-LP benchmark — final QA

Verified on 2026-08-01 with Playwright Chromium against the production review URLs.

| Variant | Reference structure | Reference height | SUIRO SP 390px | SUIRO PC 1440px | Video | Form behavior | Review URL |
|---|---|---:|---:|---:|---:|---|---|
| trial | 750px dense image-panel campaign | 31,644px | 30,685px | 30,692px | 8 | non-purchase demo | https://suiro-v5-review.vercel.app/?v=e9a74e1 |
| campaign | short editorial/article | 10,776px | 12,681px | 11,451px | 1 | no form; information dialog | https://suiro-campaign-review.vercel.app |
| scalp | gray/white comparison funnel | 32,354px | 20,434px | 19,942px | 3 | non-sending demo form | https://suiro-scalp-review.vercel.app |
| basic | long explanatory light/dark rhythm | 66,087px | 35,047px | 39,310px | 9 | non-sending demo form | https://suiro-basic-review.vercel.app |
| holiday | pale/yellow/cocoa editorial funnel | 48,841px | 35,312px | 40,154px | 13 | non-sending demo form | https://suiro-holiday-review.vercel.app |

## Shared production checks

For every variant at 390×844 and 1440×900:

- production HTTP status: 200
- horizontal overflow: 0px
- broken images: 0
- Axe WCAG A/AA violations: 0
- uncaught JavaScript errors: 0
- expected video count present
- every video scrolled into view and `currentTime > 0.2` while actively playing
- CTA/dialog/form flow completed without purchase or network submission
- demo/non-purchase disclosure present

Static checks additionally verify confirmed SUIRO facts, absence of unsupported sales claims, no video `autoplay` attribute, `preload="metadata"`, `muted`, `loop`, `playsinline`, IntersectionObserver lazy playback, and `moov < mdat` fast-start MP4 structure.

## Visual QA

PC and SP full-page screenshots were reviewed separately after closing all test dialogs. The five builds retain distinct reference-derived density, color rhythm, section sequence, media ratio, offer cadence, and form behavior. Heights are content-derived; no empty `min-height` padding was added to imitate the reference page length.
