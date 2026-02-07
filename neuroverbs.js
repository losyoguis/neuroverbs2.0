function syncXP(delta){
 if(!currentUser) return;

 fetch(EXEC_URL,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
   action:"upsert",
   email:currentUser.email,
   name:currentUser.name,
   xpDelta:delta
  })
 })
 .then(r=>r.json())
 .then(d=>{
  document.getElementById("xp").innerText = "⭐ XP: "+d.xp;
  loadRanking();
 });
}

function addXP(v){
 syncXP(v);
}

function loadRanking(){
 fetch(EXEC_URL+"?action=leaderboard")
 .then(r=>r.json())
 .then(data=>{
  const ul = document.getElementById("ranking");
  ul.innerHTML = "";

  if(!Array.isArray(data)){
   ul.innerHTML = "<li>No hay datos</li>";
   return;
  }

  data.forEach((u,i)=>{
   const li = document.createElement("li");
   li.textContent = `${i+1}. ${u.name} — ${u.xp} XP`;
   ul.appendChild(li);
  });
 })
 .catch(()=>{
  document.getElementById("ranking").innerHTML =
   "<li>Error cargando ranking</li>";
 });
}