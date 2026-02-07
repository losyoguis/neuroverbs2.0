
/**
 * Neuroverbs – SAFE Leaderboard Patch
 * Compatible con core.js actual (NO rompe autenticación)
 */

(function(){
  if (window.__NV_LEADERBOARD_PATCH__) return;
  window.__NV_LEADERBOARD_PATCH__ = true;

  const EXEC_URL = window.EXEC_URL || "https://script.google.com/macros/s/AKfycbwWd2BDUlJGZCL-m1sbLghgcJso518lfKr4B2W4_6z6K2E4PiAEW613mkCmXb16zhZu/exec";
  const LIMIT = 5;
  let offset = 0;
  let total = 0;

  function qs(id){ return document.getElementById(id); }

  window.cargarLeaderboard = function(){
    const wrap = qs("leaderboardSection");
    const list = qs("leaderboardList");
    const status = qs("lbStatus");

    if(!wrap || !list || !status) return;

    status.textContent = "Cargando ranking...";
    list.innerHTML = "";

    fetch(`${EXEC_URL}?action=leaderboard&limit=${LIMIT}&offset=${offset}`)
      .then(r=>r.json())
      .then(data=>{
        if(!data || !data.ok || !Array.isArray(data.rows)) throw new Error("Respuesta inválida");

        total = data.total || 0;
        wrap.style.display = "block";
        status.textContent = "";

        if(data.rows.length === 0){
          status.textContent = "No hay participantes aún.";
          return;
        }

        data.rows.forEach((u,i)=>{
          const row = document.createElement("div");
          row.className = "lbRow";
          row.innerHTML = `
            <div class="lbPos">#${offset+i+1}</div>
            <img class="lbPic" src="${u.picture || 'assets/user.png'}">
            <div class="lbName">${u.name || '—'}</div>
            <div class="lbXP">${u.xp || 0} XP</div>
          `;
          list.appendChild(row);
        });

        const info = qs("lbPageInfo");
        if(info) info.textContent = (Math.floor(offset/LIMIT)+1);
      })
      .catch(e=>{
        console.error("[Leaderboard]", e);
        status.textContent = "❌ No se pudo cargar el ranking.";
      });
  };

  window.lbNext = function(){
    if(offset+LIMIT < total){
      offset += LIMIT;
      cargarLeaderboard();
    }
  };

  window.lbPrev = function(){
    if(offset-LIMIT >= 0){
      offset -= LIMIT;
      cargarLeaderboard();
    }
  };

  // Auto refresh when user logs in (sin tocar auth)
  window.addEventListener("storage", ()=>{
    try{
      if(localStorage.getItem("mjb_user") || localStorage.getItem("rank_user")){
        setTimeout(cargarLeaderboard, 500);
      }
    }catch(e){}
  });

})();
