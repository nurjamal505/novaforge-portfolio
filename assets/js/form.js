(()=>{const f=document.getElementById('lead'),err=document.getElementById('err'),btn=document.getElementById('send'),t=document.getElementById('toast');let busy=false;
const toast=(m,e)=>{t.textContent=m;t.className='show'+(e?' error':'');setTimeout(()=>t.className='',5000)};
f.addEventListener('submit',async ev=>{ev.preventDefault();if(busy)return;err.textContent='';
f.querySelectorAll('.bad').forEach(x=>x.classList.remove('bad'));const d=Object.fromEntries(new FormData(f));d.consent=f.consent.checked;
const bad=[];if(!d.name.trim())bad.push('name');if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email))bad.push('email');if(d.message.trim().length<20)bad.push('message');
if(bad.length||!d.consent){bad.forEach(n=>f[n].classList.add('bad'));err.textContent=!d.consent&&!bad.length?'Please accept the consent.':'Please fill the required fields correctly (message: at least 20 characters).';return}
const url=(window.NF_CONFIG||{}).ENDPOINT;if(!url){err.textContent='The form is not connected to the server yet.';toast('Form is not connected to the server yet.',true);return}
busy=true;btn.disabled=true;btn.textContent='Sending…';
try{const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});const j=await r.json().catch(()=>({}));
if(r.ok&&j.ok){toast('Заявка отправлена! Мы свяжемся с вами');f.reset()}else{err.textContent=j.error||'Server error. Please try again.';toast('Could not send. Try again.',true)}}
catch(e){err.textContent='Server unavailable. Your data is kept — try again.';toast('Server unavailable.',true)}
finally{busy=false;btn.disabled=false;btn.textContent='Send request'}})})();
