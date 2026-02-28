# ビジュアルシーケンス設計: UZOU LP v10 — Signal Pulse

---

## 1. カラーパレット

| トークン名 | HEX | RGB | 用途 |
|---|---|---|---|
| `--color-light-teal` | #8BC0CA | rgb(139, 192, 202) | 信号グロー、パルス発光、ホバーアクセント、グラデーションテキスト |
| `--color-mid-teal` | #34626F | rgb(52, 98, 111) | CTAボタン背景、主要リンク、アクティブ状態、回路線 |
| `--color-deep-teal` | #2B4954 | rgb(43, 73, 84) | 見出し色（ライトセクション）、回路線、アイコン |
| `--color-dark-teal` | #1F353E | rgb(31, 53, 62) | ダークセクション背景、ホバー時のボタン背景 |
| `--color-black` | #040404 | rgb(4, 4, 4) | テキスト色（ライトセクション）、深層背景 |
| `--color-signal-white` | #F4F8F9 | rgb(244, 248, 249) | ライトセクション背景（偶数セクション） |
| `--color-circuit-gray` | #1A2830 | rgb(26, 40, 48) | ダークセクション基板色、回路パターン背景 |
| `--color-pulse-amber` | #F0A848 | rgb(240, 168, 72) | Problem セクションアクセント |

### 色使用比率

| カテゴリ | 配分 |
|---|---|
| 背景（#F4F8F9, #FFFFFF, #1A2830） | 70% |
| テキスト（#040404, #2B4954, #F4F8F9） | 20% |
| アクセント（#8BC0CA, #34626F, #F0A848） | 10% |

### ダーク背景でのテキスト色

| 要素 | 色 | コントラスト比（対 #1A2830） |
|---|---|---|
| 見出し | #F4F8F9 | 10.2:1 |
| 本文 | rgba(244, 248, 249, 0.85) | 8.5:1 |
| サブテキスト | rgba(244, 248, 249, 0.6) | 5.8:1 |
| 回路線 | rgba(139, 192, 202, 0.15) | — |
| ノード（点灯時） | rgba(139, 192, 202, 0.8) | — |

### ライト背景でのテキスト色

| 要素 | 色 | コントラスト比（対 #F4F8F9） |
|---|---|---|
| 見出し | #2B4954 | 7.1:1 |
| 本文 | #040404 | 17.4:1 |
| サブテキスト | rgba(4, 4, 4, 0.6) | 9.2:1 |
| ラベル | #34626F | 4.8:1 |

---

## 2. タイプスケール

### フォントファミリー

```css
--font-heading: 'Space Grotesk', 'Noto Sans JP', sans-serif;
--font-body: 'Noto Sans JP', 'Space Grotesk', sans-serif;
```

- 見出し: Space Grotesk を先頭に指定（欧文が先に適用され、和文は Noto Sans JP にフォールバック）
- 本文: Noto Sans JP を先頭に指定（和文中心。数値やアルファベットは Space Grotesk）

### Google Fonts 読み込み

```
Space Grotesk: 500, 600, 700
Noto Sans JP: 400, 500, 700
```

### タイプスケール定義

| 要素 | Desktop（1024px+） | Tablet（768-1023px） | Mobile（-767px） | weight | letter-spacing | line-height |
|---|---|---|---|---|---|---|
| h1（ヒーロー） | clamp(40px, 5vw, 64px) | 40px | 32px | 700 | -0.02em | 1.15 |
| h2（セクション見出し） | clamp(28px, 3.5vw, 40px) | 28px | 24px | 700 | -0.015em | 1.2 |
| h3（サブ見出し） | clamp(20px, 2.5vw, 28px) | 20px | 18px | 600 | -0.01em | 1.3 |
| h4（カードタイトル） | 20px | 18px | 16px | 600 | 0em | 1.3 |
| body（本文） | 16px | 15px | 15px | 400 | 0em | 1.8 |
| body-sm（補足文） | 14px | 14px | 13px | 400 | 0.01em | 1.7 |
| caption（ラベル） | 13px | 12px | 12px | 500 | 0.04em | 1.5 |
| stat-number（数値） | clamp(40px, 5vw, 56px) | 40px | 36px | 700 | -0.02em | 1.0 |
| stat-label（数値ラベル） | 14px | 13px | 13px | 500 | 0.02em | 1.4 |
| button-primary | 15px | 15px | 15px | 600 | 0.02em | 1.0 |
| button-secondary | 14px | 14px | 14px | 500 | 0.02em | 1.0 |
| nav-link | 14px | 14px | 14px | 500 | 0.01em | 1.0 |

### テキスト幅制限

| 要素 | max-width |
|---|---|
| h1 | 720px |
| h2 | 640px |
| 本文段落 | 640px |
| ヒーローサブコピー | 560px |

---

## 3. デザイントークン

### 角丸

```css
--radius-xs: 2px;     /* チップ、バッジ、タグ */
--radius-sm: 4px;     /* 小ボタン、入力フィールド */
--radius-md: 6px;     /* ボタン、FAQ項目 */
--radius-lg: 8px;     /* カード */
--radius-xl: 12px;    /* 大カード、Feature ブロック */
```

設計根拠: 回路基板の精密さを表現するため、角丸は控えめ。最大12px。丸すぎるピル型は使用しない。

### 影の階層

```css
/* ライト背景用 */
--shadow-xs: 0 1px 2px rgba(4, 4, 4, 0.04);
--shadow-sm: 0 2px 8px rgba(4, 4, 4, 0.06);
--shadow-md: 0 4px 16px rgba(4, 4, 4, 0.08);
--shadow-lg: 0 8px 24px rgba(4, 4, 4, 0.1);

/* ダーク背景用（ティールグロー） */
--glow-xs: 0 0 4px rgba(139, 192, 202, 0.1);
--glow-sm: 0 0 8px rgba(139, 192, 202, 0.15);
--glow-md: 0 0 16px rgba(139, 192, 202, 0.2);
--glow-lg: 0 0 24px rgba(139, 192, 202, 0.25);
```

光源方向: 上方（y-offset正）。ダーク背景では影ではなくグロー（全方向拡散）。blur範囲: 0px-24px（制約カードに準拠）。

### トランジション

```css
--ease-default: cubic-bezier(0.25, 0.46, 0.45, 0.94);
/* 穏やかな加速→自然な停止。電子信号の動き */

--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
/* 入場アニメーション用。素早く到達して自然に停止 */

--duration-fast: 200ms;    /* ホバー、ボタン状態変化 */
--duration-normal: 400ms;  /* 入場アニメーション */
--duration-slow: 600ms;    /* セクション入場 */
--duration-pulse: 3000ms;  /* パルス明滅の1周期 */
```

### スペーシング

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 80px;
--space-5xl: 120px;
--space-6xl: 160px;
```

### レイアウト

```css
--container-max: 1120px;
--container-padding: 24px;  /* モバイル: 20px */
--grid-gap: 32px;           /* モバイル: 24px */
```

---

## 4. アニメーション共通パラメータ

### 使用可能アニメーション5種（制約カード準拠）

| # | 名称 | CSS実装 | トリガー | duration | easing |
|---|---|---|---|---|---|
| 1 | フェードアップ | `translateY(20px)` + `opacity: 0` → `translateY(0)` + `opacity: 1` | CSS `animation-timeline: view()` / IO フォールバック | 400ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| 2 | スタッガード | フェードアップ + `transition-delay: calc(var(--i) * 80ms)` | 親要素の `.is-visible` クラス付与時 | 400ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| 3 | カウントアップ | JS `requestAnimationFrame` で数値を 0 → 目標値 | IntersectionObserver（threshold: 0.5） | 1500ms | ease-out（JS内で計算） |
| 4 | パルス明滅 | `@keyframes pulse { 0%,100% { opacity: 0.15 } 50% { opacity: 0.6 } }` | 常時再生（CSS animation） | 3000ms（ノード）/ 4000ms（CTA） | ease-in-out |
| 5 | 線描画 | SVG `stroke-dashoffset: [pathLength]` → `0` | CSS `animation-timeline: view()` / IO フォールバック | 800ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

### scroll-driven animations フォールバック戦略

```
@supports (animation-timeline: view()) {
  /* Chrome 115+, Edge 115+ → ネイティブ scroll-driven animations */
}
@supports not (animation-timeline: view()) {
  /* Safari, Firefox → IntersectionObserver + .is-visible クラス + CSS transition */
}
```

### prefers-reduced-motion 対応

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. 装飾パターン3種（制約カード準拠）

### 装飾 1: 回路パターン（SVG）

- 使用箇所: Hero 背景、Final CTA 背景
- SVGタイル: 200x200px、`<pattern>` で repeat
- 接続線: `stroke: rgba(139, 192, 202, 0.12)`, `stroke-width: 1`
- ノード: `<circle r="3">`, `fill: rgba(139, 192, 202, 0.25)`
- ノード配置: グリッドに沿った規則的配置（1タイルあたり6ノード）
- 線の方向: 水平/垂直のみ（斜め線禁止 — 基板的精密さ）
- ノードパルスアニメーション: opacity 0.25 → 0.7、duration 3000ms、ease-in-out、各ノードに animation-delay をランダム（0ms-2500ms）で設定

### 装飾 2: パルスグロー（CSS）

- 使用箇所: CTAボタン枠、Scale カード上辺、アクティブ要素
- 実装: `box-shadow` のアニメーション
- CTAボタン: `box-shadow: 0 0 0 0 rgba(139, 192, 202, 0)` → `0 0 16px 4px rgba(139, 192, 202, 0.2)` → `0 0 0 0 rgba(139, 192, 202, 0)`
- 周期: 4000ms
- easing: ease-in-out

### 装飾 3: グラデーション遷移帯（CSS）

- 使用箇所: セクション間の境界
- 実装: `::after` 疑似要素
- 高さ: 80px（ダーク→ライト）/ 1px + shadow（ライト→ライト）
- ダーク→ライト: `linear-gradient(to bottom, #1A2830 0%, #F4F8F9 100%)`
- ライト→ダーク: `linear-gradient(to bottom, #F4F8F9 0%, #1A2830 100%)`
- ライト→ライト: `border-bottom: 1px solid rgba(43, 73, 84, 0.08)`

---

## 6. ビジュアルシーケンス（ページ全体の楽譜）

| # | セクション | 背景色 | 密度 | padding-top | padding-bottom | 境界処理（上） | 境界処理（下） | スケール感 | 入場アニメーション |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Hero | #1A2830 | 低 | 160px | 120px | — | グラデーション遷移帯 80px → #F4F8F9 | 大 | フェードアップ、stagger 200ms（コピー→サブ→CTA） |
| 2 | Trust | #F4F8F9 | 低 | 48px | 48px | — | 1px solid rgba(43,73,84,0.08) | 小 | マーキーは常時再生。ラベルのみフェードアップ |
| 3 | Problem | #FFFFFF | 中 | 100px | 100px | — | 1px solid rgba(43,73,84,0.08) | 中 | フェードアップ + カードstagger 80ms |
| 4 | Solution | #F4F8F9 | 高 | 100px | 100px | — | 1px solid rgba(43,73,84,0.08) | 大 | 線描画（SVG接続線）+ ノード順次点灯 |
| 5 | Scale | #FFFFFF | 中 | 100px | 100px | — | 1px solid rgba(43,73,84,0.08) | 大 | カウントアップ + カードstagger 80ms |
| 6 | Features | #F4F8F9 | 高 | 100px | 100px | — | 1px solid rgba(43,73,84,0.08) | 中 | フェードアップ（交互レイアウト各ブロック） |
| 7 | Voices | #FFFFFF | 中 | 100px | 100px | — | 1px solid rgba(43,73,84,0.08) | 中 | フェードアップ + カードstagger 80ms |
| 8 | Flow | #F4F8F9 | 中 | 100px | 100px | — | 1px solid rgba(43,73,84,0.08) | 中 | 線描画（ステップ接続線）+ ノード順次点灯 |
| 9 | FAQ | #FFFFFF | 中 | 100px | 80px | — | グラデーション遷移帯 80px → #1A2830 | 小 | フェードアップ |
| 10 | Final CTA | #1A2830 | 低 | 120px | 120px | — | — | 大 | フェードアップ + 全ノードパルス加速（1500ms周期） |
| — | Footer | #0F1A20 | 低 | 48px | 48px | 1px solid rgba(139,192,202,0.1) | — | 小 | なし |

### シーケンス検証

**色のリズム**: ダーク(Hero) → ライト(Trust-FAQ、#F4F8F9/#FFFFFF交互) → ダーク(Final CTA) → ダーク(Footer)。サンドイッチ構造。ライト区間は8セクションで #F4F8F9 と #FFFFFF を交互に配置し、微妙な明度変化で単調さを回避。

**余白のリズム**: Hero(160/120) → Trust(48/48) → 中間セクション(100/100) → FAQ(100/80) → Final CTA(120/120)。Heroが最も広く、Trustが引き締め、中間は均一、Final CTAで再び広がる。3段階の緩急。

**密度の緩急**: 低(Hero) → 低(Trust) → 中(Problem) → 高(Solution) → 中(Scale) → 高(Features) → 中(Voices) → 中(Flow) → 中(FAQ) → 低(Final CTA)。中盤にSolution/Featuresの高密度ピークが2つ。

**スケールの変化**: 大(Hero h1) → 小(Trust ロゴ帯) → 中(Problem) → 大(Solution 図解) → 大(Scale 数値) → 中(Features) → 中(Voices) → 中(Flow) → 小(FAQ) → 大(Final CTA h2)。開始と終了を大で挟み、中盤に数値/図解の大スケールを配置。

**カラーの呼応**: Hero のティールグロー → Scale の数値カード上辺パルスライン → Final CTA のパルスグロー。ティールが3箇所で脈動し、ページ全体を接続。

**モーションの緩急**: Hero(staggerフェード) → Trust(マーキー常時) → Problem/Voices(staggerカード) → Solution/Flow(線描画) → Scale(カウントアップ) → Final CTA(全ノードパルス加速)。5種のアニメーションが異なるセクションに配置され、同じ動きの連続を回避。

---

## 7. UIコンポーネント

### 7-1. ボタン状態マトリクス

#### Primary CTA（ダーク背景用）

| 状態 | background | color | border | box-shadow | transform | cursor |
|---|---|---|---|---|---|---|
| Default | #34626F | #F4F8F9 | 1px solid #34626F | none | none | pointer |
| Hover | #2B4954 | #F4F8F9 | 1px solid #2B4954 | 0 0 16px rgba(139,192,202,0.2) | translateY(-2px) | pointer |
| Active | #1F353E | #F4F8F9 | 1px solid #1F353E | 0 0 8px rgba(139,192,202,0.15) | translateY(0) | pointer |
| Focus | #34626F | #F4F8F9 | 1px solid #34626F | 0 0 0 3px rgba(139,192,202,0.4) | none | — |
| Disabled | rgba(52,98,111,0.4) | rgba(244,248,249,0.5) | 1px solid rgba(52,98,111,0.4) | none | none | not-allowed |

サイズ: `padding: 14px 32px`, `border-radius: 6px`, `min-width: 200px`, `min-height: 48px`

#### Primary CTA（ライト背景用）

| 状態 | background | color | border | box-shadow | transform | cursor |
|---|---|---|---|---|---|---|
| Default | #34626F | #F4F8F9 | 1px solid #34626F | none | none | pointer |
| Hover | #2B4954 | #F4F8F9 | 1px solid #2B4954 | 0 4px 16px rgba(43,73,84,0.2) | translateY(-2px) | pointer |
| Active | #1F353E | #F4F8F9 | 1px solid #1F353E | 0 2px 8px rgba(43,73,84,0.15) | translateY(0) | pointer |
| Focus | #34626F | #F4F8F9 | 1px solid #34626F | 0 0 0 3px rgba(52,98,111,0.3) | none | — |
| Disabled | rgba(52,98,111,0.4) | rgba(244,248,249,0.5) | 1px solid rgba(52,98,111,0.4) | none | none | not-allowed |

#### Secondary CTA（ダーク背景用）

| 状態 | background | color | border | box-shadow | transform | cursor |
|---|---|---|---|---|---|---|
| Default | transparent | #F4F8F9 | 1px solid rgba(244,248,249,0.25) | none | none | pointer |
| Hover | rgba(244,248,249,0.05) | #F4F8F9 | 1px solid rgba(244,248,249,0.4) | 0 0 12px rgba(139,192,202,0.1) | translateY(-2px) | pointer |
| Active | rgba(244,248,249,0.08) | #F4F8F9 | 1px solid rgba(244,248,249,0.5) | none | translateY(0) | pointer |
| Focus | transparent | #F4F8F9 | 1px solid rgba(244,248,249,0.25) | 0 0 0 3px rgba(139,192,202,0.4) | none | — |

サイズ: `padding: 14px 32px`, `border-radius: 6px`, `min-width: 200px`, `min-height: 48px`

#### Secondary CTA（ライト背景用）

| 状態 | background | color | border | box-shadow | transform | cursor |
|---|---|---|---|---|---|---|
| Default | transparent | #2B4954 | 1px solid rgba(43,73,84,0.3) | none | none | pointer |
| Hover | rgba(43,73,84,0.04) | #2B4954 | 1px solid rgba(43,73,84,0.5) | 0 4px 12px rgba(43,73,84,0.08) | translateY(-2px) | pointer |
| Active | rgba(43,73,84,0.06) | #2B4954 | 1px solid rgba(43,73,84,0.6) | none | translateY(0) | pointer |
| Focus | transparent | #2B4954 | 1px solid rgba(43,73,84,0.3) | 0 0 0 3px rgba(52,98,111,0.3) | none | — |

### 7-2. カード

#### Problem カード（課題カード）

| 状態 | background | border | box-shadow | transform |
|---|---|---|---|---|
| Default | #FFFFFF | 1px solid rgba(43,73,84,0.08) | 0 2px 8px rgba(4,4,4,0.06) | none |
| Hover | #FFFFFF | 1px solid rgba(43,73,84,0.15) | 0 4px 16px rgba(4,4,4,0.08) | translateY(-2px) |

`border-radius: 8px`, `padding: 24px`

#### Voice カード（テスティモニアルカード）

| 状態 | background | border | box-shadow | transform |
|---|---|---|---|---|
| Default | #FFFFFF | 1px solid rgba(43,73,84,0.08) | 0 2px 8px rgba(4,4,4,0.06) | none |
| Hover | #FFFFFF | 1px solid rgba(52,98,111,0.2) | 0 4px 16px rgba(4,4,4,0.08) | translateY(-2px) |

`border-radius: 8px`, `padding: 32px`

#### Scale カード（数値カード）

| 状態 | background | border-top | box-shadow | transform |
|---|---|---|---|---|
| Default | #FFFFFF | 2px solid #34626F | 0 2px 8px rgba(4,4,4,0.06) | none |
| Hover | #FFFFFF | 2px solid #8BC0CA | 0 4px 16px rgba(4,4,4,0.08), 0 -2px 16px rgba(139,192,202,0.15) | translateY(-2px) |

`border-radius: 8px`, `padding: 32px 24px`, `text-align: center`

### 7-3. マイクロインタラクション

| インタラクション | トリガー | プロパティ変化 | duration | easing |
|---|---|---|---|---|
| ボタンホバー | mouseenter | transform + box-shadow + background + border-color | 200ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| ボタンプレス | mousedown | transform(translateY:0) + box-shadow縮小 | 100ms | ease-out |
| カードホバー | mouseenter | transform + box-shadow + border-color | 300ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| FAQアコーディオン開閉 | click | max-height: 0 → auto / transform: rotate(0) → rotate(45deg) | 300ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| ナビリンクホバー | mouseenter | color: #F4F8F9 → #8BC0CA | 200ms | ease-out |

### 7-4. ヘッダー

```
position: fixed
top: 0
width: 100%
height: 64px
background: rgba(26, 40, 48, 0.85)
backdrop-filter: blur(12px)
-webkit-backdrop-filter: blur(12px)
border-bottom: 1px solid rgba(139, 192, 202, 0.08)
z-index: 100
padding: 0 24px
```

スクロール前（Hero内）: `background: transparent`, `border-bottom: none`
スクロール後（Hero通過後）: 上記の値にトランジション（300ms）

### 7-5. ::selection

```css
::selection {
  background: rgba(139, 192, 202, 0.25);
  color: inherit;
}
```

### 7-6. フォーカスリング

```css
:focus-visible {
  outline: 2px solid rgba(139, 192, 202, 0.6);
  outline-offset: 2px;
}
```

---

## 8. レスポンシブブレークポイント

| ブレークポイント | 幅 | container-padding | grid-gap | 主な変更 |
|---|---|---|---|---|
| Desktop | 1024px+ | 24px | 32px | 基準レイアウト |
| Tablet | 768-1023px | 24px | 24px | Features 2カラム→1カラム、Flow 横→縦 |
| Mobile | -767px | 20px | 20px | 全セクション1カラム、タップターゲット44px |
| Small Mobile | -480px | 16px | 16px | h1: 28px、padding-top/bottom: 80%に |

### タッチデバイス対応

```css
@media (hover: none) {
  /* ホバーエフェクトを無効化し、タップ時のactive状態に統一 */
}
```

タップターゲット最小サイズ: 44px x 44px（全インタラクティブ要素）
