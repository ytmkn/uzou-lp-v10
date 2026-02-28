# UZOU LP v11 技法指定書

> 作成日: 2026-02-28
> 作成者: lp-designer
> コンセプト: 「Sift — 有象無象を、見極める知性」
> キャッチコピー: 「ノイズの中から、シグナルを。」

---

## リファレンス実測結果サマリー

### Linear.app（実測 2026-02-28）
- body背景: `rgb(8, 9, 10)` ≒ `#08090a`
- h1: 64px / weight 510 / letter-spacing -1.408px(-0.022em) / line-height 64px(1.0)
- サブコピー: 24px / weight 400 / color `rgb(208, 214, 224)` / letter-spacing -0.288px(-0.012em) / line-height 31.92px(1.33)
- グロー効果: `radial-gradient(50% 50%, rgba(255,255,255,0.04), rgba(255,255,255,0) 90%)`
- CTAボタン: border-radius 4px / padding 0 12px / font-size 13px / weight 510
- ヘッダー背景: `linear-gradient(rgba(11,11,11,0.8), rgba(11,11,11,0.76))`

### KARTE.io（実測 2026-02-28）
- ティールCTA: `rgb(42, 171, 159)` / border-radius 999px / padding 0 48px(大) 0 16px(小)
- カード影: `rgba(26,26,26,0.02) 0px 16px 32px 16px, rgba(26,26,26,0.02) 0px 16px 24px -4px` / border-radius 12px
- セクションpadding: 160px / 224px（大きなセクション間余白）
- グラデーション遷移: `linear-gradient(rgba(251,251,251,0), rgba(209,243,163,0.34) 45%, rgba(42,171,159,0.75))`
- ティール → ティールグラデーション: `linear-gradient(rgb(42,171,159), rgb(18,160,160))`

### StartPass.jp（実測 2026-02-28）
- 巨大見出し: 160px / weight 600 / Archivo + Zen Kaku Gothic New / line-height 1.0 / letter-spacing normal
- キャッチコピー: 52px / weight 700 / line-height 1.4
- 数値系見出し: 72px / weight 900 / Zen Kaku Gothic New / letter-spacing -2.4px(-0.033em)
- セクションpadding: 160px 0 0（上部のみ大きな余白）

---

## 1. ビジュアルシーケンス設計（全体の楽譜）

### セクション全体マップ

| # | セクション | 背景色 | 密度 | padding-top | padding-bottom | 境界処理 | スケール感 | 入場アニメーション |
|---|---|---|---|---|---|---|---|---|
| 1 | SIGNAL | `#FFFFFF` | 低 | 160px | 0px | なし（TRUSTED BYと地続き） | 大 | fadeInUp, 文字単位stagger 30ms |
| 2 | TRUSTED BY | `#FFFFFF` | 最低 | 48px | 64px | 下部: `#FFFFFF` → `#F5F7F8` gradient帯 80px | 最小 | marquee（入場アニメーションなし） |
| 3 | NOISE | `#F5F7F8` | 中 | 120px | 120px | 下部: `#F5F7F8` → `#497E92` gradient帯 80px | 小 | slideInLeft, stagger 120ms |
| 4 | SIFT | `linear-gradient(180deg, #497E92, #3A6575)` | 高 | 160px | 160px | 下部: `#3A6575` → `#FFFFFF` gradient帯 120px | 中 | scaleUp, stagger 80ms |
| 5 | PROOF | `#FFFFFF` | 低 | 100px | 100px | 下部: `#FFFFFF` → `#F5F7F8` gradient帯 80px | 大 | countUpのみ（入場アニメーションなし） |
| 6 | THREE SIGNALS | `#F5F7F8` | 高 | 160px | 160px | 下部: `#F5F7F8` → `#E8F0F3` gradient帯 80px | 中 | slideInLeft, stagger 120ms |
| 7 | VOICES | `#E8F0F3` | 中 | 100px | 100px | 下部: `#E8F0F3` → `#FFFFFF` gradient帯 80px | 小 | marquee（入場アニメーションなし） |
| 8 | FLOW | `#FFFFFF` | 中 | 120px | 120px | 下部: `#FFFFFF` → `#0D2B33` gradient帯 120px | 小 | なし（即表示） |
| 9 | FIND YOUR SIGNAL | `#0D2B33` | 低 | 160px | 160px | なし（フッターへ直結） | 大 | fadeInUp, stagger 200ms |

### 色のリズム検証

```
#FFFFFF → #FFFFFF → #F5F7F8 → #497E92(ブランド) → #FFFFFF → #F5F7F8 → #E8F0F3 → #FFFFFF → #0D2B33(ダーク)
白      → 白(地続き) → 微灰  → ティール(核心)    → 白       → 微灰     → 淡ティール → 白     → 深ティール(CTA)
```

- ライト基調の中にティールブルーが1点突破で存在感を出す
- ダークは最終CTAの1セクションのみ（締め）
- `#FFFFFF` → `#F5F7F8` → `#E8F0F3` の微差で変化をつける

### 余白のリズム検証

```
160/0 → 48/64 → 120/120 → 160/160 → 100/100 → 160/160 → 100/100 → 120/120 → 160/160
大/0   → 小/小  → 中/中    → 大/大    → 中/中    → 大/大    → 中/中    → 中/中    → 大/大
```

- SIGNAL→TRUSTED BYは地続き（padding-bottom 0px）
- SIFTとTHREE SIGNALSは最大余白（核心セクションに呼吸を持たせる）
- PROOF/VOICESは抑え気味（コンテンツ自体がシンプル）

### モーションの緩急検証

```
fadeInUp → marquee → slideInLeft → scaleUp → countUp → slideInLeft → marquee → なし → fadeInUp
テキスト分割 → 等速横流 → 横入場    → 拡大    → 数値上昇 → 横入場     → 等速横流 → 静止  → テキスト浮上
```

- fadeInUpは最初と最後のみ（フレーミング）
- marqueeは2セクション（TRUSTED BY, VOICES）で呼応
- 中盤はslideInLeftとscaleUpで変化
- FLOWは入場アニメーションなし（安心感、導入の容易さを静的に伝える）

---

## 2. CSS変数定義

```css
:root {
  /* === カラーパレット === */
  --color-brand: #497E92;
  --color-brand-dark: #3A6575;
  --color-deep: #0D2B33;
  --color-accent: #E07B5A;
  --color-accent-pale: #F0A68E;
  --color-base-light: #F5F7F8;
  --color-base-teal: #E8F0F3;
  --color-white: #FFFFFF;
  --color-text-on-light: #1A3A44;
  --color-text-on-dark: #E8F0F3;

  /* === カラーRGB分解値（rgba用） === */
  --brand-rgb: 73, 126, 146;
  --accent-rgb: 224, 123, 90;
  --deep-rgb: 13, 43, 51;
  --base-teal-rgb: 232, 240, 243;

  /* === タイポグラフィ === */
  --font-heading-en: 'Plus Jakarta Sans', sans-serif;
  --font-heading-ja: 'Zen Kaku Gothic New', sans-serif;
  --font-body-en: 'Inter', sans-serif;
  --font-body-ja: 'Noto Sans JP', sans-serif;

  /* === 角丸（3値のみ） === */
  --radius-sharp: 0px;     /* FAQ項目、引用カード */
  --radius-stone: 6px;     /* ボタン、機能カード、入力欄 */
  --radius-drop: 200px;    /* ステップ番号丸、アバター、タグ */

  /* === 有彩色シャドウ === */
  --shadow-card-light: 0 4px 24px rgba(73, 126, 146, 0.10);
  /* ティールブルー系。ライト背景上のカード */
  --shadow-card-dark: 0 4px 24px rgba(232, 240, 243, 0.06);
  /* ライトティール系。ダーク背景上のカード */
  --shadow-cta-light: 0 8px 32px rgba(224, 123, 90, 0.25);
  /* コーラル系。ライト背景上のCTAボタン */
  --shadow-cta-dark: 0 8px 40px rgba(224, 123, 90, 0.35);
  /* コーラル系。ダーク背景上のCTAボタン。blur拡大+opacity増 */
  --shadow-proof-glow: 0 0 60px rgba(73, 126, 146, 0.15);
  /* ティールブルー系。PROOFセクション数値の放射グロー */

  /* === ホバー時シャドウ === */
  --shadow-card-hover: 0 8px 40px rgba(73, 126, 146, 0.16);
  /* blur 24px→40px、opacity 0.10→0.16。リフト時に拡大 */
  --shadow-cta-hover-light: 0 12px 48px rgba(224, 123, 90, 0.30);
  /* blur 32px→48px、opacity 0.25→0.30 */
  --shadow-cta-hover-dark: 0 12px 56px rgba(224, 123, 90, 0.40);
  /* blur 40px→56px、opacity 0.35→0.40 */

  /* === トランジション === */
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  /* 入場アニメーション。水面に浮かび上がるような減速カーブ */
  --ease-hover: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  /* ホバー。即応答、自然減速 */
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-enter: 600ms;
  --duration-count: 1200ms;

  /* === レイアウト === */
  --max-width: 1200px;
  --container-padding: 40px;

  /* === セクション余白 === */
  --section-pad-sm: 48px;
  --section-pad-md: 100px;
  --section-pad-lg: 120px;
  --section-pad-xl: 160px;
}

/* モバイル変数上書き */
@media (max-width: 768px) {
  :root {
    --container-padding: 20px;
    --section-pad-sm: 32px;
    --section-pad-md: 64px;
    --section-pad-lg: 80px;
    --section-pad-xl: 100px;
  }
}
```

### グローバルリセットとベース

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body-ja);
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-text-on-light);
  background-color: var(--color-white);
}

::selection {
  background-color: rgba(73, 126, 146, 0.20);
  /* ブランドカラーのselection */
  color: var(--color-deep);
}

img, svg {
  display: block;
  max-width: 100%;
}

/* prefers-reduced-motion: 全アニメーション無効化 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### SVGノイズフィルター定義（グローバル）

```html
<svg width="0" height="0" style="position: absolute;">
  <filter id="noise-light">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0" />
  </filter>
  <filter id="noise-dark">
    <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0" />
  </filter>
</svg>
```

### Google Fonts読み込み

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Noto+Sans+JP:wght@400;500;700&family=Plus+Jakarta+Sans:wght@300;600;700;800&family=Zen+Kaku+Gothic+New:wght@500;700&display=swap" rel="stylesheet">
```

---

## 3. セクション1: SIGNAL（ヒーロー）

### 背景

```css
.signal {
  background-color: #FFFFFF;
  position: relative;
  overflow: hidden;
}

/* SVGノイズオーバーレイ */
.signal::before {
  content: '';
  position: absolute;
  inset: 0;
  filter: url(#noise-light);
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
}

/* アンビエントグロー（マウス追従） */
.signal__glow {
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 200px;
  /* 完全な円に近い */
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(73, 126, 146, 0.06) 0%,
    rgba(73, 126, 146, 0.02) 40%,
    transparent 70%
  );
  /* Linear実測: radial-gradient(50% 50%, rgba(255,255,255,0.04), transparent 90%) を
     UZOUティールブルーに変換。opacity 0.06。白背景上で視認下限の存在感 */
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
  transition: left 0.8s var(--ease-enter), top 0.8s var(--ease-enter);
  /* マウス追従のlag: 800ms。追従感を出しつつカクつきを防ぐ */
}
```

### タイポグラフィ

```css
.signal__brand-label {
  font-family: var(--font-heading-en);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  line-height: 1.0;
  color: var(--color-brand);
  text-transform: uppercase;
  margin-bottom: 32px;
  /* 「UZOU」ブランドラベル。letter-spacing +0.12emで精密機器の刻印感 */
}

.signal__heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--color-deep);
  margin-bottom: 32px;
  /* Linear実測: h1 64px / weight 510 / letter-spacing -0.022em / line-height 1.0
     UZOUは和文のため+0.2行間、weight 700（Zen Kaku Gothic Newは510非対応） */
}

.signal__subcopy {
  font-family: var(--font-body-ja);
  font-size: clamp(14px, 1.5vw, 17px);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.8;
  color: var(--color-text-on-light);
  opacity: 0.75;
  max-width: 480px;
  margin-bottom: 48px;
  /* Linear実測: サブコピー 24px / weight 400 / color rgb(208,214,224)(=ライトグレー) / line-height 1.33
     UZOUは白背景のため17px/opacity 0.75で同等のコントラスト比を確保 */
}
```

### レイアウト

```css
.signal__container {
  display: grid;
  grid-template-columns: 55% 45%;
  /* 左55%テキスト + 右45%Canvas */
  gap: 0;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 160px var(--container-padding) 0;
  /* paddingTop 160px。paddingBottom 0px（TRUSTED BYと地続き） */
  min-height: 100vh;
  align-items: center;
  position: relative;
  z-index: 2;
}

.signal__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* 左寄せ */
}

.signal__canvas-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 480px;
}
```

### アニメーション

```css
/* fadeInUp: 文字単位のスプリットアニメーション */
/* キャッチコピーの各文字に適用 */
.signal__heading .char {
  display: inline-block;
  opacity: 0;
  transform: translateY(24px);
  animation: fadeInUp var(--duration-enter) var(--ease-enter) forwards;
  /* stagger: 各文字にJSで animation-delay を 30ms ずつ加算 */
  /* 例: 1文字目 0ms, 2文字目 30ms, 3文字目 60ms ... */
}

/* サブコピーとCTAのfadeInUp */
.signal__subcopy,
.signal__cta-group {
  opacity: 0;
  transform: translateY(24px);
  animation: fadeInUp var(--duration-enter) var(--ease-enter) forwards;
}

.signal__subcopy {
  animation-delay: 400ms;
  /* キャッチコピー完了後に開始 */
}

.signal__cta-group {
  animation-delay: 600ms;
  /* サブコピーの200ms後 */
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Canvas ネットワークグラフ仕様

```javascript
/* Canvas 2D ネットワークグラフ パラメータ */
const NETWORK_CONFIG = {
  particleCount: 60,
  /* ノード数。60個で適度な密度 */
  connectionDistance: 120,
  /* px。この距離以内のノード間に接続線を描画 */
  particleSpeed: 0.3,
  /* px/frame。ゆっくりした漂流感 */
  particleSizeRange: [2, 5],
  /* px。最小2px〜最大5px */
  highlightCount: 4,
  /* コーラル色にハイライトするノード数 */
  highlightInterval: 3000,
  /* ms。ハイライトノードが切り替わる間隔 */

  colors: {
    node: 'rgba(73, 126, 146, 0.40)',
    /* --color-brand at 40% */
    nodeFill: 'rgba(73, 126, 146, 0.15)',
    connection: 'rgba(73, 126, 146, 0.08)',
    /* 接続線。極めて薄い */
    highlightNode: '#E07B5A',
    /* --color-accent。「見つけた」ノード */
    highlightConnection: 'rgba(224, 123, 90, 0.20)',
    /* ハイライトノード間の接続線 */
  },

  parallax: {
    factor: -0.12,
    /* スクロール連動。transform: translateY(calc(var(--scroll) * -0.12)) */
  },
};
```

### CTA ボタン（ヒーロー内）

```css
.signal__cta-group {
  display: flex;
  gap: 16px;
  align-items: center;
}

/* 主CTA: 資料をダウンロード */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body-ja);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.0;
  color: #FFFFFF;
  background: var(--color-accent);
  /* #E07B5A コーラル */
  background-size: 200% 100%;
  background-position: left center;
  padding: 18px 48px;
  border: none;
  border-radius: var(--radius-stone);
  /* 6px */
  box-shadow: var(--shadow-cta-light);
  /* 0 8px 32px rgba(224,123,90,0.25) */
  cursor: pointer;
  transition:
    background-position var(--duration-normal) var(--ease-hover),
    box-shadow var(--duration-normal) var(--ease-hover),
    transform var(--duration-fast) var(--ease-hover);
  text-decoration: none;
}

.btn-primary:hover {
  background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-deep) 100%);
  background-size: 200% 100%;
  background-position: right center;
  /* ワイプ: コーラル→ディープティールにスライド */
  box-shadow: var(--shadow-cta-hover-light);
  /* 0 12px 48px rgba(224,123,90,0.30) */
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-cta-light);
  /* 元に戻す */
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 4px;
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 副CTA: まずは相談する */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body-ja);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.0;
  color: var(--color-text-on-light);
  background: transparent;
  padding: 18px 48px;
  border: 1px solid rgba(26, 58, 68, 0.20);
  /* テキスト色の20%ボーダー */
  border-radius: var(--radius-stone);
  /* 6px */
  cursor: pointer;
  transition:
    border-color var(--duration-fast) var(--ease-hover),
    color var(--duration-fast) var(--ease-hover);
  text-decoration: none;
}

.btn-secondary:hover {
  border-color: var(--color-accent);
  /* #E07B5A */
  color: var(--color-accent);
}

.btn-secondary:active {
  opacity: 0.8;
}

.btn-secondary:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 4px;
}
```

### セクション境界

```css
/* SIGNAL → TRUSTED BY: 境界なし。地続き */
/* padding-bottom: 0px で直結 */
```

### レスポンシブ

```css
/* 768px: タブレット */
@media (max-width: 768px) {
  .signal__container {
    grid-template-columns: 1fr;
    /* 1カラムに変更 */
    padding: 120px var(--container-padding) 0;
    min-height: auto;
    gap: 48px;
  }

  .signal__heading {
    font-size: clamp(32px, 8vw, 48px);
    /* モバイル時は最大48px */
  }

  .signal__canvas-wrapper {
    min-height: 320px;
    order: -1;
    /* Canvasをテキストの上に配置 */
  }

  .signal__cta-group {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
    padding: 16px 32px;
  }
}

/* 375px: モバイル */
@media (max-width: 375px) {
  .signal__container {
    padding: 100px var(--container-padding) 0;
  }

  .signal__heading {
    font-size: 32px;
  }

  .signal__subcopy {
    font-size: 14px;
  }

  .signal__brand-label {
    font-size: 11px;
  }

  .signal__canvas-wrapper {
    min-height: 240px;
  }

  .btn-primary,
  .btn-secondary {
    font-size: 14px;
    padding: 14px 24px;
  }
}

/* タッチデバイス: ホバー無効化 */
@media (hover: none) {
  .btn-primary:hover {
    background: var(--color-accent);
    background-size: auto;
    background-position: initial;
    box-shadow: var(--shadow-cta-light);
    transform: none;
  }

  .btn-secondary:hover {
    border-color: rgba(26, 58, 68, 0.20);
    color: var(--color-text-on-light);
  }
}
```

---

## 4. セクション2: TRUSTED BY

### 背景

```css
.trusted-by {
  background-color: #FFFFFF;
  /* SIGNALと地続き */
  padding: 48px 0 0;
  /* paddingTop 48px / 下は遷移帯含めて計算 */
  position: relative;
}

/* 下部グラデーション遷移帯 */
.trusted-by__transition {
  height: 80px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F5F7F8 100%);
  /* ホワイト→アイスホワイトの微妙な遷移 */
  margin-top: 64px;
  /* paddingBottom相当 */
}
```

### タイポグラフィ

```css
.trusted-by__label {
  font-family: var(--font-heading-en);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  line-height: 1.0;
  color: var(--color-brand);
  /* #497E92 */
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 32px;
  padding: 0 var(--container-padding);
  /* 「TRUSTED BY 500+ MEDIA」 */
}
```

### レイアウト

```css
.trusted-by__marquee {
  display: flex;
  overflow: hidden;
  width: 100%;
  /* フルブリード */
}

.trusted-by__marquee-track {
  display: flex;
  align-items: center;
  gap: 64px;
  /* ロゴ間の間隔 */
  animation: marquee-scroll 35s linear infinite;
  /* 35秒で1サイクル */
  will-change: transform;
}

.trusted-by__logo {
  height: 24px;
  /* 全ロゴ高さ統一 */
  width: auto;
  flex-shrink: 0;
  opacity: 0.35;
  filter: grayscale(1);
  /* グレースケール化 */
  transition: opacity var(--duration-fast) var(--ease-hover);
}

.trusted-by__logo:hover {
  opacity: 0.70;
  /* hover時に視認性向上 */
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
    /* トラックを複製して無限ループ */
  }
}
```

### ロゴプレースホルダーSVG仕様

```svg
<!-- 各ロゴプレースホルダー: 矩形+テキスト -->
<svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="2" width="120" height="20" rx="0" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
  <text x="60" y="16" text-anchor="middle" fill="currentColor" font-family="Plus Jakarta Sans, sans-serif"
        font-size="10" font-weight="600" letter-spacing="0.08em">MEDIA NAME</text>
</svg>
<!-- currentColor で親のcolor(#1A3A44)を継承 -->
```

### アニメーション

```css
/* marqueeのみ。入場アニメーションなし */
/* prefers-reduced-motion対応はグローバルで処理済み */
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .trusted-by {
    padding: 32px 0 0;
  }

  .trusted-by__label {
    font-size: 10px;
    margin-bottom: 24px;
  }

  .trusted-by__marquee-track {
    gap: 48px;
  }

  .trusted-by__logo {
    height: 20px;
  }

  .trusted-by__transition {
    height: 60px;
    margin-top: 48px;
  }
}

@media (max-width: 375px) {
  .trusted-by__marquee-track {
    gap: 40px;
  }

  .trusted-by__logo {
    height: 18px;
  }
}

@media (hover: none) {
  .trusted-by__logo:hover {
    opacity: 0.35;
    /* タッチデバイスではホバー無効 */
  }
}
```

---

## 5. セクション3: NOISE

### 背景

```css
.noise {
  background-color: #F5F7F8;
  /* アイスホワイト */
  padding: 120px 0 120px;
  position: relative;
}

/* 下部遷移帯: アイスホワイト→ブランドカラー（SIFTへ） */
.noise__transition {
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(180deg, #F5F7F8 0%, #497E92 100%);
  z-index: 1;
}
```

### タイポグラフィ

```css
.noise__heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--color-deep);
  /* #0D2B33 */
  /* 「その広告、届いていますか。」 */
}

.noise__category-label {
  font-family: var(--font-heading-en);
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 600;
  letter-spacing: 0.10em;
  line-height: 1.0;
  color: var(--color-brand);
  /* #497E92 */
  text-transform: uppercase;
  margin-bottom: 24px;
  /* 「ADVERTISER」「MEDIA」のラベル */
}

.noise__category-title {
  font-family: var(--font-heading-ja);
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.4;
  color: var(--color-text-on-light);
  margin-bottom: 32px;
  /* 「届かない3つの理由」「活かせない3つの壁」 */
}

.noise__issue-title {
  font-family: var(--font-body-ja);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 1.6;
  color: var(--color-text-on-light);
  /* 各課題の見出し */
}

.noise__issue-body {
  font-family: var(--font-body-ja);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.7;
  color: var(--color-text-on-light);
  opacity: 0.70;
  /* 各課題の説明文 */
}
```

### レイアウト

```css
.noise__container {
  display: grid;
  grid-template-columns: 40% 1fr;
  /* 非対称グリッド: 左40%見出し / 右60%コンテンツ */
  gap: 80px;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  align-items: start;
}

.noise__sticky {
  position: sticky;
  top: 160px;
  /* ビューポート上部から160pxの位置で固定 */
}

.noise__content {
  display: flex;
  flex-direction: column;
  gap: 64px;
  /* 広告主セクションとメディアセクションの間隔 */
}

.noise__issue-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  /* 各課題間の間隔 */
}

.noise__issue-item {
  display: grid;
  grid-template-columns: 24px 1fr;
  /* アイコン + テキスト */
  gap: 16px;
  align-items: start;
}
```

### 課題アイコンSVG仕様

```svg
<!-- 共通属性: 24x24, stroke-based, 1.5px, round caps -->
<svg width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="#497E92" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- 個別パスはアイコンごとに定義 -->
</svg>
<!-- 6種類: 配信先不可視 / 中間コスト / 効果測定不透明 / 収益未最大化 / ブランド毀損 / 運用負荷 -->
<!-- 全てcurrentColorではなく直接#497E92指定（背景がライトのため） -->
```

### アニメーション

```css
/* slideInLeft: IntersectionObserverで発火 */
.noise__issue-item {
  opacity: 0;
  transform: translateX(-32px);
  transition: opacity var(--duration-slow) var(--ease-enter),
              transform var(--duration-slow) var(--ease-enter);
}

.noise__issue-item.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* stagger: JSで各.noise__issue-itemに transition-delay を 120ms ずつ加算 */
/* 例: 1番目 0ms, 2番目 120ms, 3番目 240ms */
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .noise__container {
    grid-template-columns: 1fr;
    /* 1カラム */
    gap: 48px;
  }

  .noise__sticky {
    position: static;
    /* sticky解除 */
  }

  .noise__heading {
    font-size: clamp(24px, 6vw, 32px);
  }

  .noise {
    padding: 80px 0;
  }
}

@media (max-width: 375px) {
  .noise__heading {
    font-size: 24px;
  }

  .noise__content {
    gap: 48px;
  }

  .noise__issue-list {
    gap: 24px;
  }
}
```

---

## 6. セクション4: SIFT

### 背景

```css
.sift {
  background: linear-gradient(180deg, #497E92 0%, #3A6575 100%);
  /* ブランドカラーの垂直グラデーション */
  /* KARTE実測: linear-gradient(rgb(42,171,159), rgb(18,160,160)) の構造を参考。
     明度差約15%のグラデーション */
  padding: 160px 0;
  position: relative;
  overflow: hidden;
}

/* 下部遷移帯: ティール暗→ホワイト（PROOFへ） */
.sift__transition {
  position: absolute;
  bottom: -120px;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(180deg, #3A6575 0%, #FFFFFF 100%);
  z-index: 1;
}

/* ノイズテクスチャ（ダーク用） */
.sift::after {
  content: '';
  position: absolute;
  inset: 0;
  filter: url(#noise-dark);
  opacity: 0.04;
  pointer-events: none;
  mix-blend-mode: overlay;
  /* overlay blendでテクスチャに深みを追加 */
}
```

### タイポグラフィ

```css
.sift__heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: #F5F7F8;
  /* ライト上テキスト色はアイスホワイト */
  text-align: center;
  margin-bottom: 24px;
  /* 「有象無象を、見極める。」 */
}

.sift__subcopy {
  font-family: var(--font-body-ja);
  font-size: clamp(14px, 1.5vw, 17px);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.8;
  color: #E8F0F3;
  /* ライトティール */
  opacity: 0.80;
  text-align: center;
  max-width: 640px;
  margin: 0 auto 80px;
  /* サブテキストと図解の間に80pxの余白 */
}
```

### レイアウト

```css
.sift__container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  position: relative;
  z-index: 2;
}

.sift__diagram {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  /* SVG図解を中央配置 */
}
```

### インタラクティブSVG図解仕様

```css
/* SVG図解のノード */
.sift__node {
  cursor: pointer;
  transition:
    fill var(--duration-fast) var(--ease-hover),
    stroke var(--duration-fast) var(--ease-hover),
    transform 400ms var(--ease-enter);
  /* scaleUpの入場アニメーション用 */
}

.sift__node--advertiser {
  fill: rgba(245, 247, 248, 0.10);
  /* 半透明の白。ブランドカラー背景上で浮かぶ */
  stroke: rgba(245, 247, 248, 0.30);
  stroke-width: 1px;
}

.sift__node--uzou {
  fill: rgba(245, 247, 248, 0.15);
  stroke: rgba(245, 247, 248, 0.50);
  stroke-width: 2px;
  /* 中央ノードは他より太い線で強調 */
}

.sift__node--media {
  fill: rgba(245, 247, 248, 0.10);
  stroke: rgba(245, 247, 248, 0.30);
  stroke-width: 1px;
}

/* ホバー時: コーラルに変化 */
.sift__node:hover {
  fill: rgba(224, 123, 90, 0.20);
  stroke: #E07B5A;
}

/* 接続線 */
.sift__connection {
  stroke: rgba(245, 247, 248, 0.15);
  stroke-width: 1px;
  fill: none;
}

/* ホバー時の接続線 */
.sift__node:hover ~ .sift__connection--active {
  stroke: rgba(224, 123, 90, 0.40);
  stroke-width: 2px;
}

/* 信号パルス（パスに沿って移動する小円） */
.sift__pulse {
  fill: #E07B5A;
  /* コーラル */
  r: 3px;
  opacity: 0.80;
  animation: pulse-move 3s linear infinite;
}

@keyframes pulse-move {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 0.80;
  }
  90% {
    opacity: 0.80;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}

/* ノード入場: scaleUp */
.sift__node {
  opacity: 0;
  transform-origin: center;
  transform: scale(0.85);
}

.sift__node.is-visible {
  opacity: 1;
  transform: scale(1);
  transition: opacity 400ms var(--ease-enter), transform 400ms var(--ease-enter);
}

/* stagger: JSで各ノードに transition-delay を 80ms ずつ加算 */
```

### ノードラベルのタイポグラフィ

```css
.sift__node-label {
  font-family: var(--font-body-ja);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0em;
  fill: #E8F0F3;
  text-anchor: middle;
  dominant-baseline: central;
}

.sift__node-label--uzou {
  font-family: var(--font-heading-en);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  fill: #F5F7F8;
  text-transform: uppercase;
}
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .sift {
    padding: 100px 0;
  }

  .sift__heading {
    font-size: clamp(28px, 7vw, 40px);
  }

  .sift__subcopy {
    margin-bottom: 48px;
  }

  .sift__diagram {
    /* モバイルではSVGの viewBox を調整して縦長レイアウトに変更 */
    /* 広告主群（上）→ UZOU AI（中央）→ メディア群（下）の縦配置 */
    max-width: 100%;
  }
}

@media (max-width: 375px) {
  .sift__heading {
    font-size: 28px;
  }

  .sift__subcopy {
    font-size: 14px;
  }
}
```

---

## 7. セクション5: PROOF

### 背景

```css
.proof {
  background-color: #FFFFFF;
  padding: 100px 0;
  position: relative;
}

/* 下部遷移帯: ホワイト→アイスホワイト（THREE SIGNALSへ） */
.proof__transition {
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F5F7F8 100%);
  z-index: 1;
}
```

### タイポグラフィ

```css
.proof__section-label {
  font-family: var(--font-heading-en);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  line-height: 1.0;
  color: var(--color-brand);
  /* #497E92 */
  text-transform: uppercase;
  margin-bottom: 64px;
  /* 左上配置。「PROOF」 */
}

.proof__number {
  font-family: var(--font-heading-en);
  font-size: clamp(56px, 11vw, 128px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.0;
  color: var(--color-deep);
  /* #0D2B33 */
  text-shadow: var(--shadow-proof-glow);
  /* 0 0 60px rgba(73,126,146,0.15)。ティールブルーの放射グロー */
  /* StartPass実測: 160px / weight 600 / line-height 1.0
     UZOUはmax 128px。weight 800（Plus Jakarta Sansの最大ウェイト） */
}

.proof__unit {
  font-family: var(--font-heading-en);
  font-size: clamp(24px, 4vw, 48px);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.0;
  color: var(--color-deep);
  /* 「+」「%」「x」などの単位。数値より軽いウェイトでコントラスト */
}

.proof__label {
  font-family: var(--font-heading-en);
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 600;
  letter-spacing: 0.12em;
  line-height: 1.5;
  color: var(--color-brand);
  opacity: 0.60;
  text-transform: uppercase;
  margin-top: 16px;
  /* 数値の下のラベル。「CONNECTED MEDIA」等 */
}
```

### レイアウト

```css
.proof__container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.proof__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 64px 48px;
  /* 不均一配置: 上段3つ + 下段右寄せ1つ */
}

.proof__item:nth-child(4) {
  grid-column: 3 / 4;
  /* 4番目の数値を右端に配置 */
}

.proof__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
```

### アニメーション

```javascript
/* countUp: requestAnimationFrameベース */
const COUNTUP_CONFIG = {
  duration: 1200,
  /* ms */
  easing: (t) => 1 - Math.pow(1 - t, 3),
  /* ease-out cubic。最初に勢いよく、最後に減速 */
  trigger: 'IntersectionObserver',
  /* threshold: 0.3。ビューポートに30%入ったら発火 */
  values: [
    { target: 500, suffix: '+', label: 'CONNECTED MEDIA' },
    { target: 90, suffix: '%+', label: 'RETENTION RATE' },
    { target: 4, suffix: 'x', label: 'REVENUE GROWTH' },
    { target: 250, suffix: '+', label: 'ACTIVE ADVERTISERS' },
  ],
};
/* 入場アニメーションなし（数字は「最初からそこにある事実」） */
/* countUpのみ IntersectionObserver で発火 */
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .proof__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 48px 32px;
  }

  .proof__item:nth-child(4) {
    grid-column: auto;
    /* 4番目のグリッド配置をリセット */
  }

  .proof__number {
    font-size: clamp(48px, 12vw, 72px);
  }

  .proof {
    padding: 64px 0;
  }
}

@media (max-width: 375px) {
  .proof__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .proof__number {
    font-size: 48px;
  }
}
```

---

## 8. セクション6: THREE SIGNALS

### 背景

```css
.three-signals {
  background-color: #F5F7F8;
  /* アイスホワイト */
  padding: 160px 0;
  position: relative;
}

/* 下部遷移帯: アイスホワイト→ライトティール（VOICESへ） */
.three-signals__transition {
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(180deg, #F5F7F8 0%, #E8F0F3 100%);
  z-index: 1;
}
```

### タイポグラフィ

```css
.three-signals__heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--color-deep);
  margin-bottom: 80px;
  /* 「UZOUが見つけ出す、3つのシグナル。」 */
}

.three-signals__number {
  font-family: var(--font-heading-en);
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.0;
  color: var(--color-brand);
  opacity: 0.12;
  /* 背景に大きく表示されるナンバリング。opacity 0.12で透かし効果 */
  position: absolute;
  top: 0;
  left: 0;
}

.three-signals__signal-heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.4;
  color: var(--color-deep);
  margin-bottom: 16px;
  /* 「AIが、最適解を見つけ出す。」 */
}

.three-signals__signal-body {
  font-family: var(--font-body-ja);
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.8;
  color: var(--color-text-on-light);
  opacity: 0.75;
  max-width: 440px;
}
```

### レイアウト

```css
.three-signals__container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.three-signals__list {
  display: flex;
  flex-direction: column;
  gap: 0;
  /* gap 0。区切り線で分割 */
}

.three-signals__signal {
  display: grid;
  grid-template-columns: 55% 45%;
  /* 左テキスト + 右SVG */
  gap: 48px;
  align-items: center;
  padding: 64px 0;
  position: relative;
  border-bottom: 1px solid rgba(26, 58, 68, 0.08);
  /* テキスト色の8%境界線 */
}

.three-signals__signal:first-child {
  border-top: 1px solid rgba(26, 58, 68, 0.08);
}

.three-signals__signal-text {
  position: relative;
  padding-left: 0;
  padding-top: 48px;
  /* ナンバリングの高さ分のオフセット */
}

.three-signals__signal-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.three-signals__signal-visual svg {
  width: 100%;
  max-width: 360px;
  height: auto;
}
```

### SVGイラスト仕様（3種）

```css
/* 共通スタイル: 幾何学的線画、ティールブルー基調 + コーラル差し色 */
.three-signals__illustration {
  /* Signal 01: ニューラルネットワーク図 — ノードと接続線の多層構造 */
  /* Signal 02: ネットワークノード図 — 500メディアを表す散布的なノード群 */
  /* Signal 03: ダッシュボード+人物シルエット — 伴走を表すヒューマン要素 */

  /* 共通属性 */
  stroke: var(--color-brand);
  /* #497E92 */
  stroke-width: 1.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

/* コーラルのアクセント要素（ハイライトノード、アクティブ接続等） */
.three-signals__illustration .accent {
  stroke: var(--color-accent);
  /* #E07B5A */
  fill: rgba(224, 123, 90, 0.10);
}

/* ティールブルーの塗り要素 */
.three-signals__illustration .fill-brand {
  fill: rgba(73, 126, 146, 0.08);
}
```

### アニメーション

```css
/* slideInLeft: IntersectionObserverで発火 */
.three-signals__signal {
  opacity: 0;
  transform: translateX(-32px);
  transition: opacity var(--duration-slow) var(--ease-enter),
              transform var(--duration-slow) var(--ease-enter);
}

.three-signals__signal.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* stagger: 各.three-signals__signalに transition-delay を 120ms ずつ加算 */
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .three-signals {
    padding: 100px 0;
  }

  .three-signals__heading {
    margin-bottom: 48px;
  }

  .three-signals__signal {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 48px 0;
  }

  .three-signals__signal-visual {
    order: -1;
    /* SVGをテキストの上に配置 */
  }

  .three-signals__signal-visual svg {
    max-width: 280px;
  }

  .three-signals__number {
    font-size: 48px;
  }
}

@media (max-width: 375px) {
  .three-signals__signal-heading {
    font-size: 20px;
  }

  .three-signals__signal-body {
    font-size: 14px;
  }
}
```

---

## 9. セクション7: VOICES

### 背景

```css
.voices {
  background-color: #E8F0F3;
  /* ライトティール */
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

/* 下部遷移帯: ライトティール→ホワイト（FLOWへ） */
.voices__transition {
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(180deg, #E8F0F3 0%, #FFFFFF 100%);
  z-index: 1;
}
```

### タイポグラフィ

```css
.voices__heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--color-deep);
  max-width: var(--max-width);
  margin: 0 auto 48px;
  padding: 0 var(--container-padding);
  /* 左寄せ。コンテナ幅に揃える */
  /* 「精度を証明する、声。」 */
}

.voices__card-quote-mark {
  font-family: var(--font-heading-en);
  font-size: 48px;
  font-weight: 300;
  line-height: 1.0;
  color: var(--color-accent-pale);
  /* #F0A68E。コーラル淡色 */
  opacity: 0.40;
  margin-bottom: 16px;
  /* 「"」引用符 */
}

.voices__card-text {
  font-family: var(--font-body-ja);
  font-size: clamp(15px, 1.5vw, 18px);
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 1.8;
  color: var(--color-text-on-light);
  margin-bottom: 24px;
}

.voices__card-company {
  font-family: var(--font-heading-en);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.4;
  color: var(--color-text-on-light);
  opacity: 0.60;
}

.voices__card-result {
  font-family: var(--font-heading-en);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.0;
  color: var(--color-brand);
  /* #497E92 */
  margin-top: 8px;
  /* 成果数値。「CTR 180%向上」等 */
}
```

### レイアウト

```css
.voices__marquee {
  display: flex;
  overflow: hidden;
  width: 100%;
  /* フルブリード */
}

.voices__marquee-track {
  display: flex;
  gap: 24px;
  /* カード間のギャップ */
  animation: marquee-scroll 45s linear infinite;
  /* 45秒で1サイクル。TRUSTED BYの35sより遅く、じっくり読ませる */
  will-change: transform;
}

.voices__card {
  flex-shrink: 0;
  width: 360px;
  background: #FFFFFF;
  border-radius: var(--radius-sharp);
  /* 0px。シャープな矩形 */
  padding: 32px 28px;
  box-shadow: var(--shadow-card-light);
  /* 0 4px 24px rgba(73,126,146,0.10) */
  transition:
    box-shadow var(--duration-normal) var(--ease-hover),
    transform var(--duration-normal) var(--ease-hover);
}

.voices__card:hover {
  box-shadow: var(--shadow-card-hover);
  /* 0 8px 40px rgba(73,126,146,0.16) */
  transform: translateY(-4px);
}
```

### アバターCSS仕様

```css
.voices__card-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-drop);
  /* 200px。完全な円 */
  margin-bottom: 16px;
}

/* 3色バリエーション（ティールブルー系グラデーション） */
.voices__card-avatar--1 {
  background: linear-gradient(135deg, #497E92 0%, #3A6575 100%);
}

.voices__card-avatar--2 {
  background: linear-gradient(135deg, #3A6575 0%, #0D2B33 100%);
}

.voices__card-avatar--3 {
  background: linear-gradient(135deg, #E8F0F3 0%, #497E92 100%);
}
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .voices {
    padding: 64px 0;
  }

  .voices__heading {
    margin-bottom: 32px;
  }

  .voices__card {
    width: 300px;
    padding: 24px 20px;
  }

  .voices__marquee-track {
    gap: 16px;
  }
}

@media (max-width: 375px) {
  .voices__card {
    width: 280px;
  }
}

@media (hover: none) {
  .voices__card:hover {
    box-shadow: var(--shadow-card-light);
    transform: none;
    /* タッチデバイスではホバー無効 */
  }
}
```

---

## 10. セクション8: FLOW

### 背景

```css
.flow {
  background-color: #FFFFFF;
  padding: 120px 0;
  position: relative;
}

/* 下部遷移帯: ホワイト→ディープティール（FIND YOUR SIGNALへ） */
.flow__transition {
  position: absolute;
  bottom: -120px;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(180deg, #FFFFFF 0%, #0D2B33 100%);
  z-index: 1;
}
```

### タイポグラフィ

```css
/* 導入の流れ */
.flow__heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--color-deep);
  margin-bottom: 64px;
  /* 「導入の流れ」 */
}

.flow__step-number {
  font-family: var(--font-heading-en);
  font-size: clamp(40px, 5vw, 56px);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.0;
  color: var(--color-deep);
  margin-bottom: 16px;
}

.flow__step-title {
  font-family: var(--font-heading-ja);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 1.4;
  color: var(--color-text-on-light);
  margin-bottom: 8px;
}

.flow__step-desc {
  font-family: var(--font-body-ja);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.6;
  color: var(--color-text-on-light);
  opacity: 0.60;
}

/* よくある質問 */
.flow__faq-heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--color-deep);
  /* 「よくある質問」 */
}

.flow__faq-question {
  font-family: var(--font-body-ja);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 1.6;
  color: var(--color-text-on-light);
}

.flow__faq-answer {
  font-family: var(--font-body-ja);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.7;
  color: var(--color-text-on-light);
  opacity: 0.70;
}
```

### レイアウト

```css
.flow__container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* === 導入の流れ === */
.flow__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 120px;
  /* FAQとの間に120pxの余白 */
  position: relative;
}

.flow__step {
  text-align: left;
  position: relative;
}

.flow__step-circle {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-drop);
  /* 200px */
  border: 2px solid var(--color-brand);
  /* #497E92 */
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

/* ステップ間の接続線（SVG） */
.flow__connection-line {
  position: absolute;
  top: 20px;
  /* circle中心 */
  left: 40px;
  /* circle右端 */
  width: calc(100% - 40px);
  height: 2px;
}

.flow__connection-line line {
  stroke: var(--color-brand);
  stroke-opacity: 0.20;
  stroke-width: 2px;
  stroke-dasharray: 6 4;
  /* 破線 */
}

/* === よくある質問 === */
.flow__faq {
  display: grid;
  grid-template-columns: 30% 1fr;
  /* 非対称: 左30%見出し / 右70%アコーディオン */
  gap: 80px;
  align-items: start;
}

.flow__faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.flow__faq-item {
  border-bottom: 1px solid rgba(26, 58, 68, 0.08);
  /* テキスト色の8%境界線 */
  border-radius: var(--radius-sharp);
  /* 0px */
}

.flow__faq-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-hover);
}

.flow__faq-item-header:hover {
  color: var(--color-brand);
}
```

### アコーディオン開閉

```css
.flow__faq-toggle {
  width: 24px;
  height: 24px;
  position: relative;
  flex-shrink: 0;
}

.flow__faq-toggle::before,
.flow__faq-toggle::after {
  content: '';
  position: absolute;
  background: var(--color-text-on-light);
  transition: transform var(--duration-normal) var(--ease-hover);
}

.flow__faq-toggle::before {
  /* 横棒 */
  width: 14px;
  height: 1.5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flow__faq-toggle::after {
  /* 縦棒（開閉で回転） */
  width: 1.5px;
  height: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
}

.flow__faq-item.is-open .flow__faq-toggle::after {
  transform: translate(-50%, -50%) rotate(90deg);
  /* +→- への変化 */
}

.flow__faq-item-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms var(--ease-hover);
  /* height animation 300ms */
}

.flow__faq-item.is-open .flow__faq-item-body {
  max-height: 400px;
  /* 十分な最大高さ */
}

.flow__faq-item-body-inner {
  padding: 0 0 24px 0;
}
```

### アニメーション

```css
/* FLOWセクションは入場アニメーションなし（安心感。即表示） */
/* 接続線のスクロール連動描画のみ */

.flow__connection-line line {
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 800ms var(--ease-enter);
}

.flow__connection-line.is-visible line {
  stroke-dashoffset: 0;
  /* スクロールで徐々に描画 */
}
```

### ホバー

```css
/* FAQ項目のボーダーカラー変化 */
.flow__faq-item:hover {
  border-bottom-color: var(--color-accent);
  /* rgba(26,58,68,0.08) → #E07B5A */
}

.flow__faq-item {
  transition: border-color var(--duration-fast) var(--ease-hover);
}
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .flow {
    padding: 80px 0;
  }

  .flow__steps {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    margin-bottom: 80px;
  }

  .flow__connection-line {
    display: none;
    /* モバイルでは接続線非表示 */
  }

  .flow__faq {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 375px) {
  .flow__steps {
    grid-template-columns: 1fr;
  }

  .flow__step-number {
    font-size: 40px;
  }
}
```

---

## 11. セクション9: FIND YOUR SIGNAL

### 背景

```css
.find-signal {
  background-color: #0D2B33;
  /* ディープティール */
  padding: 160px 0;
  position: relative;
  overflow: hidden;
}

/* ノイズテクスチャ（ダーク用） */
.find-signal::before {
  content: '';
  position: absolute;
  inset: 0;
  filter: url(#noise-dark);
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: overlay;
}

/* Canvas ネットワークグラフ（SIGNALと同じシステム、密度2倍） */
.find-signal__canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
}
```

### Canvas パラメータ（FIND YOUR SIGNAL版）

```javascript
/* SIGNALのNETWORK_CONFIGを継承し、以下のパラメータを上書き */
const FIND_SIGNAL_NETWORK_CONFIG = {
  ...NETWORK_CONFIG,
  particleCount: 120,
  /* 60 → 120。密度2倍 */
  connectionDistance: 100,
  /* 120 → 100。接続密度を上げるため閾値を狭める */
  highlightCount: 8,
  /* 4 → 8。コーラルハイライトノードを増やす */
  colors: {
    node: 'rgba(232, 240, 243, 0.25)',
    /* ダーク背景用。--color-base-teal at 25% */
    nodeFill: 'rgba(232, 240, 243, 0.08)',
    connection: 'rgba(232, 240, 243, 0.06)',
    highlightNode: '#E07B5A',
    highlightConnection: 'rgba(224, 123, 90, 0.15)',
  },
};
```

### タイポグラフィ

```css
.find-signal__heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(28px, 4.5vw, 56px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.3;
  color: #E8F0F3;
  /* --color-text-on-dark */
  text-align: center;
  margin-bottom: 24px;
  /* 「あなたのシグナルを、見つけよう。」 */
}

.find-signal__subcopy {
  font-family: var(--font-body-ja);
  font-size: clamp(14px, 1.5vw, 17px);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.8;
  color: #E8F0F3;
  opacity: 0.70;
  text-align: center;
  max-width: 560px;
  margin: 0 auto 48px;
}
```

### レイアウト

```css
.find-signal__container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 中央揃え */
}

.find-signal__cta-group {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
}
```

### CTA ボタン（ダーク背景上）

```css
/* 主CTA: ダーク背景上バージョン */
.find-signal .btn-primary {
  background: var(--color-accent);
  /* #E07B5A */
  color: #FFFFFF;
  box-shadow: var(--shadow-cta-dark);
  /* 0 8px 40px rgba(224,123,90,0.35) */
}

.find-signal .btn-primary:hover {
  box-shadow: var(--shadow-cta-hover-dark);
  /* 0 12px 56px rgba(224,123,90,0.40) */
  background: linear-gradient(90deg, var(--color-accent) 0%, #c96842 100%);
  /* コーラルの暗部にワイプ（ダーク背景ではディープティールではなくコーラル暗にする） */
  background-size: 200% 100%;
  background-position: right center;
  transform: translateY(-2px);
}

.find-signal .btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

/* 副CTA: ダーク背景上バージョン */
.find-signal .btn-secondary {
  color: #E8F0F3;
  border: 1px solid rgba(232, 240, 243, 0.30);
  /* ライトティールの30%ボーダー */
}

.find-signal .btn-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

### アニメーション

```css
/* fadeInUp（SIGNAL と FIND YOUR SIGNAL の2セクションのみ） */
.find-signal__heading,
.find-signal__subcopy,
.find-signal__cta-group {
  opacity: 0;
  transform: translateY(24px);
}

.find-signal__heading.is-visible,
.find-signal__subcopy.is-visible,
.find-signal__cta-group.is-visible {
  animation: fadeInUp var(--duration-enter) var(--ease-enter) forwards;
}

.find-signal__subcopy.is-visible {
  animation-delay: 200ms;
}

.find-signal__cta-group.is-visible {
  animation-delay: 400ms;
}
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .find-signal {
    padding: 100px 0;
  }

  .find-signal__heading {
    font-size: clamp(24px, 6vw, 36px);
  }

  .find-signal__cta-group {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .find-signal .btn-primary,
  .find-signal .btn-secondary {
    width: 100%;
    justify-content: center;
    padding: 16px 32px;
  }
}

@media (max-width: 375px) {
  .find-signal__heading {
    font-size: 24px;
  }

  .find-signal__subcopy {
    font-size: 14px;
  }

  .find-signal .btn-primary,
  .find-signal .btn-secondary {
    font-size: 14px;
    padding: 14px 24px;
  }
}

@media (hover: none) {
  .find-signal .btn-primary:hover {
    background: var(--color-accent);
    background-size: auto;
    background-position: initial;
    box-shadow: var(--shadow-cta-dark);
    transform: none;
  }

  .find-signal .btn-secondary:hover {
    border-color: rgba(232, 240, 243, 0.30);
    color: #E8F0F3;
  }
}
```

---

## 12. グローバルコンポーネント（ヘッダー、フッター、ボタン）

### ヘッダー

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 var(--container-padding);
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.85);
  /* 半透明白。スクロール時に背景をぼかす */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(26, 58, 68, 0.06);
  /* テキスト色の6%ボーダー */
  transition: background var(--duration-normal) var(--ease-hover),
              border-color var(--duration-normal) var(--ease-hover);
}

/* ダークセクション上でのヘッダー（FIND YOUR SIGNAL通過時） */
.header--dark {
  background: rgba(13, 43, 51, 0.85);
  border-bottom: 1px solid rgba(232, 240, 243, 0.08);
}

.header__logo {
  font-family: var(--font-heading-en);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-deep);
  text-decoration: none;
  text-transform: uppercase;
}

.header--dark .header__logo {
  color: #E8F0F3;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header__nav-link {
  font-family: var(--font-body-ja);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 1.0;
  color: var(--color-text-on-light);
  text-decoration: none;
  position: relative;
  transition: color var(--duration-fast) var(--ease-hover);
}

/* テキスト下線スライドホバー */
.header__nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: var(--color-accent);
  /* #E07B5A */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-fast) var(--ease-hover);
}

.header__nav-link:hover::after {
  transform: scaleX(1);
}

.header__nav-link:hover {
  color: var(--color-accent);
}

.header--dark .header__nav-link {
  color: #E8F0F3;
}

/* ヘッダーCTAボタン（小サイズ版） */
.header__cta {
  font-family: var(--font-body-ja);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.0;
  color: #FFFFFF;
  background: var(--color-accent);
  padding: 10px 24px;
  border-radius: var(--radius-stone);
  /* 6px */
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition:
    background var(--duration-fast) var(--ease-hover),
    box-shadow var(--duration-fast) var(--ease-hover);
  box-shadow: none;
}

.header__cta:hover {
  box-shadow: 0 4px 16px rgba(224, 123, 90, 0.20);
  /* コーラル系のシャドウ追加 */
}
```

### フッター

```css
.footer {
  background-color: #0D2B33;
  /* ディープティール。FIND YOUR SIGNALと地続き */
  padding: 64px 0 32px;
  color: #E8F0F3;
}

.footer__container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.footer__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
}

.footer__logo {
  font-family: var(--font-heading-en);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #E8F0F3;
  text-transform: uppercase;
  text-decoration: none;
}

.footer__links {
  display: flex;
  gap: 24px;
}

.footer__link {
  font-family: var(--font-body-ja);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.0;
  color: #E8F0F3;
  opacity: 0.50;
  text-decoration: none;
  transition: opacity var(--duration-fast) var(--ease-hover);
}

.footer__link:hover {
  opacity: 1.0;
}

.footer__divider {
  height: 1px;
  background: rgba(232, 240, 243, 0.10);
  margin-bottom: 24px;
}

.footer__copyright {
  font-family: var(--font-heading-en);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: #E8F0F3;
  opacity: 0.30;
}
```

### ボタン状態マトリクス（全状態一覧）

| 状態 | .btn-primary（ライト背景上） | .btn-primary（ダーク背景上） | .btn-secondary（ライト背景上） | .btn-secondary（ダーク背景上） |
|---|---|---|---|---|
| **default** | bg: `#E07B5A`, color: `#FFF`, shadow: `0 8px 32px rgba(224,123,90,0.25)`, border-radius: 6px | bg: `#E07B5A`, color: `#FFF`, shadow: `0 8px 40px rgba(224,123,90,0.35)` | bg: transparent, color: `#1A3A44`, border: `1px solid rgba(26,58,68,0.20)` | bg: transparent, color: `#E8F0F3`, border: `1px solid rgba(232,240,243,0.30)` |
| **hover** | bg: gradient(`#E07B5A` → `#0D2B33`), shadow: `0 12px 48px rgba(224,123,90,0.30)`, translateY(-2px) | bg: gradient(`#E07B5A` → `#c96842`), shadow: `0 12px 56px rgba(224,123,90,0.40)`, translateY(-2px) | border-color: `#E07B5A`, color: `#E07B5A` | border-color: `#E07B5A`, color: `#E07B5A` |
| **active** | translateY(0), shadow: default | translateY(0), shadow: default | opacity: 0.8 | opacity: 0.8 |
| **focus-visible** | outline: `2px solid #497E92`, offset: 4px | outline: `2px solid #E07B5A`, offset: 4px | outline: `2px solid #497E92`, offset: 4px | outline: `2px solid #E07B5A`, offset: 4px |
| **disabled** | opacity: 0.4, cursor: not-allowed, shadow: none, transform: none | 同左 | opacity: 0.4, cursor: not-allowed | 同左 |

### マイクロインタラクション一覧

| インタラクション | トリガー | 変化するプロパティ | duration | easing |
|---|---|---|---|---|
| 主CTAホバー | mouseenter | background-position, box-shadow, transform | 300ms / 300ms / 200ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| 主CTAプレス | mousedown | transform(translateY(0)), box-shadow(default) | 100ms | ease-out |
| 副CTAホバー | mouseenter | border-color, color | 200ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| カードホバー | mouseenter | box-shadow(blur拡大), transform(translateY(-4px)) | 250ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| ナビリンクホバー | mouseenter | color, ::after scaleX(0→1) | 200ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| FAQ開閉 | click | max-height(0→400px), ::after rotate(0→90deg) | 300ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| FAQボーダーホバー | mouseenter | border-bottom-color | 200ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| ロゴホバー | mouseenter | opacity(0.35→0.70) | 200ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

---

## 13. レスポンシブ設計

### ブレークポイント定義

| ブレークポイント | 対象 | コンテナpadding | max-width |
|---|---|---|---|
| 1440px+ | デスクトップ | 40px | 1200px |
| 769px〜1439px | タブレット〜小デスクトップ | 32px | 100% |
| 768px | タブレット | 20px | 100% |
| 375px | モバイル | 20px | 100% |

### タイプスケール レスポンシブ対応

| 要素 | Desktop (1440px) | Tablet (768px) | Mobile (375px) | weight | letter-spacing | line-height |
|---|---|---|---|---|---|---|
| キャッチコピー（SIGNAL） | 72px | 48px | 32px | 700 | -0.03em | 1.2 |
| H2（NOISE, THREE SIGNALS等） | 40px | 32px | 24px | 700 | -0.02em | 1.3 |
| H2（SIFT） | 64px | 40px | 28px | 700 | -0.03em | 1.2 |
| H2（FIND YOUR SIGNAL） | 56px | 36px | 24px | 700 | -0.03em | 1.3 |
| H3（THREE SIGNALS） | 28px | 24px | 20px | 500 | -0.01em | 1.4 |
| 数値（PROOF） | 128px | 72px | 48px | 800 | -0.04em | 1.0 |
| ナンバリング大（THREE SIGNALS） | 72px | 48px | 48px | 300 | -0.02em | 1.0 |
| ステップ番号（FLOW） | 56px | 48px | 40px | 300 | -0.02em | 1.0 |
| サブコピー | 17px | 15px | 14px | 400 | 0.02em | 1.8 |
| 本文 | 15px | 14px | 14px | 400 | 0.01em | 1.7 |
| ラベル（TRUSTED BY等） | 11px | 10px | 10px | 600 | 0.15em | 1.0 |
| ボタン | 15px | 14px | 14px | 600 | 0.02em | 1.0 |

### グリッドレスポンシブ変更一覧

| セクション | Desktop | Tablet (768px) | Mobile (375px) |
|---|---|---|---|
| SIGNAL | `grid: 55% 45%` | `grid: 1fr`（Canvas上、テキスト下） | 同Tablet |
| NOISE | `grid: 40% 1fr` | `grid: 1fr`（sticky解除） | 同Tablet |
| PROOF | `grid: repeat(3,1fr)` + 4th右寄せ | `grid: repeat(2,1fr)` | `grid: 1fr` |
| THREE SIGNALS | `grid: 55% 45%` | `grid: 1fr`（SVG上、テキスト下） | 同Tablet |
| FLOW Steps | `grid: repeat(4,1fr)` | `grid: repeat(2,1fr)` | `grid: 1fr` |
| FLOW FAQ | `grid: 30% 1fr` | `grid: 1fr` | 同Tablet |

### タッチデバイス対応

```css
@media (hover: none) {
  /* 全ホバーエフェクトを無効化 */
  .btn-primary:hover,
  .btn-secondary:hover,
  .voices__card:hover,
  .trusted-by__logo:hover,
  .header__nav-link:hover,
  .header__nav-link:hover::after,
  .flow__faq-item:hover {
    /* 各要素のdefault状態を維持 */
  }
}

/* タップターゲット最小サイズ */
.btn-primary,
.btn-secondary,
.header__cta,
.header__nav-link,
.flow__faq-item-header {
  min-height: 44px;
  /* iOS HIG準拠 */
}
```

### パフォーマンス最適化

```css
/* GPU合成レイヤー指定 */
.signal__glow,
.trusted-by__marquee-track,
.voices__marquee-track,
.find-signal__canvas {
  will-change: transform;
}

/* Canvas / SVG animation のレイヤー分離 */
.signal__canvas-wrapper canvas,
.find-signal__canvas canvas {
  will-change: contents;
}

/* アニメーション対象はtransform + opacityのみ（レイアウトトリガー回避） */
/* width, height, margin, padding のアニメーションは一切使用しない */
/* 例外: FAQ の max-height（overflow: hidden での高さ変化は許容） */
```

---

## IntersectionObserver 設定

```javascript
/* 全セクションのアニメーション発火を管理 */
const OBSERVER_CONFIG = {
  threshold: 0.15,
  /* ビューポートに15%入ったら発火 */
  rootMargin: '0px 0px -50px 0px',
  /* 下方向に50pxのマージン。画面下部に入る少し前に発火 */
};

/* PROOF セクションのcountUp発火 */
const PROOF_OBSERVER_CONFIG = {
  threshold: 0.30,
  /* 30%可視時に発火 */
  rootMargin: '0px',
};

/* セクションごとのアニメーション対象 */
const ANIMATION_TARGETS = {
  signal: ['.signal__heading .char', '.signal__subcopy', '.signal__cta-group'],
  noise: ['.noise__issue-item'],
  sift: ['.sift__node'],
  proof: ['.proof__number'],
  threeSignals: ['.three-signals__signal'],
  findSignal: ['.find-signal__heading', '.find-signal__subcopy', '.find-signal__cta-group'],
  flow: ['.flow__connection-line'],
};
```

---

## 守るべきルール チェックリスト（lp-builder向け）

- [ ] ブランドカラー `#497E92` がSIFTセクション背景、アイコン色、アクセントとして中心的に使用されている
- [ ] カラーパレット7色以内（`#497E92`, `#3A6575`, `#0D2B33`, `#E07B5A`, `#F5F7F8`, `#E8F0F3`, `#1A3A44`）
- [ ] 全シャドウが有彩色（`rgba(0,0,0,x)` / `rgba(128,128,128,x)` のグレー系シャドウがゼロ）
- [ ] fadeInUpはSIGNALとFIND YOUR SIGNALの2セクションのみ
- [ ] 中央揃えはSIFTとFIND YOUR SIGNALの2セクションのみ
- [ ] border-radiusは `0px` / `6px` / `200px` の3値のみ
- [ ] `prefers-reduced-motion` で全アニメーション無効化
- [ ] WCAG AA コントラスト準拠
- [ ] Vanilla HTML/CSS/JS のみ（CDN/フレームワーク不使用）
- [ ] v10のモチーフ（回路パターン、パルスグロー）が一切含まれていない
- [ ] 「収穫」コンセプト要素（農業メタファー、ディープフォレスト、ハーベストオレンジ、DM Serif Display）が一切含まれていない
- [ ] アニメーション種別6種以内（fadeInUp, slideInLeft, scaleUp, countUp, marquee, parallax）
- [ ] フォントファミリー4種（Plus Jakarta Sans, Inter, Zen Kaku Gothic New, Noto Sans JP）
- [ ] 装飾パターン4種以内（Canvas ネットワーク, ノイズテクスチャ, SVG図解, グラデーション遷移）
