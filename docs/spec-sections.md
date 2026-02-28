# セクション別技法指定書: UZOU LP v10 — Signal Pulse

> Hero セクションは `spec-hero.md` を参照。本文書は Section 2（Trust）から Footer まで。

---

## Section 2: Trust — 信号の到達先

### 背景

```css
.trust {
  background-color: #F4F8F9;
  padding: 48px 24px;
}
```

### レイアウト

```css
.trust__container {
  max-width: 1120px;
  margin: 0 auto;
  text-align: center;
}

.trust__label {
  margin-bottom: 32px;
}

.trust__marquee-wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.trust__marquee-wrapper::before,
.trust__marquee-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 1;
  pointer-events: none;
}

.trust__marquee-wrapper::before {
  left: 0;
  background: linear-gradient(to right, #F4F8F9 0%, transparent 100%);
}

.trust__marquee-wrapper::after {
  right: 0;
  background: linear-gradient(to left, #F4F8F9 0%, transparent 100%);
}
```

### タイポグラフィ

```css
.trust__label {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.5;
  color: rgba(4, 4, 4, 0.5);
  text-transform: none;
}
```

テキスト: 「500以上のメディアが選んだプラットフォーム」

### マーキー（ロゴスクロール）

```css
.trust__marquee-track {
  display: inline-flex;
  align-items: center;
  animation: marquee-scroll 40s linear infinite;
  /* 40s: ゆっくり。回路の信号の速度感 */
}

.trust__marquee-track:hover {
  animation-play-state: paused;
}

.trust__logo-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  height: 40px;
  flex-shrink: 0;
}

.trust__logo-item img {
  max-height: 28px;
  width: auto;
  filter: grayscale(100%);
  opacity: 0.5;
  transition: opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              filter 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.trust__logo-item img:hover {
  filter: grayscale(0%);
  opacity: 1;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

HTML: ロゴ要素を2回繰り返してループを実現。最低8ロゴ x 2 = 16要素。

### アニメーション

- ラベル: フェードアップ（CSS scroll-driven / IO フォールバック）
- マーキー: 常時再生（40s / linear / infinite）

### セクション境界

- 上: なし（Hero のグラデーション遷移帯で接続済み）
- 下: `border-bottom: 1px solid rgba(43, 73, 84, 0.08)`

### レスポンシブ

```css
@media (max-width: 767px) {
  .trust {
    padding: 40px 20px;
  }

  .trust__logo-item {
    padding: 0 24px;
  }

  .trust__logo-item img {
    max-height: 24px;
  }

  .trust__marquee-wrapper::before,
  .trust__marquee-wrapper::after {
    width: 40px;
  }
}
```

---

## Section 3: Problem — ノイズの検出

### 背景

```css
.problem {
  background-color: #FFFFFF;
  padding: 100px 24px;
}
```

### レイアウト

```css
.problem__container {
  max-width: 1120px;
  margin: 0 auto;
}

.problem__header {
  text-align: center;
  margin-bottom: 64px;
}

.problem__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.problem__column {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.problem__column-label {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #2B4954;
}

.problem__item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 0;
  border-bottom: 1px solid rgba(43, 73, 84, 0.08);
}

.problem__item:last-child {
  border-bottom: none;
}
```

### タイポグラフィ

```css
.problem__title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #2B4954;
  margin: 0;
}

.problem__column-label {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.4;
  color: #34626F;
}

.problem__item-text {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0em;
  color: #040404;
}
```

### SVG アイコン（課題アイコン 6 種）

```
サイズ: 24x24px viewBox
stroke: #2B4954
stroke-width: 1.5
fill: none
stroke-linecap: round
stroke-linejoin: round
```

6 種:
1. シールド（ブランド毀損リスク）
2. トレンドダウン（CPA 頭打ち）
3. クリップボード（レポーティング煩雑）
4. コイン（広告単価低下）
5. ユーザー X（離脱率上昇）
6. 時計（リソース不足）

各アイコンは回路的な直線ベース。曲線は最小限（円弧のみ許容）。

### アニメーション

- セクションタイトル: フェードアップ
- カラムラベル: フェードアップ、delay 100ms
- 課題項目: フェードアップ + stagger（80ms 刻み）

```css
.problem__item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.problem__item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* stagger: JS で --i を設定 */
.problem__item {
  transition-delay: calc(var(--i, 0) * 80ms);
}
```

### セクション境界

- 上: `border-top: 1px solid rgba(43, 73, 84, 0.08)`
- 下: `border-bottom: 1px solid rgba(43, 73, 84, 0.08)`

### レスポンシブ

```css
@media (max-width: 767px) {
  .problem {
    padding: 80px 20px;
  }

  .problem__header {
    margin-bottom: 48px;
  }

  .problem__grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
```

---

## Section 4: Solution — 信号経路の設計図

### 背景

```css
.solution {
  background-color: #F4F8F9;
  padding: 100px 24px;
  position: relative;
}
```

SVG 回路パターンを薄く背景に敷く:
```css
.solution__bg-circuit {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  pointer-events: none;
}
/* Hero と同じ SVG パターンを再利用。ただし opacity を 0.3 に下げて
   ライト背景で控えめに表示。線色は rgba(43,73,84,0.08) に変更 */
```

### レイアウト

```css
.solution__container {
  max-width: 1120px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.solution__header {
  text-align: center;
  margin-bottom: 64px;
}

.solution__diagram-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.solution__diagram {
  width: 100%;
  height: auto;
  /* SVG の viewBox で比率を維持 */
}

.solution__descriptions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  margin-top: 48px;
}

.solution__desc-item {
  text-align: center;
  padding: 24px 16px;
}
```

### タイポグラフィ

```css
.solution__title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #2B4954;
}

.solution__subtitle {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8;
  color: rgba(4, 4, 4, 0.7);
  max-width: 640px;
  margin: 16px auto 0;
}

.solution__node-label {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0em;
  color: #2B4954;
  margin-bottom: 8px;
}

.solution__node-detail {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(4, 4, 4, 0.6);
}
```

### SVG 接続図解

3 つのノード（広告主 → UZOU AI → メディア）を SVG で描画:

```
viewBox: 0 0 800 200

左ノード（広告主）:
  cx: 120, cy: 100, r: 40
  stroke: #2B4954, stroke-width: 2, fill: #FFFFFF

中央ノード（UZOU AI）:
  cx: 400, cy: 100, r: 56
  stroke: #34626F, stroke-width: 2, fill: #FFFFFF
  /* r=56: 他ノードの 1.4 倍。UZOUの重要性を表現 */

右ノード（メディア）:
  cx: 680, cy: 100, r: 40
  stroke: #2B4954, stroke-width: 2, fill: #FFFFFF

接続線（左→中央）:
  path: M 160 100 L 344 100
  stroke: #34626F, stroke-width: 2, fill: none
  stroke-dasharray: [pathLength]
  stroke-dashoffset: [pathLength] → 0（アニメーション）

接続線（中央→右）:
  path: M 456 100 L 640 100
  stroke: #34626F, stroke-width: 2, fill: none
  stroke-dasharray: [pathLength]
  stroke-dashoffset: [pathLength] → 0（アニメーション）

ノード内テキスト:
  左: 「広告主」font-size: 14px, fill: #2B4954, text-anchor: middle
  中央: 「UZOU AI」font-size: 16px, font-weight: 700, fill: #34626F
  右: 「メディア」font-size: 14px, fill: #2B4954, text-anchor: middle

矢印（接続線の終端）:
  polygon で三角形。fill: #34626F。各接続線の終端に配置
```

### アニメーション（線描画 + ノード順次点灯）

CSS scroll-driven animations / IO フォールバック:

```css
/* 接続線の描画 */
.solution__line {
  stroke-dasharray: var(--line-length);
  stroke-dashoffset: var(--line-length);
  transition: stroke-dashoffset 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.solution__line.is-visible {
  stroke-dashoffset: 0;
}

/* ノードの点灯 */
.solution__node-circle {
  opacity: 0.3;
  transition: opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              stroke 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.solution__node-circle.is-lit {
  opacity: 1;
  stroke: #8BC0CA;
  filter: drop-shadow(0 0 8px rgba(139, 192, 202, 0.3));
}
```

JS でスクロール連動:
1. セクションが viewport に 40% 入ったら左→中央の接続線描画開始
2. 接続線描画完了後（800ms 後）に中央ノード点灯
3. 200ms 後に中央→右の接続線描画開始
4. 完了後に右ノード点灯

### セクション境界

- 上: `border-top: 1px solid rgba(43, 73, 84, 0.08)`
- 下: `border-bottom: 1px solid rgba(43, 73, 84, 0.08)`

### レスポンシブ

```css
@media (max-width: 767px) {
  .solution {
    padding: 80px 20px;
  }

  .solution__diagram-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .solution__diagram {
    min-width: 600px;
    /* モバイルでは横スクロール可能にするか、縦レイアウトに組み替える */
  }

  /* 代替案: モバイルでは縦レイアウト */
  .solution__descriptions {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

---

## Section 5: Scale — 信号の増幅

### 背景

```css
.scale {
  background-color: #FFFFFF;
  padding: 100px 24px;
}
```

### レイアウト

```css
.scale__container {
  max-width: 1120px;
  margin: 0 auto;
}

.scale__header {
  text-align: center;
  margin-bottom: 64px;
}

.scale__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
```

### タイポグラフィ

```css
.scale__title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #2B4954;
}

.scale__number {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: #2B4954;
}

.scale__unit {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #34626F;
  margin-left: 2px;
}

.scale__label {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.4;
  color: rgba(4, 4, 4, 0.6);
  margin-top: 12px;
}
```

### 数値カード

```css
.scale__card {
  background: #FFFFFF;
  border: 1px solid rgba(43, 73, 84, 0.08);
  border-top: 2px solid #34626F;
  border-radius: 8px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(4, 4, 4, 0.06);
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scale__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(4, 4, 4, 0.08),
              0 -2px 16px rgba(139, 192, 202, 0.15);
  border-top-color: #8BC0CA;
}
```

### アニメーション（カウントアップ + stagger）

```css
.scale__card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: calc(var(--i, 0) * 80ms);
}

.scale__card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

カウントアップ JS:
```javascript
// IntersectionObserver で .scale セクションが 50% visible になったらトリガー
// requestAnimationFrame で 1500ms かけて 0 → target に数値を増加
// easeOutQuart: t => 1 - (1 - t) ** 4
// 数値フォーマット: toLocaleString() で桁区切り
```

### セクション境界

- 上: `border-top: 1px solid rgba(43, 73, 84, 0.08)`
- 下: `border-bottom: 1px solid rgba(43, 73, 84, 0.08)`

### レスポンシブ

```css
@media (max-width: 1023px) {
  .scale__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 767px) {
  .scale {
    padding: 80px 20px;
  }

  .scale__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .scale__card {
    padding: 24px 16px;
  }

  .scale__number {
    font-size: 36px;
  }
}
```

---

## Section 6: Features — 信号処理の3つの核

### 背景

```css
.features {
  background-color: #F4F8F9;
  padding: 100px 24px;
}
```

### レイアウト

```css
.features__container {
  max-width: 1120px;
  margin: 0 auto;
}

.features__header {
  text-align: center;
  margin-bottom: 80px;
}

.features__list {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

/* 交互レイアウト */
.features__item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.features__item:nth-child(even) {
  direction: rtl;
  /* 偶数番目は右テキスト-左ビジュアル */
}

.features__item:nth-child(even) > * {
  direction: ltr;
}

.features__visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.features__visual svg {
  width: 100%;
  max-width: 320px;
  height: auto;
}
```

### タイポグラフィ

```css
.features__section-title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #2B4954;
}

.features__item-number {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #34626F;
  margin-bottom: 12px;
  /* 「Feature 01」形式 */
}

.features__item-title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #2B4954;
  margin-bottom: 16px;
}

.features__item-text {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.8;
  color: rgba(4, 4, 4, 0.7);
  max-width: 480px;
}
```

### SVG 概念図（3 種）

共通仕様:
```
max-width: 320px
色: #2B4954, #34626F, #8BC0CA の 3 色のみ
stroke-width: 1.5
fill: none（一部ノードのみ fill あり）
```

Feature 1（AI 最適化）: ニューラルネットワーク。左 3 ノード → 中 4 ノード → 右 2 ノードの 3 層。各ノード: circle r=8, stroke #2B4954。接続線: stroke #34626F, stroke-width 1。中央層のアクティブノード: fill rgba(139,192,202,0.2)

Feature 2（メディアネットワーク）: スター型トポロジ。中央ハブ: circle r=16, stroke #34626F, stroke-width 2。周囲 8 ノード: circle r=6, stroke #2B4954。放射線: stroke rgba(43,73,84,0.3)

Feature 3（運用サポート）: ダッシュボード。rect 枠: stroke #2B4954, rx 4。内部: 3 本の水平バー（幅が異なる）+ 人物アイコン。人物: circle r=6(頭) + path(肩)

### アニメーション

```css
.features__item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.features__item.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

各 feature item が viewport に入ったら順にフェードアップ。item 間に 200ms の遅延はない（各自が独立して IO で検知）。

### セクション境界

- 上: `border-top: 1px solid rgba(43, 73, 84, 0.08)`
- 下: `border-bottom: 1px solid rgba(43, 73, 84, 0.08)`

### レスポンシブ

```css
@media (max-width: 767px) {
  .features {
    padding: 80px 20px;
  }

  .features__header {
    margin-bottom: 48px;
  }

  .features__list {
    gap: 48px;
  }

  .features__item {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .features__item:nth-child(even) {
    direction: ltr;
  }

  .features__visual {
    order: -1;
    /* モバイルではビジュアルを先に表示 */
  }

  .features__visual svg {
    max-width: 240px;
  }
}
```

---

## Section 7: Voices — 信号の反響

### 背景

```css
.voices {
  background-color: #FFFFFF;
  padding: 100px 24px;
}
```

### レイアウト

```css
.voices__container {
  max-width: 1120px;
  margin: 0 auto;
}

.voices__header {
  text-align: center;
  margin-bottom: 64px;
}

.voices__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

### タイポグラフィ

```css
.voices__section-title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #2B4954;
}

.voices__quote-mark {
  /* SVG 引用符 */
  width: 32px;
  height: 24px;
  color: #8BC0CA;
  margin-bottom: 16px;
}

.voices__quote-text {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.8;
  color: #040404;
  margin-bottom: 24px;
}

.voices__attribution {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: rgba(4, 4, 4, 0.6);
}

.voices__stat {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #34626F;
  margin-top: 12px;
}
```

### カード

```css
.voices__card {
  background: #FFFFFF;
  border: 1px solid rgba(43, 73, 84, 0.08);
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(4, 4, 4, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.voices__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(4, 4, 4, 0.08);
  border-color: rgba(52, 98, 111, 0.2);
}
```

### SVG 引用符アイコン

```svg
<svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 24V14.4C0 6.24 3.84 1.6 11.52 0.48L12.8 3.36C8.64 4.8 6.4 7.68 6.08 12H11.2V24H0ZM19.2 24V14.4C19.2 6.24 23.04 1.6 30.72 0.48L32 3.36C27.84 4.8 25.6 7.68 25.28 12H30.4V24H19.2Z" fill="currentColor"/>
</svg>
```

### アニメーション

カード stagger:
```css
.voices__card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: calc(var(--i, 0) * 80ms);
}

.voices__card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### セクション境界

- 上: `border-top: 1px solid rgba(43, 73, 84, 0.08)`
- 下: `border-bottom: 1px solid rgba(43, 73, 84, 0.08)`

### レスポンシブ

```css
@media (max-width: 1023px) {
  .voices__grid {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 560px;
    margin: 0 auto;
  }
}

@media (max-width: 767px) {
  .voices {
    padding: 80px 20px;
  }
}
```

---

## Section 8: Flow — 接続プロトコル

### 背景

```css
.flow {
  background-color: #F4F8F9;
  padding: 100px 24px;
}
```

### レイアウト

```css
.flow__container {
  max-width: 1120px;
  margin: 0 auto;
}

.flow__header {
  text-align: center;
  margin-bottom: 64px;
}

.flow__steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  position: relative;
}

.flow__step {
  flex: 1;
  max-width: 240px;
  text-align: center;
  position: relative;
  padding: 0 16px;
}
```

### タイポグラフィ

```css
.flow__section-title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #2B4954;
}

.flow__step-number {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #34626F;
  margin-top: 16px;
}

.flow__step-title {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  color: #2B4954;
  margin-top: 12px;
}

.flow__step-desc {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(4, 4, 4, 0.6);
  margin-top: 8px;
}
```

### ステップノード + 接続線

各ステップの上部にノードアイコン（SVG circle + アイコン）:

```css
.flow__step-node {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 2px solid #34626F;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.flow__step-node svg {
  width: 24px;
  height: 24px;
  color: #34626F;
}
```

ステップ間の接続線（SVG）:
```
各ノード中心間を水平線で接続
stroke: #34626F
stroke-width: 2
stroke-dasharray: [lineLength]
stroke-dashoffset: [lineLength] → 0（スクロール連動）

接続線はノードの背面（z-index: 0）に配置
position: absolute で各ステップ間に描画
```

```css
.flow__connector {
  position: absolute;
  top: 28px;
  /* ノードの中心位置 = 56px / 2 */
  height: 2px;
  background: transparent;
  z-index: 0;
}

.flow__connector svg {
  width: 100%;
  height: 2px;
}

.flow__connector-line {
  stroke: #34626F;
  stroke-width: 2;
  stroke-dasharray: var(--line-length);
  stroke-dashoffset: var(--line-length);
  transition: stroke-dashoffset 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.flow__connector-line.is-visible {
  stroke-dashoffset: 0;
}
```

### SVG ステップアイコン（4 種）

```
viewBox: 0 0 24 24
stroke: currentColor
stroke-width: 1.5
fill: none
stroke-linecap: round
stroke-linejoin: round
```

1. メール（お問い合わせ）: 封筒の直線的アイコン
2. ヘッドセット（ヒアリング）: ヘッドフォン + マイク
3. 設定ギア（アカウント開設）: 歯車 + チェックマーク
4. ロケット（配信開始）: ロケット（直線的、回路風）

### アニメーション

1. ステップノードが viewport に入ったら stagger でフェードアップ（80ms 刻み）
2. 各接続線が左から順に描画（線描画アニメーション）
3. 線が到達したノードのボーダー色を #34626F → #8BC0CA に変化（点灯）

```css
.flow__step {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: calc(var(--i, 0) * 120ms);
}

.flow__step.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.flow__step-node.is-lit {
  border-color: #8BC0CA;
  box-shadow: 0 0 12px rgba(139, 192, 202, 0.2);
}
```

### セクション境界

- 上: `border-top: 1px solid rgba(43, 73, 84, 0.08)`
- 下: `border-bottom: 1px solid rgba(43, 73, 84, 0.08)`

### レスポンシブ

```css
@media (max-width: 767px) {
  .flow {
    padding: 80px 20px;
  }

  .flow__steps {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .flow__step {
    max-width: 320px;
  }

  .flow__connector {
    /* モバイルでは縦の接続線に変更 */
    width: 2px;
    height: 32px;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
  }
}
```

---

## Section 9: FAQ — トラブルシューティング

### 背景

```css
.faq {
  background-color: #FFFFFF;
  padding: 100px 24px 80px;
}
```

### レイアウト

```css
.faq__container {
  max-width: 720px;
  margin: 0 auto;
}

.faq__header {
  text-align: center;
  margin-bottom: 48px;
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
```

### タイポグラフィ

```css
.faq__section-title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #2B4954;
}

.faq__question {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  color: #040404;
}

.faq__answer {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.8;
  color: rgba(4, 4, 4, 0.7);
}
```

### アコーディオン

```css
.faq__item {
  border-bottom: 1px solid rgba(43, 73, 84, 0.08);
}

.faq__item:first-child {
  border-top: 1px solid rgba(43, 73, 84, 0.08);
}

.faq__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  gap: 16px;
  text-align: left;
}

.faq__trigger:focus-visible {
  outline: 2px solid rgba(139, 192, 202, 0.6);
  outline-offset: 2px;
  border-radius: 4px;
}

.faq__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  position: relative;
}

/* +/- アイコン（CSS で実装） */
.faq__icon::before,
.faq__icon::after {
  content: '';
  position: absolute;
  background: #2B4954;
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.faq__icon::before {
  /* 水平線 */
  width: 14px;
  height: 1.5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.faq__icon::after {
  /* 垂直線 */
  width: 1.5px;
  height: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.faq__item.is-open .faq__icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
  /* 垂直線が回転して水平線と重なる → - になる */
}

.faq__panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.faq__item.is-open .faq__panel {
  max-height: 200px;
  /* JS で実際のコンテンツ高さを設定 */
}

.faq__answer {
  padding: 0 0 20px 0;
}
```

### アニメーション

- セクション全体: フェードアップ
- 個別のアコーディオン: クリック時に `max-height` + アイコン回転

### セクション境界

- 上: `border-top: 1px solid rgba(43, 73, 84, 0.08)`
- 下: グラデーション遷移帯（FAQ → Final CTA）

```css
.faq__transition {
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, #FFFFFF 0%, #1A2830 100%);
  margin-top: 80px;
}
```

### レスポンシブ

```css
@media (max-width: 767px) {
  .faq {
    padding: 80px 20px 64px;
  }

  .faq__trigger {
    padding: 16px 0;
  }
}
```

### アクセシビリティ

```html
<div class="faq__item">
  <button class="faq__trigger" aria-expanded="false" aria-controls="faq-panel-1">
    <span class="faq__question">導入にどのくらい時間がかかりますか？</span>
    <span class="faq__icon" aria-hidden="true"></span>
  </button>
  <div class="faq__panel" id="faq-panel-1" role="region" aria-labelledby="faq-trigger-1" hidden>
    <p class="faq__answer">最短1週間。タグ設置とアカウント設定のみで完了します。</p>
  </div>
</div>
```

構造化データ（FAQPage JSON-LD）を `<head>` 内に配置。

---

## Section 10: Final CTA — 信号の発信

### 背景

```css
.final-cta {
  background-color: #1A2830;
  padding: 120px 24px;
  position: relative;
  overflow: hidden;
}
```

### 背景: 回路パターン（全ノード同時パルス）

Hero と同じ SVG 回路パターンを再利用。ただし:

- ノードのパルス周期: 3000ms → 1500ms（加速）
- ノードの animation-delay: 全ノード 0ms（同時パルス）
- 接続線の opacity: 0.12 → 0.2（全体が明るい）
- ノードの opacity レンジ: 0.25-0.7 → 0.3-0.8

```css
.final-cta .circuit-node {
  animation: node-pulse-fast 1500ms ease-in-out infinite;
  animation-delay: 0ms;
}

@keyframes node-pulse-fast {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.33);
  }
}

.final-cta .circuit-line {
  stroke: rgba(139, 192, 202, 0.2);
}
```

### レイアウト

```css
.final-cta__content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

### タイポグラフィ

```css
.final-cta__title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #F4F8F9;
}

.final-cta__sub {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8;
  color: rgba(244, 248, 249, 0.75);
  max-width: 480px;
  margin-top: 20px;
}

.final-cta__cta-group {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
  justify-content: center;
}
```

### CTA ボタン

Hero と同じ `.btn-primary` / `.btn-secondary`（ダーク背景用）を使用。
Final CTA の Primary にもパルスグロー（Hero と同じ `cta-pulse` animation）を適用。

### アニメーション

```css
.final-cta__title,
.final-cta__sub,
.final-cta__cta-group {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}

.final-cta__title.is-visible { opacity: 1; transform: translateY(0); transition-delay: 0ms; }
.final-cta__sub.is-visible { opacity: 1; transform: translateY(0); transition-delay: 150ms; }
.final-cta__cta-group.is-visible { opacity: 1; transform: translateY(0); transition-delay: 300ms; }
```

### セクション境界

- 上: なし（FAQ のグラデーション遷移帯で接続済み）
- 下: `border-bottom: 1px solid rgba(139, 192, 202, 0.1)`（Footer との間）

### レスポンシブ

```css
@media (max-width: 767px) {
  .final-cta {
    padding: 80px 20px;
  }

  .final-cta__title {
    font-size: 28px;
  }

  .final-cta__cta-group {
    flex-direction: column;
    width: 100%;
    margin-top: 32px;
  }

  .final-cta__cta-group .btn-primary,
  .final-cta__cta-group .btn-secondary {
    width: 100%;
    min-width: auto;
  }
}
```

---

## Footer

### 背景

```css
.footer {
  background-color: #0F1A20;
  padding: 48px 24px;
  border-top: 1px solid rgba(139, 192, 202, 0.1);
}
```

### レイアウト

```css
.footer__container {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer__nav {
  display: flex;
  gap: 24px;
}
```

### タイポグラフィ

```css
.footer__logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #F4F8F9;
  text-decoration: none;
}

.footer__nav-link {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: rgba(244, 248, 249, 0.5);
  text-decoration: none;
  transition: color 200ms ease-out;
}

.footer__nav-link:hover {
  color: rgba(244, 248, 249, 0.8);
}

.footer__company {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: rgba(244, 248, 249, 0.35);
}

.footer__copyright {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: rgba(244, 248, 249, 0.35);
}
```

### レスポンシブ

```css
@media (max-width: 767px) {
  .footer {
    padding: 40px 20px;
  }

  .footer__container {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .footer__nav {
    flex-direction: column;
    gap: 12px;
  }
}
```

---

## 共通実装: scroll-driven animations + IO フォールバック

全セクションで共通の入場アニメーション実装:

### CSS（scroll-driven animations 対応ブラウザ）

```css
@supports (animation-timeline: view()) {
  [data-reveal] {
    opacity: 0;
    transform: translateY(20px);
    animation: reveal-up linear both;
    animation-timeline: view();
    animation-range: entry 10% entry 60%;
  }

  @keyframes reveal-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

### CSS（フォールバック）

```css
@supports not (animation-timeline: view()) {
  [data-reveal] {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  [data-reveal].is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* stagger */
  [data-reveal-stagger] {
    transition-delay: calc(var(--i, 0) * 80ms);
  }
}
```

### JS フォールバック

```javascript
if (!CSS.supports('animation-timeline', 'view()')) {
  const revealElements = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((el) => observer.observe(el));
}
```

### prefers-reduced-motion（全セクション共通）

```css
@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }

  .trust__marquee-track {
    animation-play-state: paused;
  }

  .circuit-node {
    animation: none !important;
  }

  .hero .btn-primary::after,
  .final-cta .btn-primary::after {
    animation: none !important;
  }
}
```

---

## モバイルメニュー（ハンバーガー）

### トリガー

```css
.header__hamburger {
  display: none;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0;
}

.header__hamburger span {
  display: block;
  width: 20px;
  height: 1.5px;
  background: #F4F8F9;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.header__hamburger span:first-child {
  top: calc(50% - 4px);
}

.header__hamburger span:last-child {
  top: calc(50% + 4px);
}

/* 開いた状態 */
.header__hamburger[aria-expanded="true"] span:first-child {
  top: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.header__hamburger[aria-expanded="true"] span:last-child {
  top: 50%;
  transform: translateX(-50%) rotate(-45deg);
}

@media (max-width: 767px) {
  .header__hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header__nav,
  .header__actions {
    display: none;
  }
}
```

### メニューパネル

```css
.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100vh - 64px);
  background: rgba(26, 40, 48, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-menu.is-open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-menu__link {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #F4F8F9;
  text-decoration: none;
  padding: 12px 24px;
}

.mobile-menu__cta {
  margin-top: 16px;
}
```

---

## 構造化データ

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "UZOU",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  },
  "provider": {
    "@type": "Organization",
    "name": "株式会社Speee",
    "url": "https://speee.jp/"
  }
}
```

### FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "導入にどのくらい時間がかかりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "最短1週間。タグ設置とアカウント設定のみで完了します。"
      }
    }
  ]
}
```

（残り4問も同様に追加）

---

## スキップリンク

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  background: #34626F;
  color: #F4F8F9;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 200;
  text-decoration: none;
}

.skip-link:focus {
  top: 8px;
}
```

```html
<body>
  <a href="#main" class="skip-link">メインコンテンツへ</a>
  <header>...</header>
  <main id="main">...</main>
  <footer>...</footer>
</body>
```
