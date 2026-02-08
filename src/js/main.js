document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const title = item.querySelector('.faq-item__head');
    if (title) {
      const content = item.querySelector('.faq-item__wrapper');
      const text = item.querySelector('.faq-item__content');
      item.addEventListener('click', () => {
        item.classList.toggle('show');
        content.style.height = item.classList.contains('show') ? `${text.scrollHeight}px` : null;
      });
    }
  });

  function initMarquee() {
    document.querySelectorAll('.marquee').forEach((marquee) => {
      const track = marquee.querySelector('.marquee-track');
      const original = track.querySelector('.marquee-content');

      track.innerHTML = '';
      track.appendChild(original);

      const originalWidth = original.offsetWidth;
      const containerWidth = marquee.offsetWidth;

      let totalWidth = originalWidth;
      while (totalWidth < containerWidth * 2) {
        const clone = original.cloneNode(true);
        track.appendChild(clone);
        totalWidth += originalWidth;
      }

      track.style.setProperty('--distance', `${originalWidth}px`);

      const speed = 80;
      track.style.setProperty('--duration', `${(originalWidth / speed) * 2}s`);
    });
  }

  initMarquee();
  window.addEventListener('resize', initMarquee);

  const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

  const openPopup = (popupId) => {
    const popup = document.querySelector(`[data-popup="${popupId}"]`);

    if (!popup) {
      console.error(`Error: popup "${popupId}" not defined`);
      return;
    }

    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    popup.classList.add('open');
  };

  const closePopup = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.querySelectorAll('[data-popup]').forEach((popup) => popup.classList.remove('open'));
  };

  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('[data-button]');
    if (button) openPopup(button.getAttribute('data-button'));
  });

  document.querySelectorAll('.popup-close, .popup-backdrop').forEach((closeTrigger) => {
    closeTrigger.addEventListener('click', closePopup);
  });

  window.addEventListener('resize', function () {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  });
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);

  const lenis = new Lenis({
    duration: 2,
    lerp: 0.2,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  requestAnimationFrame(function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  });

  const counters = document.querySelectorAll('[data-counter]');

  counters.forEach((el) => {
    const num = el.textContent.trim();
    const numArr = [...String(num)];

    const idle = numArr.map((c) => `<span class="char">${c}</span>`).join('');
    el.innerHTML = `<span class="idle">${idle}</span><span class="hover">${idle}</span>`;
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          io.unobserve(entry.target);
        }
      }
    },
    {
      root: null,
      rootMargin: `0px 0px -160px 0px`,
      threshold: 0,
    },
  );

  counters.forEach((el) => io.observe(el));
});
