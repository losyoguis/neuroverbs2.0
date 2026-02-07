
/**
 * NEUROVERBS – GROUP & DAY SELECTOR
 * Corrige el problema de selección vacía
 */

(function(){
  const GROUPS = [
    "10°1","10°2","10°3","10°4",
    "11°1","11°2","11°3"
  ];

  const DAYS = Array.from({length:80}, (_,i)=>`Día ${i+1}`);

  function fillSelect(id, items, placeholder){
    const sel = document.getElementById(id);
    if(!sel) return;

    sel.innerHTML = "";
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = placeholder;
    opt.disabled = true;
    opt.selected = true;
    sel.appendChild(opt);

    items.forEach(v=>{
      const o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      sel.appendChild(o);
    });
  }

  window.addEventListener("DOMContentLoaded", ()=>{
    fillSelect("groupSelect", GROUPS, "Selecciona tu grupo");
    fillSelect("daySelect", DAYS, "Selecciona el día");

    const g = document.getElementById("groupSelect");
    const d = document.getElementById("daySelect");

    if(g && d){
      g.addEventListener("change", ()=>{
        localStorage.setItem("nv_group", g.value);
      });
      d.addEventListener("change", ()=>{
        localStorage.setItem("nv_day", d.value);
      });

      // restaurar selección
      const sg = localStorage.getItem("nv_group");
      const sd = localStorage.getItem("nv_day");
      if(sg) g.value = sg;
      if(sd) d.value = sd;
    }
  });
})();
