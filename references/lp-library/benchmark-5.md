# SIROK 5-LP structural benchmark for SUIRO

Captured: 2026-08-01

## Scope and non-copy rule

These pages are references for layout grammar, information density, section cadence, media placement, offer repetition, fixed UI, and order-flow placement only. Do not copy SIROK/N organic logos, product photography, people, campaign copy, reviews, awards, rankings, sales figures, clinical claims, ingredient claims, pricing/discount conditions, or legal text.

SUIRO confirmed facts only: essence lotion / 化粧水 / 150mL / 3,520円（税込） / 無香料 / 朝・夜 / 少量を2回に分けてなじませる / 架空商品で購入不可。The review CTA remains a non-submitting demo.

## Shared empirical findings

- Native creative width: 750px for all five.
- At a 390px viewport the references keep a 600px internal canvas (`scrollWidth: 600`), causing horizontal overflow. This defect is **not** part of the reconstruction target: SUIRO variants must fit 360/390 without horizontal scroll.
- Long conversion pages expose eight hidden order forms plus a fixed order interface; the editorial campaign page has no form and no fixed UI.
- Blank areas in static contact sheets can be video frames without a poster. DOM media offsets are authoritative; never pad `min-height` just to imitate a blank capture.
- All SUIRO videos must be H.264 MP4 with `moov < mdat`, `preload="metadata"`, viewport-near playback, offscreen pause, and a Japanese manual-play fallback.

## Benchmark table

| ID | Reference URL | PC height | SP height | Images | Videos | Forms | Type |
|---|---|---:|---:|---:|---:|---:|---|
| trial | https://sirok.jp/ads/lm_trial_0701_release_ad_ca | 31,644 | 31,596 | 77 | 8 | 8 | red/orange direct-response trial |
| basic | https://sirok.jp/ads/UKkt6aC3bpkLK4df | 66,087 | 65,907 | 116 | 9 | 8 | gold/brown ultra-long renewal story |
| holiday | https://sirok.jp/ads/V46UcITEHp1dxNPL | 48,841 | 48,661 | 102 | 13 | 8 | pale seasonal collection + multi-product story |
| scalp | https://sirok.jp/ads/sh_lp_teiki_0518 | 32,354 | 32,174 | 88 | 3 | 8 | white/grey proof and comparison funnel |
| campaign | https://sirok.jp/ads/VARAS04v6bIOpbvg | 10,776 | 11,358 | 47 | 1 | 0 | short editorial/article page |

Excluded: `https://sirok.jp/ads/VKvq9li58nlzxV5X` (7,537px, no video/form). It is a store information notice and adds less LP-production coverage than the editorial campaign page.

## 1. trial — red/orange direct response

Structural target:

1. Immediate campaign/FV with oversized product, benefit headline, compact trust markers.
2. First offer module within the opening band.
3. Social-attention panel and problem agitation.
4. Large cinematic problem/skin plate (video at y≈6,539, h≈2,996).
5. Why-current-care-fails bridge.
6. Product answer and three-point mechanism.
7. Warm orange/red scientific-explanation sequence.
8. Alternating product, texture, ingredient-origin-style visual panels without using unverified ingredient claims.
9. Mid-page offer repeat.
10. Eight short motion plates from y≈13,270 through y≈25,246, interleaved with explanation rather than grouped as a gallery.
11. Product use, texture and user-context replacements; no fake testimonials.
12. Closing offer, explicit demo order summary, non-submitting form, footer.

Rhythm: high-density red/orange blocks, cream relief bands, no artificial whitespace. Existing V5 is the first implementation baseline.

## 2. basic — gold/brown ultra-long renewal story

Structural target:

1. Gold/brown award-like FV grammar, replaced with factual SUIRO identity and product set explanation.
2. Aspiration/skin-state visual and simple routine diagram.
3. Large set/offer module early.
4. Product renewal/story chapter in gold, cream and white.
5. Proof-shaped layouts replaced by confirmed specifications, use instructions and transparent unknowns.
6. Product comparison/choice table based only on SUIRO usage contexts, not fabricated competitors or prices.
7. Mid-page repeated offer.
8. Long education chapter: concern → mechanism diagram → delivery/texture → routine.
9. Nine motion plates: y≈30,438; 33,447; 42,050; 42,923; 44,751; 45,624; 47,363; 48,237; 54,318. Motion is concentrated in the second half.
10. Three-step use demonstration and texture sequence.
11. Support/FAQ/delivery-demo information.
12. Final repeated offer, demo order summary, non-submitting form, footer.

Rhythm: longest benchmark; gold/brown chapters separated by cream editorial bands. Length must come from real chapters, not `min-height` padding.

## 3. holiday — pale seasonal collection

Structural target:

1. Pale blue/ivory atmospheric FV with grouped product still life; rewrite as a non-limited SUIRO routine presentation.
2. Editorial special-content intro and lifestyle object imagery.
3. Social/content mosaic.
4. Set explanation and early offer module.
5. Product awards/ranking-shaped areas replaced by confirmed product facts and transparent demo status.
6. Two small motion accents around y≈4,936 and 5,527.
7. Yellow cleansing/problem chapter, then brown/gold basic-care chapter.
8. Three large motion plates around y≈16,163–18,864.
9. Concern checklist → texture/process → use transition.
10. Yellow/cream mechanism chapter with close-up/hand motion accents (y≈26,318 onward).
11. Demonstration/testimonial-shaped regions replaced by SUIRO use scenarios; no fictional reviews.
12. Dense how-to sequence with multiple hand/face plates (motion y≈29,239–35,925).
13. Support, comparison and closing offer.
14. Demo order summary, non-submitting form, factual FAQ/footer.

Rhythm: airy pale opening, concentrated yellow/brown middle, human-use-heavy late section. Thirteen videos are distributed in clusters, not evenly spaced.

## 4. scalp — white/grey proof and comparison funnel

Structural target:

1. White/grey clinical-looking FV with product trio and three circular facts; use only confirmed SUIRO facts.
2. Opening lifestyle motion (y≈971, h≈907).
3. Price/set offer and product-selector style panel.
4. History/proof chapter replaced by product design rationale and specification transparency.
5. Problem checklist and dry-skin-style concern chapter without diagnosis/efficacy claims.
6. Product cream/texture chapter with motion around y≈9,245 and y≈11,238.
7. Mechanism diagrams replaced by application and moisture-feel explanation, clearly non-clinical.
8. Choice grid and comparison table using morning/evening/application contexts only.
9. Manufacturing/quality chapter stated as design/process, not certification.
10. Delivery/support/FAQ.
11. Closing product summary, demo order form and footer.

Rhythm: quiet neutral palette, product cards and tables, fewer videos, stronger proof/comparison geometry than trial/basic/holiday.

## 5. campaign — short editorial/article page

Structural target:

1. Large lifestyle/product hero with short editorial headline.
2. One-question problem lead and explanatory paragraphs.
3. Single texture motion plate at y≈2,027, h≈298.
4. Plain-text product explanation and use rationale with generous but intentional article spacing.
5. Related-product/article cards as SUIRO information links, not purchase offers.
6. Author/editorial-team block replaced by a transparent “制作・確認情報” block, not fictional experts.
7. Related article list and corporate-style footer.

No order form, no sticky CTA, no direct-response offer repetition. The primary action is “商品情報を見る” and opens the explicit demo-information modal.

## Acceptance gate for each SUIRO reconstruction

- Separate route and review URL; current production remains untouched.
- 750px reference grammar on desktop; responsive 360/390/768/1440 implementation with zero horizontal overflow.
- Height within a justified band based on implemented content; no padding solely to hit the reference number.
- Correct media count/placement class for that benchmark, with original SUIRO media only.
- Full-page PC/SP reference-versus-build contact sheet review.
- Axe A/AA, no page errors, no broken media, CTA/modal/form interaction, keyboard/Escape, and fixed/sticky behavior verified.
- Public URL fresh-download and representative media checksum/range verification.
- Unsupported reviews, awards, rankings, quantities sold, ingredient/clinical claims, discounts, shipping/returns, or scarcity: zero.
