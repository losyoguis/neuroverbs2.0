const SHEET_ID = "PEGA_ID_SHEET";

function doGet(e){
 const action = e.parameter.action || "";
 if(action === "leaderboard"){
  return leaderboard();
 }
 return json({status:"ok"});
}

function doPost(e){
 const body = JSON.parse(e.postData.contents);
 if(body.action === "upsert"){
  return upsert(body);
 }
 return json({error:"acción inválida"});
}

function leaderboard(){
 const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName("users");
 const data = sh.getDataRange().getValues().slice(1);

 const result = data
  .map(r=>({email:r[0],name:r[1],xp:r[2]||0}))
  .sort((a,b)=>b.xp-a.xp)
  .slice(0,10);

 return json(result);
}

function upsert(b){
 const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName("users");
 const data = sh.getDataRange().getValues();

 let row = data.findIndex(r=>r[0]===b.email);

 if(row === -1){
  sh.appendRow([b.email,b.name,b.xpDelta]);
  row = data.length;
 } else {
  const xp = Number(data[row][2]) + Number(b.xpDelta);
  sh.getRange(row+1,3).setValue(xp);
 }

 const xpFinal = sh.getRange(row+1,3).getValue();
 return json({xp:xpFinal});
}

function json(obj){
 return ContentService.createTextOutput(JSON.stringify(obj))
  .setMimeType(ContentService.MimeType.JSON);
}