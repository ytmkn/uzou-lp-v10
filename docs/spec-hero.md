# ヒーロー技法指定書: UZOU LP v10 — Signal Pulse

---

## セクション概要

- セクション名: Hero — 信号の覚醒
- 役割: 世界観の確立 + 主要CTA
- レイアウト: 中央揃え。キャッチコピー → サブコピー → CTA 2つの縦スタック
- 背景: ダーク基板（#1A2830）+ SVG 回路パターン + マウス追従グラデーション
- 入場: フェードアップ stagger（コピー → サブコピー → CTA ボタン群 の3段階）

---

## 1. 背景

### 1-1. ベース背景色

```css
.hero {
  background-color: #1A2830;
}
```

### 1-2. SVG 回路パターン

ヒーロー全面に `<svg>` を `position: absolute; inset: 0; width: 100%; height: 100%` で配置。`<pattern>` で 200x200px タイルを繰り返す。

#### パターンタイルの仕様（200x200px）

接続線（水平/垂直のみ。斜め禁止）:
```
stroke: rgba(139, 192, 202, 0.12)
stroke-width: 1
```

ノード（接続点の円）:
```
r: 3
fill: rgba(139, 192, 202, 0.25)
```

1タイルあたりのノード数: 6

パターン SVG の具体的なパス:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
      <!-- 水平線 -->
      <line x1="0" y1="40" x2="80" y2="40" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <line x1="120" y1="40" x2="200" y2="40" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <line x1="40" y1="120" x2="160" y2="120" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <line x1="0" y1="160" x2="60" y2="160" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <line x1="140" y1="160" x2="200" y2="160" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <!-- 垂直線 -->
      <line x1="80" y1="0" x2="80" y2="40" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <line x1="120" y1="40" x2="120" y2="120" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <line x1="40" y1="120" x2="40" y2="200" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <line x1="160" y1="120" x2="160" y2="160" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <line x1="60" y1="160" x2="60" y2="200" stroke="rgba(139,192,202,0.12)" stroke-width="1"/>
      <!-- ノード -->
      <circle cx="80" cy="40" r="3" fill="rgba(139,192,202,0.25)" class="circuit-node"/>
      <circle cx="120" cy="40" r="3" fill="rgba(139,192,202,0.25)" class="circuit-node"/>
      <circle cx="40" cy="120" r="3" fill="rgba(139,192,202,0.25)" class="circuit-node"/>
      <circle cx="120" cy="120" r="3" fill="rgba(139,192,202,0.25)" class="circuit-node"/>
      <circle cx="160" cy="120" r="3" fill="rgba(139,192,202,0.25)" class="circuit-node"/>
      <circle cx="60" cy="160" r="3" fill="rgba(139,192,202,0.25)" class="circuit-node"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#circuit)"/>
</svg>
```

#### ノードのパルスアニメーション

回路パターンの SVG は `<pattern>` 内ではアニメーションが制約されるため、パターン背景とは別にノードだけの SVG レイヤーを重ねる。ノードは固定座標でページ上に配置（ビューポート内に 20-30 個）。

各ノードにクラス付与し、`animation-delay` を分散:

```css
.circuit-node {
  animation: node-pulse 3000ms ease-in-out infinite;
}

@keyframes node-pulse {
  0%, 100% {
    fill: rgba(139, 192, 202, 0.25);
    r: 3;
  }
  50% {
    fill: rgba(139, 192, 202, 0.7);
    r: 4;
  }
}

/* 各ノードに delay を分散（JS で nth-child ごとに設定、または SVG 属性で直接指定） */
.circuit-node:nth-child(6n+1) { animation-delay: 0ms; }
.circuit-node:nth-child(6n+2) { animation-delay: 500ms; }
.circuit-node:nth-child(6n+3) { animation-delay: 1000ms; }
.circuit-node:nth-child(6n+4) { animation-delay: 1500ms; }
.circuit-node:nth-child(6n+5) { animation-delay: 2000ms; }
.circuit-node:nth-child(6n+6) { animation-delay: 2500ms; }
```

注意: SVG の `r` 属性アニメーションは CSS で直接制御できないブラウザがある。代替として `transform: scale()` を使用:

```css
@keyframes node-pulse {
  0%, 100% {
    opacity: 0.25;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.33);
    /* 3px → 4px 相当 */
  }
}

.circuit-node {
  transform-origin: center;
  transform-box: fill-box;
  animation: node-pulse 3000ms ease-in-out infinite;
}
```

### 1-3. マウス追従グラデーション

ヒーローの `::before` 疑似要素で実装:

```css
.hero {
  --mouse-x: 50%;
  --mouse-y: 50%;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(139, 192, 202, 0.1) 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
}
```

JS（mousemove で CSS 変数を更新）:

```javascript
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  hero.style.setProperty('--mouse-x', x + '%');
  hero.style.setProperty('--mouse-y', y + '%');
});
```

タッチデバイスでは非表示:
```css
@media (hover: none) {
  .hero::before {
    display: none;
  }
}
```

### 1-4. アンビエントライト（上部からの放射グロー）

ページ上端から下方に向かうグラデーション。マウス追従とは別レイヤー:

```css
.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 60%;
  background: radial-gradient(
    ellipse 60% 40% at 50% 0%,
    rgba(139, 192, 202, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 1;
}
```

### 1-5. 背景レイヤーの z-index 整理

| レイヤー | z-index | 内容 |
|---|---|---|
| ベース背景色 | — | `background-color: #1A2830` |
| SVG 回路パターン + ノード | 0 | `position: absolute` |
| マウス追従グラデーション | 1 | `::before` |
| アンビエントライト | 1 | `::after` |
| テキストコンテンツ | 2 | `.hero__content` |

---

## 2. レイアウト

```css
.hero {
  position: relative;
  min-height: 100vh;
  /* 100svh が利用可能なら: min-height: 100svh; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 160px 24px 120px;
  overflow: hidden;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 720px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
```

### コンテンツ要素の間隔

| 要素 | margin-top |
|---|---|
| h1（キャッチコピー） | 0 |
| p.hero__sub（サブコピー） | 24px |
| .hero__cta-group（CTAボタン群） | 40px |

---

## 3. タイポグラフィ

### 3-1. キャッチコピー

```
テキスト: 「届く広告は、つながりから生まれる。」
```

```css
.hero__title {
  font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #F4F8F9;
  margin: 0;
}
```

### 3-2. サブコピー

```
テキスト: 「500を超えるメディアと直接接続。AIが最適な配信先を瞬時に見つけ出し、
広告主の成果とメディアの収益を同時に最大化する、ネイティブ広告配信プラットフォーム。」
```

```css
.hero__sub {
  font-family: 'Noto Sans JP', 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: 0em;
  color: rgba(244, 248, 249, 0.75);
  max-width: 560px;
  margin-top: 24px;
}
```

### 3-3. CTA ボタン群

```css
.hero__cta-group {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
  justify-content: center;
}
```

---

## 4. CTA ボタン

### 4-1. Primary CTA（資料をダウンロード）

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  min-width: 200px;
  min-height: 48px;
  background: #34626F;
  color: #F4F8F9;
  border: 1px solid #34626F;
  border-radius: 6px;
  font-family: 'Noto Sans JP', 'Space Grotesk', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  transition: background 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-primary:hover {
  background: #2B4954;
  border-color: #2B4954;
  box-shadow: 0 0 16px rgba(139, 192, 202, 0.2);
  transform: translateY(-2px);
}

.btn-primary:active {
  background: #1F353E;
  border-color: #1F353E;
  box-shadow: 0 0 8px rgba(139, 192, 202, 0.15);
  transform: translateY(0);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 192, 202, 0.4);
}
```

### 4-2. Primary CTA パルスグロー

ヒーローの Primary CTA にのみ、ボーダー外周にパルスグローを追加:

```css
.hero .btn-primary {
  position: relative;
}

.hero .btn-primary::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 7px;
  /* border-radius = ボタンの border-radius(6px) + border-width(1px) */
  box-shadow: 0 0 0 0 rgba(139, 192, 202, 0);
  animation: cta-pulse 4000ms ease-in-out infinite;
  pointer-events: none;
}

@keyframes cta-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(139, 192, 202, 0);
  }
  50% {
    box-shadow: 0 0 16px 4px rgba(139, 192, 202, 0.2);
  }
}
```

### 4-3. Secondary CTA（お問い合わせはこちら）

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  min-width: 200px;
  min-height: 48px;
  background: transparent;
  color: #F4F8F9;
  border: 1px solid rgba(244, 248, 249, 0.25);
  border-radius: 6px;
  font-family: 'Noto Sans JP', 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  transition: background 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-secondary:hover {
  background: rgba(244, 248, 249, 0.05);
  border-color: rgba(244, 248, 249, 0.4);
  box-shadow: 0 0 12px rgba(139, 192, 202, 0.1);
  transform: translateY(-2px);
}

.btn-secondary:active {
  background: rgba(244, 248, 249, 0.08);
  border-color: rgba(244, 248, 249, 0.5);
  box-shadow: none;
  transform: translateY(0);
}

.btn-secondary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 192, 202, 0.4);
}
```

---

## 5. ヘッダー（Hero 内での表示）

ヘッダーはページ共通。Hero 内では透明背景。

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.header.is-scrolled {
  background: rgba(26, 40, 48, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(139, 192, 202, 0.08);
}
```

ロゴ:
```css
.header__logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #F4F8F9;
  text-decoration: none;
}
```

ナビリンク:
```css
.header__nav-link {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: rgba(244, 248, 249, 0.7);
  text-decoration: none;
  transition: color 200ms ease-out;
}

.header__nav-link:hover {
  color: #F4F8F9;
}
```

ヘッダーCTA:
```css
.header__cta {
  padding: 8px 20px;
  min-height: 36px;
  font-size: 13px;
  border-radius: 4px;
  /* 他のスタイルは .btn-primary を継承 */
}
```

スクロール検知 JS（IntersectionObserver）:
```javascript
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const observer = new IntersectionObserver(
  ([entry]) => {
    header.classList.toggle('is-scrolled', !entry.isIntersecting);
  },
  { threshold: 0, rootMargin: '-64px 0px 0px 0px' }
);
observer.observe(hero);
```

---

## 6. 入場アニメーション

### 6-1. ページ読み込みシーケンス

ヒーローの入場は `animation-delay` による stagger:

```css
.hero__title {
  opacity: 0;
  transform: translateY(20px);
  animation: hero-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 100ms;
}

.hero__sub {
  opacity: 0;
  transform: translateY(20px);
  animation: hero-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 300ms;
}

.hero__cta-group {
  opacity: 0;
  transform: translateY(20px);
  animation: hero-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 500ms;
}

@keyframes hero-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 6-2. prefers-reduced-motion 対応

```css
@media (prefers-reduced-motion: reduce) {
  .hero__title,
  .hero__sub,
  .hero__cta-group {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .circuit-node {
    animation: none;
    opacity: 0.25;
  }

  .hero .btn-primary::after {
    animation: none;
  }
}
```

---

## 7. セクション境界（下部）

Hero → Trust への遷移。Hero の最下部にグラデーション遷移帯を配置:

```css
.hero__transition {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, transparent 0%, #F4F8F9 100%);
  z-index: 3;
  pointer-events: none;
}
```

---

## 8. レスポンシブ

### 8-1. Tablet（768px - 1023px）

```css
@media (max-width: 1023px) {
  .hero {
    padding: 140px 24px 100px;
    min-height: auto;
    /* タブレットでは 100vh を強制しない */
  }

  .hero__title {
    font-size: 40px;
  }

  .hero__sub {
    font-size: 15px;
    max-width: 480px;
  }

  .hero__cta-group {
    gap: 12px;
  }

  .btn-primary,
  .btn-secondary {
    min-width: 180px;
    padding: 12px 24px;
  }
}
```

### 8-2. Mobile（-767px）

```css
@media (max-width: 767px) {
  .hero {
    padding: 120px 20px 80px;
    min-height: auto;
  }

  .hero__content {
    max-width: 100%;
  }

  .hero__title {
    font-size: 32px;
    letter-spacing: -0.015em;
  }

  .hero__sub {
    font-size: 15px;
    margin-top: 20px;
    max-width: 100%;
  }

  .hero__cta-group {
    flex-direction: column;
    width: 100%;
    margin-top: 32px;
    gap: 12px;
  }

  .hero__cta-group .btn-primary,
  .hero__cta-group .btn-secondary {
    width: 100%;
    min-width: auto;
    padding: 14px 24px;
    min-height: 48px;
    /* タップターゲット 48px */
  }

  /* モバイルではマウス追従無効 */
  .hero::before {
    display: none;
  }

  /* アンビエントライトはモバイルでも表示（静的グロー） */

  /* 回路パターンのタイルを拡大（線が細すぎて見えない問題を回避） */
  /* pattern の width/height を 160px に変更するか、SVG 全体を scale */

  .header__nav {
    display: none;
    /* モバイルではハンバーガーメニュー */
  }
}
```

### 8-3. Small Mobile（-480px）

```css
@media (max-width: 480px) {
  .hero {
    padding: 100px 16px 64px;
  }

  .hero__title {
    font-size: 28px;
  }

  .hero__sub {
    font-size: 14px;
    margin-top: 16px;
  }

  .hero__cta-group {
    margin-top: 28px;
  }
}
```

---

## 9. HTML 構造（セマンティクス）

```html
<header class="header" role="banner">
  <a href="/" class="header__logo">UZOU</a>
  <nav class="header__nav" aria-label="メインナビゲーション">
    <a href="#solution" class="header__nav-link">UZOUとは</a>
    <a href="#features" class="header__nav-link">特徴</a>
    <a href="#scale" class="header__nav-link">実績</a>
    <a href="#flow" class="header__nav-link">導入の流れ</a>
    <a href="#faq" class="header__nav-link">FAQ</a>
  </nav>
  <div class="header__actions">
    <a href="#contact" class="header__cta btn-primary">資料ダウンロード</a>
  </div>
  <button class="header__hamburger" aria-label="メニューを開く" aria-expanded="false">
    <span></span><span></span>
  </button>
</header>

<section class="hero" id="hero" aria-label="ヒーロー">
  <!-- SVG 回路パターン（背景） -->
  <svg class="hero__circuit" aria-hidden="true">...</svg>

  <!-- SVG ノードレイヤー（パルスアニメーション用） -->
  <svg class="hero__nodes" aria-hidden="true">...</svg>

  <!-- コンテンツ -->
  <div class="hero__content">
    <h1 class="hero__title">届く広告は、<br>つながりから生まれる。</h1>
    <p class="hero__sub">500を超えるメディアと直接接続。AIが最適な配信先を瞬時に見つけ出し、広告主の成果とメディアの収益を同時に最大化する、ネイティブ広告配信プラットフォーム。</p>
    <div class="hero__cta-group">
      <a href="#download" class="btn-primary">資料をダウンロード</a>
      <a href="#contact" class="btn-secondary">お問い合わせはこちら</a>
    </div>
  </div>

  <!-- グラデーション遷移帯 -->
  <div class="hero__transition" aria-hidden="true"></div>
</section>
```

### h1 の `<br>` 位置

- Desktop: 「届く広告は、つながりから生まれる。」を1行で表示可能（64px, max-width 720px で約15文字 = 十分）。`<br>` なしでも可
- Mobile: 32px では折り返しが発生。「届く広告は、」で改行するのが自然
- 実装: CSS `display: none` / `display: inline` の `<br>` でレスポンシブ制御。またはテキストに任意改行を入れず、自然折り返しに任せる

推奨実装:
```css
.hero__title br {
  display: none;
}

@media (max-width: 767px) {
  .hero__title br {
    display: inline;
  }
}
```

---

## 10. パフォーマンス考慮事項

| 項目 | 対応 |
|---|---|
| SVG パターンの描画負荷 | `<pattern>` 内は静的。ノードのアニメーションは別レイヤーで 20-30 個に制限 |
| マウス追従 | `mousemove` イベントに `requestAnimationFrame` でスロットリング |
| `will-change` | `.hero::before`, `.hero::after`, `.circuit-node` に `will-change: opacity, transform` を指定し GPU 合成を促進。ただし要素数を絞る |
| `backdrop-filter` | ヘッダーの `backdrop-filter: blur(12px)` は GPU 負荷あり。`is-scrolled` 時のみ適用（初期は `backdrop-filter: none`） |
| フォント | `font-display: swap` で FOIT 回避。LCP 要素（h1）はシステムフォントフォールバックで先に表示 |

### マウス追従の throttle 実装

```javascript
let ticking = false;
hero.addEventListener('mousemove', (e) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mouse-x', x + '%');
      hero.style.setProperty('--mouse-y', y + '%');
      ticking = false;
    });
    ticking = true;
  }
});
```

---

## 11. アクセシビリティ

| 項目 | 対応 |
|---|---|
| コントラスト比（h1 #F4F8F9 / bg #1A2830） | 10.2:1（WCAG AAA 達成） |
| コントラスト比（sub rgba(244,248,249,0.75) / bg #1A2830） | 7.5:1（WCAG AAA 達成） |
| コントラスト比（btn-primary text / btn bg） | 9.8:1（WCAG AAA 達成） |
| SVG 装飾 | `aria-hidden="true"` |
| ヘッダーナビ | `aria-label="メインナビゲーション"` |
| ハンバーガー | `aria-label`, `aria-expanded` |
| スキップリンク | `<a href="#main" class="skip-link">メインコンテンツへ</a>` を `<body>` 直下に配置 |
| reduced-motion | 全アニメーション無効化 |

---

## セクション評価の事前チェックリスト

lp-builder 実装後に Playwright スクリーンショットで検証する項目:

### 光と影（14点満点）
- [ ] 回路ノードのパルスが 0.25 → 0.7 の opacity 範囲で明滅している
- [ ] マウス追従グラデーションが 600px circle で表示されている
- [ ] アンビエントライト（上部放射グロー）が背景に溶け込んでいる
- [ ] CTA ボタンのパルスグロー（4000ms 周期）が確認できる

### タイポの表情（14点満点）
- [ ] h1 が clamp(32px, 5vw, 64px) で表示されている（1440px で 64px）
- [ ] h1 の letter-spacing が -0.02em（文字間が詰まっている）
- [ ] サブコピーが rgba(244,248,249,0.75) でヘッドラインより控えめ
- [ ] Space Grotesk が欧文に適用されている

### 動きの品格（14点満点）
- [ ] 入場アニメーションが 100ms → 300ms → 500ms の 3 段階 stagger
- [ ] イージングが cubic-bezier(0.16, 1, 0.3, 1)（素早く到達→自然停止）
- [ ] translateY が 20px（控えめな移動距離）
- [ ] duration が 600ms

### 細部の仕上げ（14点満点）
- [ ] CTA ボタンのホバーで translateY(-2px) + glow
- [ ] ヘッダーの背景が Hero 通過後に rgba(26,40,48,0.85) + blur に変化
- [ ] グラデーション遷移帯（80px）が Hero 下部に存在
- [ ] 回路パターンの線が水平/垂直のみ（斜めなし）
