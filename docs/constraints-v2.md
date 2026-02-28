# 制約カード v2: UZOU LP — Sift + KAGAMI技法

> 作成日: 2026-02-28
> 目的: 「足し算バイアス」を防ぐ。v10のテンプレ感診断で「全て均一」と指摘された問題を解決しつつ、技法の過剰投入を制御する

---

## 1. 数量制約

| 要素 | 上限 | 根拠 |
|---|---|---|
| **アニメーション種別** | 最大 **6** 種類 | fadeInUp(2セクション限定), slideInLeft, scaleUp, countUp, marquee, parallax。KAGAMI弱点「全セクション同一fadeIn」を克服するために6種に拡張 |
| **装飾色** | **7** 色以内 | ティールブルー`#497E92` + ディープティール`#0D2B33` + コーラル`#E07B5A` + アイスホワイト`#F5F7F8` + ライトティール`#E8F0F3` + ティール暗`#3A6575` + テキスト`#1A3A44`。追加不可 |
| **装飾パターン** | 最大 **4** 種類 | Canvasネットワーク / SVGノイズテクスチャ / SVG図解 / グラデーション遷移帯 |
| **フォントファミリー** | 最大 **4** 種類 | Plus Jakarta Sans + Inter + Zen Kaku Gothic New + Noto Sans JP |
| **border-radius値** | **5** 値のみ | 0px / 6px / 8px(非対称組み合わせ用) / 32px(非対称組み合わせ用) / 200px |

---

## 2. アニメーション6種の定義と配置制限

| # | アニメーション | 使用セクション | 仕様 | KAGAMI改善点 |
|---|---|---|---|---|
| 1 | **fadeInUp** | SIGNAL, FIND YOUR SIGNAL **のみ** | `translateY(24px)→0` + `opacity:0→1`。600ms。`cubic-bezier(0.16,1,0.3,1)` | KAGAMI: 全セクションfadeInUp → UZOUは2セクション限定 |
| 2 | **slideInLeft** | NOISE(課題カード), THREE SIGNALS(機能ブロック) | `translateX(-32px)→0` + `opacity:0→1`。500ms。stagger: 120ms | 方向の変化でリズムを作る |
| 3 | **scaleUp** | SIFT(SVG図解ノード) | `scale(0.85)→1` + `opacity:0→1`。400ms。stagger: 80ms | 図解の展開感 |
| 4 | **countUp** | PROOF(数値4つ) | rAF。0→目標値まで1200ms。ease-out | 数値インパクト |
| 5 | **marquee** | TRUSTED BY(ロゴ), VOICES(カード) | CSS animation `translateX(0)→translateX(-50%)`。35s/45s。linear。infinite | KAGAMI準拠: scrollLeft/scrollRight 80s → UZOUは35-45sに短縮（コンテンツ量に合わせて） |
| 6 | **parallax** | SIGNAL(Canvas), PROOF(背景テクスチャ) | `translateY(calc(var(--scroll)*-0.12))`。scroll-driven優先、IOフォールバック | 控えめな速度差で奥行き |

### fadeInUp制限ルール（厳格）
- fadeInUpは**SIGNALとFIND YOUR SIGNALの2セクションのみ**
- 他セクションでは slideInLeft / scaleUp / 即表示（アニメーションなし）を使用
- PROOFは数値のcountUpのみ。入場アニメーションなし（「最初からそこにある事実の重さ」）
- TRUSTED BYとVOICESはmarqueeのみ。入場アニメーションなし

### 禁止アニメーション
- テキストスプリット（文字単位分割）→ パフォーマンスコスト
- 3Dチルト → v9コンセプト由来
- マグネティックボタン → 過剰
- 水平スクロール → 操作性の問題

---

## 3. 装飾パターン4種の定義

| # | パターン | 使用セクション | 実装方針 |
|---|---|---|---|
| 1 | **Canvasネットワーク** | SIGNAL, FIND YOUR SIGNAL | Canvas 2D。パーティクル間に距離閾値で接続線描画。色: `#497E92`系。ハイライトノード: `#E07B5A` |
| 2 | **SVGノイズテクスチャ** | SIGNAL(白背景上), ダークセクション背景 | `filter: url(#noise)` + SVGフィルタ, opacity: 0.03。フラット感を消す |
| 3 | **SVG図解** | SIFT(接続図解), FLOW(ステップ接続線) | インラインSVG + CSS transition。ホバー/スクロール連動 |
| 4 | **グラデーション遷移帯** | TRUSTED BY→NOISE, SIFT→PROOF, FLOW→FIND YOUR SIGNAL | linear-gradientで背景色を滑らかに接続。高さ80-120px |

### 禁止装飾
- 回路パターン/パルスグロー → v10 Signal Pulseコンセプト由来。Siftでは不使用
- ポリゴン/ファセット → v9コンセプト由来
- 波形/斜めのSVG区切り → テンプレ感の原因
- ドットパターン背景 → v10で3セクション同一指定だったため、SVGノイズに置換

---

## 4. 非対称角丸の使用ルール

| 値 | 使用箇所 | 禁止箇所 |
|---|---|---|
| `8px 32px` / `32px 8px` | 機能カード、引用カード、課題カード | ボタン、FAQ項目、ヘッダー |
| `0px` | FAQ項目、引用カード（VOICESの直線的カード）、区切り線 | CTA、メインカード |
| `6px` | CTAボタン、入力フィールド | 大型カード |
| `200px` | ステップ番号丸、アバター | カード、ボタン |

非対称角丸の方向ルール:
- コンテンツが「右へ流れる」文脈 → `8px 32px`（右上が丸い）
- コンテンツが「左へ流れる」文脈 → `32px 8px`（左上が丸い）
- NOISE左カラム(課題) → `32px 8px`（問題提起は左上から）
- THREE SIGNALS右ビジュアル → `8px 32px`（解決は右上へ流れる）

---

## 5. ホバーパターン（4種、追加不可）

| # | パターン | 使用箇所 | CSS仕様 |
|---|---|---|---|
| 1 | **ワイプ + シャドウ拡大** | メインCTA | `background-position: right center`。コーラル→ティール変化。shadow blur: 32px→48px。300ms |
| 2 | **ボーダーカラー変化** | 副CTA, FAQ | `border-color: rgba(232,240,243,0.3)→#E07B5A`。200ms |
| 3 | **リフト + 有彩色シャドウ拡大** | カード全般 | `translateY(-4px)` + shadow blur: 24px→40px。250ms |
| 4 | **テキスト下線スライド** | ナビリンク | `::after` `scaleX(0)→scaleX(1)`。color: `#E07B5A`。200ms |

KAGAMI対応: KAGAMIはSTUDIO CMSの制約でホバー確認困難だったが、ボタンに`transition: 0.4s`が設定されていた。UZOUでは200-300msに短縮し、反応速度を上げる。

---

## 6. パフォーマンス制約

| 指標 | 目標値 |
|---|---|
| LCP | 2.5秒以内 |
| CLS | 0.1以下 |
| INP | 200ms以下 |
| JS バンドルサイズ | 60KB以下（minified） |
| CSS バンドルサイズ | 35KB以下（minified） |
| WebFont | 4ファミリ、必要ウェイトのみ |
| 画像 | WebP + srcset、遅延読み込み（hero以外） |
| Canvas | 60fps維持。requestAnimationFrame使用。パーティクル数上限100 |

---

## 7. レスポンシブ制約

| ブレークポイント | 幅 | 備考 |
|---|---|---|
| Desktop | 1024px+ | 基準レイアウト |
| Tablet | 768-1023px | 2カラム→1カラム化 |
| Mobile | -767px | 1カラム、タップターゲット44px以上 |
| Small Mobile | -480px | フォントサイズ微調整 |

---

## 8. アクセシビリティ制約

| 項目 | 要件 |
|---|---|
| コントラスト比 | WCAG AA必須（AAA推奨）。通常テキスト4.5:1、大テキスト3:1 |
| フォーカス | `:focus-visible` リング `2px solid rgba(73,126,146,0.6)` + offset 2px |
| reduced-motion | 全アニメーションの無効化対応 |
| セマンティクス | header/main/footer/nav/section/article |
| 構造化データ | FAQPage + Organization |
| キーボード | Tab/Enter/Escape で全機能操作可能 |
| スキップリンク | メインコンテンツへのスキップリンク設置 |

