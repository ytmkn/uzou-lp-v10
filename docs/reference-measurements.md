# リファレンスサイト CSS実測値

実測日: 2026-02-28
ツール: Firecrawl branding + Playwright getComputedStyle

---

## Stripe (stripe.com) — Firecrawl branding抽出

| 項目 | 値 |
|---|---|
| カラースキーム | light |
| フォント(body) | Sohne |
| フォント(heading) | SF Pro Display |
| primary | #061B31 |
| accent | #533AFD |
| background | #FFFFFF |
| h1 fontSize | 48px |
| h2 fontSize | 32px |
| body fontSize | 32px（リード文） |
| borderRadius(base) | 0px |
| button borderRadius | 4px |
| button bg | #533AFD |
| button shadow | none |
| spacing baseUnit | 8px |

---

## Linear (linear.app) — Playwright getComputedStyle実測

### タイポグラフィ

| 要素 | fontSize | fontWeight | lineHeight | letterSpacing | color |
|---|---|---|---|---|---|
| h1 | 64px | 510 | 64px | -1.408px (-0.022em) | rgb(247,248,248) |
| h2 | 40px | 510 | 44px | -0.88px (-0.022em) | rgb(138,143,152) |
| body | 16px | — | — | — | rgb(247,248,248) |
| p(本文) | 15px | — | 24px (1.6) | -0.165px (-0.011em) | rgb(138,143,152) |

### コンポーネント

| 要素 | 値 |
|---|---|
| CTA fontSize | 13px |
| CTA fontWeight | 510 |
| CTA padding | 0px 12px |
| CTA borderRadius | 4px |
| CTA bg | rgb(230,230,230) |
| CTA color | rgb(8,9,10) |
| CTA boxShadow | 多層shadow（微細な奥行き） |
| nav height | 73px |
| body bg | rgb(8,9,10) = #08090A |

### Firecrawl補足データ

| 項目 | 値 |
|---|---|
| accent | #E4F222 |
| link | #5E6AD2 |
| secondary btn bg | #28282C |
| secondary btn border | #3E3E44 |
| secondary btn color | #F7F8F8 |
| borderRadius(base) | 6px |
| spacing baseUnit | 4px |

---

## UZOU LP v10との比較・検証

### タイポスケール比較

| 要素 | Linear実測 | UZOU v10 | 判定 |
|---|---|---|---|
| h1 | 64px / w510 / ls:-1.408px | clamp(40px,5vw,64px) / w800 / ls:-0.03em | ○ 方向性一致 |
| h2 | 40px / w510 / ls:-0.88px | clamp(28px,3vw,44px) / w700 / ls:-0.02em | ○ 方向性一致 |
| body | 15px / lh:24px / ls:-0.165px | 16px / lh:1.7 / ls:0 | ○ ほぼ同等 |

### カラー比較

| 要素 | Linear実測 | UZOU v10 | 判定 |
|---|---|---|---|
| dark bg | #08090A | #040404 | ○ 同方向（v10がやや深い） |
| text primary | rgb(247,248,248) = #F7F8F8 | rgba(255,255,255,0.95) | ○ 同等 |
| text secondary | rgb(138,143,152) = #8A8F98 | rgba(255,255,255,0.7) | ○ 同方向 |
| CTA bg | #E6E6E6 | ティール系 | △ 方向性異なるが意図的 |

### コンポーネント比較

| 要素 | Linear実測 | UZOU v10 | 判定 |
|---|---|---|---|
| btn borderRadius | 4px | 6px | ○ 同等 |
| nav height | 73px | 64px | ○ 同等 |
| btn shadow | 多層微細shadow | なし | △ 改善余地あり |
