(() => {
  const filters = Array.from(document.querySelectorAll('.filter'));
  const cards = Array.from(document.querySelectorAll('.update'));
  const search = document.getElementById('search');

  function setActive(btn){
    filters.forEach(b => b.classList.toggle('is-active', b === btn));
  }

  function apply(){
    const active = document.querySelector('.filter.is-active')?.dataset.filter ?? 'all';
    const q = (search?.value ?? '').trim().toLowerCase();

    for (const card of cards){
      const tags = (card.dataset.tags || '').split(/\s+/).filter(Boolean);
      const tagOk = active === 'all' ? true : tags.includes(active);

      const text = card.innerText.toLowerCase();
      const searchOk = !q || text.includes(q);

      card.classList.toggle('hidden', !(tagOk && searchOk));
    }
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      setActive(btn);
      apply();
    });
  });

  if (search){
    search.addEventListener('input', apply);
  }

  // Initial
  apply();
})();
