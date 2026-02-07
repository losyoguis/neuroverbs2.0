/**
 * NEUROVERBS – LEADERBOARD (SAFE)
 */

(function(){
  if(window.__NV_LB__) return;
  window.__NV_LB__ = true;

  const LIMIT = 5;
  let offset = 0, total = 0;

  function qs(id){ return document.getElementById(id); }

  window.cargarLeaderboard = function(){
    const sec = qs("leaderboardSection");
    const list = qs("leaderboardList");
    const status = qs("lbStatus");
    if(!sec||!list||!status) return;

    status.textContent = "Cargando ranking...";
    list.innerHTML = "";

    fetch(`${EXEC_URL}?action=leaderboard&limit=${LIMIT}&offset=${offset}`)
      .then(r=>r.json())
      .then(d=>{
        if(!d.ok) throw new Error();
        total = d.total;
        sec.style.display = "block";
        status.textContent = "";

        d.rows.forEach((u,i)=>{
          const row=document.createElement("div");
          row.className="lbRow";
          row.innerHTML=`#${offset+i+1} ${u.name} – ${u.xp} XP`;
          list.appendChild(row);
        });
      })
      .catch(()=>status.textContent="Error cargando ranking");
  };

  window.lbNext = ()=>{ if(offset+LIMIT<total){offset+=LIMIT;cargarLeaderboard();}};
  window.lbPrev = ()=>{ if(offset-LIMIT>=0){offset-=LIMIT;cargarLeaderboard();}};

  window.addEventListener("nv-login", ()=>setTimeout(cargarLeaderboard,500));
})();
