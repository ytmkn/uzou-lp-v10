/* ======================================================
   UZOU LP v10 — Signal Pulse
   全セクション: アニメーション + インタラクション
   ====================================================== */

(function () {
  'use strict';

  /* ---- ユーティリティ: reduced-motion チェック ---- */
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================
     1. マウス追従グラデーション
     requestAnimationFrame でスロットリング
     ====================================================== */
  function initMouseFollow() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    /* タッチデバイスでは実行しない */
    if (window.matchMedia('(hover: none)').matches) return;

    let ticking = false;

    hero.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mouse-x', x + '%');
        hero.style.setProperty('--mouse-y', y + '%');
        ticking = false;
      });
    });
  }

  /* ======================================================
     2. SVGノード動的生成（Hero + Final CTA 共通）
     回路パターンのグリッド座標にノードを配置
     ====================================================== */
  function generateCircuitNodes(containerSelector, count) {
    const nodesSvg = document.querySelector(containerSelector);
    if (!nodesSvg) return;

    const TILE_SIZE = 200;
    const NODE_POSITIONS = [
      { x: 80, y: 40 },
      { x: 120, y: 40 },
      { x: 40, y: 120 },
      { x: 120, y: 120 },
      { x: 160, y: 120 },
      { x: 60, y: 160 },
    ];

    const container = nodesSvg.parentElement;
    const viewWidth = container.offsetWidth || window.innerWidth;
    const viewHeight = container.offsetHeight || window.innerHeight;
    const tilesX = Math.ceil(viewWidth / TILE_SIZE) + 1;
    const tilesY = Math.ceil(viewHeight / TILE_SIZE) + 1;

    const allNodes = [];
    for (let ty = 0; ty < tilesY; ty++) {
      for (let tx = 0; tx < tilesX; tx++) {
        for (const pos of NODE_POSITIONS) {
          allNodes.push({
            x: tx * TILE_SIZE + pos.x,
            y: ty * TILE_SIZE + pos.y,
          });
        }
      }
    }

    const targetCount = Math.min(
      Math.max(count, Math.floor(allNodes.length * 0.15)),
      count + 10
    );
    const shuffled = allNodes.sort(() => Math.random() - 0.5);
    const selectedNodes = shuffled.slice(0, targetCount);

    const fragment = document.createDocumentFragment();
    selectedNodes.forEach((node) => {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      circle.setAttribute('cx', node.x);
      circle.setAttribute('cy', node.y);
      circle.setAttribute('r', '3');
      circle.setAttribute('fill', 'rgba(139, 192, 202, 0.25)');
      circle.classList.add('circuit-node');
      fragment.appendChild(circle);
    });
    nodesSvg.appendChild(fragment);
  }

  function initCircuitNodes() {
    /* Hero ノード: 20-30個 */
    generateCircuitNodes('.hero__nodes', 25);
    /* Final CTA ノード: 15-20個 */
    generateCircuitNodes('.final-cta__nodes', 18);
  }

  /* ======================================================
     3. ヘッダースクロール検知（IntersectionObserver）
     ====================================================== */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    if (!header || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle('is-scrolled', !entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-64px 0px 0px 0px',
      }
    );
    observer.observe(hero);
  }

  /* ======================================================
     4. ハンバーガーメニュー + モバイルメニュー
     ====================================================== */
  function initHamburger() {
    const hamburger = document.querySelector('.header__hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('is-open', !isExpanded);
      mobileMenu.setAttribute('aria-hidden', isExpanded);
      /* body スクロールロック */
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    /* メニュー内リンククリックで閉じる */
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ======================================================
     5. 汎用フェードアップ（IO フォールバック）
     data-reveal 属性 + .is-visible クラス
     ====================================================== */
  function initRevealAnimations() {
    /* scroll-driven animations がサポートされている場合はスキップ */
    if (CSS.supports && CSS.supports('animation-timeline', 'view()')) return;

    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => observer.observe(el));
  }

  /* ======================================================
     6. Problem セクション: 課題カードの stagger フェードアップ
     ====================================================== */
  function initProblemStagger() {
    const items = document.querySelectorAll('.problem__item');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
  }

  /* ======================================================
     7. Solution セクション: 線描画 + ノード点灯アニメーション
     ====================================================== */
  function initSolutionAnimation() {
    const section = document.querySelector('.solution');
    if (!section) return;

    const lines = section.querySelectorAll('.solution__line');
    const nodes = section.querySelectorAll('.solution__node-circle');
    const arrows = section.querySelectorAll('.solution__arrow');

    /* stroke-dasharray/dashoffset を設定 */
    lines.forEach((line) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;
    });

    let animated = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          animated = true;

          /* 左ノード点灯 */
          nodes[0].classList.add('is-lit');

          /* Step 1: 左→中央の線描画 */
          lines[0].style.strokeDashoffset = '0';

          setTimeout(() => {
            /* 左→中央の矢印表示 */
            if (arrows[0]) arrows[0].style.opacity = '1';
            /* 中央ノード点灯 */
            nodes[1].classList.add('is-lit');

            setTimeout(() => {
              /* Step 2: 中央→右の線描画 */
              lines[1].style.strokeDashoffset = '0';

              setTimeout(() => {
                /* 中央→右の矢印表示 */
                if (arrows[1]) arrows[1].style.opacity = '1';
                /* 右ノード点灯 */
                nodes[2].classList.add('is-lit');
              }, 800);
            }, 200);
          }, 800);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
  }

  /* ======================================================
     8. Scale セクション: カード stagger + カウントアップ
     ====================================================== */
  function initScaleSection() {
    const cards = document.querySelectorAll('.scale__card');
    if (!cards.length) return;

    /* カードフェードアップ */
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((el) => cardObserver.observe(el));

    /* カウントアップ */
    const section = document.querySelector('.scale');
    if (!section) return;

    let counted = false;

    const countObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          startCountUp();
          countObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    countObserver.observe(section);
  }

  /* カウントアップ: requestAnimationFrame + easeOutQuart */
  function startCountUp() {
    const elements = document.querySelectorAll('[data-count-target]');
    const DURATION = 1500;

    elements.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count-target'), 10);
      const suffix = el.getAttribute('data-count-suffix') || '';
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / DURATION, 1);
        /* easeOutQuart: t => 1 - (1 - t) ** 4 */
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(target * eased);
        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  /* ======================================================
     9. Features セクション: 各Feature独立フェードアップ
     ====================================================== */
  function initFeaturesAnimation() {
    const items = document.querySelectorAll('.features__item');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
  }

  /* ======================================================
     10. Voices セクション: カード stagger フェードアップ
     ====================================================== */
  function initVoicesAnimation() {
    const cards = document.querySelectorAll('.voices__card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((el) => observer.observe(el));
  }

  /* ======================================================
     11. Flow セクション: ステップ stagger + 接続線描画 + ノード点灯
     ====================================================== */
  function initFlowAnimation() {
    const steps = document.querySelectorAll('.flow__step');
    const connectorLines = document.querySelectorAll('.flow__connector-line');
    if (!steps.length) return;

    /* 接続線の dasharray/dashoffset を設定 */
    connectorLines.forEach((line) => {
      /* SVG line 要素の長さを取得 */
      const length = line.getBoundingClientRect
        ? 48
        : 48; /* コネクタ幅 = 48px */
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;
      line.setAttribute('data-length', length);
    });

    let animated = false;
    const section = document.querySelector('.flow');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          animated = true;

          /* ステップを順次表示 */
          steps.forEach((step, i) => {
            setTimeout(() => {
              step.classList.add('is-visible');

              /* ノード点灯（遅延） */
              const node = step.querySelector('.flow__step-node');
              if (node) {
                setTimeout(() => {
                  node.classList.add('is-lit');
                }, 200);
              }

              /* 次の接続線を描画 */
              if (connectorLines[i]) {
                setTimeout(() => {
                  connectorLines[i].style.strokeDashoffset = '0';
                }, 100);
              }
            }, i * 200);
          });

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
  }

  /* ======================================================
     12. FAQ セクション: アコーディオン開閉
     ====================================================== */
  function initFaqAccordion() {
    const items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach((item) => {
      const trigger = item.querySelector('.faq__trigger');
      const panel = item.querySelector('.faq__panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        /* 他のアイテムを閉じる（アコーディオン方式） */
        items.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('is-open')) {
            closeItem(otherItem);
          }
        });

        if (isOpen) {
          closeItem(item);
        } else {
          openItem(item);
        }
      });
    });

    function openItem(item) {
      const trigger = item.querySelector('.faq__trigger');
      const panel = item.querySelector('.faq__panel');
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('hidden');
      /* 実際のコンテンツ高さを計算して max-height を設定 */
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    function closeItem(item) {
      const trigger = item.querySelector('.faq__trigger');
      const panel = item.querySelector('.faq__panel');
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0';
      /* トランジション完了後に hidden を付与 */
      panel.addEventListener(
        'transitionend',
        () => {
          if (!item.classList.contains('is-open')) {
            panel.setAttribute('hidden', '');
          }
        },
        { once: true }
      );
    }
  }

  /* ======================================================
     13. Final CTA セクション: フェードアップ
     ====================================================== */
  function initFinalCtaAnimation() {
    const title = document.querySelector('.final-cta__title');
    const sub = document.querySelector('.final-cta__sub');
    const ctaGroup = document.querySelector('.final-cta__cta-group');
    if (!title) return;

    const elements = [title, sub, ctaGroup].filter(Boolean);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          elements.forEach((el) => el.classList.add('is-visible'));
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(document.querySelector('.final-cta'));
  }

  /* ======================================================
     14. スムーズスクロール（ヘッダーオフセット補正）
     ====================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const headerHeight = 64;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      });
    });
  }

  /* ======================================================
     初期化
     ====================================================== */
  function init() {
    initMouseFollow();
    initHeaderScroll();
    initHamburger();
    initSmoothScroll();

    /* reduced-motion でない場合のみアニメーション初期化 */
    if (!prefersReducedMotion()) {
      initCircuitNodes();
      initRevealAnimations();
      initProblemStagger();
      initSolutionAnimation();
      initScaleSection();
      initFeaturesAnimation();
      initVoicesAnimation();
      initFlowAnimation();
      initFinalCtaAnimation();
    }

    /* FAQ アコーディオンは常に有効 */
    initFaqAccordion();
  }

  /* DOMContentLoaded で起動 */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
