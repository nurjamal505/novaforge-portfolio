(()=>{const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const b=document.querySelector('.burger'),n=document.querySelector('nav');
b&&b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
document.querySelectorAll('.split').forEach(h=>{if(rm)return;let i=0;const w=n=>[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();[...c.textContent].forEach(ch=>{const s=document.createElement('span');s.className='ch';s.textContent=ch===' '?'\u00a0':ch;s.style.animationDelay=(i++*35+200)+'ms';f.appendChild(s)});c.replaceWith(f)}else w(c)});w(h)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
if(!rm&&matchMedia('(hover:hover)').matches){const s=document.querySelector('.spot');addEventListener('pointermove',e=>{s.style.setProperty('--x',e.clientX+'px');s.style.setProperty('--y',e.clientY+'px')},{passive:true})}
document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('on',x===btn));
document.querySelectorAll('#pg .card').forEach(c=>c.classList.toggle('hide',btn.dataset.f!=='all'&&c.dataset.cat!==btn.dataset.f))}));})();
