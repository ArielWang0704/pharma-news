(() => {
  const broadSelect = document.getElementById('broadCategoryFilter');
  const eventList = document.getElementById('eventList');
  const emptyState = document.getElementById('emptyState');
  if (!broadSelect || !eventList) return;

  function broadCategory(raw){
    const c = String(raw || '');
    if (/政策|支付|医保|集采/.test(c)) return '政策/支付';
    if (/器械|诊断|IVD/.test(c)) return '医疗器械/诊断';
    if (/BD|投融资|并购|融资/.test(c)) return 'BD/投融资';
    if (/组织|合规|大公司|战略|财报/.test(c)) return '组织/公司';
    if (/渠道|患者|零售|电商/.test(c)) return '渠道/患者';
    if (/数字|AI|人工智能/.test(c)) return '数字医疗/AI';
    return '药品/创新药';
  }

  function categoryChip(card){
    const chips = [...card.querySelectorAll('.chips .chip')];
    return chips.find(x => !x.classList.contains('v')) || null;
  }

  function apply(){
    const wanted = broadSelect.value;
    const cards = [...eventList.querySelectorAll('.event-card')];
    let visible = 0;
    cards.forEach(card => {
      const chip = categoryChip(card);
      if (!card.dataset.rawCategory && chip) card.dataset.rawCategory = chip.textContent.trim();
      const broad = broadCategory(card.dataset.rawCategory || '');
      card.dataset.broadCategory = broad;
      if (chip && chip.textContent !== broad) chip.textContent = broad;
      const hide = Boolean(wanted && broad !== wanted);
      card.dataset.broadHidden = hide ? '1' : '0';
      if (!hide) visible++;
    });
    if (emptyState && cards.length) emptyState.classList.toggle('show', visible === 0);
  }

  // Broad category is a reader-side filter; apply only after actual user/filter events.
  broadSelect.addEventListener('change', () => setTimeout(apply, 0));
  document.addEventListener('input', e => {
    if (e.target && e.target.closest && e.target.closest('.filters')) setTimeout(apply, 0);
  });
  document.addEventListener('change', e => {
    if (e.target && e.target.closest && e.target.closest('.filters')) setTimeout(apply, 0);
  });

  // Initial data is loaded asynchronously by v21-app.js. Poll only until cards appear, then stop.
  let tries = 0;
  const timer = setInterval(() => {
    apply();
    tries++;
    if (eventList.querySelector('.event-card') || tries > 80) clearInterval(timer);
  }, 100);
})();
