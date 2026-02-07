
(function(){
  const GROUPS=["10°1","10°2","10°3","10°4","11°1","11°2","11°3"];
  const DAYS=Array.from({length:80},(_,i)=>"Día "+(i+1));

  function fill(id,items,label){
    const el=document.getElementById(id);
    if(!el)return;
    el.innerHTML="";
    const o=document.createElement("option");
    o.textContent=label;o.disabled=true;o.selected=true;
    el.appendChild(o);
    items.forEach(v=>{
      const op=document.createElement("option");
      op.value=v;op.textContent=v;
      el.appendChild(op);
    });
  }

  window.addEventListener("DOMContentLoaded",()=>{
    fill("groupSelect",GROUPS,"Selecciona grupo");
    fill("daySelect",DAYS,"Selecciona día");
  });
})();
