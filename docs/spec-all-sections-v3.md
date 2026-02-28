# 全セクション技法指定書 v3: UZOU LP — Sift + KAGAMI技法全面適用

> 作成日: 2026-02-28
> 準拠: visual-sequence-v3.md / concept-v2.md / kagami-deep-analysis.md
> lp-builderへの指示書。形容詞禁止。全値CSS/パラメータで記述。

---

## 共通仕様（全セクション適用）

### デザイントークン追加・変更（:rootに追記）

```css
/* v3 非対称角丸（v2の8px 32pxから変更） */
--radius-flow-right: 6px 24px 24px 6px;
--radius-flow-left: 24px 6px 6px 24px;

/* v3 影の追加 */
--shadow-card-double-outer: 0 4px 24px rgba(73, 126, 146, 0.08);
--shadow-card-double-inner: 0 2px 12px rgba(73, 126, 146, 0.06);
--shadow-cta-dark-v3: 0 8px 48px rgba(224, 123, 90, 0.35);
--shadow-cta-dark-hover-v3: 0 12px 56px rgba(224, 123, 90, 0.45);

/* v3 本文line-height引き上げ */
--lh-body: 2.0;       /* v2: 1.7-1.8 → v3: 2.0。KAGAMI実測2.2に近づける */
--lh-heading: 1.25;   /* 見出しは逆に締める */
--lh-sub: 1.8;        /* サブコピー */
```

### ブランド装飾: セクションドットアイコン

全セクション見出し（NOISE, SIFT, PROOF, THREE SIGNALS, VOICES, FLOW）に統一適用。

```html
<div class="section-dot" aria-hidden="true"></div>
```

```css
.section-dot {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: rgba(73, 126, 146, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.section-dot::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--color-brand);
}
/* ダーク背景上 */
[data-theme="dark"] .section-dot {
  background: rgba(245, 247, 248, 0.12);
}
[data-theme="dark"] .section-dot::after {
  background: var(--color-base-teal);
}
```

### 本文line-height変更（全セクション）

```css
/* 全体に適用 */
body {
  line-height: var(--lh-body); /* 1.7 → 2.0 */
}
```

影響範囲:
- `.noise__issue-body`: `line-height: 2.0` (was 1.7)
- `.three-signals__signal-body`: `line-height: 2.0` (was 1.8)
- `.voices__card-text`: `line-height: 2.0` (was 1.8)
- `.flow__timeline-desc`: `line-height: 2.0` (was 1.7)
- `.flow__faq-answer`: `line-height: 2.0` (was 1.7)

---

## セクション 1: SIGNAL（ヒーロー）

### 改修点のみ（基本構造は維持）

#### 変更1: タイトルline-height引き締め

```css
.hero__title {
  line-height: 1.15; /* 維持 → 1.10に変更 */
  line-height: 1.10;
}
```

#### 変更2: サブコピーline-height引き上げ

```css
.hero__sub {
  line-height: 2.0; /* was 1.8 */
}
```

#### 変更3: CTAボタンのbox-shadow blur拡大

```css
.btn--primary {
  box-shadow: 0 8px 32px rgba(224, 123, 90, 0.25); /* 維持 */
}
/* ホバー時のblurを拡大 */
.btn--primary:hover {
  box-shadow: 0 12px 48px rgba(224, 123, 90, 0.35); /* was: 0 8px 48px */
  /* offset-yを8→12pxに。浮遊感の強調 */
}
```

#### 変更4: ブランドラベルにドットアイコン追加

```
現在: ─── UZOU ネイティブアド配信プラットフォーム
変更: [■] ─── UZOU ネイティブアド配信プラットフォーム
```

HTML: `.hero__brand-label`の先頭に`.section-dot`を追加

---

## セクション 2: TRUSTED BY

### 改修点のみ

#### 変更1: padding-bottom削除

```css
.trusted-by {
  padding: 48px 0 0; /* 維持。bottom: 0 */
}
```

#### 変更2: 遷移帯のmargin-top調整

```css
.trusted-by__transition {
  height: 80px; /* 維持 */
  margin-top: 48px; /* was 64px → 48pxに短縮。Trust帯とNOISEの間隔を詰める */
}
```

#### 変更3: ロゴopacity微調整

```css
.trusted-by__logo {
  opacity: 0.30; /* was 0.35 → 0.30。背景に更に溶け込ませる */
}
.trusted-by__logo:hover {
  opacity: 0.55; /* was 0.6 → 0.55 */
}
```

---

## セクション 3: NOISE（課題提起） — 全面改修

### 前セクションとの関係
- TRUSTED BYの遷移帯80pxで`#FFFFFF`→`#F5F7F8`にフェード
- 色変化により「ここから本題」を示す
- padding-top: 120px（v2維持）

### レイアウト構成（ASCII図解）

```
|←─── 1200px (max-width) ───→|
|                              |
|  ┌─ 38% ─┐  80px  ┌─ 62% ─┐|
|  │ H2     │  gap   │ CARDS  │|
|  │ sticky │        │        │|
|  │ top:160│        │ ADV    │|
|  │        │        │ ┌────┐ │|
|  │        │        │ │card│ │|  ← 2重カード構造（KAGAMI技法）
|  │        │        │ └────┘ │|
|  │        │        │        │|
|  │        │        │ MEDIA  │|
|  │        │        │ ┌────┐ │|
|  │        │        │ │card│ │|
|  │        │        │ └────┘ │|
|  └────────┘        └────────┘|
```

### 背景

```css
.noise {
  background:
    radial-gradient(ellipse 60% 40% at 80% 20%, rgba(73, 126, 146, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 20% 80%, rgba(181, 82, 46, 0.02) 0%, transparent 50%),
    #F5F7F8;
  padding: 120px 0 120px;
  position: relative;
}
```

### レイアウト変更

```css
.noise__container {
  display: grid;
  grid-template-columns: 38% 1fr; /* was 40% → 38%。見出しカラムを更に狭く */
  gap: 80px; /* 維持 */
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  align-items: start;
}
```

### 見出しにドットアイコン追加

```html
<div class="noise__sticky">
  <div class="noise__heading-row">
    <div class="section-dot" aria-hidden="true"></div>
    <h2 class="noise__heading">その広告、<br>届いていますか。</h2>
  </div>
</div>
```

```css
.noise__heading-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.noise__heading-row .section-dot {
  margin-top: 8px; /* 見出しテキストのベースラインに合わせる */
}
```

### 2重カード構造導入（KAGAMI技法 #7）

```
v2: カード = 1重（background: rgba(255,255,255,0.6)）
v3: 外枠 → 内枠 の2重構造
```

```css
/* 外枠カード（カテゴリ単位） */
.noise__category-card {
  background: rgba(255, 255, 255, 0.50);
  border-radius: var(--radius-flow-left); /* 24px 6px 6px 24px。広告主=左から流れる */
  padding: 32px;
  box-shadow: var(--shadow-card-double-outer); /* 0 4px 24px rgba(73,126,146,0.08) */
}
/* メディア側は逆方向 */
.noise__category-card--media {
  border-radius: var(--radius-flow-right); /* 6px 24px 24px 6px */
}

/* 内枠（個別課題アイテム） */
.noise__issue-item {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 16px;
  align-items: start;
  background: rgba(255, 255, 255, 0.65); /* was 0.6 → 外枠との差0.15 */
  padding: 20px;
  border-radius: 6px; /* 内枠は均一角丸。外枠との階層差 */
  box-shadow: var(--shadow-card-double-inner); /* 0 2px 12px rgba(73,126,146,0.06) */
  /* 入場アニメーション */
  opacity: 0;
  transform: translateX(-24px);
  transition: opacity 500ms var(--ease-entrance),
              transform 500ms var(--ease-entrance);
}
.noise__issue-item.is-visible {
  opacity: 1;
  transform: translateX(0);
}
```

### 課題アイテムのline-height

```css
.noise__issue-body {
  line-height: 2.0; /* was 1.7 */
  font-size: 14px;
  color: var(--color-text-muted);
}
```

### カテゴリラベル位置変更

```css
.noise__category-label {
  margin-bottom: 16px; /* was 24px → 16px。ラベルとタイトルを近づける */
}
.noise__category-title {
  margin-bottom: 24px; /* was 32px → 24px。タイトルとカードリストを近づける */
}
```

### 装飾ポリゴン削除

```css
.noise__polygon-deco {
  display: none; /* v3: 削除。非対称角丸カードが装飾として機能するため不要 */
}
```

### 遷移帯 v3

```css
.noise__transition {
  position: absolute;
  bottom: -120px;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(180deg, #F5F7F8 0%, #6A9AAB 50%, #497E92 100%);
  /* v2: #F5F7F8 → #B8CDD5 → #3E7080 の2段。v3: 中間色を#6A9AABに変更 */
  z-index: 1;
}
```

### アニメーション

| 要素 | animation | trigger |
|---|---|---|
| `.noise__category-card` | `opacity: 0→1`, `translateX(-32px)→0`, 500ms, `cubic-bezier(0.16,1,0.3,1)` | IntersectionObserver threshold: 0.15 |
| `.noise__issue-item` | `opacity: 0→1`, `translateX(-24px)→0`, 500ms, `cubic-bezier(0.16,1,0.3,1)`, stagger: 120ms | 親`.category-card`がvisibleになった後 |

### レスポンシブ

```css
@media (max-width: 768px) {
  .noise {
    padding: 80px 0;
  }
  .noise__container {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .noise__sticky {
    position: static;
  }
  .noise__category-card {
    border-radius: 6px 18px 18px 6px; /* 非対称を維持するが小さく */
    padding: 24px;
  }
  .noise__category-card--media {
    border-radius: 18px 6px 6px 18px;
  }
}
@media (max-width: 375px) {
  .noise__category-card {
    padding: 16px;
    border-radius: 4px 12px 12px 4px;
  }
  .noise__category-card--media {
    border-radius: 12px 4px 4px 12px;
  }
}
```

---

## セクション 4: SIFT（核心価値）

### 前セクションとの関係
- NOISE遷移帯120pxで`#F5F7F8`→`#6A9AAB`→`#497E92`の2段階フェード
- ページ唯一のカラーセクション。「ここが核心」を色で示す
- padding-top: 160px（v2維持）

### 背景（維持 + 微調整）

```css
.sift {
  background:
    radial-gradient(ellipse 50% 50% at 30% 70%, rgba(73, 126, 146, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 70% 30%, rgba(181, 82, 46, 0.05) 0%, transparent 50%),
    linear-gradient(180deg, #497E92 0%, #3A6575 100%); /* v2は#3E7080→#3A6575。v3はコンセプト色に統一 */
  padding: 160px 0;
}
```

### 見出しにドットアイコン追加（中央配置）

```css
.sift__heading-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
```

### テキストグラデーション（維持）

```css
.sift__heading {
  background: linear-gradient(90deg, #F5F7F8 0%, #C8DCE3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* フォールバック */
  color: #F5F7F8;
}
```

### SVGノード角丸変更

```css
.sift__node--advertiser rect,
.sift__node--media rect {
  rx: 6;
  ry: 24;  /* v2: rx=6。v3: 非対称角丸をSVG rectにも適用 */
}
.sift__node--uzou rect {
  rx: 6;
  ry: 24;
}
```

HTML変更: SVG内の`<rect>`の`rx`属性を`rx="6" ry="24"`に変更。

### ガラスモーフィズムカード（v3微調整）

SIFTセクション内にサブカード（図解下の説明カード等）がある場合:

```css
.sift__glass-card {
  background: rgba(255, 255, 255, 0.08); /* was 0.12 → 0.08。更に透かす */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-flow-right);
  box-shadow: 0 4px 24px rgba(0, 20, 30, 0.15);
  padding: 32px;
}
.sift__glass-card:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 8px 32px rgba(0, 20, 30, 0.20);
}
```

### サブコピーline-height

```css
.sift__subcopy {
  line-height: 2.0; /* was 1.8 */
}
```

### 遷移帯 v3

```css
.sift__transition {
  height: 120px;
  background: linear-gradient(180deg, #3A6575 0%, #9AB5C0 50%, #FFFFFF 100%);
  /* v2: #3A6575→#FFFFFF の1段。v3: 中間色#9AB5C0を挿入 */
}
```

---

## セクション 5: PROOF（数値実績）

### 前セクションとの関係
- SIFT遷移帯120pxで`#3A6575`→`#9AB5C0`→`#FFFFFF`の2段階明転
- ティールからの急転で「事実に戻る」印象
- padding: **80px** top/bottom（v2: 100px → v3: 80px。数字は余白を絞って密度を上げる）

### レイアウト変更: 非均一4列

```
v2:
|── 25% ──|── 25% ──|── 25% ──|── 25% ──|
| 500+     | 90%+    | 4x      | 250+    |

v3:
|──── auto ────|── auto ──|── auto ──|
| 500+          | 90%+     | 4x       |
|                          |── auto ──|
|                          | 250+     |
```

```css
.proof {
  padding: 80px 0 80px; /* was 100px 0 80px */
}

.proof__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 48px 64px; /* was: grid 4等分。v3: flexで自然な幅配置 */
  align-items: baseline;
}

.proof__item {
  flex: 0 0 auto; /* 自然幅 */
}
/* 4つ目の数値を右寄せ */
.proof__item:nth-child(4) {
  margin-left: auto;
}
```

### 見出しにドットアイコン追加

```html
<div class="proof__heading-row">
  <div class="section-dot" aria-hidden="true"></div>
  <p class="proof__section-label">PROOF</p>
</div>
```

```css
.proof__heading-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 64px;
}
```

### 数値のtext-shadow微調整

```css
.proof__number {
  text-shadow:
    0 0 60px rgba(73, 126, 146, 0.25),   /* was 0.30 → 0.25 */
    0 4px 20px rgba(73, 126, 146, 0.12),  /* was 0.15 → 0.12 */
    0 0 120px rgba(73, 126, 146, 0.08);   /* was 0.10 → 0.08 */
  /* 全体的にopacityを下げ、数字本体の可読性を優先 */
}
```

### 装飾ポリゴン削除

```css
.proof__polygon-deco {
  display: none; /* v3: 削除。ドットパターン背景で十分 */
}
```

### ドットパターンのサイズ微調整

```css
.proof::after {
  background-image: radial-gradient(circle, rgba(73, 126, 146, 0.035) 1px, transparent 1px);
  background-size: 28px 28px; /* was 32px → 28px。密度を少し上げる */
}
```

### 遷移帯 v3

```css
.proof__transition {
  height: 80px; /* was 120px → 80px。PROOF→THREE SIGNALSは色差が小さいため */
  background: linear-gradient(180deg, #FFFFFF 0%, #F5F7F8 100%);
  /* v2: #FFFFFF→rgba→#080E12。v3: THREE SIGNALSがライト背景になったためシンプルに */
}
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .proof {
    padding: 64px 0;
  }
  .proof__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 48px 32px;
  }
  .proof__item:nth-child(4) {
    margin-left: 0;
  }
}
@media (max-width: 375px) {
  .proof__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
```

---

## セクション 6: THREE SIGNALS（3つの特徴）— 全面改修

### 前セクションとの関係
- PROOF遷移帯80pxで`#FFFFFF`→`#F5F7F8`
- padding: **200px** top/bottom（v2: 160px → v3: 200px。最重要コンテンツに最大余白）
- **背景色変更**: `#080E12`(ダーク) → `#F5F7F8`(ライト)。ダーク背景が連続することで単調だった問題を解決

### 背景色変更

```css
.three-signals {
  background:
    radial-gradient(ellipse 60% 50% at 30% 40%, rgba(73, 126, 146, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse 40% 60% at 80% 70%, rgba(181, 82, 46, 0.02) 0%, transparent 50%),
    #F5F7F8; /* was #080E12。v3: ライト背景に変更 */
  padding: 200px 0;
  color: var(--color-text); /* was --color-text-on-dark */
}
```

### ノイズテクスチャ更新

```css
.three-signals::before {
  filter: url(#noiseFilter); /* was #noise-dark → ライト用に変更 */
  opacity: 0.025; /* was 0.03 → ライト背景では低めに */
}
```

### 見出し変更

```html
<div class="three-signals__heading-row">
  <div class="section-dot" aria-hidden="true"></div>
  <h2 class="three-signals__heading">UZOUが見つけ出す、<br>3つのシグナル。</h2>
</div>
```

```css
.three-signals__heading-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 80px;
}
.three-signals__heading-row .section-dot {
  margin-top: 6px;
}
.three-signals__heading {
  color: var(--color-deep); /* was --color-text-hero */
}
```

### レイアウト: テキスト/グラフィック左右交互配置（KAGAMI技法 #13）

```
v2: 全3ブロックが grid 55%:45% (左テキスト:右SVG)
v3:
  Signal 01: 左48%テキスト : 右52%SVG    — grid-template-columns: 48% 52%
  Signal 02: 左52%SVG : 右48%テキスト    — grid-template-columns: 52% 48%（反転）
  Signal 03: 左48%テキスト : 右52%SVG    — grid-template-columns: 48% 52%
```

```css
.three-signals__signal {
  display: grid;
  gap: 48px;
  align-items: center;
  padding: 80px 0; /* was 64px → 80px */
  position: relative;
  border-bottom: 1px solid rgba(26, 58, 68, 0.06); /* was rgba(232,240,243,0.08)。ライト背景用 */
}
.three-signals__signal:first-child {
  border-top: 1px solid rgba(26, 58, 68, 0.06);
}

/* Signal 01, 03: 左テキスト : 右SVG */
.three-signals__signal:nth-child(odd) {
  grid-template-columns: 48% 52%;
}

/* Signal 02: 左SVG : 右テキスト（反転） */
.three-signals__signal:nth-child(even) {
  grid-template-columns: 52% 48%;
}
.three-signals__signal:nth-child(even) .three-signals__signal-text {
  order: 2;
}
.three-signals__signal:nth-child(even) .three-signals__signal-visual {
  order: 1;
}
```

### SVGのはみ出し（KAGAMI技法 #8）

```css
/* 奇数ブロック(01,03): SVGが右にはみ出す */
.three-signals__signal:nth-child(odd) .three-signals__signal-visual {
  margin-right: -40px; /* コンテナからはみ出す */
}
/* 偶数ブロック(02): SVGが左にはみ出す */
.three-signals__signal:nth-child(even) .three-signals__signal-visual {
  margin-left: -40px;
}

.three-signals__illustration {
  max-width: 440px; /* was 400px → 440px。はみ出し分を考慮して拡大 */
}
```

### 非対称角丸: SVGコンテナ

```css
/* 奇数ブロック: 右方向の流れ */
.three-signals__signal:nth-child(odd) .three-signals__signal-visual {
  background: rgba(73, 126, 146, 0.03);
  border-radius: var(--radius-flow-right); /* 6px 24px 24px 6px */
  padding: 32px;
}
/* 偶数ブロック: 左方向の流れ */
.three-signals__signal:nth-child(even) .three-signals__signal-visual {
  background: rgba(73, 126, 146, 0.03);
  border-radius: var(--radius-flow-left); /* 24px 6px 6px 24px */
  padding: 32px;
}
```

### ナンバリング色変更（ライト背景対応）

```css
.three-signals__number {
  color: var(--color-brand); /* 維持 */
  opacity: 0.10; /* was 0.15 → ライト背景では更に薄く */
}
```

### テキスト色変更（ライト背景対応）

```css
.three-signals__signal-heading {
  color: var(--color-deep); /* was --color-text-hero */
}
.three-signals__signal-body {
  color: var(--color-text-muted); /* was --color-text-hero-muted */
  line-height: 2.0; /* was 1.8 */
}
```

### アニメーション: 左右交互

```css
/* Signal 01: 左からスライド */
.three-signals__signal:nth-child(1) {
  opacity: 0;
  transform: translateX(-32px);
}
/* Signal 02: 右からスライド */
.three-signals__signal:nth-child(2) {
  opacity: 0;
  transform: translateX(32px);
}
/* Signal 03: 左からスライド */
.three-signals__signal:nth-child(3) {
  opacity: 0;
  transform: translateX(-32px);
}
.three-signals__signal.is-visible {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 500ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

### SVGホバー（維持 + 色変更）

```css
.three-signals__signal:hover .three-signals__illustration {
  transform: scale(1.03) translateY(-4px); /* 維持 */
}
```

### 装飾ポリゴン削除

```css
.three-signals__polygon-deco--1,
.three-signals__polygon-deco--2 {
  display: none; /* v3: 削除。非対称角丸のSVGコンテナが装飾として機能 */
}
```

### 遷移帯 v3

```css
.three-signals__transition {
  height: 64px; /* was 80px → 64px。THREE SIGNALS→VOICESは色差が小さいため */
  background: linear-gradient(180deg, #F5F7F8 0%, #E8F0F3 100%);
  /* was: #080E12→#F5F7F8。ダーク→ライト背景変更に伴い修正 */
}
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .three-signals {
    padding: 120px 0; /* was 100px */
  }
  .three-signals__signal {
    grid-template-columns: 1fr !important; /* 1列化 */
    gap: 32px;
    padding: 48px 0;
  }
  /* モバイルでは全てテキスト→SVGの順 */
  .three-signals__signal:nth-child(even) .three-signals__signal-text {
    order: 1;
  }
  .three-signals__signal:nth-child(even) .three-signals__signal-visual {
    order: 2;
  }
  /* はみ出しリセット */
  .three-signals__signal .three-signals__signal-visual {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .three-signals__illustration {
    max-width: 320px;
  }
  .three-signals__signal-visual {
    padding: 24px !important;
  }
}
@media (max-width: 375px) {
  .three-signals__illustration {
    max-width: 260px;
  }
}
```

---

## セクション 7: VOICES（導入企業の声）

### 前セクションとの関係
- THREE SIGNALS遷移帯64pxで`#F5F7F8`→`#E8F0F3`
- padding: **80px** top/bottom（v2: 100px → v3: 80px。マーキー帯として機能）

### 見出しにドットアイコン追加

```html
<div class="voices__heading-row">
  <div class="section-dot" aria-hidden="true"></div>
  <h2 class="voices__heading">精度を証明する、声。</h2>
</div>
```

```css
.voices__heading-row {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: var(--max-width);
  margin: 0 auto 48px;
  padding: 0 var(--container-padding);
}
.voices__heading {
  margin: 0; /* reset。親のflexで制御 */
  padding: 0;
}
```

### カード構造改修: 非対称角丸 + 半透明レイヤー

```css
.voices__card {
  flex-shrink: 0;
  width: 400px;
  border-radius: var(--radius-flow-right); /* 6px 24px 24px 6px。was: 8px */
  overflow: hidden;
  /* 2重構造: 外枠 */
  background: rgba(255, 255, 255, 0.85); /* was: #FFFFFF。半透明化 */
  box-shadow: 0 4px 24px rgba(73, 126, 146, 0.08);
  transition: box-shadow 300ms var(--ease-hover),
              transform 300ms var(--ease-hover);
}
.voices__card:hover {
  box-shadow: 0 8px 40px rgba(73, 126, 146, 0.14);
  transform: translateY(-6px);
}
```

### カードヘッダーのborder変更

```css
.voices__card-header {
  border-bottom: 1px solid rgba(73, 126, 146, 0.08); /* was rgba(73,126,146,0.06) → 0.08。微かに強く */
}
```

### 引用テキストline-height

```css
.voices__card-text {
  line-height: 2.0; /* was 1.8 */
  font-size: 14px; /* 維持 */
}
```

### 遷移帯 v3

```css
.voices__transition {
  height: 64px; /* was 80px → 64px */
  background: linear-gradient(180deg, #E8F0F3 0%, #FFFFFF 100%);
}
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .voices {
    padding: 64px 0;
  }
  .voices__card {
    width: 320px;
    border-radius: 4px 18px 18px 4px; /* 非対称を維持するが小さく */
  }
}
@media (max-width: 375px) {
  .voices__card {
    width: 280px;
    border-radius: 4px 14px 14px 4px;
  }
}
```

---

## セクション 8: FLOW + FAQ（導入の流れ）

### 前セクションとの関係
- VOICES遷移帯64pxで`#E8F0F3`→`#FFFFFF`
- padding: 120px top/bottom（v2維持）

### 見出しにドットアイコン追加

```html
<div class="flow__heading-row">
  <div class="section-dot" aria-hidden="true"></div>
  <h2 class="flow__heading">導入の流れ</h2>
</div>
```

```css
.flow__heading-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 64px;
}
.flow__heading {
  margin-bottom: 0; /* reset。親のflexで制御 */
}
```

### ステップカードに非対称角丸

```css
.flow__timeline-content {
  background: rgba(255, 255, 255, 0.70); /* v3: 背景追加 */
  border-radius: var(--radius-flow-right); /* 6px 24px 24px 6px */
  padding: 24px 28px 32px;
  box-shadow: 0 2px 16px rgba(73, 126, 146, 0.06);
  margin-bottom: 24px; /* アイテム間のギャップ */
}
.flow__timeline-item--last .flow__timeline-content {
  margin-bottom: 0;
}
```

### タイムラインアイコンのborder-radius

```css
.flow__timeline-icon {
  border-radius: 6px; /* was 9999px(円) → 6px(角丸四角)。ドットアイコンとの統一 */
}
```

### タイムライン番号の色変更

```css
.flow__timeline-number {
  font-size: 40px; /* was 48px → 40px。少し小さく */
  opacity: 0.06; /* was 0.08 → 0.06 */
}
```

### FAQ見出しにドットアイコン追加

```html
<div class="flow__faq-heading-row">
  <div class="section-dot" aria-hidden="true"></div>
  <h2 class="flow__faq-heading">よくある質問</h2>
</div>
```

```css
.flow__faq-heading-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
```

### FAQのline-height

```css
.flow__faq-answer {
  line-height: 2.0; /* was 1.7 */
}
```

### 遷移帯 v3

```css
.flow__transition {
  height: 160px; /* was 120px → 160px。白→ダークへの大きな遷移 */
  background: linear-gradient(180deg, #FFFFFF 0%, #1A4A55 40%, #0D2B33 100%);
  /* v2: #FFFFFF→#0D2B33の1段。v3: 中間色#1A4A55を挿入 */
}
```

### 装飾ポリゴン削除

```css
.flow__polygon-deco {
  display: none; /* v3: 削除 */
}
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .flow__timeline-content {
    padding: 20px;
    border-radius: 4px 18px 18px 4px;
  }
  .flow__timeline-icon {
    width: 36px;
    height: 36px;
  }
}
@media (max-width: 375px) {
  .flow__timeline-content {
    padding: 16px;
    border-radius: 4px 12px 12px 4px;
  }
}
```

---

## セクション 9: FIND YOUR SIGNAL（最終CTA）

### 前セクションとの関係
- FLOW遷移帯160pxで`#FFFFFF`→`#1A4A55`→`#0D2B33`の2段階暗転
- 段階的な暗転により「水底に沈んでいく」感覚を演出
- padding: **200px** top/bottom（v2: 160px → v3: 200px。最大余白で呼吸）

### padding変更

```css
.find-signal {
  padding: 200px 0; /* was 160px */
}
```

### CTA光彩（KAGAMI技法: blur 50px → UZOU blur 48px）

```css
.find-signal .btn--primary {
  box-shadow: 0 8px 48px rgba(224, 123, 90, 0.35); /* was: 0 8px 40px。blur 40→48pxに拡大 */
}
.find-signal .btn--primary:hover {
  box-shadow: 0 12px 56px rgba(224, 123, 90, 0.45); /* was: 0 12px 56px。維持 */
  transform: translateY(-2px);
}
```

### 副CTAボタンのホバー

```css
.find-signal .btn--secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(224, 123, 90, 0.06); /* 維持 */
  box-shadow: 0 4px 24px rgba(224, 123, 90, 0.12); /* v3追加: 副CTAにも微かなグロー */
}
```

### グローの強化

```css
.find-signal__glow {
  width: 700px; /* was 600px → 700px */
  height: 700px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(181, 82, 46, 0.10) 0%,  /* was 0.08 → 0.10 */
    rgba(73, 126, 146, 0.05) 40%, /* was 0.04 → 0.05 */
    transparent 70%
  );
}
```

### レスポンシブ

```css
@media (max-width: 768px) {
  .find-signal {
    padding: 120px 0; /* was 100px → 120px */
  }
}
@media (max-width: 375px) {
  .find-signal {
    padding: 100px 0;
  }
}
```

---

## セクション 10: FOOTER

### 改修点のみ

#### フッター上部のborder変更

```css
.footer {
  border-top: 1px solid rgba(232, 240, 243, 0.06); /* v3追加: FIND SIGNALとの微かな境界 */
}
```

#### リンクのホバー色

```css
.footer__link:hover {
  opacity: 1.0; /* was 0.85 → 1.0 */
  color: var(--color-accent); /* v3追加: コーラルのアクセント */
}
```

---

## 全セクション横断: 変更まとめ

### 削除するCSS

1. `.noise__polygon-deco` → `display: none`
2. `.proof__polygon-deco` → `display: none`
3. `.three-signals__polygon-deco--1`, `--2` → `display: none`
4. `.flow__polygon-deco` → `display: none`
5. `.three-signals`の`data-theme="dark"` → 削除（ライト背景に変更）
6. `#noise-dark`のSVGフィルター参照をTHREE SIGNALSから削除 → `#noiseFilter`に変更

### 追加するHTML要素

1. 全セクション見出しに`.section-dot`を追加
2. NOISEに`.noise__category-card`外枠ラッパーを追加
3. `.hero__brand-label`の先頭に`.section-dot`を追加
4. 各見出し周辺に`*__heading-row` flexラッパーを追加

### 変更するCSS値一覧

| プロパティ | セクション | v2値 | v3値 | 根拠 |
|---|---|---|---|---|
| `border-radius`(カード) | NOISE | `8px` | `24px 6px 6px 24px` / `6px 24px 24px 6px` | KAGAMI#3 非対称角丸 |
| `border-radius`(カード) | VOICES | `8px` | `6px 24px 24px 6px` | KAGAMI#3 |
| `border-radius`(カード) | FLOW | `0px` | `6px 24px 24px 6px` | KAGAMI#3 |
| `border-radius`(SVGコンテナ) | THREE SIGNALS | なし | `6px 24px` / `24px 6px` 交互 | KAGAMI#3,#13 |
| `background` | THREE SIGNALS | `#080E12` | `#F5F7F8` | ダーク連続の解消 |
| `padding` | PROOF | `100px 0 80px` | `80px 0 80px` | 密度上げ |
| `padding` | THREE SIGNALS | `160px 0` | `200px 0` | 最大余白 |
| `padding` | VOICES | `100px 0` | `80px 0` | 帯として引き締め |
| `padding` | FIND SIGNAL | `160px 0` | `200px 0` | 最大余白 |
| `grid-template-columns` | NOISE | `40% 1fr` | `38% 1fr` | 見出し幅を更に狭く |
| `grid-template-columns` | THREE SIGNALS | `55% 45%` 固定 | `48% 52%` / `52% 48%` 交互 | KAGAMI#13 左右反転 |
| `line-height`(本文) | 全セクション | `1.7`-`1.8` | `2.0` | KAGAMI#12 |
| `grid-template-columns` | PROOF | `repeat(4,1fr)` | `flex` auto幅 | 非均一配置 |
| `opacity`(ロゴ) | TRUSTED BY | `0.35` | `0.30` | 更に控えめに |
| 遷移帯 | NOISE→SIFT等 | 2色グラデーション | 3色グラデーション（中間色挿入） | 色差が大きい遷移の改善 |

