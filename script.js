// Scroll fade-in
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.opacity = (f === 'all' || card.dataset.cat === f) ? '1' : '0.2';
      card.style.pointerEvents = (f === 'all' || card.dataset.cat === f) ? 'auto' : 'none';
    });
  });
});

// Case study modal
const modal = document.getElementById('caseModal');

function openModal(card) {
  document.getElementById('modalCat').textContent = card.dataset.cat.charAt(0).toUpperCase() + card.dataset.cat.slice(1);
  document.getElementById('modalTitle').textContent = card.dataset.title;
  document.getElementById('modalFull').innerHTML = card.dataset.full;
  const imageArea = document.getElementById('modalImageArea');
  if (card.dataset.image) {
    imageArea.innerHTML = `<img src="${card.dataset.image}" alt="${card.dataset.title}">`;
  } else {
    imageArea.innerHTML = 'No image added yet';
  }
  const pdfBtn = document.getElementById('modalPdfBtn');
  if (card.dataset.pdf) {
    pdfBtn.href = card.dataset.pdf;
    pdfBtn.style.display = 'inline-flex';
  } else {
    pdfBtn.style.display = 'none';
  }
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnBg(e) {
  if (e.target === modal) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Make project cards clickable
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('project-arrow')) openModal(card);
  });
});
