
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
const header=$('.header');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>8),{passive:true});
const menu=$('#mobileMenu');
function openMenu(){menu?.classList.add('open');document.body.classList.add('no-scroll')}
function closeMenu(){menu?.classList.remove('open');document.body.classList.remove('no-scroll')}
$('#menuBtn')?.addEventListener('click',openMenu);$('#mobileClose')?.addEventListener('click',closeMenu);menu?.addEventListener('click',e=>{if(e.target===menu)closeMenu()});$$('.mobile-links a').forEach(a=>a.addEventListener('click',closeMenu));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});$$('[data-reveal]').forEach(el=>io.observe(el));
const modal=$('#videoModal'), modalVideo=$('#patientVideo'), modalTitle=$('#videoTitle');
$$('[data-video]').forEach(btn=>btn.addEventListener('click',()=>{if(!modal)return;modalTitle.textContent=btn.dataset.title||'Patient Story';modalVideo.src=btn.dataset.video;modal.classList.add('open');document.body.classList.add('no-scroll');modalVideo.play().catch(()=>{})}));
function closeVideo(){if(!modal)return;modal.classList.remove('open');document.body.classList.remove('no-scroll');modalVideo.pause();modalVideo.removeAttribute('src');modalVideo.load()}
$('#videoClose')?.addEventListener('click',closeVideo);modal?.addEventListener('click',e=>{if(e.target===modal)closeVideo()});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeVideo()}});
const checker=$('#kneeChecker');
if(checker){const boxes=$$('input[type=checkbox]',checker),count=$('#checkerCount'),msg=$('#checkerMessage');const update=()=>{const n=boxes.filter(b=>b.checked).length;count.textContent=n;if(n===0)msg.textContent='Select any symptoms that apply to you.';else if(n<3)msg.textContent='A few symptoms can still be worth discussing if they persist or interfere with daily life.';else msg.textContent='Several symptoms apply. An orthopaedic evaluation may help identify the cause and appropriate next steps.'};boxes.forEach(b=>b.addEventListener('change',update));update()}
const form=$('#appointmentForm');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text=`Hello JAP Hospital, I would like to request an appointment.%0A%0AName: ${encodeURIComponent(d.get('name')||'')}%0APhone: ${encodeURIComponent(d.get('phone')||'')}%0AConcern: ${encodeURIComponent(d.get('concern')||'')}%0APreferred date: ${encodeURIComponent(d.get('date')||'')}%0AMessage: ${encodeURIComponent(d.get('message')||'')}`;window.open(`https://wa.me/919909916112?text=${text}`,'_blank','noopener')})}


// V3.1 conversion helper: add one contextual orthopaedic-team CTA after major sections.
$$('main > section.section').forEach((section)=>{
  if(section.classList.contains('no-team-cta') || section.querySelector('.cta') || section.querySelector('.section-team-cta')) return;
  const wrap = section.querySelector('.container');
  if(!wrap) return;
  const cta = document.createElement('div');
  cta.className = 'section-team-cta';
  cta.innerHTML = '<a href="https://wa.me/919909916112?text=Hello%20JAP%20Hospital%2C%20I%20would%20like%20to%20talk%20to%20the%20orthopaedic%20team." target="_blank" rel="noopener">Talk to our Orthopaedic Team →</a>';
  wrap.appendChild(cta);
});
