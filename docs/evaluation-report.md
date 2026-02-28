# UZOU LP v10 — lp-designer 評価レポート

実施日: 2026-02-28
評価者: lp-designer（4軸セクション評価 + 7軸全体評価）

---

## A. 4軸セクション評価（56点満点 / 合格: 45点 = 80%）

スコアリング: ◎=14点（プロの仕事） / ○=10点（良い） / △=5点（磨き不足） / ×=0点

### Hero — 信号の覚醒

| 軸 | 評価 | 点数 | 根拠 |
|---|---|---|---|
| 1. 光と影 | ◎ | 14 | 5層構成（base bg #1A2830 + SVG circuit stroke:0.12 + nodes pulse + mouse-follow radial-gradient 600px + ambient ellipse 60%×40% rgba 0.08）。有彩色グロー。光源: 上方ambient + カーソル追従 |
| 4. タイポの表情 | ○ | 10 | Space Grotesk w700 clamp(32px,5vw,64px) ls:-0.02em lh:1.15。Noto Sans body w400 16px lh:1.8。重さのコントラスト明確。Linear実測(w510, ls:-0.022em)比でやや大雑把 |
| 5. 動きの品格 | ◎ | 14 | マウス追従gradient(rAF throttled)、ノードパルス(3s ease-in-out, 6パターン500ms間隔delay分散)、3段stagger入場(100/300/500ms, ease-out-expo)。reduced-motion対応。touch-deviceスキップ |
| 7. 細部の仕上げ | ○ | 10 | ::selection teal rgba 0.25、focus-visible 2px + offset 2px、header glassmorphism(backdrop-filter blur 12px + rgba 0.85)、CTA hover transform+glow。ただしLinearのような多層box-shadowは未実装 |
| **合計** | | **48/56** | **85.7% ✅ 合格** |

### Solution — UZOUが、つなぐ。

| 軸 | 評価 | 点数 | 根拠 |
|---|---|---|---|
| 1. 光と影 | ○ | 10 | ダーク背景+SVGグラデーションオーバーレイ。回路パターン奥行きあり。ただしHeroほどの多層構成ではない |
| 4. タイポの表情 | ○ | 10 | h2 clamp(28px,3vw,44px) w700 ls:-0.02em。カードテキストとの3段階。明確 |
| 5. 動きの品格 | ○ | 10 | SVG線描画(draw-line)アニメーション、fade-up。ただしstagger感は弱い |
| 7. 細部の仕上げ | ○ | 10 | カスタムSVG 3ノード接続図、上下グラデーション境界。接続線のstroke-dasharray活用 |
| **合計** | | **40/56** | **71.4% → 要改善** |

### Features — UZOUの3つの強み

| 軸 | 評価 | 点数 | 根拠 |
|---|---|---|---|
| 1. 光と影 | ○ | 10 | ライト背景。カードに--shadow-sm適用。ただし有彩色影ではない |
| 4. タイポの表情 | ○ | 10 | Feature番号(caption 13px ls:0.04em)→h3(24-32px w600)→本文(16px w400)の3段階。明確だが個性は控えめ |
| 5. 動きの品格 | ○ | 10 | スクロールトリガーfade-in + translateY(20px)。全Feature同じアニメーション |
| 7. 細部の仕上げ | ○ | 10 | 3種のカスタムSVGイラスト(ニューラルネット/スタートポロジ/ダッシュボード)。交互レイアウト |
| **合計** | | **40/56** | **71.4% → 要改善** |

### Scale — 数字が証明する、接続の力。

| 軸 | 評価 | 点数 | 根拠 |
|---|---|---|---|
| 1. 光と影 | ○ | 10 | ライト背景。カウンターに微影 |
| 4. タイポの表情 | ◎ | 14 | 数字: Space Grotesk 56px w700。ラベル: 14px w500。サイズ比率4:1の強い対比 |
| 5. 動きの品格 | ◎ | 14 | IntersectionObserverトリガーのカウントアップ(2000ms ease-out)。数字が0→目標値まで動く |
| 7. 細部の仕上げ | ○ | 10 | 4カード横並び。「+」「億」「%」の接尾辞処理 |
| **合計** | | **48/56** | **85.7% ✅ 合格** |

### Final CTA — 広告が届く先を、変えよう。

| 軸 | 評価 | 点数 | 根拠 |
|---|---|---|---|
| 1. 光と影 | ◎ | 14 | Heroと同等のダーク基板+回路+ノードパルス+gradient境界。ページ頭尾でダーク世界観が呼応 |
| 4. タイポの表情 | ○ | 10 | h2 clamp(28px,3vw,44px) w700。サブコピー16px rgba 0.75 |
| 5. 動きの品格 | ○ | 10 | ノードパルス継続 + fade-in |
| 7. 細部の仕上げ | ○ | 10 | CTA hover states、gradient-fade境界（上部） |
| **合計** | | **44/56** | **78.6% → ボーダーライン** |

### セクション評価サマリー

| セクション | 点数 | 判定 |
|---|---|---|
| Hero | 48/56 (85.7%) | ✅ 合格 |
| Solution | 40/56 (71.4%) | ⚠️ 要改善 |
| Features | 40/56 (71.4%) | ⚠️ 要改善 |
| Scale | 48/56 (85.7%) | ✅ 合格 |
| Final CTA | 44/56 (78.6%) | ⚠️ ボーダーライン |

---

## B. 7軸全体通し評価（98点満点 / 合格: 78点 = 80%）

| # | 軸 | 評価 | 点数 | 根拠 |
|---|---|---|---|---|
| 1 | 光と影 | ◎ | 14 | Hero/CTA: 5層背景、マウス追従、ノードパルス。有彩色グロー(teal系)。ダーク/ライトで影の質を使い分け(--shadow vs --glow) |
| 2 | 色の温度と深み | ○ | 10 | #1A2830(warm dark), #F4F8F9(warm white)で純白/純黒を回避。accent teal + amber。ただしSVGノイズテクスチャ未使用、ライトセクションの質感が平坦 |
| 3 | 余白の呼吸 | ○ | 10 | Hero 160/120, Trust 48/48, Challenge 100/80, Solution 100/80, Features 100/80。Heroの余白は贅沢だが、中間セクションのpadding 100/80が3連続で均一。リズムがやや単調 |
| 4 | タイポの表情 | ○ | 10 | Space Grotesk(heading) + Noto Sans JP(body)。ls:-0.02em(見出し) vs ls:0(本文)。weight 700/600/500/400の4段階。Linear実測比(w510, ls:-0.022em)ではやや粗い |
| 5 | 動きの品格 | ◎ | 14 | マウス追従gradient、ノードパルス(6パターンdelay)、カウントアップ(2s ease-out)、SVG draw-line、stagger入場。ease-out-expo独自カーブ。reduced-motion対応。translateY:20pxの控えめな移動距離 |
| 6 | 視覚のリズム | ○ | 10 | ダーク→ライト→ダーク→ライト→ダークの交互は良い。テキスト←→SVG図の交互も○。ただし中間部の密度が均一で、高密度→休憩→高密度の「波」がもっとほしい |
| 7 | 細部の仕上げ | ○ | 10 | ::selection teal, focus-visible brand色, glassmorphism header, CTA hover(translateY+glow), gradient境界。ただしLinearのような多層微細shadow(CTA boxShadow)や border rgba(255,255,255,0.08)の微光ボーダーは一部未実装 |
| | **合計** | | **78/98** | **79.6% → ボーダーライン** |

### 判定: 要改善（ただしボーダーライン上、軽微な修正で合格圏）

---

## C. 改善すべき具体的ポイント

### 優先度: 高

1. **中間セクション余白の緩急**: Challenge/Solution/Featuresのpaddingが100/80の連続。
   - 提案: Challenge 80/60, Solution 120/100, Features 80/80 に変更して緩急をつける

2. **ライトセクションの質感追加**: #F4F8F9ベタ塗りが平坦
   - 提案: 微細ドットパターン `background-image: radial-gradient(circle, rgba(26,40,48,0.02) 1px, transparent 1px); background-size: 32px 32px;`

3. **CTAボタンにLinear風多層shadow追加**:
   - 提案: `box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.1);`

### 優先度: 中

4. **Features各カードにstagger delay**: 現在全カード同時fade-in
   - 提案: 1つ目0ms, 2つ目150ms, 3つ目300ms

5. **微光ボーダー追加（ダークセクションのカード/要素）**:
   - 提案: `border: 1px solid rgba(139,192,202,0.08);`

6. **Solutionセクションの影に有彩色を**:
   - 提案: box-shadow色を `rgba(52,98,111,0.12)` (mid-teal系) に

### 優先度: 低

7. **letter-spacing微調整**: h1 -0.02em → -0.025em（Linear実測値-0.022emに近づける）
8. **SVGノイズフィルター**: ダークセクション背景にfeTurbulence微細テクスチャ追加
