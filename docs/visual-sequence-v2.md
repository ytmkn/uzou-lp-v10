# ビジュアルシーケンス設計 v2: UZOU LP — Sift + KAGAMI技法

> 作成日: 2026-02-28
> 全体の「楽譜」: lp-designerがセクション単位ループを回す前に、全体の流れを確定する
> KAGAMI技法の位置づけ: 各セクションに「KAGAMI技法」列を追加し、どの技法がどこで使われるかを明示

---

## 1. カラーパレット

| トークン名 | HEX | 用途 |
|---|---|---|
| `--color-brand` | `#497E92` | ブランドカラー。SIFTセクション背景、アクセント、アイコン |
| `--color-deep` | `#0D2B33` | ダーク背景。FIND YOUR SIGNAL、テキスト（ライト上） |
| `--color-accent` | `#E07B5A` | コーラル。CTA背景、引用符、ハイライトノード |
| `--color-base-light` | `#F5F7F8` | オフホワイト背景 |
| `--color-base-teal` | `#E8F0F3` | ライトティール背景。VOICESセクション |
| `--color-brand-dark` | `#3A6575` | ブランドカラー暗。SIFTグラデーション終点 |
| `--color-text` | `#1A3A44` | テキスト（ライト背景上） |

### 有彩色シャドウ一覧（グレーシャドウ全面禁止）

| トークン名 | 値 | 使用箇所 | KAGAMI対応 |
|---|---|---|---|
| `--shadow-card` | `0 4px 24px rgba(73,126,146,0.10)` | カード全般 | `rgba(95,131,175,0.1) 0 0 8px` |
| `--shadow-card-hover` | `0 8px 40px rgba(73,126,146,0.15)` | カードホバー時 | — |
| `--shadow-cta` | `0 8px 32px rgba(224,123,90,0.25)` | CTAボタン（ライト上） | `rgba(87,186,253,0.4) 0 2px 50px` |
| `--shadow-cta-dark` | `0 8px 40px rgba(224,123,90,0.35)` | CTAボタン（ダーク上） | 同上 |
| `--shadow-icon` | `0 0 11px rgba(73,126,146,0.12)` | アイコンカード | `rgba(87,186,253,0.2) 0 0 11px` |
| `--glow-number` | `0 0 60px rgba(73,126,146,0.15)` | PROOF数値 | — |
| `--shadow-footer-cta` | `4px 4px 40px rgba(73,126,146,0.10)` | フッターCTA | `rgba(52,165,253,0.15) 4px 4px 40px` |

---

## 2. タイプスケール

### フォントファミリー

```css
--font-heading-en: 'Plus Jakarta Sans', sans-serif;
--font-heading-ja: 'Zen Kaku Gothic New', sans-serif;
--font-body-en: 'Inter', sans-serif;
--font-body-ja: 'Noto Sans JP', sans-serif;
```

### Google Fonts 読み込み

```
Plus Jakarta Sans: 300;600;700;800
Inter: 400
Zen Kaku Gothic New: 500;700
Noto Sans JP: 400;500;700
```

### letter-spacing 5段階階層化（KAGAMI弱点改善）

| レベル | letter-spacing | 用途 | KAGAMI実測 |
|---|---|---|---|
| 超タイト | `-0.03em` | ヒーローH1、SIFT H2、FIND YOUR SIGNAL H2 | KAGAMI: `normal`（未調整） |
| タイト | `-0.02em` | セクションH2、H3 | 同上 |
| ニュートラル | `0em` | 和文本文、欧文本文 | 同上 |
| ワイド | `+0.02em` | サブコピー、本文（やや開く） | 同上 |
| 超ワイド | `+0.10em`〜`+0.15em` | 大文字ラベル（PROOF, TRUSTED BY等） | 同上 |

### セクションごとの見出しサイズ

| セクション | 要素 | font-size | weight | font-family | letter-spacing |
|---|---|---|---|---|---|
| SIGNAL | キャッチコピー | `clamp(36px, 6vw, 72px)` | 700 | Zen Kaku Gothic New | `-0.03em` |
| SIGNAL | サブコピー | `clamp(14px, 1.5vw, 17px)` | 400 | Noto Sans JP | `+0.02em` |
| SIGNAL | ブランドラベル | 13px | 600 | Plus Jakarta Sans | `+0.12em` |
| TRUSTED BY | ラベル | 11px | 600 | Plus Jakarta Sans | `+0.15em` |
| NOISE | H2 | `clamp(24px, 3.5vw, 40px)` | 700 | Zen Kaku Gothic New | `-0.02em` |
| NOISE | 課題ラベル | `clamp(11px, 1vw, 13px)` | 600 | Plus Jakarta Sans | `+0.10em` |
| SIFT | H2 | `clamp(32px, 5vw, 64px)` | 700 | Zen Kaku Gothic New | `-0.03em` |
| SIFT | サブテキスト | `clamp(14px, 1.5vw, 17px)` | 400 | Noto Sans JP | `+0.02em` |
| PROOF | 数値 | `clamp(56px, 11vw, 128px)` | 800 | Plus Jakarta Sans | `-0.04em` |
| PROOF | ラベル | 13px | 600 | Plus Jakarta Sans | `+0.12em` |
| THREE SIGNALS | H2 | `clamp(24px, 3vw, 36px)` | 700 | Zen Kaku Gothic New | `-0.02em` |
| THREE SIGNALS | ナンバリング | `clamp(48px, 6vw, 72px)` | 300 | Plus Jakarta Sans | `-0.02em` |
| VOICES | H2 | `clamp(20px, 2.5vw, 28px)` | 700 | Zen Kaku Gothic New | `-0.02em` |
| FLOW | H2 | `clamp(20px, 2.5vw, 28px)` | 700 | Zen Kaku Gothic New | `-0.02em` |
| FLOW | ステップ番号 | `clamp(40px, 5vw, 56px)` | 300 | Plus Jakarta Sans | `-0.02em` |
| FIND YOUR SIGNAL | H2 | `clamp(28px, 4.5vw, 56px)` | 700 | Zen Kaku Gothic New | `-0.03em` |

---

## 3. 非対称角丸トークン（KAGAMI技法翻訳）

```css
--radius-asymmetric-right: 8px 32px 32px 8px;  /* 右上・右下が丸い。右方向への流れ */
--radius-asymmetric-left: 32px 8px 8px 32px;    /* 左上・左下が丸い。左方向への流れ */
--radius-sharp: 0px;                             /* シャープ。精密さ */
--radius-button: 6px;                            /* ボタン。親しみ */
--radius-circle: 200px;                          /* 完全な球。特別な存在 */
```

KAGAMI実測からの変換:
| KAGAMI | UZOU | 変更理由 |
|---|---|---|
| `8px 40px` | `8px 32px` | 40px→32pxに縮小。UZOUの精密さトーンに合わせる |
| `40px 8px` | `32px 8px` | 同上 |
| `100px 0 0` | 不採用 | セクション角丸はUZOUの精密トーンに合わない |
| `16px`（ボタン） | `6px` | UZOUはより控えめな角丸 |
| `100px`（ピル） | `200px`（球体） | 用途限定でより極端に |

---

## 4. ビジュアルシーケンス（ページ全体の楽譜）

| # | セクション | 背景色 | padding-top | padding-bottom | 密度 | 境界処理（上） | 境界処理（下） | スケール感 | 入場アニメーション | KAGAMI技法 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | SIGNAL | `#FFFFFF` + SVGノイズ + アンビエントグロー | 160px | 120px | 低 | — | 地続き（TRUSTED BYと背景同色） | 大 | fadeInUp stagger(テキスト200ms→CTA 400ms) | 非対称角丸CTA格納ボックス |
| 2 | TRUSTED BY | `#FFFFFF` | 48px | 64px | 最低 | 地続き | グラデーション遷移帯80px → `#F5F7F8` | 小 | marquee常時再生（入場アニメなし） | ロゴマーキー2列(scrollLeft/Right) |
| 3 | NOISE | `#F5F7F8` | 120px | 120px | 中 | — | グラデーション遷移帯120px → `#497E92` | 中 | slideInLeft stagger 120ms | 非対称角丸`32px 8px`課題カード、有彩色シャドウ |
| 4 | SIFT | `linear-gradient(180deg, #497E92, #3A6575)` | 160px | 160px | 高 | — | グラデーション遷移帯120px → `#FFFFFF` | 大 | scaleUp stagger 80ms（SVGノード） | ガラスモーフィズムカード、テキストグラデーション |
| 5 | PROOF | `#FFFFFF` | 100px | 100px | 低 | — | グラデーション遷移帯80px → `#F5F7F8` | 大 | countUp 1200ms。入場アニメなし | 有彩色text-shadow |
| 6 | THREE SIGNALS | `#F5F7F8` | 160px | 160px | 高 | — | グラデーション遷移帯80px → `#E8F0F3` | 中 | slideInLeft stagger 120ms | 非対称角丸`8px 32px`機能カード、有彩色シャドウ |
| 7 | VOICES | `#E8F0F3` | 100px | 100px | 中 | — | グラデーション遷移帯80px → `#FFFFFF` | 中 | marquee 45s。入場アニメなし | 非対称角丸カード、有彩色シャドウ |
| 8 | FLOW | `#FFFFFF` | 120px | 120px | 中 | — | グラデーション遷移帯120px → `#0D2B33` | 中 | fadeInUp（FLOW上半分のみ。FAQ部分はアニメなし） | — |
| 9 | FIND YOUR SIGNAL | `#0D2B33` + Canvasパーティクル | 160px | 160px | 低 | — | — | 大 | fadeInUp stagger(テキスト→CTA) | CTA光彩`0 8px 40px rgba(224,123,90,0.35)` |
| — | Footer | `#0D2B33` | 48px | 48px | 低 | `1px solid rgba(232,240,243,0.08)` | — | 小 | なし | — |

---

## 5. シーケンス検証

### 色のリズム
```
□ #FFFFFF (SIGNAL)     → □ #FFFFFF (TRUSTED BY)   → □ #F5F7F8 (NOISE)
→ ■ #497E92 (SIFT)    → □ #FFFFFF (PROOF)         → □ #F5F7F8 (THREE SIGNALS)
→ □ #E8F0F3 (VOICES)  → □ #FFFFFF (FLOW)          → ■ #0D2B33 (FIND YOUR SIGNAL)
```

**改善点（v10対比）**:
- v10: #FFFFFF / #F4F8F9 の微差交互が8セクション連続 → 「全体が同一のライトグレー」
- v2: 白(3) / オフホワイト(2) / ライトティール(1) / ティール(1) / ダーク(1) の5色展開
- SIFTの**ブランドカラー背景が中央に1つだけ**出現し「ここが核心」を色で伝える（KAGAMI技法: 水色グラデーション1セクション集中）
- KAGAMI弱点「全面白基調」→ UZOUではSIFT(ブランドカラー) + FIND YOUR SIGNAL(ダーク) の2つのコントラストポイント

### 余白のリズム
```
160/120(SIGNAL) → 48/64(TRUSTED) → 120/120(NOISE) → 160/160(SIFT) → 100/100(PROOF)
→ 160/160(THREE SIGNALS) → 100/100(VOICES) → 120/120(FLOW) → 160/160(FIND SIGNAL)
```

**4段階の緩急**:
- **呼吸**: 160px — 大テーマ（SIGNAL, SIFT, THREE SIGNALS, FIND YOUR SIGNAL）
- **安定**: 120px — 中テーマ（NOISE, FLOW）
- **リズム**: 100px — 軽テーマ（PROOF, VOICES）
- **引き締め**: 48px — Trust帯（最小余白で密着感）

**改善点（v10対比）**:
- v10: 中間8セクションのpadding 100/80が連続 → 均一感
- v2: 48→120→160→100→160→100→120→160の波形リズム
- KAGAMI弱点「余白のリズムが均一」を完全に克服

### 密度の緩急
```
低(SIGNAL) → 最低(TRUSTED) → 中(NOISE) → 高(SIFT) → 低(PROOF)
→ 高(THREE SIGNALS) → 中(VOICES) → 中(FLOW) → 低(FIND SIGNAL)
```
- 高密度ピーク2つ（SIFT, THREE SIGNALS）が中盤に配置
- 低密度の「休憩」が3箇所（SIGNAL, PROOF, FIND YOUR SIGNAL）

### スケールの変化
```
大(SIGNAL: 72px H1) → 小(TRUSTED: 11px ラベル) → 中(NOISE: 40px H2) → 大(SIFT: 64px H2 + SVG図解)
→ 大(PROOF: 128px数値) → 中(THREE SIGNALS: 36px H2) → 中(VOICES: 28px H2)
→ 中(FLOW: 28px H2 + 56px数字) → 大(FIND: 56px H2)
```
- 開始(72px)と終了(56px)を大スケールで挟む
- 中盤にSIFT(64px)+PROOF(128px)の2つの大スケール

### モーションの緩急（KAGAMI弱点改善: 6種配置）
```
fadeInUp(SIGNAL) → marquee(TRUSTED) → slideInLeft(NOISE) → scaleUp(SIFT)
→ countUp(PROOF) → slideInLeft(THREE SIGNALS) → marquee(VOICES)
→ fadeInUp(FLOW上半分) → fadeInUp(FIND SIGNAL)
```
- 同じアニメーションが連続しない（fadeInUpはSIGNALとFIND YOUR SIGNALの「サンドイッチ」のみ）
- slideInLeftはNOISEとTHREE SIGNALSで使用（課題→解決の対比でも方向が一致）
- marqueeはTRUSTED BYとVOICESで使用（社会的証明の2セクション）

### KAGAMI技法の分布
```
SIGNAL(非対称角丸) → TRUSTED(マーキー2列) → NOISE(非対称角丸+有彩色影)
→ SIFT(ガラスモーフィズム+テキストグラデ) → PROOF(有彩色text-shadow)
→ THREE SIGNALS(非対称角丸+有彩色影) → VOICES(非対称角丸+有彩色影)
→ FLOW(—) → FIND YOUR SIGNAL(CTA光彩)
```
- **有彩色シャドウ**: 6セクションで使用（全カード要素に適用）
- **非対称角丸**: 5セクションで使用（カードのある全セクション）
- **CTA光彩**: 2セクション（SIGNAL, FIND YOUR SIGNAL）
- **ガラスモーフィズム**: 1セクション（SIFTのみ。限定使用で特別感）
- **テキストグラデーション**: 1セクション（SIFTのみ）
- **ロゴマーキー2列**: 1セクション（TRUSTED BYのみ）

---

## 6. UIコンポーネント状態マトリクス

### CTAボタン（主: コーラル背景）— ライト上

| 状態 | background | color | border | box-shadow | transform |
|---|---|---|---|---|---|
| Default | `#E07B5A` | `#FFFFFF` | none | `0 8px 32px rgba(224,123,90,0.25)` | none |
| Hover | `#C96A4D` | `#FFFFFF` | none | `0 8px 48px rgba(224,123,90,0.35)` | `translateY(-2px)` |
| Active | `#B85E44` | `#FFFFFF` | none | `0 4px 24px rgba(224,123,90,0.20)` | `translateY(0)` |
| Focus | `#E07B5A` | `#FFFFFF` | none | `0 8px 32px rgba(224,123,90,0.25), 0 0 0 3px rgba(73,126,146,0.4)` | none |

padding: `18px 48px`, border-radius: `6px`, min-width: 220px, min-height: 52px

### CTAボタン（主: コーラル背景）— ダーク上

| 状態 | background | color | border | box-shadow | transform |
|---|---|---|---|---|---|
| Default | `#E07B5A` | `#FFFFFF` | none | `0 8px 40px rgba(224,123,90,0.35)` | none |
| Hover | `#C96A4D` | `#FFFFFF` | none | `0 8px 56px rgba(224,123,90,0.45)` | `translateY(-2px)` |

KAGAMI対応: CTA光彩 blur 50px → UZOU blur 40-56px（わずかに引き締め）

### CTAボタン（副: ボーダー）— ライト上

| 状態 | background | color | border | box-shadow | transform |
|---|---|---|---|---|---|
| Default | `transparent` | `#1A3A44` | `1px solid rgba(13,43,51,0.2)` | none | none |
| Hover | `rgba(73,126,146,0.04)` | `#1A3A44` | `1px solid #E07B5A` | `0 4px 24px rgba(73,126,146,0.08)` | `translateY(-2px)` |

### カード — ライト背景上

| 状態 | background | border-radius | box-shadow | transform |
|---|---|---|---|---|
| Default | `#FFFFFF` | `8px 32px 32px 8px` | `0 4px 24px rgba(73,126,146,0.10)` | none |
| Hover | `#FFFFFF` | `8px 32px 32px 8px` | `0 8px 40px rgba(73,126,146,0.15)` | `translateY(-4px)` |

### カード — ティール背景上（SIFTセクション）

| 状態 | background | border-radius | box-shadow | backdrop-filter | border |
|---|---|---|---|---|---|
| Default | `rgba(255,255,255,0.12)` | `8px 32px 32px 8px` | `0 4px 24px rgba(73,126,146,0.08)` | `blur(16px)` | `1px solid rgba(255,255,255,0.15)` |
| Hover | `rgba(255,255,255,0.18)` | `8px 32px 32px 8px` | `0 8px 32px rgba(73,126,146,0.12)` | `blur(16px)` | `1px solid rgba(255,255,255,0.25)` |

### ヘッダー

```
position: fixed
height: 64px
background: rgba(255,255,255,0.85)
backdrop-filter: blur(12px)
border-bottom: 1px solid rgba(26,58,68,0.06)
z-index: 100
```

スクロール前（SIGNAL内）: `background: transparent`, `border-bottom: none`
スクロール後: 上記値にトランジション 300ms

---

## 7. グラデーション遷移帯の詳細

| 位置 | from | to | 高さ | 実装 |
|---|---|---|---|---|
| TRUSTED BY → NOISE | `#FFFFFF` | `#F5F7F8` | 80px | `linear-gradient(to bottom, #FFFFFF, #F5F7F8)` |
| NOISE → SIFT | `#F5F7F8` | `#497E92` | 120px | `linear-gradient(to bottom, #F5F7F8, #497E92)` |
| SIFT → PROOF | `#3A6575` | `#FFFFFF` | 120px | `linear-gradient(to bottom, #3A6575, #FFFFFF)` |
| PROOF → THREE SIGNALS | `#FFFFFF` | `#F5F7F8` | 80px | `linear-gradient(to bottom, #FFFFFF, #F5F7F8)` |
| THREE SIGNALS → VOICES | `#F5F7F8` | `#E8F0F3` | 80px | `linear-gradient(to bottom, #F5F7F8, #E8F0F3)` |
| VOICES → FLOW | `#E8F0F3` | `#FFFFFF` | 80px | `linear-gradient(to bottom, #E8F0F3, #FFFFFF)` |
| FLOW → FIND YOUR SIGNAL | `#FFFFFF` | `#0D2B33` | 120px | `linear-gradient(to bottom, #FFFFFF, #0D2B33)` |

KAGAMI対応: KAGAMIは「ハードカットが基本」で、NOISE→SIFTの色変化時に`border-radius: 100px 0 0`を使用。UZOUではグラデーション遷移帯で滑らかに接続し、KAGAMIの「セクション境界処理の甘さ」を改善。

---

## 8. アニメーション共通パラメータ

### イージング統一

| 用途 | イージング | cubic-bezier |
|---|---|---|
| 入場アニメーション | 水面に浮かび上がる減速 | `cubic-bezier(0.16, 1, 0.3, 1)` |
| ホバー | 即座に反応、自然に減速 | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| マーキー | 等速。潮流の安定感 | `linear` |
| countUp | 勢いよく→減速 | `ease-out` |

KAGAMI対応: `cubic-bezier(0.4,0.4,0,1)` はSTUDIO CMS標準。UZOUではより有機的な`cubic-bezier(0.16,1,0.3,1)` を採用（「水面に浮かぶ」フィーリング）。

### scroll-driven animations フォールバック

```css
@supports (animation-timeline: view()) {
  /* Chrome 115+, Edge 115+ */
}
@supports not (animation-timeline: view()) {
  /* Safari, Firefox → IntersectionObserver + .is-visible + CSS transition */
}
```

### prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .canvas-network { display: none; }
}
```

---

## 9. レスポンシブブレークポイント

| ブレークポイント | 幅 | container-padding | grid-gap | 主な変更 |
|---|---|---|---|---|
| Desktop | 1024px+ | 32px | 32px | 基準レイアウト |
| Tablet | 768-1023px | 24px | 24px | NOISE非対称→1カラム、FLOW横→縦 |
| Mobile | -767px | 20px | 20px | 全1カラム。タップターゲット44px。PROOF数値2x2グリッド |
| Small Mobile | -480px | 16px | 16px | H1: `clamp`下限。padding-top/bottom: 80%に |

### ::selection / :focus-visible

```css
::selection {
  background: rgba(73, 126, 146, 0.25);
  color: inherit;
}

:focus-visible {
  outline: 2px solid rgba(73, 126, 146, 0.6);
  outline-offset: 2px;
}
```

