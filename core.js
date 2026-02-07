const EXEC_URL = "PEGA_AQUI_TU_EXEC";
let currentUser = null;

function handleLogin(response){
 const payload = JSON.parse(atob(response.credential.split('.')[1]));
 currentUser = payload;

 document.getElementById("user").innerText =
  `👤 ${payload.name} (${payload.email})`;

 syncXP(0);
}

window.onload = () => {
 loadRanking();
};
