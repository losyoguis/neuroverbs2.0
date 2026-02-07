
/**
 * NEUROVERBS CORE – AUTH + APP FLOW (REPAIRED)
 * - Restaura login Google
 * - Restaura logout
 * - NO lógica de ranking aquí
 */

const EXEC_URL = "https://script.google.com/macros/s/AKfycbwWd2BDUlJGZCL-m1sbLghgcJso518lfKr4B2W4_6z6K2E4PiAEW613mkCmXb16zhZu/exec";
const CLIENT_ID = "637468265896-5olh8rhf76setm52743tashi3vq1la67.apps.googleusercontent.com";
const ALLOWED_DOMAIN = "iemanueljbetancur.edu.co";

function decodeJwt(token){
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload.replace(/-/g,'+').replace(/_/g,'/')));
}

function initLogin(){
  if(!window.google || !google.accounts || !google.accounts.id) return;

  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    hd: ALLOWED_DOMAIN,
    callback: onLogin
  });

  const btn = document.getElementById("googleBtn");
  if(btn){
    google.accounts.id.renderButton(btn,{ theme:"outline", size:"large" });
  }
}

function onLogin(resp){
  const payload = decodeJwt(resp.credential);
  if(!payload.email.endsWith("@"+ALLOWED_DOMAIN)){
    alert("Solo correo institucional");
    return;
  }

  localStorage.setItem("mjb_user", JSON.stringify({
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
    sub: payload.sub
  }));

  document.getElementById("userName").textContent = payload.name;
  document.getElementById("userEmail").textContent = payload.email;
  document.getElementById("userPic").src = payload.picture;

  document.getElementById("userChip").style.display = "flex";
  document.getElementById("googleBtn").style.display = "none";

  // Avisar al ranking
  window.dispatchEvent(new Event("nv-login"));
}

function logout(){
  localStorage.removeItem("mjb_user");
  location.reload();
}

window.addEventListener("DOMContentLoaded", ()=>{
  initLogin();

  const raw = localStorage.getItem("mjb_user");
  if(raw){
    const u = JSON.parse(raw);
    document.getElementById("userName").textContent = u.name;
    document.getElementById("userEmail").textContent = u.email;
    document.getElementById("userPic").src = u.picture;
    document.getElementById("userChip").style.display = "flex";
    document.getElementById("googleBtn").style.display = "none";
    window.dispatchEvent(new Event("nv-login"));
  }
});
