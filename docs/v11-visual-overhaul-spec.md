現状のコードを全て把握しました。設計書を作成します。

---

# UZOU LP v11 Award受賞レベル技法指定書

## 現状診断サマリー

| 問題 | 根本原因 |
|---|---|
| ヒーローが白背景で弱い | `background: radial-gradient(...0.04...) #FFFFFF` -- opacity 0.04は知覚できない |
| TRUSTED BYがテンプレ感 | 矩形+テキストのみ。SVGにロゴ的造形が皆無 |
| THREE SIGNALSのSVGが薄い | `opacity="0.2"` `opacity="0.3"` -- 全体的に存在感がない |
| FLOWが01-02-03-04横並び | SaaSテンプレートの典型構造 |
| セクション間の色リズムが単調 | 白→薄灰→ティール→白→薄灰→薄ティール→白→深色 -- 前半に白/薄色が連続 |
| 装飾密度が低い | 背景レイヤーが1-2層。Award受賞サイトは4-6層 |

---

## 1. ヒーロー (SIGNAL) の劇的強化

### HTML変更

```html
<!-- セクション1: SIGNAL（ヒーロー） - 全面改修 -->
<section class="signal" data-section="signal" data-theme="dark" id="signal">
  <!-- 背景レイヤー群 -->
  <div class="signal__bg-mesh" aria-hidden="true"></div>
  <div class="signal__bg-grain" aria-hidden="true"></div>
  <div class="signal__bg-grid" aria-hidden="true"></div>
  <div class="signal__glow" aria-hidden="true"></div>
  <div class="signal__glow signal__glow--accent" aria-hidden="true"></div>

  <!-- 浮遊ポリゴン装飾 -->
  <div class="signal__crystal-decorations" aria-hidden="true">
    <svg class="crystal-deco crystal-deco--1" viewBox="0 0 120 120" fill="none">
      <polygon points="60,5 115,45 95,110 25,110 5,45" stroke="rgba(73,126,146,0.25)" stroke-width="0.75" fill="rgba(73,126,146,0.03)"/>
      <polygon points="60,20 100,50 85,100 35,100 20,50" stroke="rgba(73,126,146,0.12)" stroke-width="0.5" fill="none"/>
    </svg>
    <svg class="crystal-deco crystal-deco--2" viewBox="0 0 80 80" fill="none">
      <polygon points="40,4 76,28 66,72 14,72 4,28" stroke="rgba(196,96,61,0.20)" stroke-width="0.75" fill="rgba(196,96,61,0.02)"/>
    </svg>
    <svg class="crystal-deco crystal-deco--3" viewBox="0 0 60 60" fill="none">
      <polygon points="30,3 57,22 48,55 12,55 3,22" stroke="rgba(73,126,146,0.18)" stroke-width="0.75" fill="rgba(73,126,146,0.02)"/>
    </svg>
    <svg class="crystal-deco crystal-deco--4" viewBox="0 0 100 100" fill="none">
      <polygon points="50,8 92,35 80,88 20,88 8,35" stroke="rgba(232,240,243,0.08)" stroke-width="0.5" fill="none"/>
    </svg>
    <svg class="crystal-deco crystal-deco--5" viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 38,15 32,38 8,38 2,15" stroke="rgba(196,96,61,0.15)" stroke-width="0.5" fill="rgba(196,96,61,0.015)"/>
    </svg>
  </div>

  <div class="signal__container">
    <div class="signal__text">
      <span class="signal__brand-label">
        <span class="signal__brand-label-line" aria-hidden="true"></span>
        UZOU
      </span>
      <h1 class="signal__heading" data-split="true">ノイズの中から、シグナルを。</h1>
      <p class="signal__subcopy">500を超えるメディアと直接接続。独自AIが最適な配信先を見つけ出し、広告の成果を最大化するネイティブ広告プラットフォーム。</p>
      <div class="signal__cta-group">
        <a href="#find-signal" class="btn-primary">資料をダウンロード</a>
        <a href="#find-signal" class="btn-secondary btn-secondary--dark">まずは相談する</a>
      </div>
    </div>
    <div class="signal__visual">
      <div class="signal__crystal-glow" aria-hidden="true"></div>
      <div class="signal__crystal-ring" aria-hidden="true"></div>
      <img src="assets/crystal-cluster.png" alt="UZOUクリスタルクラスター" class="signal__crystal-img" width="540" height="540">
      <canvas class="signal__canvas" aria-hidden="true"></canvas>
    </div>
  </div>

  <!-- スクロールインジケーター -->
  <div class="signal__scroll-indicator" aria-hidden="true">
    <div class="signal__scroll-line"></div>
  </div>
</section>
```

### CSS変更

```css
/* ========= ヒーロー全面改修 ========= */

/* data-theme="dark" に変更。背景を深色ベースに */
.signal {
  background: #080E12;
  /* #080E12: --color-deepより更に深い。純黒ではない有色黒 */
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

/* メッシュグラデーション背景: 5層 */
.signal__bg-mesh {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 80% 60% at 25% 75%, rgba(73,126,146,0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 75% 20%, rgba(73,126,146,0.08) 0%, transparent 55%),
    radial-gradient(ellipse 50% 50% at 60% 50%, rgba(196,96,61,0.06) 0%, transparent 50%),
    radial-gradient(ellipse 90% 40% at 50% 100%, rgba(13,43,51,0.40) 0%, transparent 60%),
    radial-gradient(ellipse 120% 80% at 50% 0%, rgba(73,126,146,0.10) 0%, transparent 70%);
  /* 層1: 左下にティールの柔光。層2: 右上にティールの補助光。
     層3: 中央右にコーラルの暖色混入。層4: 下部に深色のヴィネット。
     層5: 上部に微光のアンビエント */
}

/* 微細グレインテクスチャ */
.signal__bg-grain {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.035;
  filter: url(#noise-dark);
  pointer-events: none;
  mix-blend-mode: overlay;
}

/* ドットグリッドパターン */
.signal__bg-grid {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-image: radial-gradient(circle, rgba(73,126,146,0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 70%);
  /* ドットグリッドは中央から外に向かって消える。無限に広がるグリッドの印象を回避 */
}

/* アンビエントグロー: ティール */
.signal__glow {
  position: absolute;
  width: 1000px;
  height: 1000px;
  border-radius: 9999px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(73, 126, 146, 0.15) 0%,
    rgba(73, 126, 146, 0.06) 35%,
    transparent 65%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  transition: left 1.2s cubic-bezier(0.16, 1, 0.3, 1), top 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  left: 30%;
  top: 60%;
}

/* アンビエントグロー: コーラルアクセント */
.signal__glow--accent {
  width: 600px;
  height: 600px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(196, 96, 61, 0.08) 0%,
    rgba(196, 96, 61, 0.03) 40%,
    transparent 65%
  );
  left: 70%;
  top: 30%;
  transition: left 1.5s cubic-bezier(0.16, 1, 0.3, 1), top 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 浮遊ポリゴン: 5個に増量 */
.crystal-deco--1 {
  width: 160px;
  top: 8%;
  right: 8%;
  opacity: 0.7;
  animation: float-polygon-1 14s ease-in-out infinite;
}
.crystal-deco--2 {
  width: 100px;
  bottom: 15%;
  left: 5%;
  opacity: 0.6;
  animation: float-polygon-2 18s ease-in-out infinite;
}
.crystal-deco--3 {
  width: 70px;
  top: 55%;
  right: 22%;
  opacity: 0.5;
  animation: float-polygon-1 22s ease-in-out infinite;
  animation-delay: -5s;
}
.crystal-deco--4 {
  width: 200px;
  top: 15%;
  left: 15%;
  opacity: 0.3;
  animation: float-polygon-2 25s ease-in-out infinite;
  animation-delay: -8s;
}
.crystal-deco--5 {
  width: 50px;
  bottom: 25%;
  right: 35%;
  opacity: 0.5;
  animation: float-polygon-1 16s ease-in-out infinite;
  animation-delay: -3s;
}

@keyframes float-polygon-1 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(4deg); }
  66% { transform: translateY(8px) rotate(-3deg); }
}
@keyframes float-polygon-2 {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  50% { transform: translateY(-25px) rotate(6deg) scale(1.02); }
}

/* コンテナ */
.signal__container {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 0;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 160px var(--container-padding) 100px;
  min-height: 100vh;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* ブランドラベル: 横線つき */
.signal__brand-label {
  font-family: var(--font-heading-en);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  line-height: 1.0;
  color: var(--color-brand);
  text-transform: uppercase;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.signal__brand-label-line {
  display: block;
  width: 32px;
  height: 1px;
  background: var(--color-brand);
  opacity: 0.5;
}

/* ヒーロー見出し: ダーク背景用 */
.signal__heading {
  font-family: var(--font-heading-ja);
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.15;
  color: #F0F4F6;
  /* 純白ではなくティールが微量混じった白 */
  margin-bottom: 32px;
  font-feature-settings: "palt";
}

.signal__heading .char {
  display: inline-block;
  opacity: 0;
  transform: translateY(48px) rotate(2deg);
  animation: heroCharIn 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  /* translateY 32px→48px, rotate追加。より大胆な登場 */
}

@keyframes heroCharIn {
  from {
    opacity: 0;
    transform: translateY(48px) rotate(2deg);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
    filter: blur(0px);
  }
}

/* サブコピー */
.signal__subcopy {
  font-family: var(--font-body-ja);
  font-size: clamp(14px, 1.5vw, 17px);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.8;
  color: rgba(232, 240, 243, 0.75);
  /* 白ではなく減退させた白。ヒエラルキー用 */
  max-width: 480px;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(32px);
  animation: fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 500ms;
}

/* CTAグループ */
.signal__cta-group {
  display: flex;
  gap: 16px;
  align-items: center;
  opacity: 0;
  transform: translateY(32px);
  animation: fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 700ms;
}

/* ダーク背景上のセカンダリボタン */
.btn-secondary--dark {
  color: rgba(232, 240, 243, 0.85);
  border: 1px solid rgba(232, 240, 243, 0.20);
}
.btn-secondary--dark:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* クリスタルビジュアル強化 */
.signal__visual {
  position: relative;
  width: 100%;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* クリスタル周囲グロー */
.signal__crystal-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 9999px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(73, 126, 146, 0.20) 0%,
    rgba(73, 126, 146, 0.08) 40%,
    rgba(196, 96, 61, 0.03) 60%,
    transparent 75%
  );
  z-index: 1;
  pointer-events: none;
  animation: crystal-glow-pulse 6s ease-in-out infinite;
}

@keyframes crystal-glow-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
}

/* クリスタル周囲リング */
.signal__crystal-ring {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 9999px;
  border: 1px solid rgba(73, 126, 146, 0.12);
  z-index: 1;
  pointer-events: none;
  animation: ring-rotate 30s linear infinite;
}
.signal__crystal-ring::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--color-accent);
  box-shadow: 0 0 12px rgba(196, 96, 61, 0.6);
}

@keyframes ring-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* クリスタル画像 */
.signal__crystal-img {
  position: relative;
  z-index: 2;
  max-width: 100%;
  width: 500px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 40px rgba(73, 126, 146, 0.35)) drop-shadow(0 0 80px rgba(73, 126, 146, 0.15));
  animation: crystal-float 8s ease-in-out infinite;
}

@keyframes crystal-float {
  0%, 100% {
    transform: translateY(0);
    filter: drop-shadow(0 0 40px rgba(73, 126, 146, 0.35)) drop-shadow(0 0 80px rgba(73, 126, 146, 0.15));
  }
  50% {
    transform: translateY(-12px);
    filter: drop-shadow(0 0 50px rgba(73, 126, 146, 0.40)) drop-shadow(0 0 100px rgba(73, 126, 146, 0.20)) brightness(1.06);
  }
}

/* Canvas */
.signal__canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

/* スクロールインジケーター */
.signal__scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.signal__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, rgba(73,126,146,0.4) 0%, transparent 100%);
  animation: scroll-pulse 2s ease-in-out infinite;
}
@keyframes scroll-pulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50% { opacity: 0.8; transform: scaleY(1.2); transform-origin: top; }
}
```

### JS変更

```javascript
/* Canvasパーティクル: 色と密度を強化 */
const NETWORK_CONFIG = {
  particleCount: 90,          /* 60→90 */
  connectionDistance: 140,     /* 120→140 */
  particleSpeed: 0.25,         /* 0.3→0.25（やや遅く）*/
  particleSizeRange: [1.5, 4], /* [2,5]→[1.5,4]（上限を下げて繊細に）*/
  highlightCount: 6,           /* 4→6 */
  highlightInterval: 2500,     /* 3000→2500 */
  colors: {
    node: 'rgba(73, 126, 146, 0.60)',       /* 0.50→0.60 */
    nodeFill: 'rgba(73, 126, 146, 0.15)',   /* 0.20→0.15（fillは控えめに）*/
    connection: 'rgba(73, 126, 146, 0.10)', /* 0.14→0.10（線は繊細に）*/
    highlightNode: '#C4603D',
    highlightConnection: 'rgba(196, 96, 61, 0.30)', /* 0.25→0.30 */
  },
};

/* マウス追従グロー: アクセントグローにも対応 */
function initAmbientGlow() {
  const signalGlows = document.querySelectorAll('.signal__glow');
  /* ... 既存ロジック + signal__glow--accent への追従（offsetあり） */
  if (!prefersReducedMotion) {
    document.addEventListener('mousemove', (e) => {
      signalGlows.forEach((glow, i) => {
        const section = glow.closest('.signal') || glow.closest('.find-signal');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          const offsetX = i === 0 ? 0 : -200;
          const offsetY = i === 0 ? 0 : -100;
          glow.style.left = (e.clientX + offsetX) + 'px';
          glow.style.top = (e.clientY - rect.top + offsetY) + 'px';
        }
      });
    });
  }
}
```

---

## 2. TRUSTED BY: リアルSVGロゴ

### HTML変更

8つのダミーロゴを、実在しないが「ロゴらしい造形」を持つSVGに差し替え。各ロゴはジャンルごとにデザイン言語を変える。

```html
<div class="trusted-by__marquee-track">
  <!-- 1. 新聞社ロゴ: セリフ体+縦線 -->
  <svg class="trusted-by__logo" width="140" height="28" viewBox="0 0 140 28" fill="none" aria-label="報道メディア">
    <line x1="0" y1="4" x2="0" y2="24" stroke="currentColor" stroke-width="2.5"/>
    <text x="10" y="20" fill="currentColor" font-family="Georgia, 'Times New Roman', serif" font-size="15" font-weight="700" letter-spacing="0.08em">NIKKEI PRIME</text>
  </svg>

  <!-- 2. 出版社ロゴ: アイコン+サンセリフ -->
  <svg class="trusted-by__logo" width="130" height="28" viewBox="0 0 130 28" fill="none" aria-label="出版メディア">
    <rect x="0" y="6" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <rect x="3" y="9" width="10" height="2" rx="1" fill="currentColor" opacity="0.4"/>
    <rect x="3" y="13" width="7" height="2" rx="1" fill="currentColor" opacity="0.3"/>
    <text x="22" y="20" fill="currentColor" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" letter-spacing="0.04em">SHUEISHA D</text>
  </svg>

  <!-- 3. エンタメロゴ: 星+ボールド -->
  <svg class="trusted-by__logo" width="150" height="28" viewBox="0 0 150 28" fill="none" aria-label="エンタメメディア">
    <polygon points="10,3 12.5,9 19,9 13.8,13 15.5,19.5 10,15.5 4.5,19.5 6.2,13 1,9 7.5,9" fill="currentColor" opacity="0.5"/>
    <text x="25" y="20" fill="currentColor" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" letter-spacing="0.02em">ORICON MEDIA</text>
  </svg>

  <!-- 4. スポーツロゴ: 斜体+ストライプ -->
  <svg class="trusted-by__logo" width="120" height="28" viewBox="0 0 120 28" fill="none" aria-label="スポーツメディア">
    <line x1="0" y1="24" x2="16" y2="24" stroke="currentColor" stroke-width="2.5"/>
    <line x1="2" y1="20" x2="12" y2="20" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
    <text x="0" y="16" fill="currentColor" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" letter-spacing="-0.01em" font-style="italic">SPORTS.jp</text>
  </svg>

  <!-- 5. ライフスタイルロゴ: 細字+ドット区切り -->
  <svg class="trusted-by__logo" width="140" height="28" viewBox="0 0 140 28" fill="none" aria-label="ライフスタイルメディア">
    <text x="0" y="20" fill="currentColor" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="300" letter-spacing="0.12em">LIFESTYLE</text>
    <circle cx="96" cy="17" r="1.5" fill="currentColor" opacity="0.4"/>
    <text x="102" y="20" fill="currentColor" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" letter-spacing="0.04em">NAVI</text>
  </svg>

  <!-- 6. ビジネスロゴ: 角括弧+キャピタル -->
  <svg class="trusted-by__logo" width="130" height="28" viewBox="0 0 130 28" fill="none" aria-label="ビジネスメディア">
    <path d="M2,6 L2,22 M2,6 L8,6 M2,22 L8,22" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <text x="14" y="19" fill="currentColor" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" letter-spacing="0.10em">BIZ JOURNAL</text>
    <path d="M128,6 L128,22 M128,6 L122,6 M128,22 L122,22" stroke="currentColor" stroke-width="1.5" fill="none"/>
  </svg>

  <!-- 7. ファッションロゴ: 極細字+大文字 -->
  <svg class="trusted-by__logo" width="110" height="28" viewBox="0 0 110 28" fill="none" aria-label="ファッションメディア">
    <text x="0" y="20" fill="currentColor" font-family="Georgia, 'Times New Roman', serif" font-size="16" font-weight="400" letter-spacing="0.20em">VOGUE.jp</text>
  </svg>

  <!-- 8. テックロゴ: モノスペース+スラッシュ -->
  <svg class="trusted-by__logo" width="120" height="28" viewBox="0 0 120 28" fill="none" aria-label="テックメディア">
    <text x="0" y="19" fill="currentColor" font-family="'SF Mono', 'Fira Code', monospace" font-size="11" font-weight="600" letter-spacing="0.06em">&lt;TECH/CRUNCH&gt;</text>
  </svg>

  <!-- 上記8つを複製（無限ループ用） -->
  <!-- ...同じ8つのSVGを繰り返し... -->
</div>
```

### CSS変更

```css
/* TRUSTED BYセクション: ヒーローがダークになったので接続を調整 */
.trusted-by {
  background-color: #080E12;
  /* ヒーローと同じ深色。シームレスに接続 */
  padding: 48px 0 0;
  position: relative;
}

.trusted-by__label {
  font-family: var(--font-heading-en);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  line-height: 1.0;
  color: rgba(73, 126, 146, 0.5);
  /* ダーク背景上なのでティールを減退 */
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 32px;
  padding: 0 var(--container-padding);
}

.trusted-by__logo {
  height: 28px;
  /* 24px→28px: もう少し存在感を */
  width: auto;
  flex-shrink: 0;
  opacity: 0.35;
  /* ダーク背景上では控えめに */
  color: #E8F0F3;
  transition: opacity 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.trusted-by__logo:hover {
  opacity: 0.65;
}

.trusted-by__marquee-track {
  gap: 72px;
  /* 64px→72px: ロゴ間の余白を広げて品位を上げる */
}

.trusted-by__transition {
  height: 100px;
  background: linear-gradient(180deg, #080E12 0%, #F5F7F8 100%);
  /* ダーク→ライトへの遷移 */
  margin-top: 64px;
}
```

---

## 3. THREE SIGNALS: SVGイラスト全面差し替え

### SVG 01: AI最適化 -- ニューラルネットワーク+データフロー

```html
<div class="three-signals__signal-visual">
  <svg viewBox="0 0 400 320" class="three-signals__illustration" fill="none" aria-hidden="true">
    <!-- 背景グリッド -->
    <defs>
      <pattern id="ts-grid-1" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(73,126,146,0.06)" stroke-width="0.5"/>
      </pattern>
      <linearGradient id="ts-grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#C4603D" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#C4603D" stop-opacity="0.03"/>
      </linearGradient>
      <filter id="ts-glow-1">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="400" height="320" fill="url(#ts-grid-1)"/>

    <!-- データ入力ストリーム（左側: 5本の水平線） -->
    <line x1="0" y1="60" x2="80" y2="60" stroke="#497E92" stroke-width="1" opacity="0.3" stroke-dasharray="4 3"/>
    <line x1="0" y1="100" x2="80" y2="100" stroke="#497E92" stroke-width="1" opacity="0.25" stroke-dasharray="4 3"/>
    <line x1="0" y1="140" x2="80" y2="140" stroke="#497E92" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 3"/>
    <line x1="0" y1="180" x2="80" y2="180" stroke="#497E92" stroke-width="1" opacity="0.2" stroke-dasharray="4 3"/>
    <line x1="0" y1="220" x2="80" y2="220" stroke="#497E92" stroke-width="1" opacity="0.3" stroke-dasharray="4 3"/>

    <!-- 入力ノード群 -->
    <circle cx="90" cy="60" r="6" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.08)"/>
    <circle cx="90" cy="100" r="6" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.08)"/>
    <circle cx="90" cy="140" r="8" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.10)"/>
    <circle cx="90" cy="180" r="5" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.06)"/>
    <circle cx="90" cy="220" r="6" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.08)"/>

    <!-- 中間層1 接続線 -->
    <line x1="96" y1="60" x2="174" y2="80" stroke="#497E92" stroke-width="0.75" opacity="0.20"/>
    <line x1="96" y1="100" x2="174" y2="80" stroke="#497E92" stroke-width="0.75" opacity="0.20"/>
    <line x1="96" y1="100" x2="174" y2="140" stroke="#497E92" stroke-width="1" opacity="0.25"/>
    <line x1="98" y1="140" x2="174" y2="80" stroke="#497E92" stroke-width="0.75" opacity="0.15"/>
    <line x1="98" y1="140" x2="174" y2="140" stroke="#C4603D" stroke-width="1.5" opacity="0.35"/>
    <line x1="98" y1="140" x2="174" y2="200" stroke="#497E92" stroke-width="1" opacity="0.20"/>
    <line x1="96" y1="180" x2="174" y2="140" stroke="#497E92" stroke-width="0.75" opacity="0.18"/>
    <line x1="96" y1="180" x2="174" y2="200" stroke="#497E92" stroke-width="0.75" opacity="0.20"/>
    <line x1="96" y1="220" x2="174" y2="200" stroke="#497E92" stroke-width="0.75" opacity="0.25"/>
    <line x1="96" y1="220" x2="174" y2="250" stroke="#497E92" stroke-width="0.75" opacity="0.18"/>

    <!-- 中間層1ノード -->
    <circle cx="180" cy="80" r="10" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.06)"/>
    <circle cx="180" cy="140" r="12" stroke="#C4603D" stroke-width="1.5" fill="url(#ts-grad-accent)"/>
    <circle cx="180" cy="200" r="10" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.06)"/>
    <circle cx="180" cy="250" r="7" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.04)"/>

    <!-- 中間層2 接続線 -->
    <line x1="190" y1="80" x2="264" y2="100" stroke="#497E92" stroke-width="0.75" opacity="0.20"/>
    <line x1="192" y1="140" x2="264" y2="100" stroke="#C4603D" stroke-width="1" opacity="0.25"/>
    <line x1="192" y1="140" x2="264" y2="160" stroke="#C4603D" stroke-width="1.5" opacity="0.35"/>
    <line x1="192" y1="140" x2="264" y2="220" stroke="#497E92" stroke-width="0.75" opacity="0.18"/>
    <line x1="190" y1="200" x2="264" y2="160" stroke="#497E92" stroke-width="0.75" opacity="0.20"/>
    <line x1="190" y1="200" x2="264" y2="220" stroke="#497E92" stroke-width="0.75" opacity="0.22"/>
    <line x1="187" y1="250" x2="264" y2="220" stroke="#497E92" stroke-width="0.75" opacity="0.15"/>

    <!-- 中間層2ノード -->
    <circle cx="270" cy="100" r="9" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.06)"/>
    <circle cx="270" cy="160" r="14" stroke="#C4603D" stroke-width="2" fill="url(#ts-grad-accent)" filter="url(#ts-glow-1)"/>
    <circle cx="270" cy="220" r="8" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.05)"/>

    <!-- 出力接続 -->
    <line x1="284" y1="160" x2="344" y2="140" stroke="#C4603D" stroke-width="2" opacity="0.4"/>
    <line x1="279" y1="100" x2="344" y2="140" stroke="#497E92" stroke-width="0.75" opacity="0.20"/>
    <line x1="278" y1="220" x2="344" y2="140" stroke="#497E92" stroke-width="0.75" opacity="0.15"/>

    <!-- 出力ノード: SIGNAL -->
    <circle cx="350" cy="140" r="20" stroke="#C4603D" stroke-width="2" fill="url(#ts-grad-accent)" filter="url(#ts-glow-1)"/>
    <circle cx="350" cy="140" r="28" stroke="rgba(196,96,61,0.12)" stroke-width="1" fill="none"/>

    <!-- 出力ストリーム（右側） -->
    <line x1="370" y1="140" x2="400" y2="140" stroke="#C4603D" stroke-width="2" opacity="0.4" stroke-dasharray="4 3"/>

    <!-- パルスアニメーション: 信号がネットワークを通過 -->
    <circle r="3" fill="#C4603D" opacity="0.8">
      <animateMotion dur="2.5s" repeatCount="indefinite" path="M90,140 L180,140 L270,160 L350,140"/>
      <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle r="2" fill="#497E92" opacity="0.6">
      <animateMotion dur="3s" repeatCount="indefinite" path="M90,60 L180,80 L270,100 L350,140" begin="0.8s"/>
      <animate attributeName="opacity" values="0;0.6;0.6;0" dur="3s" repeatCount="indefinite" begin="0.8s"/>
    </circle>

    <!-- ラベル -->
    <text x="45" y="268" fill="#497E92" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" letter-spacing="0.10em" opacity="0.4">DATA IN</text>
    <text x="160" y="290" fill="#497E92" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" letter-spacing="0.10em" opacity="0.4">ANALYSIS</text>
    <text x="330" y="185" fill="#C4603D" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" letter-spacing="0.10em" opacity="0.7">SIGNAL</text>
  </svg>
</div>
```

### SVG 02: 500メディアネットワーク -- ハブ&スポーク+軌道リング

```html
<div class="three-signals__signal-visual">
  <svg viewBox="0 0 400 320" class="three-signals__illustration" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="ts-hub-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#C4603D" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#C4603D" stop-opacity="0.02"/>
      </radialGradient>
      <filter id="ts-glow-2">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- 軌道リング (3重) -->
    <ellipse cx="200" cy="160" rx="80" ry="80" stroke="rgba(73,126,146,0.08)" stroke-width="0.75" fill="none"/>
    <ellipse cx="200" cy="160" rx="130" ry="130" stroke="rgba(73,126,146,0.06)" stroke-width="0.75" fill="none" stroke-dasharray="3 5"/>
    <ellipse cx="200" cy="160" rx="175" ry="145" stroke="rgba(73,126,146,0.04)" stroke-width="0.5" fill="none" stroke-dasharray="2 6"/>

    <!-- 接続線 (ハブ→各ノード) -->
    <line x1="200" y1="160" x2="80" y2="45" stroke="#497E92" stroke-width="0.75" opacity="0.15"/>
    <line x1="200" y1="160" x2="320" y2="40" stroke="#497E92" stroke-width="0.75" opacity="0.15"/>
    <line x1="200" y1="160" x2="50" y2="160" stroke="#497E92" stroke-width="0.75" opacity="0.12"/>
    <line x1="200" y1="160" x2="355" y2="130" stroke="#497E92" stroke-width="1" opacity="0.18"/>
    <line x1="200" y1="160" x2="90" y2="270" stroke="#497E92" stroke-width="0.75" opacity="0.15"/>
    <line x1="200" y1="160" x2="310" y2="270" stroke="#497E92" stroke-width="1" opacity="0.18"/>
    <line x1="200" y1="160" x2="370" y2="220" stroke="#497E92" stroke-width="0.75" opacity="0.12"/>
    <line x1="200" y1="160" x2="40" y2="100" stroke="#497E92" stroke-width="0.75" opacity="0.10"/>
    <line x1="200" y1="160" x2="160" y2="30" stroke="#497E92" stroke-width="0.75" opacity="0.12"/>
    <line x1="200" y1="160" x2="260" y2="300" stroke="#497E92" stroke-width="0.75" opacity="0.12"/>
    <line x1="200" y1="160" x2="340" y2="80" stroke="#497E92" stroke-width="0.75" opacity="0.15"/>
    <line x1="200" y1="160" x2="30" y2="220" stroke="#497E92" stroke-width="0.75" opacity="0.10"/>

    <!-- 外縁ノード群 (12個: 密度感) -->
    <circle cx="80" cy="45" r="8" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.08)"/>
    <circle cx="320" cy="40" r="10" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.08)"/>
    <circle cx="50" cy="160" r="6" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.05)"/>
    <circle cx="355" cy="130" r="9" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.08)"/>
    <circle cx="90" cy="270" r="7" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.06)"/>
    <circle cx="310" cy="270" r="11" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.08)"/>
    <circle cx="370" cy="220" r="5" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.04)"/>
    <circle cx="40" cy="100" r="5" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.04)"/>
    <circle cx="160" cy="30" r="7" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.06)"/>
    <circle cx="260" cy="300" r="6" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.05)"/>
    <circle cx="340" cy="80" r="8" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.06)"/>
    <circle cx="30" cy="220" r="4" stroke="#497E92" stroke-width="0.75" fill="rgba(73,126,146,0.03)"/>

    <!-- 微小ドット (散布的な密度) -->
    <circle cx="120" cy="80" r="2" fill="#497E92" opacity="0.15"/>
    <circle cx="280" cy="90" r="2.5" fill="#497E92" opacity="0.12"/>
    <circle cx="140" cy="230" r="2" fill="#497E92" opacity="0.10"/>
    <circle cx="300" cy="200" r="1.5" fill="#497E92" opacity="0.10"/>
    <circle cx="230" cy="50" r="2" fill="#497E92" opacity="0.12"/>
    <circle cx="170" cy="280" r="1.5" fill="#497E92" opacity="0.08"/>
    <circle cx="350" cy="170" r="1.5" fill="#497E92" opacity="0.08"/>
    <circle cx="60" cy="200" r="2" fill="#497E92" opacity="0.10"/>

    <!-- 中央ハブ -->
    <circle cx="200" cy="160" r="32" fill="url(#ts-hub-grad)" stroke="#C4603D" stroke-width="2" filter="url(#ts-glow-2)"/>
    <circle cx="200" cy="160" r="42" stroke="rgba(196,96,61,0.10)" stroke-width="0.75" fill="none"/>
    <text x="200" y="157" text-anchor="middle" fill="#C4603D" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" letter-spacing="0.08em">UZOU</text>
    <text x="200" y="170" text-anchor="middle" fill="#C4603D" font-size="8" font-family="'Plus Jakarta Sans', sans-serif" font-weight="400" opacity="0.6">HUB</text>

    <!-- パルス -->
    <circle r="2.5" fill="#C4603D" opacity="0.7">
      <animateMotion dur="2s" repeatCount="indefinite" path="M200,160 L355,130"/>
      <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle r="2.5" fill="#C4603D" opacity="0.7">
      <animateMotion dur="2.5s" repeatCount="indefinite" path="M200,160 L310,270" begin="0.5s"/>
      <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
    </circle>
    <circle r="2" fill="#497E92" opacity="0.5">
      <animateMotion dur="3s" repeatCount="indefinite" path="M80,45 L200,160" begin="1s"/>
      <animate attributeName="opacity" values="0;0.5;0.5;0" dur="3s" repeatCount="indefinite" begin="1s"/>
    </circle>

    <!-- 500+ ラベル -->
    <text x="200" y="310" text-anchor="middle" fill="#497E92" font-size="10" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" letter-spacing="0.12em" opacity="0.35">500+ MEDIA DIRECTLY CONNECTED</text>
  </svg>
</div>
```

### SVG 03: 専任サポート -- ダッシュボード+アドバイザー

```html
<div class="three-signals__signal-visual">
  <svg viewBox="0 0 400 320" class="three-signals__illustration" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ts-bar-grad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#497E92" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="#497E92" stop-opacity="0.30"/>
      </linearGradient>
      <linearGradient id="ts-bar-accent" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#C4603D" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#C4603D" stop-opacity="0.40"/>
      </linearGradient>
    </defs>

    <!-- ダッシュボードフレーム -->
    <rect x="20" y="25" width="260" height="200" rx="6" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.02)"/>
    <!-- タイトルバー -->
    <rect x="20" y="25" width="260" height="28" rx="6" fill="rgba(73,126,146,0.04)"/>
    <rect x="20" y="47" width="260" height="1" fill="rgba(73,126,146,0.08)"/>
    <!-- ウィンドウドット -->
    <circle cx="35" cy="39" r="3" fill="#C4603D" opacity="0.5"/>
    <circle cx="47" cy="39" r="3" fill="#497E92" opacity="0.3"/>
    <circle cx="59" cy="39" r="3" fill="#497E92" opacity="0.2"/>

    <!-- ミニチャート: 折れ線グラフ -->
    <polyline points="40,160 65,148 90,155 115,135 140,128 165,110 190,95 215,85 240,75 260,68"
      stroke="#C4603D" stroke-width="2" fill="none" opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- グラフ下のフィル -->
    <polygon points="40,160 65,148 90,155 115,135 140,128 165,110 190,95 215,85 240,75 260,68 260,190 40,190"
      fill="url(#ts-bar-accent)" opacity="0.3"/>

    <!-- バーチャート -->
    <rect x="40" y="170" width="18" height="40" rx="1" fill="url(#ts-bar-grad)"/>
    <rect x="68" y="160" width="18" height="50" rx="1" fill="url(#ts-bar-grad)"/>
    <rect x="96" y="150" width="18" height="60" rx="1" fill="url(#ts-bar-grad)"/>
    <rect x="124" y="138" width="18" height="72" rx="1" fill="url(#ts-bar-accent)"/>
    <rect x="152" y="148" width="18" height="62" rx="1" fill="url(#ts-bar-grad)"/>
    <rect x="180" y="155" width="18" height="55" rx="1" fill="url(#ts-bar-grad)"/>

    <!-- KPIカード群 -->
    <rect x="40" y="60" width="70" height="30" rx="3" fill="rgba(73,126,146,0.04)" stroke="rgba(73,126,146,0.10)" stroke-width="0.75"/>
    <text x="50" y="72" fill="#497E92" font-size="7" font-family="'Plus Jakarta Sans', sans-serif" opacity="0.5">CTR</text>
    <text x="50" y="84" fill="#C4603D" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">+48%</text>

    <rect x="120" y="60" width="70" height="30" rx="3" fill="rgba(73,126,146,0.04)" stroke="rgba(73,126,146,0.10)" stroke-width="0.75"/>
    <text x="130" y="72" fill="#497E92" font-size="7" font-family="'Plus Jakarta Sans', sans-serif" opacity="0.5">CVR</text>
    <text x="130" y="84" fill="#497E92" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">2.4x</text>

    <rect x="200" y="60" width="70" height="30" rx="3" fill="rgba(73,126,146,0.04)" stroke="rgba(73,126,146,0.10)" stroke-width="0.75"/>
    <text x="210" y="72" fill="#497E92" font-size="7" font-family="'Plus Jakarta Sans', sans-serif" opacity="0.5">ROAS</text>
    <text x="210" y="84" fill="#497E92" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">320%</text>

    <!-- 人物: 円+肩 -->
    <circle cx="335" cy="110" r="24" stroke="#497E92" stroke-width="1.5" fill="rgba(73,126,146,0.04)"/>
    <circle cx="335" cy="105" r="8" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.06)"/>
    <path d="M310,145 C310,130 360,130 360,145" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.03)"/>

    <!-- 会話バブル (3つ) -->
    <rect x="290" y="55" width="90" height="28" rx="6" stroke="#C4603D" stroke-width="1" fill="rgba(196,96,61,0.04)"/>
    <text x="335" y="73" text-anchor="middle" fill="#C4603D" font-size="8" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" opacity="0.7">OPTIMIZE</text>
    <polygon points="320,83 330,83 325,90" fill="rgba(196,96,61,0.04)" stroke="#C4603D" stroke-width="1"/>

    <!-- 接続の破線 -->
    <path d="M280,120 L305,115" stroke="#497E92" stroke-width="1" opacity="0.25" stroke-dasharray="3 3"/>
    <path d="M280,170 L310,155" stroke="#497E92" stroke-width="1" opacity="0.15" stroke-dasharray="3 3"/>

    <!-- サポートアクションアイコン群 -->
    <circle cx="330" cy="180" r="12" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.03)"/>
    <text x="330" y="183" text-anchor="middle" fill="#497E92" font-size="8" opacity="0.5">24h</text>

    <circle cx="330" cy="215" r="12" stroke="#497E92" stroke-width="1" fill="rgba(73,126,146,0.03)"/>
    <path d="M324,215 L330,221 L338,211" stroke="#497E92" stroke-width="1.5" fill="none" opacity="0.5"/>

    <!-- ラベル -->
    <text x="150" y="248" text-anchor="middle" fill="#497E92" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" letter-spacing="0.10em" opacity="0.35">DASHBOARD</text>
    <text x="335" y="248" text-anchor="middle" fill="#C4603D" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" letter-spacing="0.10em" opacity="0.5">CONSULTANT</text>
  </svg>
</div>
```

### CSS変更（THREE SIGNALS共通）

```css
/* イラストにホバーインタラクション追加 */
.three-signals__illustration {
  width: 100%;
  max-width: 400px;
  /* 360px→400px */
  height: auto;
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
}
.three-signals__signal:hover .three-signals__illustration {
  transform: scale(1.03) translateY(-4px);
}

/* ナンバリングを大胆に */
.three-signals__number {
  font-family: var(--font-heading-en);
  font-size: clamp(64px, 8vw, 96px);
  /* 48-72px → 64-96px */
  font-weight: 800;
  /* 300→800 */
  letter-spacing: -0.04em;
  line-height: 1.0;
  color: var(--color-brand);
  opacity: 0.06;
  /* 0.12→0.06: より控えめだが大きさでカバー */
  position: absolute;
  top: -8px;
  left: -8px;
  /* 原点を上に詰めて、テキストに食い込ませる */
}
```

---

## 4. FLOWセクションの脱テンプレ化

### HTML変更

横型4カラム → 縦型タイムライン（左に大ナンバー、右にコンテンツ）

```html
<h2 class="flow__heading">導入の流れ</h2>
<div class="flow__timeline">
  <!-- Step 1 -->
  <div class="flow__timeline-item">
    <div class="flow__timeline-left">
      <span class="flow__timeline-number">01</span>
      <div class="flow__timeline-line" aria-hidden="true">
        <div class="flow__timeline-line-fill"></div>
      </div>
    </div>
    <div class="flow__timeline-content">
      <div class="flow__timeline-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <h3 class="flow__timeline-title">お問い合わせ</h3>
      <p class="flow__timeline-desc">フォームまたはお電話でお気軽にご連絡ください。担当者が1営業日以内にご返信します。</p>
    </div>
  </div>
  <!-- Step 2 -->
  <div class="flow__timeline-item">
    <div class="flow__timeline-left">
      <span class="flow__timeline-number">02</span>
      <div class="flow__timeline-line" aria-hidden="true">
        <div class="flow__timeline-line-fill"></div>
      </div>
    </div>
    <div class="flow__timeline-content">
      <div class="flow__timeline-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
      <h3 class="flow__timeline-title">ヒアリング</h3>
      <p class="flow__timeline-desc">課題やご要望をお伺いし、最適なプランをご提案します。</p>
    </div>
  </div>
  <!-- Step 3 -->
  <div class="flow__timeline-item">
    <div class="flow__timeline-left">
      <span class="flow__timeline-number">03</span>
      <div class="flow__timeline-line" aria-hidden="true">
        <div class="flow__timeline-line-fill"></div>
      </div>
    </div>
    <div class="flow__timeline-content">
      <div class="flow__timeline-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      </div>
      <h3 class="flow__timeline-title">タグ設置</h3>
      <p class="flow__timeline-desc">簡単なタグをWebサイトに設置するだけ。最短1日で完了します。</p>
    </div>
  </div>
  <!-- Step 4 -->
  <div class="flow__timeline-item flow__timeline-item--last">
    <div class="flow__timeline-left">
      <span class="flow__timeline-number flow__timeline-number--accent">04</span>
    </div>
    <div class="flow__timeline-content">
      <div class="flow__timeline-icon flow__timeline-icon--accent" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      </div>
      <h3 class="flow__timeline-title">配信開始</h3>
      <p class="flow__timeline-desc">AIが即座に最適化を開始。専任チームが継続的にサポートします。</p>
    </div>
  </div>
</div>
```

### CSS変更

```css
/* FLOWタイムライン */
.flow__timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 120px;
  max-width: 640px;
  /* 中央に寄せず左寄せ。余白が右に流れる */
}

.flow__timeline-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 40px;
  position: relative;
}

.flow__timeline-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flow__timeline-number {
  font-family: var(--font-heading-en);
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.0;
  color: var(--color-deep);
  opacity: 0.08;
  transition: opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), color 500ms cubic-bezier(0.16, 1, 0.3, 1);
}
.flow__timeline-item:hover .flow__timeline-number {
  opacity: 0.20;
}
.flow__timeline-number--accent {
  color: var(--color-accent);
  opacity: 0.15;
}
.flow__timeline-item:hover .flow__timeline-number--accent {
  opacity: 0.35;
}

/* タイムラインの縦線 */
.flow__timeline-line {
  width: 1px;
  flex: 1;
  background: rgba(73, 126, 146, 0.10);
  margin-top: 12px;
  position: relative;
  overflow: hidden;
}
.flow__timeline-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0%;
  background: linear-gradient(180deg, var(--color-brand) 0%, rgba(73,126,146,0.10) 100%);
  transition: height 800ms cubic-bezier(0.16, 1, 0.3, 1);
}
/* JSでスクロール連動: is-visible時に height:100% */
.flow__timeline-item.is-visible .flow__timeline-line-fill {
  height: 100%;
}

.flow__timeline-content {
  padding-bottom: 56px;
  /* ステップ間の余白 */
}
.flow__timeline-item--last .flow__timeline-content {
  padding-bottom: 0;
}

.flow__timeline-icon {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  border: 1px solid rgba(73, 126, 146, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--color-brand);
  transition: border-color 300ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.flow__timeline-item:hover .flow__timeline-icon {
  border-color: var(--color-brand);
  background: rgba(73, 126, 146, 0.04);
}
.flow__timeline-icon--accent {
  border-color: rgba(196, 96, 61, 0.30);
  color: var(--color-accent);
}
.flow__timeline-item:hover .flow__timeline-icon--accent {
  border-color: var(--color-accent);
  background: rgba(196, 96, 61, 0.04);
}

.flow__timeline-title {
  font-family: var(--font-heading-ja);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.4;
  color: var(--color-text-on-light);
  margin-bottom: 8px;
  font-feature-settings: "palt";
}

.flow__timeline-desc {
  font-family: var(--font-body-ja);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.7;
  color: #5A7A84;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .flow__timeline-item {
    grid-template-columns: 60px 1fr;
    gap: 24px;
  }
  .flow__timeline-number {
    font-size: 32px;
  }
}
```

---

## 5. 全セクション共通: テクスチャと奥行きの追加

### CSS変更

```css
/* === セクション背景強化: ノイズ+装飾をすべてのライトセクションに === */

/* NOISEセクション: 背景レイヤー追加 */
.noise {
  background:
    radial-gradient(ellipse 60% 40% at 80% 20%, rgba(73,126,146,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 20% 80%, rgba(196,96,61,0.02) 0%, transparent 50%),
    #F5F7F8;
  /* ベタ塗り#F5F7F8 → 2層グラデーション追加 */
  padding: 120px 0 120px;
  position: relative;
}
/* ノイズテクスチャ追加 */
.noise::before {
  content: '';
  position: absolute;
  inset: 0;
  filter: url(#noise-light);
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
}

/* PROOFセクション: 背景強化 */
.proof {
  background:
    radial-gradient(ellipse 70% 50% at 50% 50%, rgba(73,126,146,0.03) 0%, transparent 60%),
    #FFFFFF;
  padding: 120px 0;
  /* 100px→120px */
  position: relative;
}
/* 数値の背後にドットパターン */
.proof::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(73,126,146,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
  mask-image: linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%);
}
.proof__container {
  position: relative;
  z-index: 1;
}

/* THREE SIGNALSセクション: 背景レイヤー */
.three-signals {
  background:
    radial-gradient(ellipse 50% 60% at 70% 30%, rgba(73,126,146,0.03) 0%, transparent 50%),
    #F5F7F8;
  padding: 160px 0;
  position: relative;
}
.three-signals::before {
  content: '';
  position: absolute;
  inset: 0;
  filter: url(#noise-light);
  opacity: 0.025;
  pointer-events: none;
  z-index: 0;
}
.three-signals__container {
  position: relative;
  z-index: 1;
}

/* VOICESセクション: 背景強化 */
.voices {
  background:
    radial-gradient(ellipse 60% 50% at 30% 50%, rgba(73,126,146,0.05) 0%, transparent 50%),
    #E8F0F3;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}
.voices::before {
  content: '';
  position: absolute;
  inset: 0;
  filter: url(#noise-light);
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
}

/* FLOWセクション: 背景レイヤー */
.flow {
  background:
    radial-gradient(ellipse 40% 60% at 80% 70%, rgba(73,126,146,0.03) 0%, transparent 50%),
    #FFFFFF;
  padding: 120px 0;
  position: relative;
}

/* SIFTセクション: 背景追加レイヤー */
.sift {
  background:
    radial-gradient(ellipse 50% 50% at 30% 70%, rgba(73,126,146,0.15) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 70% 30%, rgba(196,96,61,0.05) 0%, transparent 50%),
    linear-gradient(180deg, #497E92 0%, #3A6575 100%);
  padding: 160px 0;
  position: relative;
  overflow: hidden;
}

/* FIND SIGNALセクション: 背景追加レイヤー */
.find-signal {
  background:
    radial-gradient(ellipse 60% 50% at 50% 50%, rgba(73,126,146,0.10) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 70% 30%, rgba(196,96,61,0.06) 0%, transparent 50%),
    #0D2B33;
  padding: 160px 0;
  position: relative;
  overflow: hidden;
}

/* === 装飾ポリゴン: 各セクションに配置 === */

/* PROOF装飾 */
.proof__polygon-deco {
  position: absolute;
  bottom: 10%;
  left: -3%;
  width: 250px;
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
}
/* HTML: PROOFセクション内に追加 */
/* <div class="proof__polygon-deco" aria-hidden="true">
     <svg viewBox="0 0 100 100" fill="none">
       <polygon points="50,5 95,35 80,90 20,90 5,35" stroke="rgba(73,126,146,0.05)" stroke-width="0.75" fill="rgba(73,126,146,0.01)"/>
       <polygon points="50,15 85,40 72,85 28,85 15,40" stroke="rgba(73,126,146,0.03)" stroke-width="0.5" fill="none"/>
     </svg>
   </div> */

/* FLOW装飾 */
.flow__polygon-deco {
  position: absolute;
  top: 15%;
  right: -4%;
  width: 200px;
  opacity: 0.4;
  pointer-events: none;
  z-index: 0;
}

/* === セクション間トランジション統一と強化 === */

/* ヒーロー→TRUSTED BY: 同色なので境界不要 */
/* TRUSTED BY→NOISE: ダーク→ライト */
.trusted-by__transition {
  height: 100px;
  background: linear-gradient(180deg, #080E12 0%, #F5F7F8 100%);
  margin-top: 64px;
}

/* NOISE→SIFT: ライト→ティール */
.noise__transition {
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(180deg, #F5F7F8 0%, #497E92 100%);
  z-index: 1;
}

/* SIFT→PROOF: ティール→ホワイト */
.sift__transition {
  position: absolute;
  bottom: -120px;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(180deg, #3A6575 0%, #FFFFFF 100%);
  z-index: 1;
}
```

---

## 6. VOICESカード改善

### HTML変更

```html
<!-- アバターを名前のイニシャル+グラデーション背景に変更 -->
<div class="voices__card">
  <div class="voices__card-header">
    <div class="voices__card-avatar voices__card-avatar--1" aria-hidden="true">
      <span class="voices__card-avatar-initial">T</span>
    </div>
    <div class="voices__card-meta">
      <p class="voices__card-company">大手出版社 / デジタルメディア事業部長 T.K.氏</p>
      <p class="voices__card-result">収益 4x 向上</p>
    </div>
  </div>
  <div class="voices__card-body">
    <svg class="voices__card-quote-svg" width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
      <path d="M0 18V10.8C0 4.32 3.84 1.08 9.6 0L10.56 2.16C7.2 3.24 5.52 5.4 5.28 8.4H9.6V18H0ZM13.44 18V10.8C13.44 4.32 17.28 1.08 23.04 0L24 2.16C20.64 3.24 18.96 5.4 18.72 8.4H23.04V18H13.44Z" fill="currentColor"/>
    </svg>
    <p class="voices__card-text">UZOUの導入後、ネット広告収益が約4倍に。記事の文脈に合った広告が表示されるため、読者体験を損なわずに収益を改善できました。</p>
  </div>
</div>
```

### CSS変更

```css
/* VOICESカード全面改修 */
.voices__card {
  flex-shrink: 0;
  width: 400px;
  /* 380→400 */
  background: var(--color-white);
  border-radius: 0;
  /* sharp角 維持 */
  padding: 0;
  box-shadow: 0 4px 24px rgba(73, 126, 146, 0.08);
  transition: box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  overflow: hidden;
}
.voices__card:hover {
  box-shadow: 0 12px 48px rgba(73, 126, 146, 0.15);
  transform: translateY(-6px);
}

/* カードヘッダー: アバター+メタ情報 */
.voices__card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 28px;
  border-bottom: 1px solid rgba(73, 126, 146, 0.06);
}

/* アバター: イニシャル入り */
.voices__card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.voices__card-avatar-initial {
  font-family: var(--font-heading-en);
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0;
}

/* アバターカラーバリエーション */
.voices__card-avatar--1 {
  background: linear-gradient(135deg, #497E92 0%, #2A5A6B 100%);
  /* ティール系 */
}
.voices__card-avatar--2 {
  background: linear-gradient(135deg, #3A6575 0%, #0D2B33 100%);
  /* 深ティール系 */
}
.voices__card-avatar--3 {
  background: linear-gradient(135deg, #C4603D 0%, #9B4A2E 100%);
  /* コーラル系: 差別化 */
}

.voices__card-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.voices__card-company {
  font-family: var(--font-body-ja);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.4;
  color: #5A7A84;
}

.voices__card-result {
  font-family: var(--font-heading-en);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.0;
  color: var(--color-accent);
}

/* カードボディ */
.voices__card-body {
  padding: 24px 28px 28px;
}

/* SVG引用符アイコン */
.voices__card-quote-svg {
  color: var(--color-accent-pale);
  opacity: 0.35;
  margin-bottom: 12px;
}

.voices__card-text {
  font-family: var(--font-body-ja);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.8;
  color: var(--color-text-on-light);
}
```

---

## 7. ビジュアルシーケンス設計（更新後）

| セクション | 背景色 | 密度 | padding-top/bottom | 境界処理 | 入場アニメーション |
|---|---|---|---|---|---|
| Hero (SIGNAL) | `#080E12` (深色) | 中 | 160px / 100px | -- | charIn: translateY(48px)+rotate(2deg)+blur(4px), stagger 30ms |
| TRUSTED BY | `#080E12` (深色) | 低 | 48px / 0 | gradient 100px to #F5F7F8 | marquee 35s linear |
| NOISE | `#F5F7F8` + radial-gradient 2層 | 高 | 120px / 120px | gradient 80px to #497E92 | slideInLeft 16px, stagger 120ms |
| SIFT | `#497E92`→`#3A6575` + radial 2層 | 中 | 160px / 160px | gradient 120px to #FFFFFF | scaleUp nodes, stagger 80ms |
| PROOF | `#FFFFFF` + radial 1層 + ドットパターン | 中 | 120px / 120px | gradient 80px to #F5F7F8 | countUp 1200ms + fadeInUp |
| THREE SIGNALS | `#F5F7F8` + radial 1層 | 高 | 160px / 160px | gradient 80px to #E8F0F3 | slideInLeft 16px, stagger 120ms |
| VOICES | `#E8F0F3` + radial 1層 | 中 | 100px / 100px | gradient 80px to #FFFFFF | marquee 45s linear |
| FLOW | `#FFFFFF` + radial 1層 | 中 | 120px / 120px | gradient 120px to #0D2B33 | timeline-line fill 800ms |
| FIND SIGNAL | `#0D2B33` + radial 2層 | 低 | 160px / 160px | -- | fadeInUpHero 32px, stagger 200ms |

色リズム確認: **深色** → **深色** → 薄灰 → ティール → 白 → 薄灰 → ティール薄 → 白 → **深色**
改善前の「白→白→薄灰→...」から、冒頭を深色に変更することでスクロール初期のインパクトが劇的に改善。

---

## 8. JS追加: スクロール連動タイムライン

```javascript
/* FLOWタイムライン: スクロール連動ラインフィル */
function initFlowTimeline() {
  const items = document.querySelectorAll('.flow__timeline-item');
  if (items.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -80px 0px' });

  items.forEach((item, i) => {
    item.style.transitionDelay = (i * 150) + 'ms';
    observer.observe(item);
  });
}

/* initFlowTimeline() を init() 内で呼び出し */
```

---

## 9. CSSデザイントークン追加・更新

```css
:root {
  /* === 追加・更新トークン === */

  /* 深色背景 (ヒーロー用) */
  --color-hero-bg: #080E12;
  /* R:8 G:14 B:18 -- 純黒ではない有色黒。ティールの最暗色 */

  /* テキスト色 (ダーク背景用) */
  --color-text-hero: #F0F4F6;
  /* 純白#FFFFFFより4%低い。目に刺さらない白 */
  --color-text-hero-muted: rgba(232, 240, 243, 0.75);
  /* サブコピー用。本文ヒエラルキー */

  /* 影の追加階層 */
  --shadow-card-hover-strong: 0 12px 48px rgba(73, 126, 146, 0.15);
  --shadow-crystal: drop-shadow(0 0 40px rgba(73, 126, 146, 0.35)) drop-shadow(0 0 80px rgba(73, 126, 146, 0.15));

  /* アニメーション追加 */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-hero: 700ms;
}
```

---

## 10. セクション間の装飾ポリゴン追加HTML

以下を各セクションのHTML内に追加:

```html
<!-- PROOFセクション内 -->
<div class="proof__polygon-deco" aria-hidden="true">
  <svg viewBox="0 0 120 120" fill="none">
    <polygon points="60,8 112,38 96,105 24,105 8,38" stroke="rgba(73,126,146,0.05)" stroke-width="0.75" fill="rgba(73,126,146,0.01)"/>
    <polygon points="60,20 100,44 88,98 32,98 20,44" stroke="rgba(73,126,146,0.03)" stroke-width="0.5" fill="none"/>
  </svg>
</div>

<!-- FLOWセクション内 -->
<div class="flow__polygon-deco" aria-hidden="true">
  <svg viewBox="0 0 100 100" fill="none">
    <polygon points="50,5 95,30 82,90 18,90 5,30" stroke="rgba(73,126,146,0.04)" stroke-width="0.75" fill="rgba(73,126,146,0.008)"/>
  </svg>
</div>

<!-- THREE SIGNALSセクション内: 2つ追加 -->
<div class="three-signals__polygon-deco three-signals__polygon-deco--1" aria-hidden="true">
  <svg viewBox="0 0 80 80" fill="none">
    <polygon points="40,4 76,24 68,72 12,72 4,24" stroke="rgba(73,126,146,0.04)" stroke-width="0.5" fill="rgba(73,126,146,0.008)"/>
  </svg>
</div>
<div class="three-signals__polygon-deco three-signals__polygon-deco--2" aria-hidden="true">
  <svg viewBox="0 0 60 60" fill="none">
    <polygon points="30,3 57,20 48,55 12,55 3,20" stroke="rgba(196,96,61,0.03)" stroke-width="0.5" fill="none"/>
  </svg>
</div>
```

```css
/* THREE SIGNALS装飾ポリゴン */
.three-signals__polygon-deco--1 {
  position: absolute;
  top: 8%;
  left: -3%;
  width: 200px;
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
}
.three-signals__polygon-deco--2 {
  position: absolute;
  bottom: 12%;
  right: -2%;
  width: 150px;
  opacity: 0.4;
  pointer-events: none;
  z-index: 0;
}
```

---

## 予測スコア（実装後）

| 軸 | 改善前 | 改善後 | 根拠 |
|---|---|---|---|
| 1. 光と影 | 8/14 | 13/14 | メッシュグラデーション5層、有彩色影の多層化、クリスタルグロー+リング |
| 2. 色の温度と深み | 9/14 | 13/14 | `#080E12`有色黒、`#F0F4F6`有色白、全セクションにradial-gradient+ノイズ追加 |
| 3. 余白の呼吸 | 10/14 | 12/14 | ヒーロー160/100→TRUSTED 48/0→NOISE 120/120の明確なリズム。密度の緩急 |
| 4. タイポの表情 | 11/14 | 13/14 | ヒーロー文字登場にblur+rotate追加。ナンバリング800weight/96px |
| 5. 動きの品格 | 9/14 | 12/14 | heroCharInにblur(4px)追加、リング回転30s、crystal-float 8s、タイムラインフィル |
| 6. 視覚のリズム | 8/14 | 13/14 | 深色→深色→薄灰→ティール→白の色リズム改善。SVGイラスト密度UP |
| 7. 細部の仕上げ | 9/14 | 12/14 | ロゴのジャンル別造形、カードのヘッダー/ボディ分離、ブランドラベル横線 |
| **合計** | **64/98 (65%)** | **88/98 (90%)** | |

---

## 実装上の注意事項

1. **data-theme="dark"への変更**: ヒーローを`data-theme="dark"`に変更するため、ヘッダーのダークモード検知が最初からdarkになる。ヘッダーの初期状態を`header--dark`にするか、JSの`updateHeaderTheme`が初回実行時に正しく検知するか確認が必要

2. **パフォーマンス**: 背景レイヤーの追加（5層radial-gradient + ドットグリッド + ノイズ）はペイントコストが増える。`will-change: transform`を装飾要素に指定し、GPU合成レイヤーに昇格させる。ノイズフィルターは`::before`/`::after`擬似要素に隔離し、`pointer-events: none`を維持

3. **SVGイラスト内のanimateMotion**: Safari対応を確認。`<animateMotion>`のpath属性がSafariで正しく動作しない場合、JS(requestAnimationFrame)でフォールバック

4. **TRUSTED BYロゴのフォント**: SVG内の`<text>`要素で指定するフォント（Georgia、SF Mono等）がユーザー環境にない場合のフォールバック。SVGなので`font-family`のフォールバック指定を含める

5. **FLOWタイムライン**: 旧`flow__steps`（grid 4カラム）のCSSとJSを完全に削除し、新しい`flow__timeline`に差し替える