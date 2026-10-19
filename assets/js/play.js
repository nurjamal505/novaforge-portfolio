(()=>{const I='assets/images/char-',$=i=>document.getElementById(i);
const m=$('mem'),mv=$('mv'),win=$('win');let first=null,lock=false,n=0,done=0;
function init(){m.innerHTML='';win.textContent='';n=done=0;first=null;mv.textContent=0;
[0,1,2,3,4,5,0,1,2,3,4,5].sort(()=>Math.random()-.5).forEach(k=>{const b=document.createElement('button');b.className='mc';b.dataset.k=k;b.setAttribute('aria-label','card');b.innerHTML='<i>?</i><img src="'+I+k+'.svg" alt="">';
b.onclick=()=>{if(lock||b.classList.contains('up'))return;b.classList.add('up');if(!first){first=b;return}mv.textContent=++n;
if(first.dataset.k===b.dataset.k){first=null;if(++done===6)win.textContent=t('Well done!')}else{lock=true;const f=first;first=null;setTimeout(()=>{f.classList.remove('up');b.classList.remove('up');lock=false},700)}};m.appendChild(b)})}
$('rs').onclick=init;init();
const c=$('catch'),sc=$('sc'),tm=$('tm'),st=$('st');let s=0,tl=0,iv,tk;
for(let i=0;i<9;i++){const d=document.createElement('button');d.className='cell';d.setAttribute('aria-label','cell');c.appendChild(d)}
const cs=[...c.children],clr=()=>cs.forEach(x=>x.innerHTML='');
st.onclick=()=>{clearInterval(iv);clearInterval(tk);s=0;tl=20;sc.textContent=0;tm.textContent=20;st.textContent=t('Restart');
tk=setInterval(()=>{tm.textContent=--tl;if(tl<=0){clearInterval(tk);clearInterval(iv);clr()}},1000);
iv=setInterval(()=>{clr();cs[Math.floor(Math.random()*9)].innerHTML='<img src="'+I+Math.floor(Math.random()*6)+'.svg" alt="">'},750)};
c.onclick=e=>{const x=e.target.closest('.cell');if(x&&x.firstChild&&tl>0){x.innerHTML='';sc.textContent=++s}};})();
