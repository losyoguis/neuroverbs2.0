
const EXEC_URL = "https://script.google.com/macros/s/AKfycbwWd2BDUlJGZCL-m1sbLghgcJso518lfKr4B2W4_6z6K2E4PiAEW613mkCmXb16zhZu/exec";

function getUser(){
  try{
    return JSON.parse(localStorage.getItem("rank_user")||localStorage.getItem("mjb_user"));
  }catch(e){return null;}
}

function logout(){
  localStorage.clear();
  location.href="index.html";
}

window.addEventListener("DOMContentLoaded",()=>{
  const u=getUser();
  if(!u){location.href="index.html";return;}
  document.getElementById("userName").textContent=u.name||"Usuario";
  document.getElementById("userEmail").textContent=u.email||"";
  window.dispatchEvent(new Event("nv-login"));
});
