(()=>{const f=document.getElementById('lead'),err=document.getElementById('err'),btn=document.getElementById('send'),tt=document.getElementById('toast');let busy=false;f.addEventListener('input',e=>e.target.classList.remove('bad'));
    const toast=(m,e)=>{tt.textContent=m;tt.className='show'+(e?' error':'');setTimeout(()=>tt.className='',5000)};
    f.addEventListener('submit',async ev=>{ev.preventDefault();if(busy)return;err.textContent='';
        f.querySelectorAll('.bad').forEach(x=>x.classList.remove('bad'));const d=Object.fromEntries(new FormData(f));
        const bad=[];if([...d.name.trim()].length<3)bad.push('name');if([...d.message.trim()].length<3)bad.push('message');
        if(bad.length){bad.forEach(n=>f[n].classList.add('bad'));err.textContent=t('Name and request must be at least 3 characters.');return}
        const cfg=window.NF_CONFIG||{},url=cfg.ENDPOINT;if(!url&&cfg.TG){window.open('https://t.me/'+cfg.TG+'?text='+encodeURIComponent('NOVAFORGE\n'+d.name+'\n\n'+d.message),'_blank','noopener');toast(t('Telegram opened — press Send there to deliver your request'));return}if(!url){err.textContent=t('The form is not connected to the server yet.');toast('Form is not connected to the server yet.',true);return}
        busy=true;btn.disabled=true;btn.textContent=t('Sending…');
        try{const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d),signal:AbortSignal.timeout(20000)});const j=await r.json().catch(()=>({}));
            if(r.ok&&j.ok){toast(t('Request sent! We will contact you.'));f.reset()}else{err.textContent=(j.error||t('Server error. Please try again.'))+(j.detail?' ('+j.detail+')':'');toast(t('Could not send. Try again.'),true)}}
        catch(e){err.textContent=t('Server unavailable. Your data is kept — try again.');toast(t('Server unavailable.'),true)}
        finally{busy=false;btn.disabled=false;btn.textContent=t('Send request')}})})();