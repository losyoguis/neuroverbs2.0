
// CORE SINGLE SOURCE
const EXEC_URL = "https://script.google.com/macros/s/AKfycbwWd2BDUlJGZCL-m1sbLghgcJso518lfKr4B2W4_6z6K2E4PiAEW613mkCmXb16zhZu/exec";

function getUser(){
  try{
    return JSON.parse(localStorage.getItem("rank_user")||localStorage.getItem("mjb_user"));
  }catch(e){ return null;}
}

function logout(){
  localStorage.clear();
  location.href="index.html";
}

window.addEventListener("DOMContentLoaded", ()=>{
  const u=getUser();
  if(!u){ location.href="index.html"; return; }
  const n=document.getElementById("userName");
  const e=document.getElementById("userEmail");
  const p=document.getElementById("userPic");
  if(n) n.textContent=u.name||"Usuario";
  if(e) e.textContent=u.email||"";
  if(p&&u.picture) p.src=u.picture;
  const chip=document.getElementById("userChip");
  if(chip) chip.style.display="flex";
  window.dispatchEvent(new Event("nv-login"));
});
