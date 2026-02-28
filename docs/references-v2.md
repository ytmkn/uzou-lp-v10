# リファレンスマッピング v2: UZOU LP — Sift + KAGAMI技法

> 作成日: 2026-02-28
> 主要リファレンス: KAGAMI (jp.is-kagami.com)
> 分析ソース: docs/kagami-analysis.md（Playwright実測済み）

---

## 1. ページレベル（全体トーン・世界観）

### リファレンス A: KAGAMI (jp.is-kagami.com)

**このサイトが優れている理由**: BtoB SaaS LPで非対称角丸と有彩色シャドウを徹底し、STUDIO CMSの制約内でテンプレート感を完全に排除している。

**抽出技法（ディレクションレベル）**:

| 要素 | 技法 | 印象・効果 |
|---|---|---|
| 背景 | 白基調 + 水色グラデーションの1セクション集中 | 「ここが核心」が色で伝わる |
| 影 | 全シャドウが`rgba(95,131,175,0.1)`系ブルー有彩色 | ブランドカラーの温度が画面全体に通る |
| 角丸 | `8px 40px`の非対称パターン。方向で意味を変える | 手作り感。テンプレートにはない意図 |
| CTA | `blur 50px`の大きな光彩。ボタンが「発光」 | 視線誘導として圧倒的に機能する |
| カード | `rgba(255,255,255,0.5-0.7)`の半透明 + `inset` | 水色背景上で奥行きと清涼感を作る |

**UZOUへの応用**:
- 有彩色シャドウ → 全カード・CTAに`rgba(73,126,146,x)` / `rgba(224,123,90,x)`のティールブルー/コーラル系
- 非対称角丸 → `8px 32px`に縮小（KAGAMIの40pxは少しカジュアルすぎる）
- CTA光彩 → コーラル色に置換: `0 8px 40px rgba(224,123,90,0.35)`
- ガラスモーフィズム → SIFTセクション(ティール背景)で`backdrop-filter: blur(16px)`付き

### リファレンス B: Linear (linear.app)

**このサイトが優れている理由**: 純黒の空間に最小限の光で最大限の情報と美しさを実現。装飾ゼロでプロダクト品質を語る。

**抽出技法（ディレクションレベル）**:

| 要素 | 技法 | 印象・効果 |
|---|---|---|
| 背景 | 純黒 + 周辺放射状グロー | 暗闇に浮かぶ精密機器 |
| タイポ | 見出しのグラデーションテキスト（white→grey） | 奥行き感、高級感 |
| アニメーション | 極めて微細なスクロール連動（opacity変化のみ） | 過剰さの排除 |
| 装飾 | 微光ボーダー 1px rgba白10% | 要素の境界を光で示す |

**UZOUへの応用**:
- ダークセクション（FIND YOUR SIGNAL）のアンビエントグロー → `radial-gradient(circle at 50% 50%, rgba(73,126,146,0.08), transparent 60%)`
- 微光ボーダー → ダーク背景上のカードに`border: 1px solid rgba(232,240,243,0.08)`

---

## 2. セクションレベル

| セクション | リファレンス | 参考にする要素 | KAGAMI技法の適用 |
|---|---|---|---|
| **SIGNAL** | Linear (linear.app) | 左テキスト+右ビジュアルのスプリット。アンビエントグロー | Canvas背景にKAGAMIの非対称角丸カードでCTAを格納 |
| **TRUSTED BY** | KAGAMI (jp.is-kagami.com) | 2列ロゴマーキー。scrollLeft/scrollRight 80s。上下逆方向 | KAGAMIと同構造。速度80s→35-45sに調整 |
| **NOISE** | SmartHR (smarthr.jp) | 左固定見出し + 右スクロールコンテンツの非対称レイアウト | 課題カードに非対称角丸`32px 8px`適用 |
| **SIFT** | KAGAMI (jp.is-kagami.com) + KARTE (karte.io) | KAGAMIの水色グラデーション背景 + ガラスモーフィズムカード。KARTEのインタラクティブSVG図解 | ティールグラデーション背景に`rgba(255,255,255,0.12)` + `backdrop-filter: blur(16px)`のカード |
| **PROOF** | StartPass (startpass.jp) | 128px級の超巨大タイポグラフィ | 数値に有彩色text-shadow: `0 0 60px rgba(73,126,146,0.15)` |
| **THREE SIGNALS** | Plaid (plaid.com) | 左テキスト + 右ビジュアルの交互配置 | 機能カードに非対称角丸`8px 32px`、有彩色シャドウ`rgba(73,126,146,0.10)` |
| **VOICES** | KAGAMI (jp.is-kagami.com) + 金属園 (kinzokuen.co.jp) | KAGAMIの導入事例カードスタイル + 金属園のマーキー | カードに有彩色シャドウ + 非対称角丸`8px 32px` |
| **FLOW** | SEVEN ENGINEERING (7-eng.com) | ナンバリングセクションの構造化表現 | ステップ番号に`border-radius: 200px`、接続線SVG |
| **FIND YOUR SIGNAL** | Linear (linear.app) | ダーク背景CTA。アンビエントグロー | CTA光彩 `0 8px 40px rgba(224,123,90,0.35)` |

---

## 3. 技法レベル

| 技法 | リファレンス | KAGAMI実測値 | UZOU適用値 | 適用先 |
|---|---|---|---|---|
| **有彩色シャドウ** | KAGAMI | `rgba(95,131,175,0.1) 0 0 8px` | `rgba(73,126,146,0.10) 0 4px 24px` | 全カード |
| **CTA光彩** | KAGAMI | `rgba(87,186,253,0.4) 0 2px 50px` | `rgba(224,123,90,0.35) 0 8px 40px` | 全CTAボタン |
| **非対称角丸** | KAGAMI | `8px 40px` / `40px 8px` | `8px 32px` / `32px 8px` | カード全般 |
| **ガラスモーフィズム** | KAGAMI | `rgba(255,255,255,0.5-0.7)` / `inset 4px 4px 0 0 #fff` | `rgba(255,255,255,0.12)` + `backdrop-filter: blur(16px)` | SIFTセクションのカード |
| **テキストグラデーション** | KAGAMI | `linear-gradient(90deg, #1959B4, #5BBDFF)` + `background-clip: text` | `linear-gradient(90deg, #F5F7F8, #E8F0F3)` + `background-clip: text` | SIFTセクション見出し |
| **ロゴマーキー2列** | KAGAMI | scrollLeft/scrollRight 80s linear infinite | scrollLeft 35s / scrollRight 35s linear infinite | TRUSTED BYセクション |
| **アンビエントグロー** | Linear | `radial-gradient` + マウス追従 | `radial-gradient(circle, rgba(73,126,146,0.06), transparent)` + マウス追従 | SIGNAL背景 |
| **超巨大タイポ** | StartPass | 120px級数値 | `clamp(56px, 11vw, 128px)` weight 800 | PROOF数値 |
| **マウス追従グラデーション** | Plaid (plaid.com) | マウス位置にradial-gradient追従 | 白背景上に`rgba(73,126,146,0.06)`の淡い追従グロー | SIGNALセクション |
| **letter-spacing階層化** | (KAGAMIの弱点改善) | 全要素`normal`（未調整） | +0.15em / +0.02em / 0em / -0.02em / -0.03em | 全要素 |
| **余白リズム** | (KAGAMIの弱点改善) | padding均一 | 48px / 100px / 120px / 160px の4段階 | 全セクション |
| **アニメーション多様性** | (KAGAMIの弱点改善) | 全セクション`translateY(20px)` | 6種を適材適所に配置 | 全セクション |

---

## 4. リファレンスサイトURL一覧（lp-designerがPlaywrightで実測する対象）

| # | サイト名 | URL | 実測対象 |
|---|---|---|---|
| 1 | **KAGAMI** | https://jp.is-kagami.com/ | **最優先**。非対称角丸、有彩色シャドウ、CTA光彩、ガラスモーフィズム、マーキー速度 |
| 2 | Linear | https://linear.app/ | アンビエントグローの色・blur値、微光ボーダーrgba値 |
| 3 | KARTE | https://karte.io/ | インタラクティブSVG図解の実装 |
| 4 | SmartHR | https://smarthr.jp/ | 非対称グリッドの比率、日本語タイポスケール |
| 5 | StartPass | https://startpass.jp/ | 巨大タイポグラフィのサイズ、余白、text-shadow |
| 6 | Plaid | https://plaid.com/ | マウス追従のblur値、更新頻度 |
| 7 | 金属園 | https://kinzokuen.co.jp/ | マーキーのDOMサイズ、速度、gap |
| 8 | Notion | https://notion.so/ | Trust帯のロゴ処理（グレースケール、サイズ） |
| 9 | SEVEN ENGINEERING | https://7-eng.com/ | ナンバリングのタイポグラフィ |

---

## 5. 階層的リファレンスマッピング総括

| セクション | ページレベル | セクションレベル | 技法レベル |
|---|---|---|---|
| SIGNAL | KAGAMI(有彩色影) + Linear(アンビエント) | Linear(ダーク風ヒーロー※白に翻訳) | Plaid(マウス追従), KAGAMI(非対称角丸) |
| TRUSTED BY | KAGAMI(ロゴマーキー2列) | KAGAMI(scrollLeft/Right構造) | Notion(ロゴグレースケール化) |
| NOISE | KAGAMI(有彩色影) | SmartHR(非対称グリッド) | KAGAMI(非対称角丸`32px 8px`) |
| SIFT | KAGAMI(ガラスモーフィズム+テキストグラデ) | KARTE(インタラクティブSVG) | KAGAMI(`rgba(255,255,255,0.12)` + `backdrop-filter`) |
| PROOF | KAGAMI(有彩色影) | StartPass(巨大タイポ) | — |
| THREE SIGNALS | KAGAMI(有彩色影+非対称角丸) | Plaid(交互レイアウト) | KAGAMI(`8px 32px`) |
| VOICES | KAGAMI(有彩色影+非対称角丸) | 金属園(マーキー) | KAGAMI(カードスタイル) |
| FLOW | KAGAMI(有彩色影) | SEVEN ENGINEERING(ナンバリング) | — |
| FIND YOUR SIGNAL | KAGAMI(CTA光彩) + Linear(ダークCTA) | Linear(アンビエントグロー) | KAGAMI(`0 8px 40px rgba(224,123,90,0.35)`) |

