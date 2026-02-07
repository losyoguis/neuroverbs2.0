function syncXP(delta){
 fetch(EXEC_URL,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({action:"upsert",email:user.email,name:user.name,xpDelta:delta})
 }).then(r=>r.json()).then(d=>{
  document.getElementById("xp").innerText="XP: "+d.xp;
  loadRanking();
 });
}

function addXP(v){syncXP(v);}

function loadRanking(){
 fetch(EXEC_URL+"?action=leaderboard")
 .then(r=>r.json()).then(d=>{
  const ul=document.getElementById("ranking");
  ul.innerHTML="";
  d.forEach(u=>{
   const li=document.createElement("li");
   li.textContent=u.name+" - "+u.xp;
   ul.appendChild(li);
  });
 });
}