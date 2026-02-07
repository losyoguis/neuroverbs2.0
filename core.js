
// ================= NEUROVERBS CORE =================
const EXEC_URL = "https://script.google.com/macros/s/AKfycbwWd2BDUlJGZCL-m1sbLghgcJso518lfKr4B2W4_6z6K2E4PiAEW613mkCmXb16zhZu/exec";

const LB_LIMIT = 5;
let lbOffset = 0;
let lbTotal = 0;

// ================= LEADERBOARD =================
function cargarLeaderboard() {
  const status = document.getElementById("lbStatus");
  const list = document.getElementById("leaderboardList");
  const section = document.getElementById("leaderboardSection");

  if (!status || !list || !section) return;

  status.textContent = "Cargando ranking...";
  list.innerHTML = "";

  fetch(`${EXEC_URL}?action=leaderboard&limit=${LB_LIMIT}&offset=${lbOffset}`)
    .then(r => r.json())
    .then(data => {
      if (!data.ok || !Array.isArray(data.rows)) {
        throw new Error("Formato inválido del leaderboard");
      }

      lbTotal = data.total || 0;

      if (data.rows.length === 0) {
        status.textContent = "No hay participantes aún.";
        return;
      }

      section.style.display = "block";
      status.textContent = "";

      data.rows.forEach((u, i) => {
        const div = document.createElement("div");
        div.className = "lbRow";
        div.innerHTML = `
          <div class="lbPos">#${lbOffset + i + 1}</div>
          <img class="lbPic" src="${u.picture || 'assets/user.png'}">
          <div class="lbName">${u.name}</div>
          <div class="lbXP">${u.xp} XP</div>
        `;
        list.appendChild(div);
      });

      document.getElementById("lbPageInfo").textContent =
        `${Math.floor(lbOffset / LB_LIMIT) + 1}`;
    })
    .catch(err => {
      console.error(err);
      status.textContent =
        "❌ No se pudo cargar el ranking. Revisa la URL / permisos del WebApp.";
    });
}

function lbNext() {
  if (lbOffset + LB_LIMIT < lbTotal) {
    lbOffset += LB_LIMIT;
    cargarLeaderboard();
  }
}

function lbPrev() {
  if (lbOffset - LB_LIMIT >= 0) {
    lbOffset -= LB_LIMIT;
    cargarLeaderboard();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(cargarLeaderboard, 800);
});
