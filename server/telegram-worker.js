// Cloudflare Worker. Secrets: BOT_TOKEN (secret), CHAT_ID (secret/var), ALLOWED_ORIGINS (var, comma-separated)
const hits=new Map(),MAX=16000,L={name:80,message:3500};
const clean=(v,n)=>String(v??'').replace(/[\u0000-\u0008\u000b-\u001f]/g,' ').trim().slice(0,n);
export default{async fetch(req,env){
                const allowed=(env.ALLOWED_ORIGINS||'https://nurjamal505.github.io,http://localhost:8080').split(',').map(s=>s.trim());
                const o=req.headers.get('Origin')||'',ok=allowed.includes(o);
                const h={'Access-Control-Allow-Origin':ok?o:allowed[0],'Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'};
                const j=(b,s)=>new Response(JSON.stringify(b),{status:s,headers:{...h,'Content-Type':'application/json'}});
                if(req.method==='OPTIONS')return new Response(null,{status:ok?204:403,headers:h});
                if(req.method!=='POST')return j({ok:false,error:'Method not allowed'},405);
                if(!ok)return j({ok:false,error:'Forbidden'},403);
                if(!(req.headers.get('Content-Type')||'').includes('application/json'))return j({ok:false,error:'Unsupported content type'},415);
                const ip=req.headers.get('CF-Connecting-IP')||'x',now=Date.now();
                if(now-(hits.get(ip)||0)<15000)return j({ok:false,error:'Too many requests, wait a bit.'},429);
                const raw=await req.text();if(raw.length>MAX)return j({ok:false,error:'Request too large'},413);
                let d;try{d=JSON.parse(raw)}catch{return j({ok:false,error:'Invalid JSON'},400)}
                if(d.website)return j({ok:true},200);
                const v={};for(const k in L)v[k]=clean(d[k],L[k]);
                if([...v.name].length<3||[...v.message].length<3)return j({ok:false,error:'Invalid or missing fields'},400);
                if(!env.BOT_TOKEN||!env.CHAT_ID)return j({ok:false,error:'Server not configured'},500);
                const text=`New NOVAFORGE request

Name: ${v.name}

${v.message}`;
                try{const r=await fetch(`https://api.telegram.org/bot${String(env.BOT_TOKEN).trim().replace(/^bot/i,'')}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:String(env.CHAT_ID).trim(),text}),signal:AbortSignal.timeout(10000)});
                        const t=await r.json();if(!r.ok||!t.ok)return j({ok:false,error:'Delivery failed',detail:String(t.description||'').slice(0,120)},502);
                        hits.set(ip,now);return j({ok:true},200)}catch{return j({ok:false,error:'Delivery failed'},502)}}};