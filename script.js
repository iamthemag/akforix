gsap.registerPlugin(ScrollTrigger);
const rooms=[
{title:"GRAND<br>LIVING ROOM",text:"Walk into a living space that adapts to your lifestyle. Lighting, curtains, entertainment and climate respond as one.",img:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85"},
{title:"SMART<br>KITCHEN",text:"Connected appliances, intelligent routines and real-time energy awareness make everyday living effortless.",img:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=85"},
{title:"MASTER<br>BEDROOM",text:"Your personal sanctuary automatically adjusts light, temperature and ambience around your rhythm.",img:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2200&q=85"},
{title:"HOME<br>THEATRE",text:"One command transforms the room. Lights dim, curtains close and cinema mode comes alive.",img:"https://images.unsplash.com/photo-1594385208974-2c8fd2f64f8b?auto=format&fit=crop&w=2200&q=85"},
{title:"TERRACE<br>LOUNGE",text:"As daylight fades, your outdoor environment transitions into the perfect evening atmosphere.",img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85"}
];
const bg=document.querySelector("#tourBg"), title=document.querySelector("#tourTitle"), text=document.querySelector("#tourText"), num=document.querySelector("#tourNum");
const nav=document.querySelector("#tourNav"), progress=document.querySelector("#progress");
rooms.forEach((r,i)=>{nav.innerHTML+=`<span class="${i===0?'active':''}">${String(i+1).padStart(2,'0')}</span>`;progress.innerHTML+=`<div class="dot ${i===0?'active':''}"></div>`});
const grandLivingVideo=document.querySelector("#grandLivingVideo");
const masterBedroomVideo=document.querySelector("#masterBedroomVideo");
const smartKitchenVideo=document.querySelector("#smartKitchenVideo");
const homeTheatreVideo=document.querySelector("#homeTheatreVideo");
const terraceLoungeVideo=document.querySelector("#terraceLoungeVideo");
function setRoom(i){
const isGrandVideo=i===0;
const isMasterVideo=i===2;
const isKitchenVideo=i===1;
const isTheatreVideo=i===3;
bg.style.backgroundImage=`url(${rooms[i].img})`;
num.textContent=`${String(i+1).padStart(2,'0')} / 05`;
gsap.timeline().to([title,text],{opacity:0,y:20,duration:.25}).call(()=>{title.innerHTML=rooms[i].title;text.textContent=rooms[i].text}).to(bg,{scale:1.15,duration:.15}).to(bg,{scale:1.06,duration:.6,ease:"power2.out"},0).to([title,text],{opacity:1,y:0,stagger:.08,duration:.5},.18);
if(isGrandVideo){grandLivingVideo.classList.add("active"); grandLivingVideo.play().catch(()=>{});}else{grandLivingVideo.classList.remove("active"); grandLivingVideo.pause();}
if(isMasterVideo){masterBedroomVideo.classList.add("active"); masterBedroomVideo.play().catch(()=>{});}else{masterBedroomVideo.classList.remove("active"); masterBedroomVideo.pause();}
if(isKitchenVideo){smartKitchenVideo.classList.add("active"); smartKitchenVideo.play().catch(()=>{});}else{smartKitchenVideo.classList.remove("active"); smartKitchenVideo.pause();}
if(isTheatreVideo){homeTheatreVideo.classList.add("active"); homeTheatreVideo.play().catch(()=>{});}else{homeTheatreVideo.classList.remove("active"); homeTheatreVideo.pause();}
const isTerraceVideo=i===4;
if(isTerraceVideo){terraceLoungeVideo.classList.add("active"); terraceLoungeVideo.play().catch(()=>{});}else{terraceLoungeVideo.classList.remove("active"); terraceLoungeVideo.pause();}
[...nav.children].forEach((x,n)=>x.classList.toggle("active",n===i));[...progress.children].forEach((x,n)=>x.classList.toggle("active",n===i));
gsap.to(".node",{opacity:i<5?1:0,stagger:.08,duration:.4});
}
setRoom(0);
ScrollTrigger.create({trigger:".tour-wrap",start:"top top",end:"bottom bottom",scrub:1,onUpdate:self=>{let i=Math.min(4,Math.floor(self.progress*5));if(i!==window.currentRoom){window.currentRoom=i;setRoom(i)};gsap.to(bg,{x:(self.progress-.5)*-60,scale:1.06+self.progress*.08,duration:.2})}});
gsap.timeline().to(".intro-kicker",{opacity:0,y:-10,duration:.5}).from(".intro-logo",{scale:.7,opacity:0,duration:1,ease:"expo.out"},0).to(".intro-line",{width:160,duration:.7},.5).to(".intro-sub",{opacity:1,duration:.5},.8).to("#intro",{opacity:0,duration:1,delay:1.2,onComplete:()=>document.querySelector("#intro").style.display="none"});
gsap.from(".hero-content>*",{y:35,opacity:0,stagger:.12,duration:1.2,delay:2.1,ease:"power3.out"});
gsap.from(".statement h2",{scrollTrigger:{trigger:".statement",start:"top 75%"},y:70,opacity:0,duration:1});
document.querySelectorAll(".card").forEach(c=>c.addEventListener("mousemove",e=>{let r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`translateY(-8px) rotateX(${-y*7}deg) rotateY(${x*7}deg)`}));document.querySelectorAll(".card").forEach(c=>c.addEventListener("mouseleave",()=>c.style.transform=""));

const canvas=document.getElementById("particles"),ctx=canvas.getContext("2d");let pts=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;pts=Array.from({length:Math.min(90,innerWidth/16)},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25}))}resize();addEventListener("resize",resize);
(function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);for(let p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.width)p.vx*=-1;if(p.y<0||p.y>canvas.height)p.vy*=-1;ctx.fillStyle="rgba(143,255,212,.5)";ctx.fillRect(p.x,p.y,1.5,1.5)}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){let a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<110){ctx.strokeStyle=`rgba(143,255,212,${.10*(1-d/110)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(draw)})();