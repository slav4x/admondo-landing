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
});
