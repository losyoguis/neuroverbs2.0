
/**
 * NEUROVERBS CORE – SAFE (NO AUTH OVERRIDE)
 * Usa sesión creada en index.html
 */

const EXEC_URL = "https://script.google.com/macros/s/AKfycbwWd2BDUlJGZCL-m1sbLghgcJso518lfKr4B2W4_6z6K2E4PiAEW613mkCmXb16zhZu/exec";

function getSessionUser(){
  try {
    return JSON.parse(localStorage.getItem("rank_user") || localStorage.getItem("mjb_user"));
  } catch(e){
    return null;
  }
}

function logout(){
  localStorage.removeItem("rank_user");
  localStorage.removeItem("mjb_user");
  window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", ()=>{
  const user = getSessionUser();
  if(!user){
    // protegido: si entra directo sin login
    window.location.href = "index.html";
    return;
  }

  // mostrar chip de usuario si existe en UI
  const nameEl = document.getElementById("userName");
  const emailEl = document.getElementById("userEmail");
  const picEl = document.getElementById("userPic");
  const chip = document.getElementById("userChip");

  if(nameEl) nameEl.textContent = user.name || "Usuario";
  if(emailEl) emailEl.textContent = user.email || "";
  if(picEl && user.picture) picEl.src = user.picture;
  if(chip) chip.style.display = "flex";

  window.dispatchEvent(new Event("nv-login"));
});
