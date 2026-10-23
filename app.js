/* Zuzuki Cafe - site logic. Settings live in config.js */
function wl(m){var n=String(CFG.wa||'').replace(/\D/g,'');return 'https://wa.me/'+n+'?text='+encodeURIComponent(String(m).slice(0,1500))}
document.querySelectorAll('[data-cfg]').forEach(function(e){e.textContent=CFG[e.dataset.cfg]});
document.querySelectorAll('a[data-wa]').forEach(function(a){a.href=wl(a.dataset.wa)});
var ig=document.getElementById('ig'),hd=String(CFG.handle||'').replace(/[^A-Za-z0-9._]/g,'');ig.href=(hd&&CFG.handle.charAt(0)!=='[')?'https://instagram.com/'+hd:'#';
document.getElementById('dir').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(CFG.address);
var P=['home','menu','story','gallery','visit'],T={home:'Zuzuki',menu:'Menu',story:'Our story',gallery:'Gallery',visit:'Visit and booking'};
function route(){var p=(location.hash.replace('#/','')||'home');if(P.indexOf(p)<0)p='home';
P.forEach(function(x){document.getElementById('pg-'+x).classList.toggle('on',x===p)});
document.querySelectorAll('nav a').forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#/'+p);if(a.classList.contains('on'))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
document.title=T[p]+' · Zuzuki Cafe';window.scrollTo(0,0)}
window.addEventListener('hashchange',route);route();
document.getElementById('bsend').addEventListener('click',function(){
var g=function(i){return document.getElementById(i).value.replace(/[\u0000-\u001f\u007f]/g,' ').trim()},msg=document.getElementById('bmsg');
var n=g('bn'),p=g('bp'),d=g('bd'),t=g('bt'),q=parseInt(g('bg'),10),nt=g('bnote'),td=new Date();td.setHours(0,0,0,0);
if(!n||!d||!t||!q){msg.textContent='Please fill in your name, date, time and number of guests.';return}
if(q<1||q>50){msg.textContent='Guests must be between 1 and 50.';return}
if(!/^\d{4}-\d{2}-\d{2}$/.test(d)||new Date(d+'T00:00:00')<td){msg.textContent='Please choose today or a future date.';return}
if(p&&!/^[+\d][\d\s-]{6,17}$/.test(p)){msg.textContent='Please enter a valid phone number.';return}
var u=wl('Hi Zuzuki! Table request: '+n+', '+q+' guests, '+d+' at '+t+(p?', phone '+p:'')+(nt?'. Note: '+nt:'')+'.');
window.open(u,'_blank','noopener,noreferrer');
msg.textContent='Opening WhatsApp… if nothing opened, ';var a=document.createElement('a');a.href=u;a.target='_blank';a.rel='noopener noreferrer';a.textContent='tap here';msg.appendChild(a);msg.appendChild(document.createTextNode('.'))});
[['bn',60],['bp',18],['bnote',200]].forEach(function(x){document.getElementById(x[0]).maxLength=x[1]});
var td0=new Date(),gd0=document.getElementById('bd');gd0.min=td0.getFullYear()+'-'+('0'+(td0.getMonth()+1)).slice(-2)+'-'+('0'+td0.getDate()).slice(-2);
var gg0=document.getElementById('bg');gg0.min=1;gg0.max=50;
(function(){
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};

$$('[data-cfg]').forEach(function(e){e.textContent=CFG[e.dataset.cfg]});

var cart={},LANG='en';
/* offer + reviews */
var home=$('#pg-home');
home.insertAdjacentHTML('afterbegin','<div class="offer rv"><span>Today’s offer: [OFFER, e.g. any coffee + brownie combo]</span><a class="btn ink" href="#/menu">See the menu</a></div>');
var st='<div class="stars" aria-label="5 stars">★★★★★</div>';
home.insertAdjacentHTML('beforeend','<div class="sec" style="padding-top:48px"><h2 class="H h2 rv">Loved by regulars</h2><div class="row">'+['The coffee is fantastic and the staff are so welcoming.','Best corner in the neighbourhood. The brownie sundae is a must.','Great food, calm music and quick service. We come every week.'].map(function(t){return'<div class="rev rv">'+st+'<div>“[SAMPLE REVIEW] '+t+'”</div><div style="font-weight:600">[CUSTOMER NAME]</div></div>'}).join('')+'</div><p style="opacity:.6;font-size:14px">Sample reviews. Replace them with real ones.</p><a class="btn out" href="#" target="_blank" rel="noopener noreferrer">Review us on Google</a></div>');
/* hero letters + steam */
var hb=$('.hero .big');hb.innerHTML=hb.textContent.split('').map(function(c,i){return'<span class="lt" style="animation-delay:'+(.15+i*.08+((function(){try{return RM||sessionStorage.getItem('zz')?0:1.6}catch(x){return RM?0:1.6}})())).toFixed(2)+'s">'+c+'</span>'}).join('');
$('.hero').insertAdjacentHTML('beforeend','<svg class="hs" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" aria-hidden="true"><path d="M22 50h62v22a28 28 0 0 1-28 28h-6a28 28 0 0 1-28-28z" fill="#FFD23F" stroke="none"/><path d="M84 56h8a12 12 0 0 1 0 24h-10"/><path class="s" d="M36 38c-6-8 6-12 0-20"/><path class="s" style="animation-delay:.8s" d="M54 38c-6-8 6-12 0-20"/><path class="s" style="animation-delay:1.6s" d="M72 38c-6-8 6-12 0-20"/></svg>');
/* open now */
function fm(h){return(h%12||12)+(h<12?' am':' pm')}
function openNow(){var d=new Date(),h=d.getHours()+d.getMinutes()/60,o=h>=CFG.open&&h<CFG.close,s=$('.sp');s.innerHTML=o?'OPEN NOW<br><span class="sl">until '+fm(CFG.close)+'</span>':'CLOSED<br><span class="sl">opens '+fm(CFG.open)+'</span>';s.style.background=o?'var(--yel)':'var(--panel)';s.style.color=o?'#1B1B1B':'var(--panelfg)'}
openNow();setInterval(openNow,60000);
/* menu: prices, add buttons, filters */
var secs=$$('#pg-menu .sec').filter(function(s){return $('h2',s)});
$$('#pg-menu .card').forEach(function(c){var n=$('.cb .H',c).textContent;c.dataset.name=n;c.dataset.tag=$('.pill',c).textContent;c.dataset.cat=$('h2',c.closest('.sec')).textContent;
$('.rw span:last-child',c).textContent='₹'+PR[n];var o=$('.ord',c);var w=document.createElement('div');w.className='ctl';w.dataset.name=n;o.replaceWith(w)});
var fb=document.createElement('div');fb.className='fbar';var cats=['All'].concat(secs.map(function(s){return $('h2',s).textContent}));
fb.innerHTML=cats.map(function(c,i){return'<button class="chip'+(i?'':' on')+'" type="button" data-cat="'+esc(c)+'">'+esc(c)+'</button>'}).join('')+'<button class="chip" type="button" id="vg" aria-pressed="false">Veg only</button><input id="sq" type="search" maxlength="40" autocomplete="off" placeholder="Search dishes…" aria-label="Search dishes">';
secs[0].before(fb);secs[secs.length-1].insertAdjacentHTML('afterend','<p id="nores" class="sec" style="display:none">No dishes match. Try another filter.</p>');
var F={cat:'All',veg:false,q:''};
function filt(){var any=false;$$('#pg-menu .card').forEach(function(c){var ok=(F.cat==='All'||c.dataset.cat===F.cat)&&(!F.veg||c.dataset.tag==='Veg')&&(!F.q||c.dataset.name.toLowerCase().indexOf(F.q)>-1);c.style.display=ok?'':'none';if(ok)any=true});
secs.forEach(function(s){s.style.display=$$('.card',s).some(function(c){return c.style.display!=='none'})?'':'none'});$('#nores').style.display=any?'none':''}
fb.addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;if(b.id==='vg'){F.veg=!F.veg;b.classList.toggle('on',F.veg);b.setAttribute('aria-pressed',F.veg)}else if(b.dataset.cat){F.cat=b.dataset.cat;$$('.chip[data-cat]',fb).forEach(function(x){x.classList.toggle('on',x===b)})}filt()});
$('#sq').addEventListener('input',function(e){F.q=e.target.value.trim().toLowerCase();filt()});
/* cart */
function money(n){return'₹'+n}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function stepper(n,q){return q?'<span class="st"><button type="button" data-d="-1" aria-label="Remove one">−</button><b>'+q+'</b><button type="button" data-d="1" aria-label="Add one">+</button></span>':'<button class="add" type="button" data-d="1">Add</button>'}
function sync(){var k=Object.keys(cart),cnt=0,tot=0;k.forEach(function(n){cnt+=cart[n];tot+=cart[n]*PR[n]});
$$('#pg-menu .ctl').forEach(function(c){c.innerHTML=stepper(c.dataset.name,cart[c.dataset.name]||0)});
$('#dkn').textContent=cnt?'Order · '+cnt:'Order';
$('#cl').innerHTML=k.length?k.map(function(n){return'<div class="cln"><div><div style="font-weight:600">'+esc(n)+'</div><div style="opacity:.7;font-size:15px">'+money(PR[n])+' each</div></div><div class="ctl" data-name="'+esc(n)+'">'+stepper(n,cart[n])+'</div></div>'}).join(''):'<p style="opacity:.7">Your order is empty. Pick a few dishes from the menu.</p>';
$('#cf').innerHTML=k.length?'<div style="display:flex;justify-content:space-between;padding:14px 0;font-weight:600;font-size:20px"><span>Total</span><span>'+money(tot)+'</span></div><button class="btn red" id="snd" type="button" style="width:100%">Send order on WhatsApp</button><p style="opacity:.6;font-size:13px;margin:10px 0 0">Prices shown are sample prices for the demo.</p>':'<a class="btn red" href="#/menu" style="width:100%;text-align:center">Browse the menu</a>';
if(LANG==='hi')lang()}
document.addEventListener('click',function(e){var b=e.target.closest('[data-d]');if(b){var c=b.closest('.ctl'),n=c.dataset.name,q=(cart[n]||0)+ +b.dataset.d;if(!PR.hasOwnProperty(n))return;if(q>0)cart[n]=Math.min(q,20);else delete cart[n];sync();return}
if(e.target.id==='snd'){var k=Object.keys(cart),t=0,m='Hi Zuzuki! I’d like to order:\n'+k.map(function(n){t+=cart[n]*PR[n];return'• '+cart[n]+' × '+n+' ('+money(cart[n]*PR[n])+')'}).join('\n')+'\nTotal: '+money(t);window.open(wl(m),'_blank','noopener,noreferrer')}});
var lastF;function oc(o){var was=$('#cart').classList.contains('open');$('#cart').classList.toggle('open',o);$('#ovl').classList.toggle('on',o);$('#cart').setAttribute('aria-hidden',!o);$('#cart').inert=!o;if(o){lastF=document.activeElement;$('#cc').focus()}else if(was&&lastF&&lastF.focus){lastF.focus()}}
$('#cart').inert=true;$('#dko').addEventListener('click',function(){oc(true)});
var dk=$('.dock'),dp=$('#dkp'),act=$('#dko');function mv(el){act=el;dp.style.width=el.offsetWidth+'px';dp.style.transform='translateX('+el.offsetLeft+'px)'}
$$('.dock>a,.dock>button').forEach(function(b){b.addEventListener('click',function(){mv(b)})});mv(act);
if(window.ResizeObserver)new ResizeObserver(function(){mv(act)}).observe(dk);
document.addEventListener('keydown',function(e){if(e.key!=='Tab'||!$('#cart').classList.contains('open'))return;var f=$$('#cart button,#cart a');if(!f.length)return;var a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}});$('#cc').addEventListener('click',function(){oc(false)});$('#ovl').addEventListener('click',function(){oc(false)});
$('#dkc').href=CFG.phone.charAt(0)==='['?'#/visit':'tel:'+String(CFG.phone).replace(/[^\d+]/g,'');$('#dkd').href=$('#dir').href;
/* lightbox */
var gi=$$('#pg-gallery .gi'),cur=0,lb=$('#lb');
function show(i){cur=(i+gi.length)%gi.length;var im=$('img',gi[cur]);$('#lbi').src=im.src;$('#lbi').alt=im.alt;$('#lbc').textContent=im.alt}
gi.forEach(function(g,i){g.style.cursor='zoom-in';g.addEventListener('click',function(){show(i);lb.classList.add('on');$('#lbx').focus()})});
$('#lbx').onclick=function(){lb.classList.remove('on')};$('#lbp').onclick=function(){show(cur-1)};$('#lbn').onclick=function(){show(cur+1)};
var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX});lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(cur+(d<0?1:-1))});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){lb.classList.remove('on');oc(false)}if(lb.classList.contains('on')){if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)}});
/* Hindi */
var D={'Home':'होम','Menu':'मेन्यू','Story':'कहानी','Gallery':'गैलरी','Visit':'आइए','Order on WhatsApp':'व्हाट्सऐप पर ऑर्डर करें','Book a table':'टेबल बुक करें','See the menu':'मेन्यू देखें','Get directions':'रास्ता देखें','Chat on WhatsApp':'व्हाट्सऐप पर चैट करें','Open Instagram':'इंस्टाग्राम खोलें','Request on WhatsApp':'व्हाट्सऐप पर भेजें','Come grab a plate':'आइए, कुछ खाइए','Find us':'हमें खोजें','Our journey':'हमारा सफ़र','Today’s special':'आज का स्पेशल','Visit us':'पधारिए','Strong coffee.':'कड़क कॉफ़ी।','Good company.':'अच्छा साथ।','Your neighbourhood spot for coffee, chai and bites.':'आपके मोहल्ले की कॉफ़ी, चाय और स्नैक्स की जगह।','Veg':'शाकाहारी','Non-veg':'मांसाहारी','Egg':'अंडा','Coffee & Chai':'कॉफ़ी और चाय','All Day Breakfast':'ऑल डे ब्रेकफास्ट','Small Plates':'स्मॉल प्लेट्स','Burgers, Pasta & Pizza':'बर्गर, पास्ता और पिज़्ज़ा','Main Courses':'मेन कोर्स','Desserts':'मीठा','All':'सभी','Veg only':'सिर्फ़ शाकाहारी','Add':'जोड़ें','Your order':'आपका ऑर्डर','Order':'ऑर्डर','Call':'कॉल','Directions':'रास्ता','Total':'कुल','Send order on WhatsApp':'व्हाट्सऐप पर ऑर्डर भेजें','Browse the menu':'मेन्यू देखें','Loved by regulars':'ग्राहकों का प्यार','Review us on Google':'गूगल पर रिव्यू दें','Name':'नाम','Phone':'फ़ोन','Date':'तारीख़','Time':'समय','Guests':'मेहमान','Note':'नोट','No dishes match. Try another filter.':'कोई डिश नहीं मिली। दूसरा फ़िल्टर आज़माइए।','A small place with a big love for good coffee.':'अच्छी कॉफ़ी से बेइंतहा प्यार करने वाली एक छोटी सी जगह।','Fresh every day':'रोज़ ताज़ा','Slow on purpose':'जान-बूझकर धीरे','Always welcome':'हमेशा स्वागत है'};
var O=new Map(),TR=new Set();
function lang(){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode.nodeName;return(p==='SCRIPT'||p==='STYLE'||!n.nodeValue.trim())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),n;
while(n=w.nextNode()){var k=n.nodeValue.trim();if(LANG==='hi'&&D[k]){if(!TR.has(n)){O.set(n,n.nodeValue);TR.add(n)}n.nodeValue=O.get(n).replace(k,D[k])}else if(LANG==='en'&&TR.has(n)){n.nodeValue=O.get(n);TR.delete(n)}}
$('#sq').placeholder=LANG==='hi'?'डिश खोजें…':'Search dishes…';document.documentElement.lang=LANG==='hi'?'hi':'en'}
var lb2=document.createElement('button');lb2.type='button';lb2.className='chip';lb2.textContent='हिं';lb2.setAttribute('aria-label','Switch language');$('nav').appendChild(lb2);
lb2.onclick=function(){LANG=LANG==='en'?'hi':'en';lb2.textContent=LANG==='en'?'हिं':'EN';lang()};
sync();
var nv=$('nav');function nh(){document.documentElement.style.setProperty('--nh',nv.offsetHeight+'px')}nh();addEventListener('resize',nh);addEventListener('hashchange',nh);
/* reveals */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');var t=e.target;setTimeout(function(){t.style.transitionDelay=''},1500);io.unobserve(t)}})},{threshold:.12});
$$('.card,.gi,.vb,.bl,.tl,.fm,.ctab,.sec>.h2,.offer,.rev,.hero').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=((i%4)*90)+'ms';io.observe(el)});
/* curtain page transitions */
var busy=false,cb=$('#cb');
document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#/"]');if(!a)return;e.preventDefault();var h=a.getAttribute('href');oc(false);if(busy)return;
if(h==='#/'+(location.hash.replace('#/','')||'home')){scrollTo(0,0);return}
if(RM){location.hash=h;return}busy=true;cb.style.transition='transform .45s cubic-bezier(.7,0,.2,1)';cb.style.transform='translateY(0)';
setTimeout(function(){location.hash=h;cb.style.transform='translateY(-100%)';setTimeout(function(){cb.style.transition='none';cb.style.transform='translateY(100%)';busy=false},480)},480)});
/* preloader */
var pre=$('#pre'),seen=false;try{seen=sessionStorage.getItem('zz')}catch(x){}
if(RM||seen){pre.remove()}else{setTimeout(function(){pre.classList.add('hide');setTimeout(function(){pre.remove()},600)},1700);try{sessionStorage.setItem('zz','1')}catch(x){}}
/* progress + ticker speed */
var pg=$('#prog'),last=scrollY,rate=1,m=$('.m'),anim=m.getAnimations&&m.getAnimations()[0];
function tick(){if(document.hidden){requestAnimationFrame(tick);return}var d=Math.abs(scrollY-last);last=scrollY;rate+=((1+Math.min(d/10,6))-rate)*.1;if(anim)anim.playbackRate=rate;
var mx=document.documentElement.scrollHeight-innerHeight;pg.style.transform='scaleX('+(mx>0?scrollY/mx:0)+')';requestAnimationFrame(tick)}
if(!RM)requestAnimationFrame(tick);
/* tilt, magnetic buttons, cursor bean */
if(FINE&&!RM){
$$('.card,.bl,.gi').forEach(function(el){el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transition='transform .1s';el.style.transform='perspective(800px) rotateY('+(x*8).toFixed(1)+'deg) rotateX('+(-y*8).toFixed(1)+'deg) translateY(-6px)'});el.addEventListener('mouseleave',function(){el.style.transition='';el.style.transform=''})});
$$('.btn').forEach(function(el){el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect();el.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.35).toFixed(1)+'px)'});el.addEventListener('mouseleave',function(){el.style.transform=''})});
}
})();
