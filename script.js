/**
 * SILVER TEAK DESIGN STUDIO | Master Orchestration Engine
 * Architectural Orchestration of Smooth Scrolling, WebGL Visualizer, and GSAP Motion Systems
 */

// ==========================================================================
// DYNAMIC COMPONENT DATA FOR DETAIL MODAL INJECTIONS
// ==========================================================================
const PROJECT_REGISTRY = [
  {
    num: "01 / 03",
    title: "House of Light",
    desc: "A structural minimalist study focused on raw concrete facades, physical shadows, and absolute geometric light paths. Located high in the forest limits of Kyoto, this artifact challenges interior constraints using open architectural layout methods.",
    location: "Kyoto, Japan",
    area: "420 m²",
    images: [
      "https://picsum.photos/1920/1080",
      "https://picsum.photos/1920/1080",
      "https://picsum.photos/1920/1080"
    ]
  },
  {
    num: "02 / 03",
    title: "Ocean Pavilion",
    desc: "A stunning coastal pavilion embedded straight inside sheer basalt cliff topographies of Amalfi. Utilizing bespoke seamless low-iron structural glass panes, boundaries dissolve into the azure horizons of the Mediterranean.",
    location: "Amalfi, Italy",
    area: "610 m²",
    images: [
      "https://picsum.photos/1920/1080",
      "https://picsum.photos/1920/1080",
      "https://picsum.photos/1920/1080"
    ]
  },
  {
    num: "03 / 03",
    title: "Monolith Sanctuary",
    desc: "A physical mountain architectural sanctuary carved into raw alpine metamorphic rocks. Programmed to withstand the high-alpine temperatures while providing an authentic and quiet emotional interior refuge.",
    location: "St. Moritz, Swiss Alps",
    area: "340 m²",
    images: [
      "https://picsum.photos/1920/1080",
      "https://picsum.photos/1920/1080",
      "https://picsum.photos/1920/1080"
    ]
  }
];

// ==========================================================================
// CLASS-BASED SYSTEM IMPLEMENTATION
// ==========================================================================

class PreloaderManager {
  constructor(onCompleteCallback) {
    this.preloader = document.getElementById('js-preloader');
    this.container = document.getElementById('js-lottie-container');
    this.onCompleteCallback = onCompleteCallback;
    this.hasExited = false;

    if (!this.preloader || !this.container) {
      if (this.onCompleteCallback) this.onCompleteCallback();
      return;
    }

    this.init();
  }

  init() {
    gsap.to(this.container, {
      opacity: 1,
      duration: 1.0,
      ease: "power2.out"
    });

    try {
      this.anim = lottie.loadAnimation({
        container: this.container,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: './intro.json'
      });

      this.anim.addEventListener('DOMLoaded', () => {
        ScrollTrigger.refresh();
      });

      this.anim.addEventListener('complete', () => {
        this.exitSequence();
      });
    } catch (e) {
      console.warn("Lottie loading skipped or failed. Falling back.", e);
      this.exitSequence();
    }

    this.fallbackTimeout = setTimeout(() => {
      this.exitSequence();
    }, 4000);
  }

  exitSequence() {
    if (this.hasExited) return;
    this.hasExited = true;
    clearTimeout(this.fallbackTimeout);

    const tl = gsap.timeline({
      onComplete: () => {
        this.preloader.style.display = 'none';
        this.preloader.style.pointerEvents = 'none';
        
        if (this.onCompleteCallback) {
          this.onCompleteCallback();
        }
      }
    });

    tl.to(this.preloader, {
      opacity: 0,
      yPercent: -4,
      duration: 1.2,
      ease: "power3.inOut"
    });
  }
}

class LuxuryCursor {
  constructor() {
    this.cursor = document.getElementById('js-cursor');
    this.ring = document.getElementById('js-cursor-ring');
    
    if (!this.cursor || !this.ring) return;
    
    this.init();
    this.bindEvents();
  }

  init() {
    this.cursorX = gsap.quickTo(this.cursor, "x", { duration: 0.1, ease: "power3.out" });
    this.cursorY = gsap.quickTo(this.cursor, "y", { duration: 0.1, ease: "power3.out" });
    
    this.ringX = gsap.quickTo(this.ring, "x", { duration: 0.35, ease: "power2.out" });
    this.ringY = gsap.quickTo(this.ring, "y", { duration: 0.35, ease: "power2.out" });
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.cursorX(e.clientX);
      this.cursorY(e.clientY);
      this.ringX(e.clientX);
      this.ringY(e.clientY);
    });

    this.refreshHoverTargets();
  }

  refreshHoverTargets() {
    const hoverables = document.querySelectorAll('.hover-target, a, button, input, textarea');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => this.onHoverEnter());
      el.addEventListener('mouseleave', () => this.onHoverLeave());
    });
  }

  onHoverEnter() {
    gsap.to(this.cursor, {
      scale: 3.5,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      mixBlendMode: 'difference',
      duration: 0.4,
      ease: "power3.out"
    });
    gsap.to(this.ring, {
      scale: 1.6,
      borderColor: 'rgba(197, 168, 128, 0.8)',
      duration: 0.4,
      ease: "power3.out"
    });
  }

  onHoverLeave() {
    gsap.to(this.cursor, {
      scale: 1,
      backgroundColor: '#c5a880',
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(this.ring, {
      scale: 1,
      borderColor: 'rgba(197, 168, 128, 0.3)',
      duration: 0.3,
      ease: "power2.out"
    });
  }
}

class SmartHeader {
  constructor() {
    this.header = document.querySelector('.header');
    this.isHidden = false;
    
    if (!this.header) return;
    this.init();
  }

  init() {
    ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => {
        if (self.scroll() > 120) {
          if (self.direction === 1 && !this.isHidden) {
            this.hideHeader();
          } else if (self.direction === -1 && this.isHidden) {
            this.showHeader();
          }
        } else {
          this.showHeader();
        }
      }
    });
  }

  hideHeader() {
    this.isHidden = true;
    gsap.to(this.header, {
      yPercent: -100,
      duration: 0.4,
      ease: "power3.inOut"
    });
  }

  showHeader() {
    this.isHidden = false;
    gsap.to(this.header, {
      yPercent: 0,
      duration: 0.4,
      ease: "power3.out"
    });
  }
}

class MobileMenuManager {
  constructor(lenis) {
    this.lenis = lenis;
    this.hamburger = document.getElementById('js-hamburger');
    this.menuOverlay = document.getElementById('js-mobile-menu');
    this.closeBtn = document.getElementById('js-mobile-close');
    this.mobileLogo = document.querySelector('.mobile-logo');
    this.bg = this.menuOverlay ? this.menuOverlay.querySelector('.mobile-menu-bg') : null;
    this.links = document.querySelectorAll('.mobile-nav-link');
    this.isOpen = false;

    if (!this.hamburger || !this.menuOverlay) return;
    this.initTimeline();
    this.bindEvents();
  }

  initTimeline() {
    this.timeline = gsap.timeline({ paused: true });

    this.timeline
      .set(this.menuOverlay, { display: 'flex' })
      .fromTo(this.bg, {
        xPercent: 100
      }, {
        xPercent: 0,
        duration: 0.8,
        ease: "power4.inOut"
      })
      .fromTo([this.mobileLogo, this.closeBtn], {
        opacity: 0,
        y: -20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2")
      .fromTo(this.links, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .to('.hamburger-line.line-1', {
        y: 4,
        rotation: 45,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0)
      .to('.hamburger-line.line-2', {
        y: -4,
        rotation: -45,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0);
  }

  bindEvents() {
    this.hamburger.addEventListener('click', () => this.toggle());
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.mobileLogo) {
      this.mobileLogo.addEventListener('click', (e) => {
        e.preventDefault();
        this.close(() => {
          if (this.lenis) {
            this.lenis.scrollTo(0, { duration: 1.5 });
          }
        });
      });
    }

    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        this.close(() => {
          const targetElement = document.querySelector(targetId);
          if (targetElement && this.lenis) {
            this.lenis.scrollTo(targetElement, {
              duration: 1.8,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          }
        });
      });
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.menuOverlay.setAttribute('aria-hidden', 'false');
    this.menuOverlay.style.pointerEvents = 'auto';
    
    if (this.lenis) this.lenis.stop();
    this.timeline.play();
  }

  close(callback) {
    this.isOpen = false;
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.menuOverlay.setAttribute('aria-hidden', 'true');
    this.menuOverlay.style.pointerEvents = 'none';

    if (this.lenis) this.lenis.start();
    this.timeline.reverse().then(() => {
      gsap.set(this.menuOverlay, { display: 'none' });
      if (callback) callback();
    });
  }
}

class HeroAnimation {
  constructor() {
    this.titleElement = document.getElementById('js-hero-title');
    this.bgContainer = document.querySelector('.hero-bg-container');
    this.bgImage = document.querySelector('.hero-bg-img');
    this.subtitle = document.querySelector('.hero-subtitle');

    if (!this.titleElement) return;

    this.splitTextElements();
  }

  splitTextElements() {
    const text = this.titleElement.innerText;
    const words = text.split(' ');
    this.titleElement.innerHTML = '';

    words.forEach((word) => {
      const wrapper = document.createElement('span');
      wrapper.classList.add('word-wrapper');

      const inner = document.createElement('span');
      inner.classList.add('word-inner');
      inner.innerText = word + '\u00A0';

      wrapper.appendChild(inner);
      this.titleElement.appendChild(wrapper);
    });
  }

  initEntrySequence() {
    const timeline = gsap.timeline();

    timeline.to(this.titleElement, {
      opacity: 1,
      duration: 0.1,
      ease: "none"
    });

    timeline.to(this.bgImage, {
      scale: 1.0,
      duration: 2.2,
      ease: "power4.out"
    }, 0);

    timeline.to('.word-inner', {
      y: '0%',
      stagger: 0.08,
      duration: 1.4,
      ease: "power4.out"
    }, "-=1.8");

    timeline.fromTo(this.subtitle, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=1.0");

    timeline.to('.header', {
      opacity: 1,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1.2");

    this.initScrollParallax();
  }

  initScrollParallax() {
    gsap.to(this.bgContainer, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to('.hero-content, .hero-scroll-indicator', {
      opacity: 0,
      yPercent: -20,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "center center",
        end: "bottom top",
        scrub: true
      }
    });
  }
}

class HBAPinnedSlider {
  constructor() {
    this.projects = gsap.utils.toArray('.hba-project');
    if (this.projects.length === 0) return;
    this.init();
  }

  init() {
    this.projects.forEach((project) => {
      const slides = project.querySelectorAll('.project-slide.next-slide');
      const progressBarFill = project.querySelector('.progress-bar-fill');
      
      const totalSlides = slides.length;
      const scrollDuration = totalSlides * 100; 

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top top",
          end: `+=${scrollDuration}%`,
          pin: true,
          scrub: 1.0,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      slides.forEach((slide, idx) => {
        const image = slide.querySelector('img');
        const slideProgressTarget = ((idx + 1) / totalSlides) * 100;

        tl.to(slide, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "none"
        });

        tl.fromTo(image, {
          scale: 1.15
        }, {
          scale: 1.05,
          duration: 1.5,
          ease: "none"
        }, "<");

        if (progressBarFill) {
          tl.to(progressBarFill, {
            width: `${slideProgressTarget}%`,
            duration: 1.5,
            ease: "none"
          }, "<");
        }

        if (idx < totalSlides - 1) {
          tl.to({}, { duration: 0.5 }); 
        }
      });
    });
  }
}

class SkipProjectsControl {
  constructor(lenis) {
    this.button = document.getElementById('js-skip-projects');
    this.targetSection = document.getElementById('services');
    this.projectsWrapper = document.getElementById('projects');
    this.lenis = lenis;

    if (!this.button || !this.targetSection || !this.projectsWrapper) return;
    this.init();
  }

  init() {
    ScrollTrigger.create({
      trigger: this.projectsWrapper,
      start: "top center",
      end: "bottom center",
      onEnter: () => this.button.classList.add('visible'),
      onLeave: () => this.button.classList.remove('visible'),
      onEnterBack: () => this.button.classList.add('visible'),
      onLeaveBack: () => this.button.classList.remove('visible')
    });

    this.button.addEventListener('click', () => {
      if (this.lenis) {
        this.lenis.scrollTo(this.targetSection, {
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  }
}

class LuxuryDetailsModal {
  constructor(lenis) {
    this.lenis = lenis;
    this.modal = document.getElementById('js-project-modal');
    this.closeBtn = document.getElementById('js-modal-close');
    this.triggers = document.querySelectorAll('.view-project-btn');
    
    this.slidesContainer = document.getElementById('js-modal-slides-container');
    this.prevBtn = document.getElementById('js-modal-prev');
    this.nextBtn = document.getElementById('js-modal-next');
    
    this.titleElem = document.getElementById('js-modal-title');
    this.descElem = document.getElementById('js-modal-desc');
    this.numElem = document.getElementById('js-modal-num');
    this.locElem = document.getElementById('js-modal-loc');
    this.areaElem = document.getElementById('js-modal-area');
    
    this.currentIdx = 0;
    this.activeSlides = [];
    this.activeSlideNum = 0;

    if (!this.modal) return;
    this.bindEvents();
  }

  bindEvents() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-project-idx'), 10);
        this.open(idx);
      });
    });

    this.closeBtn.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click', () => this.navigateSlide(-1));
    this.nextBtn.addEventListener('click', () => this.navigateSlide(1));

    this.modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop-blur')) {
        this.close();
      }
    });
  }

  open(idx) {
    const data = PROJECT_REGISTRY[idx];
    if (!data) return;

    if (this.lenis) {
      this.lenis.stop();
    }

    this.numElem.textContent = data.num;
    this.titleElem.textContent = data.title;
    this.descElem.textContent = data.desc;
    this.locElem.textContent = data.location;
    this.areaElem.textContent = data.area;

    this.slidesContainer.innerHTML = '';
    this.activeSlides = [];
    this.activeSlideNum = 0;

    data.images.forEach((imgSrc, slideIdx) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = `modal-slide-item ${slideIdx === 0 ? 'active' : ''}`;
      
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `${data.title} slide detail ${slideIdx + 1}`;
      
      slideDiv.appendChild(img);
      this.slidesContainer.appendChild(slideDiv);
      this.activeSlides.push(slideDiv);
    });

    gsap.killTweensOf([this.modal, '.modal-content-pane', '.modal-slideshow-pane', '.modal-text-content *']);
    
    gsap.set(this.modal, { display: 'flex', pointerEvents: 'auto' });
    
    const tl = gsap.timeline();
    
    tl.to(this.modal, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    });

    tl.fromTo('.modal-slideshow-pane', {
      clipPath: "inset(0 100% 0 0)"
    }, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=0.3");

    tl.fromTo('.modal-content-pane', {
      xPercent: 100
    }, {
      xPercent: 0,
      duration: 1.2,
      ease: "power4.inOut"
    }, "<");

    tl.fromTo('.modal-text-content > *', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");
  }

  close() {
    if (this.lenis) {
      this.lenis.start();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(this.modal, { display: 'none', pointerEvents: 'none' });
      }
    });

    tl.to('.modal-text-content > *', {
      opacity: 0,
      y: -20,
      stagger: 0.05,
      duration: 0.4,
      ease: "power3.in"
    });

    tl.to('.modal-slideshow-pane', {
      clipPath: "inset(0 0 0 100%)",
      duration: 0.8,
      ease: "power4.inOut"
    }, "-=0.2");

    tl.to('.modal-content-pane', {
      xPercent: 100,
      duration: 0.8,
      ease: "power4.inOut"
    }, "<");

    tl.to(this.modal, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.4");
  }

  navigateSlide(direction) {
    if (this.activeSlides.length <= 1) return;

    const currentSlide = this.activeSlides[this.activeSlideNum];
    this.activeSlideNum = (this.activeSlideNum + direction + this.activeSlides.length) % this.activeSlides.length;
    const nextSlide = this.activeSlides[this.activeSlideNum];

    gsap.to(currentSlide, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => currentSlide.classList.remove('active')
    });

    nextSlide.classList.add('active');
    gsap.fromTo(nextSlide, {
      opacity: 0,
      scale: 1.05
    }, {
      opacity: 1,
      scale: 1.0,
      duration: 0.8,
      ease: "power2.out"
    });
  }
}

class ServicesReveals {
  constructor() {
    this.section = document.querySelector('.services-section');
    this.items = gsap.utils.toArray('.service-item');
    
    if (!this.section) return;
    this.init();
  }

  init() {
    gsap.fromTo('.reveal-text', {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.services-header',
        start: "top 80%"
      }
    });

    this.items.forEach((item) => {
      const mediaFrame = item.querySelector('.service-media-frame');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      if (mediaFrame) {
        tl.fromTo(mediaFrame, {
          clipPath: "inset(0 0 100% 0)"
        }, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "power4.inOut"
        });
      }

      tl.to(item, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1.5");
    });
  }
}

class SmoothScrollReveals {
  constructor() {
    this.containers = document.querySelectorAll('.js-reveal-container');
    if (this.containers.length === 0) return;
    
    this.initReveals();
  }

  initReveals() {
    this.containers.forEach((container) => {
      const img = container.querySelector('.js-reveal-image');
      if (!img) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(container, {
        clipPath: "inset(0 0 100% 0)"
      }, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.5,
        ease: "power4.inOut"
      });
    });
  }
}

class InstagramSlider {
  constructor() {
    this.track = document.getElementById('js-instagram-track');
    this.section = document.getElementById('instagram');
    
    if (!this.track) return;
    this.init();
  }

  init() {
    gsap.fromTo('#instagram .reveal-text', {
      opacity: 0,
      y: 45
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: this.section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    const slides = this.track.querySelectorAll('.instagram-slide');
    
    const calculateScrollBounds = () => {
      let widthAccumulator = 0;
      const originalSlidesCount = 4;
      
      for (let i = 0; i < originalSlidesCount; i++) {
        if (slides[i]) {
          const style = window.getComputedStyle(slides[i]);
          const marginRight = parseFloat(style.marginRight) || 0;
          widthAccumulator += slides[i].getBoundingClientRect().width + marginRight;
        }
      }
      return widthAccumulator;
    };

    let translationLimit = calculateScrollBounds();

    this.marqueeTween = gsap.to(this.track, {
      x: -translationLimit,
      duration: 28, 
      ease: "none",
      repeat: -1,
      onReverseComplete: () => {
        this.marqueeTween.totalTime(this.marqueeTween.rawTime() + this.marqueeTween.duration() * 10);
      }
    });

    this.track.addEventListener('mouseenter', () => {
      gsap.to(this.marqueeTween, { timeScale: 0.25, duration: 1.2, ease: "power2.out" });
    });
    
    this.track.addEventListener('mouseleave', () => {
      gsap.to(this.marqueeTween, { timeScale: 1.0, duration: 1.2, ease: "power2.out" });
    });

    window.addEventListener('resize', () => {
      translationLimit = calculateScrollBounds();
      this.marqueeTween.vars.x = -translationLimit;
      this.marqueeTween.invalidate().restart();
    });
  }
}

class ThreeSpatialCanvas {
  constructor() {
    this.container = document.querySelector('.hero-bg-container');
    if (!this.container) return;
    
    this.loadDependency().then(() => {
      this.init();
    });
  }

  loadDependency() {
    return new Promise((resolve) => {
      if (window.THREE) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '1';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.opacity = '0.35';
    this.container.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 30;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.createSpatialElements();
    this.bindEvents();
    this.animate();
  }

  createSpatialElements() {
    const geometry = new THREE.BufferGeometry();
    const count = 400;
    const positions = new Float32Array(count * 3);
    this.originalY = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      this.originalY[i] = y;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.18,
      color: 0xc5a880, 
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc5a880,
      transparent: true,
      opacity: 0.08
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      linePositions[i * 3] = (Math.random() - 0.5) * 60;
      linePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      linePositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    this.lines = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(this.lines);

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX - window.innerWidth / 2) * 0.03;
      this.targetMouseY = (e.clientY - window.innerHeight / 2) * 0.03;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    this.points.rotation.y = this.mouseX * 0.1;
    this.points.rotation.x = this.mouseY * 0.1;

    this.lines.rotation.y = this.mouseX * 0.05;
    this.lines.rotation.x = this.mouseY * 0.05;

    const time = Date.now() * 0.0005;
    const positions = this.points.geometry.attributes.position.array;

    for (let i = 0; i < positions.length / 3; i++) {
      const x = positions[i * 3];
      positions[i * 3 + 1] = this.originalY[i] + Math.sin(time + x * 0.2) * 1.5;
    }
    this.points.geometry.attributes.position.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }
}

// ==========================================================================
// ORCHESTRATION ENGINE INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const initSmoothScroll = () => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return lenis;
  };

  const lenisInstance = initSmoothScroll();
  lenisInstance.stop();

  const initSmoothNavLinks = (lenis) => {
    const navLinks = document.querySelectorAll('.desktop-nav a, .logo');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId === '#') {
          lenis.scrollTo(0, { duration: 1.5 });
        } else {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              duration: 1.8,
              offset: 0,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          }
        }
      });
    });
  };

  initSmoothNavLinks(lenisInstance);

  const cursor = new LuxuryCursor();
  const heroAnim = new HeroAnimation();

  new PreloaderManager(() => {
    const wrapper = document.getElementById('smooth-wrapper');
    if (wrapper) {
      wrapper.classList.remove('is-loading');
      
      gsap.fromTo(wrapper, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          lenisInstance.start();
          
          new HBAPinnedSlider();
          new SkipProjectsControl(lenisInstance);
          new ServicesReveals();
          new SmoothScrollReveals();
          new ThreeSpatialCanvas();
          new LuxuryDetailsModal(lenisInstance);
          new InstagramSlider();
          new SmartHeader();
          new MobileMenuManager(lenisInstance);
          
          ScrollTrigger.refresh();
          cursor.refreshHoverTargets();
        }
      });
    }

    heroAnim.initEntrySequence();
  });

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
    cursor.refreshHoverTargets();
  });
});