# ビジュアルシーケンス設計 v3: UZOU LP — Sift + KAGAMI技法全面適用

> 作成日: 2026-02-28
> 前版: v2（全セクション均一padding + 中央揃え過多 + AI感レイアウトの問題）
> v3の方針: KAGAMI深層分析15原則をUZOUのSiftコンセプト（ティール+コーラル）に翻訳し、全セクションのレイアウト・リズムを根本から再設計

---

## 1. v2からの主要変更サマリー

| 領域 | v2の問題 | v3の改善 | KAGAMI原則# |
|---|---|---|---|
| 角丸 | `8px`均一 | 非対称`6px 24px`/`24px 6px` + `0px` + `6px` + `200px`の5パターン | #3 |
| 影 | 一部グレー影残存 | 全影を有彩色に完全統一 | #4 |
| テキスト配置 | 中央揃え4セクション | 中央揃え2セクション(SIFT, FIND SIGNAL)のみ。他は全て左揃え | #5 |
| padding | 100/120/160の3値が平坦 | 48/80/120/160/200の5値で波形リズム | #2 |
| レイアウト | テキスト+SVG が全セクション左55%:右45%固定 | セクションごとにグリッド比率変化 + 左右交互 + はみ出し | #1,#8,#13 |
| カード | 1重構造 + 不透明白 | 2重構造（外枠+内枠）+ 半透明レイヤー | #7 |
| 本文line-height | 1.7-1.8 | 2.0（本文）/ 1.3（見出し）のコントラスト | #12 |
| フォントサイズ | 段階的スケール | 15px→40px→72pxの大胆ジャンプ。中間サイズ省略 | #11 |
| ブランド装飾 | なし | セクション見出しにUZOU固有ドットアイコン導入 | #9 |
| THREE SIGNALS | 全ブロック左テキスト:右SVG | 01(左T:右V) → 02(左V:右T) → 03(左T:右V) 交互 | #13 |

---

## 2. UZOU非対称角丸システム v3

KAGAMIの`8px 40px`をUZOUの精密トーンに翻訳。v2の`8px 32px`から更に調整。

```css
/* v3: 5パターン */
--radius-flow-right: 6px 24px 24px 6px;   /* 右上・右下が丸い。進行方向=右 */
--radius-flow-left: 24px 6px 6px 24px;    /* 左上・左下が丸い。進行方向=左 */
--radius-sharp: 0px;                       /* FAQ, 区切り線 */
--radius-button: 6px;                      /* CTAボタン, 入力フィールド */
--radius-circle: 200px;                    /* ステップ番号, アバター, タグ */
```

v2→v3 変更理由:
- `8px 32px` → `6px 24px`: 32pxはカード幅400pxに対してやや過剰（8%）。24pxは6%で視認性と違和感のバランスが取れる
- KAGAMI `8px 40px`（2.8%対比）はページ幅1440pxのカードで使用。UZOUのカード幅440pxに対して同比率を適用すると24pxが妥当

### 使用箇所マッピング

| 要素 | border-radius | 根拠 |
|---|---|---|
| NOISEカード（広告主側） | `24px 6px 6px 24px` | 左から流れる課題。左上が丸い |
| NOISEカード（メディア側） | `6px 24px 24px 6px` | 右から流れる課題。右上が丸い |
| SIFTガラスカード | `6px 24px 24px 6px` | 解決策は右へ流れる |
| THREE SIGNALSカード | Signal01:`6px 24px`, 02:`24px 6px`, 03:`6px 24px` | 交互配置に連動 |
| VOICESカード | `6px 24px 24px 6px` | 統一パターン |
| FLOWステップカード | `6px 24px 24px 6px` | フローは右（=前進）へ |
| CTAボタン | `6px` | 均一。角丸カードとの対比で精密さ |
| FAQ項目 | `0px` | 直線。確実な回答の暗示 |

---

## 3. ビジュアルシーケンス（ページ全体の楽譜）

| # | セクション | 背景色 | padding-top | padding-bottom | テキスト配置 | レイアウト | 密度 | 入場アニメーション | KAGAMI技法 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | SIGNAL | `#FFFFFF` + SVGノイズ | 160px | 120px | left | grid 55%:45% | 低 | fadeInUp stagger 200ms | — |
| 2 | TRUSTED BY | `#FFFFFF` | 48px | 0px | center | fullbleed marquee | 最低 | marquee常時 | ロゴマーキー2列 |
| 3 | NOISE | `#F5F7F8` | 120px | 120px | left (sticky) | grid 38%:62% 非対称 | 中 | slideInLeft 120ms stagger | 非対称角丸`24px 6px`, 2重カード, 有彩色影 |
| 4 | SIFT | `linear-gradient(180deg,#497E92,#3A6575)` | 160px | 160px | center | center + SVG | 高 | scaleUp 80ms stagger | ガラスモーフィズムカード, テキストグラデーション |
| 5 | PROOF | `#FFFFFF` | 80px | 80px | left | grid 非均一4列 | 低 | countUp 1200ms | 有彩色text-shadow |
| 6 | THREE SIGNALS | `#F5F7F8` | 200px | 200px | left | **左右交互** grid 48%:52% | 高 | slideInLeft/Right 交互 | 非対称角丸交互, はみ出しSVG |
| 7 | VOICES | `#E8F0F3` | 80px | 80px | left | fullbleed marquee | 中 | marquee 45s | 非対称角丸カード, 半透明レイヤー |
| 8 | FLOW+FAQ | `#FFFFFF` | 120px | 120px | left | タイムライン + grid 30%:70% | 中 | fadeInUp(FLOW) + none(FAQ) | 非対称角丸ステップカード |
| 9 | FIND SIGNAL | `#0D2B33` + Canvas | 200px | 200px | center | center stack | 低 | fadeInUp stagger | CTA光彩 blur 48px |
| — | FOOTER | `#0D2B33` | 64px | 32px | left | flex columns | 低 | none | — |

---

## 4. シーケンス検証

### 色のリズム
```
□ #FFFFFF (SIGNAL)     → □ #FFFFFF (TRUSTED BY)   → □ #F5F7F8 (NOISE)
→ ■ #497E92 (SIFT)    → □ #FFFFFF (PROOF)         → □ #F5F7F8 (THREE SIGNALS)
→ □ #E8F0F3 (VOICES)  → □ #FFFFFF (FLOW)          → ■ #0D2B33 (FIND SIGNAL)
```
- 白ベース5セクション / オフホワイト2セクション / カラー1セクション / ダーク1セクション
- SIFT(ブランドカラー)とFIND SIGNAL(ダーク)が2つの視覚アンカー

### 余白のリズム v3（波形パターン）
```
160/120 → 48/0 → 120/120 → 160/160 → 80/80 → 200/200 → 80/80 → 120/120 → 200/200
  大       引締    中        大        休憩     最大       休憩     中         最大
```

v2→v3の主要変更:
- PROOF: 100/100 → **80/80**（数字は「最初からそこにある」。余白を縮めて密着感を強化）
- THREE SIGNALS: 160/160 → **200/200**（最重要コンテンツ。大余白で「空気を持たせる」）
- VOICES: 100/100 → **80/80**（マーキーは帯として機能。余白は控えめに）
- FIND SIGNAL: 160/160 → **200/200**（最終CTAの前に十分な呼吸）
- TRUSTED BY: 48/64 → **48/0**（遷移帯がbottomにあるため、padding-bottom不要）

### padding波形の可視化
```
200 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ╱█╲─ ─ ─ ─ ─ ─ ─ ╱█╲
160 ─╱█╲─ ─ ─ ─ ╱█╲─ ─ ─ ╱  ╲─ ─ ─ ─ ─ ─ ─ ╱  ╲
120 ─╲  ╲─ ─ ╱█╲╲  ╲─ ─ ─    ─ ─ ─ ─╱█╲─ ─ ─
 80 ─ ─ ─ ─╱  ╲╲  ─╱█╲─ ─ ─╱█╲─ ─ ─╲  ╲─ ─ ─
 48 ─ ─╱█╲─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
     SIG TRU NOI  SIFT PRO  3SIG VOI  FLOW FIND
```

### テキスト配置の変化
```
left(SIG) → center(TRU) → left(NOI) → center(SIFT) → left(PRO)
→ left(3SIG) → left(VOI) → left(FLOW) → center(FIND)
```
- 左揃え: **6セクション** / 中央揃え: **3セクション**
- KAGAMI実測値（左142回:中央29回 = 83%:17%）に対して、v3は67%:33%。
  CTA・核心価値のみ中央揃えを許可

### 密度の緩急
```
低(SIG) → 最低(TRU) → 中(NOI) → 高(SIFT) → 低(PRO)
→ 高(3SIG) → 中(VOI) → 中(FLOW) → 低(FIND)
```
- 高密度ピーク2つ（SIFT, THREE SIGNALS）が中盤に配置
- 低密度の「呼吸」が3箇所（SIGNAL, PROOF, FIND SIGNAL）

### モーションの緩急
```
fadeInUp(SIG) → marquee(TRU) → slideInLeft(NOI) → scaleUp(SIFT)
→ countUp(PRO) → slideIn左右交互(3SIG) → marquee(VOI)
→ fadeInUp(FLOW) → fadeInUp(FIND)
```
- 同じアニメーションが隣接しない（fadeInUpはSIGNAL→3セクション空き→FLOW→1空き→FIND）
- THREE SIGNALSは**Signal01: slideInLeft, 02: slideInRight, 03: slideInLeft**で交互

### レイアウト方式の変化（v3の核心改善）

```
2col 55:45 → fullbleed → 2col 38:62(sticky) → center → 4col非均一
→ 2col交互48:52/52:48 → fullbleed → timeline+2col 30:70 → center
```

v2は「grid 55:45」が3セクション連続で単調だった。v3は9セクション全てが異なるグリッド比率を持つ:

| セクション | グリッド比率 | v2からの変更 |
|---|---|---|
| SIGNAL | 55:45 | 維持 |
| TRUSTED BY | fullbleed | 維持 |
| NOISE | **38:62** (sticky H2) | v2 40:60 → 38:62に微調整。見出しカラムを更に狭く |
| SIFT | center (100%) | 維持 |
| PROOF | **非均一4列** (auto幅) | v2 4等分 → 数値ごとに自然幅で配置。4つ目は下段右寄せ |
| THREE SIGNALS | **48:52 交互反転** | v2 55:45固定 → 01(T左:V右) / 02(V左:T右) / 03(T左:V右) |
| VOICES | fullbleed marquee | 維持 |
| FLOW | timeline + **30:70** | 維持 |
| FIND SIGNAL | center (100%) | 維持 |

---

## 5. グラデーション遷移帯 v3

| 位置 | from | to | 高さ | 実装 |
|---|---|---|---|---|
| TRUSTED BY → NOISE | `#FFFFFF` | `#F5F7F8` | 80px | `linear-gradient(180deg, #FFFFFF, #F5F7F8)` |
| NOISE → SIFT | `#F5F7F8` | `#497E92` | 120px | `linear-gradient(180deg, #F5F7F8, #6A9AAB 40%, #497E92)` 中間色を挟んで2段階 |
| SIFT → PROOF | `#3A6575` | `#FFFFFF` | 120px | `linear-gradient(180deg, #3A6575, #9AB5C0 50%, #FFFFFF)` 中間色挟み |
| PROOF → THREE SIGNALS | `#FFFFFF` | `#F5F7F8` | 80px | `linear-gradient(180deg, #FFFFFF, #F5F7F8)` |
| THREE SIGNALS → VOICES | `#F5F7F8` | `#E8F0F3` | 64px | `linear-gradient(180deg, #F5F7F8, #E8F0F3)` |
| VOICES → FLOW | `#E8F0F3` | `#FFFFFF` | 64px | `linear-gradient(180deg, #E8F0F3, #FFFFFF)` |
| FLOW → FIND SIGNAL | `#FFFFFF` | `#0D2B33` | 160px | `linear-gradient(180deg, #FFFFFF, #1A4A55 30%, #0D2B33)` 段階的暗転 |

v2→v3変更:
- 色差が大きい遷移帯(NOISE→SIFT, SIFT→PROOF, FLOW→FIND)に**中間色を挿入**
- 色差が小さい遷移帯(THREE SIGNALS→VOICES, VOICES→FLOW)を80px→**64px**に短縮

---

## 6. ブランド識別装飾: UZOUドットアイコン

KAGAMIの「角丸正方形 in 角丸正方形」ドットアイコンをUZOU仕様に翻訳。

```css
/* ドットアイコン構造 */
.section-dot {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: rgba(73, 126, 146, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.section-dot::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: #497E92;
}
```

使用箇所:
- NOISE, SIFT, PROOF, THREE SIGNALS, VOICES, FLOW の各セクション見出し左
- ヘッダーCTA右端
- ブランドラベル

---

## 7. UIコンポーネント状態マトリクス v3

### CTAボタン（主: コーラル背景）

| 状態 | background | color | border | box-shadow | transform | transition |
|---|---|---|---|---|---|---|
| Default | `#E07B5A` | `#FFFFFF` | none | `0 8px 32px rgba(224,123,90,0.25)` | none | — |
| Hover | `#C96A4D` | `#FFFFFF` | none | `0 12px 48px rgba(224,123,90,0.35)` | `translateY(-2px)` | 250ms `cubic-bezier(0.25,0.46,0.45,0.94)` |
| Active | `#B85E44` | `#FFFFFF` | none | `0 4px 20px rgba(224,123,90,0.20)` | `translateY(0)` | 100ms ease-out |
| Focus | `#E07B5A` | `#FFFFFF` | none | `0 8px 32px rgba(224,123,90,0.25), 0 0 0 3px rgba(73,126,146,0.4)` | none | — |

### CTAボタン（主: コーラル背景）— ダーク上

| 状態 | background | box-shadow | transform |
|---|---|---|---|
| Default | `#E07B5A` | `0 8px 48px rgba(224,123,90,0.35)` | none |
| Hover | `#C96A4D` | `0 12px 56px rgba(224,123,90,0.45)` | `translateY(-2px)` |

### カード — ライト背景上

| 状態 | background | border-radius | box-shadow | transform |
|---|---|---|---|---|
| Default | `#FFFFFF` | `6px 24px 24px 6px` | `0 4px 24px rgba(73,126,146,0.10)` | none |
| Hover | `#FFFFFF` | `6px 24px 24px 6px` | `0 8px 40px rgba(73,126,146,0.15)` | `translateY(-4px)` |

### カード — ティール背景上（SIFTセクション）

| 状態 | background | backdrop-filter | border | box-shadow |
|---|---|---|---|---|
| Default | `rgba(255,255,255,0.08)` | `blur(16px)` | `1px solid rgba(255,255,255,0.12)` | `0 4px 24px rgba(0,20,30,0.15)` |
| Hover | `rgba(255,255,255,0.14)` | `blur(16px)` | `1px solid rgba(255,255,255,0.22)` | `0 8px 32px rgba(0,20,30,0.20)` |

---

## 8. アニメーション共通パラメータ v3

| 用途 | イージング | duration | 備考 |
|---|---|---|---|
| 入場（fadeInUp） | `cubic-bezier(0.16, 1, 0.3, 1)` | 600ms | stagger間隔: 150-200ms |
| 入場（slideInLeft/Right） | `cubic-bezier(0.16, 1, 0.3, 1)` | 500ms | stagger間隔: 120ms |
| 入場（scaleUp） | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms | stagger間隔: 80ms |
| ホバー | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 250ms | — |
| マーキー | `linear` | 35-45s | infinite |
| countUp | `ease-out` | 1200ms | rAF |

