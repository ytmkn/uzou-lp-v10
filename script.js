/* ==============================================
   UZOU LP v2 — Sift + KAGAMI技法
   技法指定書 spec-hero-v2.md 準拠。
   ヒーロー白背景化、Canvas NetworkGraph。
   ============================================== */

(function () {
  'use strict';

  /* === prefers-reduced-motion 検知 === */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* === Canvas ネットワークグラフ設定 === */
  /* v11: particleCount 90, connectionDistance 140, 色調整 */
  const NETWORK_CONFIG = {
    particleCount: 90,
    connectionDistance: 140,
    particleSpeed: 0.25,
    particleSizeRange: [1.5, 4],
    highlightCount: 6,
    highlightInterval: 2500,
    colors: {
      node: 'rgba(73, 126, 146, 0.60)',
      nodeFill: 'rgba(73, 126, 146, 0.15)',
      connection: 'rgba(73, 126, 146, 0.10)',
      highlightNode: '#E07B5A',
      highlightConnection: 'rgba(224, 123, 90, 0.30)',
    },
  };

  const FIND_SIGNAL_CONFIG = {
    particleCount: 120,
    connectionDistance: 100,
    particleSpeed: 0.25,
    particleSizeRange: [2, 4],
    highlightCount: 8,
    highlightInterval: 2500,
    colors: {
      node: 'rgba(232, 240, 243, 0.25)',
      nodeFill: 'rgba(232, 240, 243, 0.08)',
      connection: 'rgba(232, 240, 243, 0.06)',
      highlightNode: '#E07B5A',
      highlightConnection: 'rgba(224, 123, 90, 0.15)',
    },
  };

  /* === IntersectionObserver 設定 === */
  const OBSERVER_CONFIG = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px',
  };

  const PROOF_OBSERVER_CONFIG = {
    threshold: 0.30,
    rootMargin: '0px',
  };

  /* === テキストスプリット === */
  function splitText(element) {
    if (!element) return;
    const text = element.textContent;
    element.innerHTML = '';
    let charIndex = 0;
    for (const char of text) {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      if (!prefersReducedMotion) {
        span.style.animationDelay = `${charIndex * 30}ms`;
      } else {
        span.style.opacity = '1';
        span.style.transform = 'none';
        span.style.animation = 'none';
      }
      element.appendChild(span);
      charIndex++;
    }
  }

  /* === Canvas ネットワークグラフ === */
  class NetworkGraph {
    constructor(canvas, config) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.config = config;
      this.particles = [];
      this.highlightedIndices = new Set();
      this.animationId = null;
      this.lastHighlightTime = 0;
      this.resizeObserver = null;
      this.init();
    }

    init() {
      this.resize();
      this.createParticles();
      this.randomHighlight();
      if (!prefersReducedMotion) {
        this.animate();
      } else {
        this.drawStatic();
      }
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.canvas.parentElement);
    }

    resize() {
      const parent = this.canvas.parentElement;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.canvas.style.width = rect.width + 'px';
      this.canvas.style.height = rect.height + 'px';
      this.ctx.scale(dpr, dpr);
      this.width = rect.width;
      this.height = rect.height;
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.config.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * this.config.particleSpeed * 2,
          vy: (Math.random() - 0.5) * this.config.particleSpeed * 2,
          size: this.config.particleSizeRange[0] + Math.random() * (this.config.particleSizeRange[1] - this.config.particleSizeRange[0]),
          sides: Math.floor(Math.random() * 3) + 3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    }

    randomHighlight() {
      this.highlightedIndices.clear();
      const indices = Array.from({ length: this.particles.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      for (let i = 0; i < Math.min(this.config.highlightCount, indices.length); i++) {
        this.highlightedIndices.add(indices[i]);
      }
    }

    drawPolygon(x, y, size, sides, rotation) {
      this.ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2 + rotation;
        const px = x + Math.cos(angle) * size;
        const py = y + Math.sin(angle) * size;
        if (i === 0) this.ctx.moveTo(px, py);
        else this.ctx.lineTo(px, py);
      }
      this.ctx.closePath();
    }

    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      /* 接続線の描画 */
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.config.connectionDistance) {
            const opacity = 1 - dist / this.config.connectionDistance;
            const isHighlight = this.highlightedIndices.has(i) && this.highlightedIndices.has(j);
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.strokeStyle = isHighlight
              ? this.config.colors.highlightConnection
              : this.config.colors.connection;
            this.ctx.lineWidth = isHighlight ? 1.5 : 0.5;
            this.ctx.globalAlpha = opacity;
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
          }
        }
      }

      /* パーティクル描画 */
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const isHighlight = this.highlightedIndices.has(i);

        this.drawPolygon(p.x, p.y, p.size, p.sides, p.rotation);

        if (isHighlight) {
          this.ctx.fillStyle = 'rgba(224, 123, 90, 0.25)';
          this.ctx.strokeStyle = this.config.colors.highlightNode;
          this.ctx.lineWidth = 1.5;
        } else {
          this.ctx.fillStyle = this.config.colors.nodeFill;
          this.ctx.strokeStyle = this.config.colors.node;
          this.ctx.lineWidth = 1;
        }
        this.ctx.fill();
        this.ctx.stroke();
      }
    }

    update(timestamp) {
      for (const p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -10) p.x = this.width + 10;
        if (p.x > this.width + 10) p.x = -10;
        if (p.y < -10) p.y = this.height + 10;
        if (p.y > this.height + 10) p.y = -10;
      }

      if (timestamp - this.lastHighlightTime > this.config.highlightInterval) {
        this.randomHighlight();
        this.lastHighlightTime = timestamp;
      }
    }

    animate(timestamp) {
      if (!timestamp) timestamp = 0;
      this.update(timestamp);
      this.draw();
      this.animationId = requestAnimationFrame((t) => this.animate(t));
    }

    drawStatic() {
      this.draw();
    }

    destroy() {
      if (this.animationId) cancelAnimationFrame(this.animationId);
      if (this.resizeObserver) this.resizeObserver.disconnect();
    }
  }

  /* === カウントアップアニメーション === */
  function countUp(element, target, suffix, duration) {
    if (prefersReducedMotion) {
      element.textContent = target;
      return;
    }
    const startTime = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const current = Math.round(easedProgress * target);
      element.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  /* === スクロール進捗バー === */
  function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  /* === ヘッダーダークセクション自動検知 === */
  function updateHeaderTheme() {
    const header = document.querySelector('.header');
    if (!header) return;
    const headerRect = header.getBoundingClientRect();
    const headerCenter = headerRect.top + headerRect.height / 2;
    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    let isOverDark = false;
    for (const section of darkSections) {
      const rect = section.getBoundingClientRect();
      if (headerCenter >= rect.top && headerCenter <= rect.bottom) {
        isOverDark = true;
        break;
      }
    }
    header.classList.toggle('header--dark', isOverDark);
  }

  /* === ヘッダースクロール検知: frosted glass 切替 === */
  function updateHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    header.classList.toggle('header--scrolled', window.scrollY > 32);
  }

  /* === マウス追従アンビエントグロー（ヒーロー + FIND SIGNAL） === */
  function initAmbientGlow() {
    const heroGlow = document.querySelector('.hero__glow');
    const findSignalGlow = document.querySelector('.find-signal__glow');

    if (!prefersReducedMotion) {
      let rafId = null;
      document.addEventListener('mousemove', (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          /* ヒーローセクションのグロー追従（CSS custom property方式） */
          if (heroGlow) {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
              const rect = heroSection.getBoundingClientRect();
              if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                const x = ((e.clientX - rect.left) / rect.width * 100);
                const y = ((e.clientY - rect.top) / rect.height * 100);
                heroGlow.style.setProperty('--mouse-x', x + '%');
                heroGlow.style.setProperty('--mouse-y', y + '%');
              }
            }
          }
          /* FIND SIGNALグロー追従 */
          if (findSignalGlow) {
            const fsSection = document.querySelector('.find-signal');
            if (fsSection) {
              const rect = fsSection.getBoundingClientRect();
              if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                findSignalGlow.style.left = e.clientX + 'px';
                findSignalGlow.style.top = (e.clientY - rect.top) + 'px';
              }
            }
          }
          rafId = null;
        });
      });
    }
  }

  /* === マグネティックボタン === */
  function initMagneticButtons() {
    if (prefersReducedMotion) return;
    const buttons = document.querySelectorAll('.btn--primary');
    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const magnetStrength = 0.15;
        btn.style.transform = `translate(${x * magnetStrength}px, ${y * magnetStrength - 2}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* === 3Dチルト（VOICESカード） === */
  function initCardTilt() {
    if (prefersReducedMotion) return;
    const cards = document.querySelectorAll('.voices__card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const tiltX = y * -8;
        const tiltY = x * 8;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* === ホバーリップル === */
  function initRipple() {
    const buttons = document.querySelectorAll('.btn--primary');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  /* === FAQ アコーディオン === */
  function initFAQ() {
    const faqHeaders = document.querySelectorAll('.flow__faq-item-header');
    faqHeaders.forEach((header) => {
      const handleToggle = () => {
        const item = header.closest('.flow__faq-item');
        const isOpen = item.classList.contains('is-open');
        const body = item.querySelector('.flow__faq-item-body');

        /* 他のFAQを閉じる */
        document.querySelectorAll('.flow__faq-item.is-open').forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove('is-open');
            openItem.querySelector('.flow__faq-item-header').setAttribute('aria-expanded', 'false');
            openItem.querySelector('.flow__faq-item-body').setAttribute('aria-hidden', 'true');
          }
        });

        item.classList.toggle('is-open', !isOpen);
        header.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        body.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      };

      header.addEventListener('click', handleToggle);
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      });
    });
  }

  /* === モバイルメニュー === */
  function initMobileMenu() {
    const menuBtn = document.querySelector('.header__hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      mobileMenu.classList.toggle('is-open', !isOpen);
      menuBtn.classList.toggle('is-open', !isOpen);
      menuBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      document.body.style.overflow = !isOpen ? 'hidden' : '';

      if (!isOpen) {
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
      } else {
        menuBtn.focus();
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        toggleMenu();
        menuBtn.focus();
      }
    });

    /* フォーカストラップ */
    mobileMenu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      if (!mobileMenu.classList.contains('is-open')) return;

      const focusableElements = mobileMenu.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  /* === スムースアンカースクロール === */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const headerHeight = 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      });
    });
  }

  /* === SIFT ノードホバーインタラクション === */
  function initSiftInteraction() {
    const nodes = document.querySelectorAll('.sift__node');
    const connections = document.querySelectorAll('.sift__connection');

    nodes.forEach((node) => {
      node.addEventListener('mouseenter', () => {
        connections.forEach((conn) => {
          conn.style.stroke = 'rgba(224, 123, 90, 0.25)';
          conn.style.strokeWidth = '1.5px';
        });
      });
      node.addEventListener('mouseleave', () => {
        connections.forEach((conn) => {
          conn.style.stroke = '';
          conn.style.strokeWidth = '';
        });
      });
    });
  }

  /* === v11: FLOWタイムライン: スクロール連動ラインフィル === */
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

  /* === IntersectionObserver: アニメーション発火 === */
  function initScrollAnimations() {
    /* slideInLeft アニメーション（NOISE, THREE SIGNALS） */
    const slideInElements = document.querySelectorAll('[data-animate="slideInLeft"], .three-signals__signal');
    if (slideInElements.length > 0) {
      const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = entry.target.parentElement.querySelectorAll('[data-animate="slideInLeft"], .three-signals__signal');
            let delay = 0;
            siblings.forEach((el) => {
              el.style.transitionDelay = delay + 'ms';
              delay += 120;
            });
            entry.target.classList.add('is-visible');
            slideObserver.unobserve(entry.target);
          }
        });
      }, OBSERVER_CONFIG);
      slideInElements.forEach((el) => slideObserver.observe(el));
    }

    /* scaleUp アニメーション（SIFT ノード） */
    const siftNodes = document.querySelectorAll('.sift__node');
    if (siftNodes.length > 0) {
      const siftObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let delay = 0;
            siftNodes.forEach((node) => {
              setTimeout(() => node.classList.add('is-visible'), delay);
              delay += 80;
            });
            siftObserver.disconnect();
          }
        });
      }, OBSERVER_CONFIG);
      const siftSection = document.querySelector('.sift__diagram');
      if (siftSection) siftObserver.observe(siftSection);
    }

    /* countUp アニメーション（PROOF） */
    const proofNumbers = document.querySelectorAll('.proof__number[data-target]');
    if (proofNumbers.length > 0) {
      let counted = false;
      const proofObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            counted = true;
            proofNumbers.forEach((num) => {
              const target = parseInt(num.dataset.target, 10);
              countUp(num, target, '', 1200);
            });
            proofObserver.disconnect();
          }
        });
      }, PROOF_OBSERVER_CONFIG);
      const proofSection = document.querySelector('.proof__grid');
      if (proofSection) proofObserver.observe(proofSection);
    }

    /* fadeInUp アニメーション（FIND YOUR SIGNAL） */
    const fadeElements = document.querySelectorAll('.find-signal__heading, .find-signal__subcopy, .find-signal__cta-group');
    if (fadeElements.length > 0) {
      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, OBSERVER_CONFIG);
      fadeElements.forEach((el) => fadeObserver.observe(el));
    }
  }

  /* === 初期化 === */
  function init() {
    /* Canvas ネットワークグラフ（ヒーロー） */
    const heroCanvas = document.querySelector('.hero__canvas');
    if (heroCanvas) {
      new NetworkGraph(heroCanvas, NETWORK_CONFIG);
    }

    /* Canvas ネットワークグラフ（最終CTA） */
    const findSignalCanvas = document.querySelector('.find-signal__canvas');
    if (findSignalCanvas) {
      new NetworkGraph(findSignalCanvas, FIND_SIGNAL_CONFIG);
    }

    /* スクロールイベント */
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          updateHeaderTheme();
          updateHeaderScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    /* 初期状態の更新 */
    updateScrollProgress();
    updateHeaderTheme();
    updateHeaderScroll();

    /* インタラクション初期化 */
    initAmbientGlow();
    initMagneticButtons();
    initCardTilt();
    initRipple();
    initFAQ();
    initMobileMenu();
    initSmoothScroll();
    initSiftInteraction();
    initFlowTimeline();
    initScrollAnimations();
  }

  /* DOMContentLoaded で初期化 */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
