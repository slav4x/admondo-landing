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
});
