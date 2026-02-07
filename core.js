/**
 * NEUROVERBS CORE – APP + AUTH
 */

const EXEC_URL = "https://script.google.com/macros/s/AKfycbwWd2BDUlJGZCL-m1sbLghgcJso518lfKr4B2W4_6z6K2E4PiAEW613mkCmXb16zhZu/exec";

function getUser(){
  try{ return JSON.parse(localStorage.getItem("mjb_user")); }
  catch(e){ return null; }
}

function logout(){
  localStorage.removeItem("mjb_user");
  window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", ()=>{
  const user = getUser();
  if(!user){
    // Si alguien entra directo a neuroverbs.html sin login
    window.location.href = "index.html";
    return;
  }

  const nameEl = document.getElementById("userName");
  const emailEl = document.getElementById("userEmail");
  const picEl = document.getElementById("userPic");

  if(nameEl) nameEl.textContent = user.name;
  if(emailEl) emailEl.textContent = user.email;
  if(picEl) picEl.src = user.picture;

  const chip = document.getElementById("userChip");
  if(chip) chip.style.display = "flex";

  window.dispatchEvent(new Event("nv-login"));
});
