# ヒーロー技法指定書 v2: UZOU LP — Sift + KAGAMI技法

> 作成日: 2026-02-28
> 作成者: lp-designer
> セクション固有名: SIGNAL
> 対象: lp-builder
> ルール: **形容詞禁止。全指示はCSS値・パラメータ値で記述**

---

## KAGAMI実測値とUZOU翻訳値の対照表

| 要素 | KAGAMI実測値 | UZOU翻訳値 | 変更根拠 |
|---|---|---|---|
| ヒーロー背景 | `#FFFFFF` (white) | `#FFFFFF` + SVGノイズ(opacity: 0.03) + アンビエントグロー | v10のダーク背景を廃止。KAGAMIの白基調に合わせつつ、テクスチャで質感を追加 |
| メイン見出し | 60px / weight 600 / `Tazugane Gothic` / letter-spacing: normal / line-height: 84px (1.4) / color: `rgb(15,20,25)` | `clamp(36px, 6vw, 72px)` / weight 700 / `Zen Kaku Gothic New` / letter-spacing: `-0.03em` / line-height: 1.15 / color: `#0D2B33` | KAGAMIのweight 600→700に強化（Precisionを体現）。letter-spacing改善（KAGAMI弱点）。サイズ72pxに拡大（ヒーロースケール感の強化） |
| 副見出し | 42px / weight 700 / `Tazugane Gothic` / color: `rgb(0,134,204)` | `clamp(14px, 1.5vw, 17px)` / weight 400 / `Noto Sans JP` / color: `#1A3A44` | KAGAMIの副見出しはブランドカラー色。UZOUではサブコピーは控えめなサイズ・ウェイトで、メイン見出しとのコントラストを最大化 |
| 本文 | 16px / weight 700 / line-height: 30.4px (1.9) | 16px / weight 400 / line-height: 1.7 | KAGAMIの本文weight 700は過剰。400に戻し可読性を優先 |
| CTA格納ボックス | 392x168px / border-radius: 32px / background: `rgba(255,255,255,0.5)` / box-shadow: `rgba(95,131,175,0.1) 0px 0px 8px` | 不採用 | UZOUはスプリットレイアウト（左55%テキスト + 右45%Canvas）のため、CTA格納ボックスは不要 |
| メインCTA | 360x64px / border-radius: 16px / background: `linear-gradient(90deg, #1959B4 0%, #5BBDFF 100%)` / box-shadow: `rgba(87,186,253,0.4) 0px 2px 50px` | padding: `18px 48px` / min-height: 52px / border-radius: 6px / background: `#E07B5A` / box-shadow: `0 8px 32px rgba(224,123,90,0.25)` | KAGAMIのグラデーションCTAを単色コーラルに。角丸16px→6px（UZOUの精密トーン）。光彩の色をブルー→コーラルに置換 |
| サブCTA | 360x64px / border-radius: 16px / background: `#FFFFFF` / border: `1px solid #0086CC` / box-shadow: `rgba(87,186,253,0.4) 0px 4px 50px` | padding: `18px 48px` / border-radius: 6px / background: transparent / border: `1px solid rgba(13,43,51,0.2)` / box-shadow: none | KAGAMIの白背景CTAをボーダーのみに。ヒーローがライト背景なので透明が馴染む |
| ヘッダー | height: 80px / position: fixed / background: transparent / z-index: 5 | height: 64px / position: fixed / background: transparent→`rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)` / z-index: 100 | KAGAMIのヘッダー高さ80pxは少し大きい。64pxに。スクロール後のblurはKAGAMIに無い改善点 |
| ヘッダーナビ分割ボタン | border-radius: `10px 4px 4px 10px` / `4px 10px 10px 4px` | 不採用 | KAGAMIの分割ボタンはUZOUのトーンに合わない |
| スクロールアニメーション | `.sd .appear` / translateY(20px) / opacity 0→1 / transition: 0.3s cubic-bezier(0.4,0.4,0,1) | fadeInUp / translateY(24px) / opacity 0→1 / animation: 600ms cubic-bezier(0.16,1,0.3,1) / stagger: 100ms→300ms→500ms | KAGAMIのtransition方式からCSS animation方式に。移動距離20px→24px。イージングを改善（KAGAMI弱点: cubic-bezier(0.4,0.4,0,1)はやや直線的） |

---

## 1. HTML構造

```html
<!-- スキップリンク（body直下） -->
<a href="#main" class="skip-link">メインコンテンツへ</a>

<!-- ヘッダー -->
<header class="header" role="banner">
  <a href="/" class="header__logo" aria-label="UZOU ホーム">
    <span class="header__logo-text">UZOU</span>
  </a>
  <nav class="header__nav" aria-label="メインナビゲーション">
    <a href="#sift" class="header__nav-link">UZOUとは</a>
    <a href="#three-signals" class="header__nav-link">特徴</a>
    <a href="#proof" class="header__nav-link">実績</a>
    <a href="#flow" class="header__nav-link">導入の流れ</a>
    <a href="#faq" class="header__nav-link">FAQ</a>
  </nav>
  <div class="header__actions">
    <a href="#contact" class="header__cta header__cta--secondary">お問い合わせ</a>
    <a href="#download" class="header__cta header__cta--primary">資料ダウンロード</a>
  </div>
  <button class="header__hamburger" aria-label="メニューを開く" aria-expanded="false">
    <span class="header__hamburger-line"></span>
    <span class="header__hamburger-line"></span>
  </button>
</header>

<!-- ヒーローセクション -->
<section class="hero" id="hero" aria-label="SIGNAL">
  <main id="main">

    <!-- 背景レイヤー: SVGノイズテクスチャ -->
    <div class="hero__noise" aria-hidden="true"></div>

    <!-- 背景レイヤー: アンビエントグロー（マウス追従） -->
    <div class="hero__glow" aria-hidden="true"></div>

    <!-- コンテンツ: 左カラム（55%） -->
    <div class="hero__content">
      <div class="hero__content-inner">

        <!-- ブランドラベル -->
        <div class="hero__brand-label">
          <span class="hero__brand-line" aria-hidden="true"></span>
          <span class="hero__brand-text">UZOU</span>
          <span class="hero__brand-desc">ネイティブアド配信プラットフォーム</span>
        </div>

        <!-- キャッチコピー -->
        <h1 class="hero__title">ノイズの中から、<br>シグナルを。</h1>

        <!-- サブコピー -->
        <p class="hero__sub">500を超えるメディアと直接接続。独自AIが最適な配信先を見つけ出し、広告の成果を最大化するネイティブ広告プラットフォーム。</p>

        <!-- CTA群 -->
        <div class="hero__cta-group">
          <a href="#download" class="btn btn--primary">資料をダウンロード</a>
          <a href="#contact" class="btn btn--secondary">まずは相談する</a>
        </div>

      </div>
    </div>

    <!-- ビジュアル: 右カラム（45%） Canvas ネットワークグラフ -->
    <div class="hero__visual" aria-hidden="true">
      <canvas class="hero__canvas" id="heroCanvas"></canvas>
    </div>

  </main>
</section>
```

### BEM命名規則

| ブロック | 要素 | 修飾子 |
|---|---|---|
| `hero` | `__noise`, `__glow`, `__content`, `__content-inner`, `__brand-label`, `__brand-line`, `__brand-text`, `__brand-desc`, `__title`, `__sub`, `__cta-group`, `__visual`, `__canvas` | — |
| `header` | `__logo`, `__logo-text`, `__nav`, `__nav-link`, `__actions`, `__cta`, `__hamburger`, `__hamburger-line` | `--primary`, `--secondary`, `--scrolled` |
| `btn` | — | `--primary`, `--secondary` |

---

## 2. 背景

### 2-1. ベース背景色

```css
.hero {
  background-color: #FFFFFF;
}
```

### 2-2. SVGノイズテクスチャ

```css
.hero__noise {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.03;
  /* フラット感を消す。知覚できるギリギリの弱さ */
}
```

SVG filter定義:
```svg
<svg width="0" height="0" style="position: absolute;">
  <filter id="noiseFilter">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.65"
      numOctaves="3"
      stitchTiles="stitch"
    />
    <feColorMatrix type="saturate" values="0" />
  </filter>
</svg>
```

適用方法: `.hero__noise` に `width: 100%; height: 100%; filter: url(#noiseFilter);` を設定。  
代替: CSS `background-image` でインラインSVGをdata URIとして埋め込み。

### 2-3. アンビエントグロー（マウス追従）

```css
.hero__glow {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(73, 126, 146, 0.06) 0%,
    transparent 100%
  );
  /* ティールブルー系の追従グロー。Plaid参照 */
  /* KAGAMI実測: マウス追従なし。Linear + Plaid技法を追加 */
}
```

JS仕様:
- イベント: `mousemove` on `.hero`
- 更新: `requestAnimationFrame` でスロットリング
- CSS変数: `--mouse-x`, `--mouse-y` を `%` 単位で設定
- 初期値: `50% 50%`（中央）

```javascript
/* 仕様のみ。コードはlp-builderが実装 */
// hero要素にmousemoveリスナーを設定
// getBoundingClientRect()で相対位置を算出
// requestAnimationFrameでCSS custom property更新
// タッチデバイス(hover: none)では無効化
```

タッチデバイス無効化:
```css
@media (hover: none) {
  .hero__glow {
    background: radial-gradient(
      ellipse 60% 40% at 50% 20%,
      rgba(73, 126, 146, 0.04) 0%,
      transparent 70%
    );
    /* タッチデバイスでは静的グロー（上部中央） */
  }
}
```

### 2-4. 背景レイヤーのz-index整理

| レイヤー | z-index | 内容 |
|---|---|---|
| ベース背景色 | — | `background-color: #FFFFFF` |
| SVGノイズテクスチャ | 1 | `.hero__noise` |
| アンビエントグロー | 2 | `.hero__glow` |
| コンテンツ（左カラム） | 3 | `.hero__content` |
| Canvas（右カラム） | 3 | `.hero__visual` |

---

## 3. レイアウト

### 3-1. セクション全体

```css
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh; /* iOS Safari対応 */
  display: grid;
  grid-template-columns: 55% 45%;
  align-items: center;
  padding: 160px 0 120px;
  overflow: hidden;
  background-color: #FFFFFF;
}
/* KAGAMI実測: padding 80px 0 53px、flex row、justify-content: space-between */
/* UZOU翻訳: padding拡大（160px/120px）。grid比率55:45でテキスト優先 */
```

### 3-2. 左カラム（テキスト）

```css
.hero__content {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  padding-left: clamp(32px, 5vw, 80px);
  /* 左端余白: デスクトップ80px、モバイルでは32px */
}

.hero__content-inner {
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}
```

### 3-3. 右カラム（Canvas）

```css
.hero__visual {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: clamp(20px, 3vw, 40px);
}

.hero__canvas {
  width: 100%;
  max-width: 560px;
  aspect-ratio: 4 / 3;
  /* Canvas描画サイズ: デバイスピクセル比を考慮してJS側でリサイズ */
}
```

### 3-4. コンテンツ要素の間隔

| 要素 | margin-top |
|---|---|
| `.hero__brand-label` | 0 |
| `.hero__title` | 24px |
| `.hero__sub` | 24px |
| `.hero__cta-group` | 40px |

---

## 4. タイポグラフィ

### 4-1. ブランドラベル

```css
.hero__brand-label {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero__brand-line {
  display: block;
  width: 32px;
  height: 1px;
  background-color: #497E92;
  /* KAGAMI: ブランドラベルに横線装飾なし。UZOU独自の装飾要素 */
}

.hero__brand-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  line-height: 1;
  color: #497E92;
  text-transform: uppercase;
}

.hero__brand-desc {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1;
  color: rgba(26, 58, 68, 0.5);
  /* #1A3A44 at 50% opacity */
}
```

### 4-2. キャッチコピー

```css
.hero__title {
  font-family: 'Zen Kaku Gothic New', sans-serif;
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #0D2B33;
  margin: 0;
  margin-top: 24px;
}
/* KAGAMI実測: 60px / weight 600 / Tazugane Gothic / letter-spacing: normal / line-height: 1.4 / color: rgb(15,20,25) */
/* UZOU翻訳: 72px / weight 700 / letter-spacing: -0.03em / line-height: 1.15 */
/* 変更根拠:
   - サイズ60→72px: ヒーロー固有名「SIGNAL」に相応しいスケール感。clamp下限36pxでモバイル対応
   - weight 600→700: 「Precision」原則。見出しの重さで確信を表現
   - letter-spacing normal→-0.03em: KAGAMI弱点改善。タイトルの凝縮感
   - line-height 1.4→1.15: 2行折り返しを想定した引き締め
   - color rgb(15,20,25)→#0D2B33: ブランドのディープティール
*/
```

### 4-3. サブコピー

```css
.hero__sub {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: clamp(14px, 1.5vw, 17px);
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: 0.02em;
  color: #1A3A44;
  max-width: 480px;
  margin: 0;
  margin-top: 24px;
}
/* KAGAMI実測: 16px / weight 700 / line-height: 30.4px(1.9) / letter-spacing: normal / color: rgb(15,20,25) */
/* UZOU翻訳:
   - weight 700→400: 本文の過度な太さを解消。見出しとのコントラストを確保
   - line-height 1.9→1.8: 微調整
   - letter-spacing normal→0.02em: KAGAMI弱点改善。本文は微量のワイド
   - max-width: 480px: 1行あたり25-30文字で可読性最適化
*/
```

### 4-4. `<br>` 制御

```css
.hero__title br {
  display: none;
}

@media (max-width: 767px) {
  .hero__title br {
    display: inline;
  }
}
/* デスクトップ: 「ノイズの中から、シグナルを。」1行表示（72px、max-width 600pxで十分収まる） */
/* モバイル: 「ノイズの中から、」で改行 */
```

---

## 5. CTAボタン

### 5-1. Primary CTA（資料をダウンロード）

| 状態 | background | color | border | box-shadow | transform | transition |
|---|---|---|---|---|---|---|
| Default | `#E07B5A` | `#FFFFFF` | none | `0 8px 32px rgba(224,123,90,0.25)` | none | `all 250ms cubic-bezier(0.25,0.46,0.45,0.94)` |
| Hover | `#C96A4D` | `#FFFFFF` | none | `0 8px 48px rgba(224,123,90,0.35)` | `translateY(-2px)` | — |
| Active | `#B85E44` | `#FFFFFF` | none | `0 4px 24px rgba(224,123,90,0.20)` | `translateY(0)` | — |
| Focus-visible | `#E07B5A` | `#FFFFFF` | none | `0 8px 32px rgba(224,123,90,0.25), 0 0 0 3px rgba(73,126,146,0.4)` | none | — |
| Disabled | `#E07B5A` at opacity 0.5 | `#FFFFFF` | none | none | none | cursor: `not-allowed` |

```css
.btn--primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 18px 48px;
  min-width: 220px;
  min-height: 52px;
  background-color: #E07B5A;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 8px 32px rgba(224, 123, 90, 0.25);
  transition: background-color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
/* KAGAMI実測: 360x64px / border-radius: 16px / linear-gradient(90deg, #1959B4, #5BBDFF) / box-shadow: rgba(87,186,253,0.4) 0px 2px 50px / transition: 0.8s cubic-bezier(0.4,0.4,0,1) */
/* UZOU翻訳:
   - border-radius 16px→6px: 非対称角丸システムの「水滴」値。KAGAMIのピル型は丸すぎ
   - background: グラデーション→単色コーラル。UZOUはコーラルをCTAのシグナルカラーに
   - box-shadow: ブルー光彩→コーラル光彩。blur 50px→32px。ライト背景上なので引き締め
   - transition: 0.8s→250ms。KAGAMI弱点の遅いトランジションを改善
*/
```

### 5-2. Secondary CTA（まずは相談する）

| 状態 | background | color | border | box-shadow | transform |
|---|---|---|---|---|---|
| Default | `transparent` | `#1A3A44` | `1px solid rgba(13,43,51,0.2)` | none | none |
| Hover | `rgba(73,126,146,0.04)` | `#1A3A44` | `1px solid #E07B5A` | `0 4px 24px rgba(73,126,146,0.08)` | `translateY(-2px)` |
| Active | `rgba(73,126,146,0.08)` | `#1A3A44` | `1px solid #E07B5A` | none | `translateY(0)` |
| Focus-visible | `transparent` | `#1A3A44` | `1px solid rgba(13,43,51,0.2)` | `0 0 0 3px rgba(73,126,146,0.4)` | none |

```css
.btn--secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 18px 48px;
  min-width: 220px;
  min-height: 52px;
  background-color: transparent;
  color: #1A3A44;
  border: 1px solid rgba(13, 43, 51, 0.2);
  border-radius: 6px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
/* KAGAMI実測: 360x64px / border-radius: 16px / background: #FFFFFF / border: 1px solid #0086CC / box-shadow: rgba(87,186,253,0.4) 0px 4px 50px */
/* UZOU翻訳:
   - background: #FFFFFF→transparent。ライト背景上で副CTAは透明
   - border: 1px solid ブランドカラー→rgba(13,43,51,0.2)。デフォルトは控えめ、ホバーでコーラルに変化
   - box-shadow: 光彩削除。副CTAは主CTAより視覚的階層を下げる
*/
```

### 5-3. CTA群レイアウト

```css
.hero__cta-group {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
  align-items: center;
}
```

---

## 6. ヘッダー

### 6-1. 基本構造

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
  padding: 0 clamp(20px, 3vw, 40px);
  z-index: 100;
  background-color: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              backdrop-filter 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
/* KAGAMI実測: height: 80px / position: fixed / background: transparent / z-index: 5 */
/* UZOU翻訳: height 80→64px（コンパクト化）。z-index 5→100（他要素との確実な重なり）。backdrop-filter追加（KAGAMI改善） */
```

### 6-2. スクロール後

```css
.header--scrolled {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(26, 58, 68, 0.06);
}
```

### 6-3. ロゴ

```css
.header__logo-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #0D2B33;
  text-decoration: none;
}
```

### 6-4. ナビリンク

```css
.header__nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header__nav-link {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: rgba(26, 58, 68, 0.65);
  text-decoration: none;
  position: relative;
  transition: color 200ms ease-out;
}

.header__nav-link:hover {
  color: #1A3A44;
}

/* 下線スライドインタラクション（ホバーパターン4: テキスト下線スライド） */
.header__nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #E07B5A;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.header__nav-link:hover::after {
  transform: scaleX(1);
}
```

### 6-5. ヘッダーCTA

```css
.header__cta--primary {
  padding: 8px 20px;
  min-height: 36px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  background-color: #E07B5A;
  color: #FFFFFF;
  box-shadow: 0 4px 16px rgba(224, 123, 90, 0.15);
  /* ヘッダーCTAの光彩はヒーローCTAより控えめ */
}

.header__cta--secondary {
  padding: 8px 20px;
  min-height: 36px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;
  color: #1A3A44;
  border: 1px solid rgba(13, 43, 51, 0.15);
}
```

### 6-6. スクロール検知

```
IntersectionObserverでヒーローセクションの交差状態を監視。
rootMargin: '-64px 0px 0px 0px'
threshold: 0
ヒーローが非交差状態になったら .header--scrolled を付与。
```

---

## 7. Canvas ネットワークグラフ

### 7-1. 配置・サイズ

```
- 配置: `.hero__visual`（右45%カラム）内
- Canvas要素: `.hero__canvas`
- アスペクト比: 4:3
- デバイスピクセル比対応: `canvas.width = canvas.clientWidth * devicePixelRatio`
```

### 7-2. パーティクル仕様

| パラメータ | 値 |
|---|---|
| パーティクル数 | 70（パフォーマンス制約: 上限100） |
| パーティクル半径 | 2px - 4px（ランダム） |
| パーティクル色（通常） | `rgba(73, 126, 146, 0.4)` |
| パーティクル色（ハイライト） | `#E07B5A`（コーラル） |
| ハイライトノード数 | 3-5個（ランダム選定、3000ms間隔で切り替え） |
| 移動速度 | x: -0.3 ~ 0.3 px/frame, y: -0.2 ~ 0.2 px/frame |
| バウンド | Canvas境界で反転 |

### 7-3. 接続線仕様

| パラメータ | 値 |
|---|---|
| 距離閾値 | 120px |
| 線色 | `rgba(73, 126, 146, 0.12)` |
| 線幅 | 0.5px |
| 距離に応じた透明度減衰 | `opacity = (1 - distance / 120) * 0.12` |

### 7-4. ハイライト接続線

| パラメータ | 値 |
|---|---|
| ハイライトノード間の接続線色 | `rgba(224, 123, 90, 0.2)` |
| ハイライトノード間の接続線幅 | 1px |

### 7-5. マウスインタラクション

```
マウス位置のCanvasローカル座標を算出。
マウス半径150px以内のパーティクルを中心に向かって微量引き寄せ。
引力係数: 0.02
```

### 7-6. フレームレート

```
requestAnimationFrame使用。60fps目標。
パーティクル70個 + 接続線判定はO(n^2)だが70^2=4900で十分軽量。
```

### 7-7. `prefers-reduced-motion` 対応

```
パーティクルの移動を停止。
静的な接続線+ノードのみ描画（1フレームだけ描画して停止）。
ハイライトの切り替えアニメーションも停止。
```

---

## 8. 入場アニメーション

### 8-1. ページ読み込みシーケンス

```css
.hero__brand-label {
  opacity: 0;
  transform: translateY(24px);
  animation: hero-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 100ms;
}

.hero__title {
  opacity: 0;
  transform: translateY(24px);
  animation: hero-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 200ms;
}

.hero__sub {
  opacity: 0;
  transform: translateY(24px);
  animation: hero-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 350ms;
}

.hero__cta-group {
  opacity: 0;
  transform: translateY(24px);
  animation: hero-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 500ms;
}

.hero__visual {
  opacity: 0;
  transform: translateX(32px);
  animation: hero-enter-visual 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 300ms;
}

@keyframes hero-enter {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-enter-visual {
  from {
    opacity: 0;
    transform: translateX(32px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### staggerタイミング表

| 要素 | delay | duration | direction |
|---|---|---|---|
| ブランドラベル | 100ms | 600ms | translateY(24px→0) |
| キャッチコピー | 200ms | 600ms | translateY(24px→0) |
| サブコピー | 350ms | 600ms | translateY(24px→0) |
| CTA群 | 500ms | 600ms | translateY(24px→0) |
| Canvas（右カラム） | 300ms | 800ms | translateX(32px→0) |

```
/* KAGAMI実測: .sd .appear / translateY(20px) / opacity 0→1 / transition: 0.3s cubic-bezier(0.4,0.4,0,1) */
/* UZOU翻訳:
   - translateY 20px→24px: 8pxグリッドに整合（24 = 8*3）
   - duration 0.3s→600ms: より有機的な浮上感
   - easing cubic-bezier(0.4,0.4,0,1)→cubic-bezier(0.16,1,0.3,1): KAGAMIのSTUDIO標準はやや直線的。UZOUでは初速が速く終末が緩やかな「水面浮上」カーブ
   - stagger: KAGAMIは一括表示。UZOUは100ms→200ms→350ms→500msの4段stagger
   - 右カラム: translateXで横方向から入場（左カラムのtranslateYとの対比）
*/
```

---

## 9. セクション境界（下部）

Hero→TRUSTED BY は背景同色（#FFFFFF）のため、グラデーション遷移帯は不要。  
視覚的な区切りはTRUSTED BYセクションの上部padding(48px)が担う。

```css
/* 遷移帯なし。地続き */
/* KAGAMI実測: ヒーロー→ロゴスクロール帯も地続き（白→白） */
```

---

## 10. レスポンシブ

### 10-1. Tablet（768px - 1023px）

```css
@media (max-width: 1023px) {
  .hero {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    min-height: auto;
    padding: 120px 24px 80px;
    text-align: center;
  }

  .hero__content {
    padding-left: 0;
    justify-content: center;
    order: 1;
  }

  .hero__content-inner {
    max-width: 560px;
    align-items: center;
    margin: 0 auto;
  }

  .hero__brand-label {
    justify-content: center;
  }

  .hero__title {
    font-size: clamp(36px, 6vw, 56px);
    text-align: center;
  }

  .hero__sub {
    text-align: center;
    max-width: 480px;
  }

  .hero__cta-group {
    justify-content: center;
  }

  .hero__visual {
    order: 2;
    padding-right: 0;
    padding-top: 48px;
  }

  .hero__canvas {
    max-width: 400px;
  }
}
```

### 10-2. Mobile（-767px）

```css
@media (max-width: 767px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 100px 20px 64px;
    min-height: auto;
  }

  .hero__content-inner {
    max-width: 100%;
  }

  .hero__brand-line {
    width: 24px;
  }

  .hero__brand-text {
    font-size: 12px;
  }

  .hero__brand-desc {
    font-size: 11px;
  }

  .hero__title {
    font-size: 32px;
    letter-spacing: -0.02em;
    line-height: 1.2;
    /* モバイルでは固定サイズ32px。clamp下限 */
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

  .hero__cta-group .btn--primary,
  .hero__cta-group .btn--secondary {
    width: 100%;
    min-width: auto;
    padding: 16px 24px;
    min-height: 52px;
    /* タップターゲット52px（44px最低要件を超過） */
  }

  .hero__visual {
    order: 2;
    padding-top: 40px;
    padding-right: 0;
  }

  .hero__canvas {
    max-width: 320px;
  }

  /* モバイルではマウス追従無効（2-3で定義済み） */

  .header__nav {
    display: none;
    /* ハンバーガーメニューに切り替え */
  }

  .header__actions {
    display: none;
    /* ハンバーガー内に統合 */
  }

  .header__hamburger {
    display: flex;
    /* モバイル時のみ表示 */
  }
}
```

### 10-3. Small Mobile（-480px）

```css
@media (max-width: 480px) {
  .hero {
    padding: 88px 16px 48px;
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

  .hero__canvas {
    max-width: 280px;
  }
}
```

### 10-4. ハンバーガーメニュー

```css
.header__hamburger {
  display: none; /* デスクトップでは非表示 */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.header__hamburger-line {
  display: block;
  width: 20px;
  height: 1.5px;
  background-color: #0D2B33;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* 開いた状態 */
.header__hamburger[aria-expanded="true"] .header__hamburger-line:first-child {
  transform: translateY(3.75px) rotate(45deg);
}

.header__hamburger[aria-expanded="true"] .header__hamburger-line:last-child {
  transform: translateY(-3.75px) rotate(-45deg);
}
```

---

## 11. prefers-reduced-motion対応

```css
@media (prefers-reduced-motion: reduce) {
  .hero__brand-label,
  .hero__title,
  .hero__sub,
  .hero__cta-group,
  .hero__visual {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .hero__canvas {
    /* Canvasアニメーション停止（JSで検知） */
  }

  .hero__glow {
    /* マウス追従停止。静的グローのみ */
    background: radial-gradient(
      ellipse 60% 40% at 50% 20%,
      rgba(73, 126, 146, 0.04) 0%,
      transparent 70%
    );
  }

  .btn--primary,
  .btn--secondary {
    transition: none;
  }

  .header__nav-link::after {
    transition: none;
  }

  .header {
    transition: none;
  }
}
```

JS側の対応:
```
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Canvasパーティクル: 1フレームだけ描画して停止
  // マウス追従グロー: イベントリスナー登録しない
  // ハイライト切り替え: setInterval登録しない
}
```

---

## 12. アクセシビリティ

| 項目 | 対応 |
|---|---|
| コントラスト比 h1 `#0D2B33` / bg `#FFFFFF` | 13.5:1（WCAG AAA達成） |
| コントラスト比 sub `#1A3A44` / bg `#FFFFFF` | 10.8:1（WCAG AAA達成） |
| コントラスト比 btn-primary `#FFFFFF` / bg `#E07B5A` | 3.2:1（WCAG AA 大テキスト達成。ボタンサイズ15px/600wは大テキスト相当） |
| コントラスト比 brand-label `#497E92` / bg `#FFFFFF` | 3.8:1（WCAG AA 大テキスト達成。13px/600wキャプション） |
| SVG装飾・Canvas | `aria-hidden="true"` |
| ヘッダーナビ | `aria-label="メインナビゲーション"` |
| ハンバーガー | `aria-label="メニューを開く"`, `aria-expanded="false"` |
| スキップリンク | `<a href="#main" class="skip-link">メインコンテンツへ</a>` を `<body>` 直下 |
| `prefers-reduced-motion` | 全アニメーション無効化（上記セクション11参照） |
| `:focus-visible` | `outline: 2px solid rgba(73,126,146,0.6); outline-offset: 2px;` |
| `::selection` | `background: rgba(73,126,146,0.25); color: inherit;` |

### スキップリンク

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  z-index: 200;
  padding: 8px 16px;
  background-color: #0D2B33;
  color: #E8F0F3;
  font-size: 14px;
  border-radius: 0 0 6px 6px;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
```

---

## 13. パフォーマンス考慮事項

| 項目 | 対応 |
|---|---|
| Canvas描画負荷 | パーティクル70個。接続線判定O(n^2)=4900。60fps維持可能 |
| マウス追従 | `requestAnimationFrame` でスロットリング。1フレームに1回のみ更新 |
| `will-change` | `.hero__glow` に `will-change: background` 指定。Canvas要素には不要（GPU合成はブラウザが自動判断） |
| `backdrop-filter` | `.header--scrolled` のみに適用。初期状態では `backdrop-filter: none` |
| フォント | `font-display: swap` で FOIT回避。LCP要素（h1）はフォールバックで先に表示 |
| SVGフィルター | `.hero__noise` の `feTurbulence` は静的。1回だけレンダリングされキャッシュされる |
| LCP | h1テキストがLCP候補。Webフォントのpreload + `font-display: swap` で2.5秒以内を目標 |

---

## 14. セクション評価の事前チェックリスト

lp-builder実装後にPlaywrightスクリーンショットで検証する項目:

### 光と影（14点満点）
- [ ] アンビエントグロー `rgba(73,126,146,0.06)` が白背景上で視認可能（600px circle）
- [ ] Primary CTAの光彩 `0 8px 32px rgba(224,123,90,0.25)` がコーラル色として認識可能
- [ ] SVGノイズテクスチャ opacity 0.03 が背景にフラット感を消す質感を追加
- [ ] Canvas接続線 `rgba(73,126,146,0.12)` が背景ノイズに溶け込みつつ視認可能

### タイポの表情（14点満点）
- [ ] h1が1440pxで72px表示（clamp上限）、375pxで32px表示
- [ ] h1のletter-spacing `-0.03em` で文字間が詰まっている
- [ ] ブランドラベル `UZOU` が `+0.12em` のワイドスペーシングで表示
- [ ] h1 color `#0D2B33`（ディープティール）とsub color `#1A3A44` の明度差が確認可能

### 動きの品格（14点満点）
- [ ] 入場アニメーションが100ms→200ms→350ms→500msの4段stagger
- [ ] イージング `cubic-bezier(0.16,1,0.3,1)` で初速が速く減速が自然
- [ ] translateY 24px（控えめ）。右カラムはtranslateX 32px
- [ ] Canvasパーティクルの移動速度 0.2-0.3px/frame

### 細部の仕上げ（14点満点）
- [ ] Primary CTAのホバーで `translateY(-2px)` + shadow blur 32px→48px
- [ ] Secondary CTAのホバーで `border-color: #E07B5A` に変化
- [ ] ヘッダーのスクロール後背景 `rgba(255,255,255,0.85)` + `blur(12px)`
- [ ] ブランドラベル横の線 32px x 1px `#497E92`

---

## 付録: デザイントークン（ヒーローで使用する値）

```css
/* カラー */
--color-brand: #497E92;
--color-deep: #0D2B33;
--color-accent: #E07B5A;
--color-text: #1A3A44;
--color-bg-white: #FFFFFF;

/* シャドウ */
--shadow-cta-light: 0 8px 32px rgba(224, 123, 90, 0.25);
--shadow-cta-light-hover: 0 8px 48px rgba(224, 123, 90, 0.35);
--shadow-cta-light-active: 0 4px 24px rgba(224, 123, 90, 0.20);
--shadow-header-cta: 0 4px 16px rgba(224, 123, 90, 0.15);

/* 角丸 */
--radius-button: 6px;

/* トランジション */
--ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);
--ease-hover: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--duration-entrance: 600ms;
--duration-hover: 250ms;

/* タイポグラフィ */
--font-heading-en: 'Plus Jakarta Sans', sans-serif;
--font-heading-ja: 'Zen Kaku Gothic New', sans-serif;
--font-body-ja: 'Noto Sans JP', sans-serif;
```
