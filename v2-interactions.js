(() => {
  const clean = s => String(s || '').replace(/\s+/g,' ').trim();
  const detailCache = new Map();
  const sourceCache = new Map();
  let ready = false;

  function buildCache(){
    const cards = [...document.querySelectorAll('#eventList .event-card[data-id]')];
    if(!cards.length) return false;
    cards.forEach(card => {
      const id = card.dataset.id;
      const title = clean(card.querySelector('h3')?.textContent);
      const detail = card.querySelector('.event-detail');
      const source = card.querySelector('.source-link[href]');
      if(id && detail) detailCache.set(id, detail.innerHTML);
      if(title && source) sourceCache.set(title, source.href);
    });
    return true;
  }

  function linkThemeEvidence(){
    if(!sourceCache.size) return;
    document.querySelectorAll('.theme-card .evidence-row').forEach(row => {
      if(row.querySelector('a')) return;
      const rowText = clean(row.textContent);
      const title = [...sourceCache.keys()].find(t => rowText.includes(t));
      if(!title) return;
      const href = sourceCache.get(title);
      const dateText = clean(row.querySelector('.date')?.textContent);
      row.classList.add('linked');
      row.innerHTML = `<a class="evidence-link" href="${href}" target="_blank" rel="noopener"><span class="date">${dateText}</span><span>${title}</span><span class="arrow">↗</span></a>`;
    });
  }

  function toggleWeeklyDetail(btn){
    const id = btn.dataset.openEvent;
    const card = btn.closest('.focus-card');
    if(!card || !id) return;
    let detail = card.querySelector('.focus-detail');
    if(detail){
      const open = detail.hidden;
      detail.hidden = !open;
      btn.textContent = open ? '收起解读 ↑' : '展开解读 ↓';
      btn.setAttribute('aria-expanded', String(open));
      return;
    }
    const html = detailCache.get(id);
    if(!html){
      const live = document.querySelector(`#eventList .event-card[data-id="${CSS.escape(id)}"] .event-detail`);
      if(live) detailCache.set(id, live.innerHTML);
    }
    const finalHtml = detailCache.get(id);
    if(!finalHtml) return;
    detail = document.createElement('div');
    detail.className = 'focus-detail';
    detail.innerHTML = `<div class="event-detail">${finalHtml}</div>`;
    card.appendChild(detail);
    btn.textContent = '收起解读 ↑';
    btn.setAttribute('aria-expanded','true');
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-open-event]');
    if(!btn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    toggleWeeklyDetail(btn);
  }, true);

  function init(){
    if(!buildCache()) return false;
    linkThemeEvidence();
    ready = true;
    return true;
  }

  let tries = 0;
  const timer = setInterval(() => {
    if(init() || ++tries > 80) clearInterval(timer);
  }, 100);

  const observer = new MutationObserver(() => {
    if(!ready) return;
    buildCache();
    linkThemeEvidence();
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
