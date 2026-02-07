
(function(){
 let offset=0,total=0,LIMIT=5;
 function q(id){return document.getElementById(id);}

 window.cargarLeaderboard=function(){
  const s=q("lbStatus"),l=q("leaderboardList");
  s.textContent="Cargando...";l.innerHTML="";
  fetch(`${EXEC_URL}?action=leaderboard&limit=${LIMIT}&offset=${offset}`)
   .then(r=>r.json()).then(d=>{
    if(!d.ok)throw 0;
    total=d.total;s.textContent="";
    d.rows.forEach((u,i)=>{
      const div=document.createElement("div");
      div.className="lbRow";
      div.textContent=`#${offset+i+1} ${u.name} – ${u.xp} XP`;
      l.appendChild(div);
    });
   }).catch(()=>s.textContent="Error ranking");
 };

 window.lbNext=()=>{if(offset+LIMIT<total){offset+=LIMIT;cargarLeaderboard();}};
 window.lbPrev=()=>{if(offset-LIMIT>=0){offset-=LIMIT;cargarLeaderboard();}};
 window.addEventListener("nv-login",()=>setTimeout(cargarLeaderboard,300));
})();
