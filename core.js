const EXEC_URL = "PEGA_AQUI_TU_EXEC";
let user=null;

window.onload=()=>{
 google.accounts.id.initialize({
  client_id:"PEGA_TU_CLIENT_ID.apps.googleusercontent.com",
  callback:handleLogin
 });
 document.getElementById("loginBtn").onclick=()=>google.accounts.id.prompt();
 loadRanking();
}

function handleLogin(res){
 const payload = JSON.parse(atob(res.credential.split('.')[1]));
 user = payload;
 document.getElementById("user").innerText = user.name+" ("+user.email+")";
 syncXP(0);
}