(() => {
  const outer = document.getElementById('appFrame');
  const clean = s => String(s || '').replace(/\s+/g,' ').trim();
  function ctx(){
    try{
      const wrap=outer?.contentDocument;
      const f=wrap?.getElementById('radarFrame');
      return f?.contentWindow&&f?.contentDocument?{w:f.contentWindow,d:f.contentDocument}:null;
    }catch(e){return null}
  }
  function items(w){try{return w.eval('newsData')}catch(e){return[]}}
  function kind(i){
    const c=i.category||'',t=i.title||'';
    if(/Q[1-4]|H[12]|财报|业绩|半年报|年报/.test(t)) return 'finance';
    if(c.includes('政策')||c.includes('支付')) return 'policy';
    if(c.includes('BD')||c.includes('投融资')) return 'bd';
    if(c.includes('组织')||c.includes('大公司')||c.includes('战略')) return 'org';
    if(c.includes('器械')||c.includes('诊断')) return 'device';
    if(c.includes('数字')||c.includes('AI')) return 'digital';
    if(c.includes('渠道')||c.includes('患者')) return 'channel';
    if(c.includes('药品')||c.includes('创新药')) return 'drug';
    return 'general';
  }
  function boxByTitle(card, starts){
    return [...card.querySelectorAll('.dd')].find(b=>starts.some(x=>clean(b.querySelector('h3')?.textContent).startsWith(x)));
  }
  function remove(card, starts){ const b=boxByTitle(card,starts); if(b) b.remove(); }
  function rename(card, starts, title){ const b=boxByTitle(card,starts); const h=b?.querySelector('h3'); if(h) h.textContent=title; return b; }
  function setText(card, starts, title, text){
    const b=rename(card,starts,title); if(!b)return;
    b.innerHTML=`<h3>${title}</h3><p>${text}</p>`;
  }
  function setFlow(card, starts, title, steps){
    const b=rename(card,starts,title); if(!b)return;
    b.innerHTML=`<h3>${title}</h3><div class="flow">${steps.map((x,n)=>`<div><span>${n+1}</span><p>${x}</p></div>`).join('')}</div>`;
  }
  function adapt(card,i){
    const k=kind(i);
    if(i.id!=='grassroots-drg-dip-drug-follows-disease-20260817') remove(card,['4. 举个例子','举个例子','举例帮助理解']);
    remove(card,['5. 以前 vs 现在','以前 vs 现在']);
    const bgTitle={policy:'政策背景',bd:'交易背景',org:'公司 / 业务背景',finance:'财报背景',drug:'产品 / 疾病背景',device:'产品与使用场景背景',digital:'应用场景背景',channel:'渠道背景',general:'背景'}[k];
    rename(card,['2. 背景：为什么以前没这么容易落地','背景：为什么以前没这么容易落地','背景'],bgTitle);
    if(['org','finance','general'].includes(k)) remove(card,['10. 下一步看什么','9. 下一步看什么','下一步看什么','接下来值得验证']);
    if(k==='org'){
      setFlow(card,['3. 规则 / 商业逻辑到底怎么运作','规则 / 商业逻辑到底怎么运作'],'组织与业务变化怎么看',[
        '先看客户、产品或区域归属是否重划，而不是只看部门改名。',
        '再看预算、P&L、KPI和决策权是否随之迁移。',
        '最后看一线覆盖、跨部门协作和资源投向是否真的改变。'
      ]);
      remove(card,['6. 谁会受到什么影响','谁会受到什么影响']);
      rename(card,['7. 对行业格局意味着什么','对行业格局意味着什么'],'战略含义');
      rename(card,['8. 对药企 / 岗位意味着什么','对药企 / 岗位意味着什么'],'对管理和一线执行的启发');
    }
    if(k==='finance'){
      remove(card,['3. 规则 / 商业逻辑到底怎么运作','规则 / 商业逻辑到底怎么运作']);
      remove(card,['6. 谁会受到什么影响','谁会受到什么影响']);
      rename(card,['7. 对行业格局意味着什么','对行业格局意味着什么'],'这组数字说明什么');
      rename(card,['8. 对药企 / 岗位意味着什么','对药企 / 岗位意味着什么'],'分析时还要继续拆什么');
    }
    if(['drug','device','digital'].includes(k)){
      remove(card,['3. 规则 / 商业逻辑到底怎么运作','规则 / 商业逻辑到底怎么运作']);
      remove(card,['6. 谁会受到什么影响','谁会受到什么影响']);
    }
    if(i.id==='mnc-china-operating-model-reorganization-202608'){
      setText(card,['2. 背景：为什么以前没这么容易落地','公司 / 业务背景','背景'],'公司 / 业务背景','这张卡合并的是三种不同性质的动作：诺和诺德是商业组织重构，勃林格殷格翰是区域治理与研发能力升级，诺华是关键高管变化。把它们放在一起的意义，是观察跨国药企如何重新分配中国市场的客户归属、资源和全球接口，而不是把三家公司理解成做了同一件事。');
      setFlow(card,['3. 规则 / 商业逻辑到底怎么运作','组织与业务变化怎么看'],'三家公司分别发生了什么',[
        '诺和诺德：医院、零售/线上/私立医疗、广阔市场进一步分层，院外场景获得更独立的组织能力。',
        '勃林格殷格翰：提高大中华区在全球治理中的层级，并加强上海早研能力，中国洞察更直接进入全球决策。',
        '诺华：关键国际商业高管离任，首先是管理连续性问题；是否影响中国战略，要看继任和后续资源，而不能只凭离任下结论。'
      ]);
      remove(card,['4. 举个例子','举个例子','举例帮助理解']);
      remove(card,['5. 以前 vs 现在','以前 vs 现在']);
      remove(card,['6. 谁会受到什么影响','谁会受到什么影响']);
      remove(card,['10. 下一步看什么','9. 下一步看什么','下一步看什么','接下来值得验证']);
    }
  }
  let observer;
  function run(){
    const z=ctx(); if(!z)return false;
    const ds=items(z.w),list=z.d.getElementById('newsList'); if(!ds.length||!list)return false;
    const map=new Map(ds.map(i=>[clean(i.title),i]));
    list.querySelectorAll('.card').forEach(card=>{const i=map.get(clean(card.querySelector('h2')?.textContent));if(i)adapt(card,i)});
    if(!observer){observer=new MutationObserver(()=>setTimeout(run,0));observer.observe(list,{childList:true})}
    return true;
  }
  let n=0,t=setInterval(()=>{if(run()||++n>100)clearInterval(t)},120);
  outer?.addEventListener('load',()=>setTimeout(run,150));
})();