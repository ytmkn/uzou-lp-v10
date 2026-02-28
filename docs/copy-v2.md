# コピー骨格 v2: UZOU LP — Sift

> 作成日: 2026-02-28
> ベース: v11コンセプト「Sift — 有象無象を、見極める知性」承認済みコピー
> 変更点: 既存コピーを維持。KAGAMI技法取り込みに伴うレイアウト変更はないが、コピーの「視覚的サイズ」の指定を追加

---

## コピーライティング方針

### トーンルール
- **主語の切り替え**: 「UZOU」を主語にする箇所と「あなた（広告主/メディア）」を主語にする箇所を意図的に交替
- **硬さ**: 広告業界の専門用語を使うが、説明的すぎない。プロが読むことを前提
- **リズム**: 短い文を重ねる。1文20文字以内を基本。体言止め・倒置を適度に
- **名前の由来との接続**: 「有象無象」「ノイズ」「シグナル」「見極める」のワードが一貫して登場

---

## 1. SIGNAL（ヒーロー）

### キャッチコピー（決定済み）
**ノイズの中から、シグナルを。**

- font: Zen Kaku Gothic New
- size: `clamp(36px, 6vw, 72px)`
- weight: 700
- letter-spacing: `-0.03em`
- color: `#0D2B33`
- 文字数: 13文字。左寄せ。2行に折り返し

### サブコピー
**500を超えるメディアと直接接続。独自AIが最適な配信先を見つけ出し、広告の成果を最大化するネイティブ広告プラットフォーム。**

- font: Noto Sans JP
- size: `clamp(14px, 1.5vw, 17px)`
- weight: 400
- letter-spacing: `0.02em`
- color: `#1A3A44`
- max-width: 480px

### ブランドラベル
**UZOU** — ネイティブアド配信プラットフォーム

- font: Plus Jakarta Sans
- size: 13px
- weight: 600
- letter-spacing: `+0.12em`
- color: `#497E92`
- text-transform: uppercase

### CTA
| 種別 | テキスト | 視覚処理 |
|---|---|---|
| 主CTA | **資料をダウンロード** | コーラル`#E07B5A`背景。光彩`0 8px 32px rgba(224,123,90,0.25)`。border-radius: 6px |
| 副CTA | **まずは相談する** | transparent背景。border: 1px solid `rgba(13,43,51,0.2)`。border-radius: 6px |

---

## 2. TRUSTED BY

### ラベル
**TRUSTED BY 500+ MEDIA**

- font: Plus Jakarta Sans
- size: 11px
- weight: 600
- letter-spacing: `+0.15em`
- color: `#497E92`
- text-transform: uppercase

ロゴマーキー（2列、上下逆方向スクロール）。テキストは不要。

---

## 3. NOISE（課題セクション）

### H2
**その広告、届いていますか。**

- font: Zen Kaku Gothic New
- size: `clamp(24px, 3.5vw, 40px)`
- weight: 700
- letter-spacing: `-0.02em`
- color: `#1A3A44`
- position: sticky（左40%カラム、上揃え固定）

### 課題ラベル
| ラベル | font | size | weight | letter-spacing |
|---|---|---|---|---|
| **広告主: 届かない3つの理由** | Plus Jakarta Sans + Noto Sans JP | `clamp(11px, 1vw, 13px)` | 600 | `+0.10em` |
| **メディア: 活かせない3つの壁** | 同上 | 同上 | 同上 | 同上 |

### 課題本文（各3点）

**広告主の課題**:
1. 配信先メディアの質が見えず、ブランド毀損のリスクがある
2. CPAの改善が頭打ち。新しい配信チャネルが見つからない
3. 広告効果のレポーティングが煩雑で、PDCAが回しにくい

**メディアの課題**:
1. 広告単価が低く、良質なコンテンツへの投資が難しい
2. ユーザー体験を損なう広告が多く、離脱率が上がっている
3. 広告枠の収益最適化に手が回らない

- font: Noto Sans JP
- size: 16px
- weight: 400
- line-height: 1.8
- color: `#1A3A44`

---

## 4. SIFT（核心価値セクション）

### H2
**有象無象を、見極める。**

- font: Zen Kaku Gothic New
- size: `clamp(32px, 5vw, 64px)`
- weight: 700
- letter-spacing: `-0.03em`
- color: `#F5F7F8`
- `background: linear-gradient(90deg, #F5F7F8, #E8F0F3)` + `background-clip: text`（テキストグラデーション。KAGAMI技法）

### サブテキスト
**UZOUは広告主とメディアを直接接続し、AIが最適なマッチングを行う。中間業者のない、最短距離の配信基盤。**

- font: Noto Sans JP
- size: `clamp(14px, 1.5vw, 17px)`
- weight: 400
- letter-spacing: `0.02em`
- color: `rgba(245,247,248,0.85)`

### 図解ノードラベル
| ノード | ラベル |
|---|---|
| 広告主群（左3ノード） | 配信目標 / クリエイティブ / 予算 |
| UZOU AI（中央大ノード） | CTR/CVR/視認性 総合分析 → 最適配信先リアルタイム選定 |
| メディア群（右3ノード） | 記事コンテンツ / ユーザー属性 / 閲覧文脈 |

---

## 5. PROOF（数値実績）

### セクションラベル
**PROOF**

- font: Plus Jakarta Sans
- size: 11px
- weight: 600
- letter-spacing: `+0.15em`
- color: `#497E92`
- text-transform: uppercase

### 数値カード（4つ、不均一配置）

| 数値 | ラベル | font-size | 配置 |
|---|---|---|---|
| **500+** | CONNECTED MEDIA | `clamp(56px, 11vw, 128px)` w800 | 上段左 |
| **90%+** | RETENTION RATE | 同上 | 上段中央 |
| **4x** | REVENUE GROWTH | 同上 | 上段右 |
| **250+** | ACTIVE ADVERTISERS | 同上 | 下段右寄せ |

- 数値color: `#0D2B33`
- text-shadow: `0 0 60px rgba(73,126,146,0.15)`（有彩色グロー。KAGAMI技法翻訳）
- ラベルcolor: `#497E92` opacity 0.6
- ラベルfont: Plus Jakarta Sans, 13px, w600, ls: `+0.12em`, uppercase

---

## 6. THREE SIGNALS（機能紹介）

### H2
**UZOUが見つけ出す、3つのシグナル。**

- font: Zen Kaku Gothic New
- size: `clamp(24px, 3vw, 36px)`
- weight: 700
- letter-spacing: `-0.02em`
- color: `#1A3A44`

### 機能ブロック（3つ）

**Signal 01: AIが、最適解を見つけ出す。**
CTR・CVR・視認性を総合的に分析。配信先の選定から入札単価の最適化まで、AIがリアルタイムに判断。人手では不可能な精度で、広告効果を最大化します。

**Signal 02: 500メディアと、直接つながる。**
中間業者を介さず、優良メディアと直接接続。広告の配信先を透明化し、ブランドセーフティを担保。メディアにとっても高単価な広告収益を実現します。

**Signal 03: 専任チームが、伴走する。**
アカウント開設から配信最適化まで、専任担当者がフルサポート。月次レポートと改善提案で、継続的な成果向上を支援します。

- ナンバリング「01」「02」「03」: Plus Jakarta Sans, w300, 72px, color: `#497E92` opacity 0.12
- H3: Zen Kaku Gothic New, `clamp(20px, 2.5vw, 28px)`, w500, ls: `-0.01em`
- 本文: Noto Sans JP, 16px, w400, lh: 1.8

---

## 7. VOICES（導入企業の声）

### H2
**精度を証明する、声。**

- font: Zen Kaku Gothic New
- size: `clamp(20px, 2.5vw, 28px)`
- weight: 700
- letter-spacing: `-0.02em`
- color: `#1A3A44`
- 左寄せ

### 引用カード（3枚、マーキーで横流れ）

**Voice 1（広告主: EC業種）**:
> 「CPA が30%改善。配信先の質が明らかに違います。」
> — EC事業部 マーケティングマネージャー

**Voice 2（広告主: 金融業種）**:
> 「レポートの透明性が段違い。PDCAが高速で回せるようになりました。」
> — デジタルマーケティング部 部長

**Voice 3（メディア）**:
> 「広告単価が導入前比で40%向上。コンテンツ投資に回せる原資が増えました。」
> — メディア事業部 収益責任者

- 引用符: Plus Jakarta Sans, 48px, w300, color: `#E07B5A` opacity 0.4（コーラルの引用符）
- 引用文: Noto Sans JP, `clamp(15px, 1.5vw, 18px)`, w400
- 企業名: Plus Jakarta Sans, 13px, w600, ls: `+0.08em`

---

## 8. FLOW（導入フロー + FAQ）

### H2（上半分）
**導入の流れ**

### ステップ（4つ、横タイムライン）
| Step | タイトル | 補足 |
|---|---|---|
| 01 | お問い合わせ | フォームまたはお電話でご連絡ください |
| 02 | ヒアリング | 課題・目標・予算をお聞かせください |
| 03 | タグ設置 | 最短1週間でアカウント開設完了 |
| 04 | 配信開始 | AIが自動最適化。専任担当者が伴走します |

### H2（下半分）
**よくある質問**

### FAQ（5問）

| Q | A |
|---|---|
| 導入にどのくらい時間がかかりますか？ | 最短1週間。タグ設置とアカウント設定のみで完了します。 |
| 最低出稿金額はありますか？ | 予算やニーズに合わせて柔軟に対応しています。まずはご相談ください。 |
| どのような業種に対応していますか？ | EC、金融、不動産、人材、教育など幅広い業種に対応しています。 |
| レポートはどのくらいの頻度で共有されますか？ | リアルタイムダッシュボードでいつでも確認可能。加えて月次の詳細レポートと改善提案を専任担当者からお届けします。 |
| 既存の広告運用と併用できますか？ | はい。既存チャネルを継続しながら、UZOUを追加の配信チャネルとして活用できます。 |

---

## 9. FIND YOUR SIGNAL（最終CTA）

### H2
**あなたのシグナルを、見つけよう。**

- font: Zen Kaku Gothic New
- size: `clamp(28px, 4.5vw, 56px)`
- weight: 700
- letter-spacing: `-0.03em`
- color: `#E8F0F3`

### サブコピー
**まずは資料をご覧ください。UZOUがどう成果を変えるか、具体的にお伝えします。**

- font: Noto Sans JP
- size: `clamp(14px, 1.5vw, 17px)`
- weight: 400
- color: `rgba(232,240,243,0.75)`

### CTA
| 種別 | テキスト | 視覚処理 |
|---|---|---|
| 主CTA | **資料をダウンロード** | コーラル`#E07B5A`背景。光彩`0 8px 40px rgba(224,123,90,0.35)`。border-radius: 6px |
| 副CTA | **まずは相談する** | transparent。border: 1px solid `rgba(232,240,243,0.3)`。border-radius: 6px |

---

## 10. ヘッダーナビゲーション

- UZOU ロゴ（左）
- ナビリンク: UZOUとは(#sift) / 特徴(#three-signals) / 実績(#proof) / 導入の流れ(#flow) / FAQ(#faq)
- CTA: **お問い合わせ**（副） / **資料ダウンロード**（主、コーラル背景）

