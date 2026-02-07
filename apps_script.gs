const SHEET_ID="PEGA_ID_SHEET";
function doGet(e){
 if(e.parameter.action==="leaderboard"){
  const sh=SpreadsheetApp.openById(SHEET_ID).getSheetByName("users");
  const data=sh.getDataRange().getValues().slice(1)
   .sort((a,b)=>b[2]-a[2]).slice(0,10)
   .map(r=>({email:r[0],name:r[1],xp:r[2]}));
  return json(data);
 }
 return json({ok:true});
}

function doPost(e){
 const b=JSON.parse(e.postData.contents);
 const sh=SpreadsheetApp.openById(SHEET_ID).getSheetByName("users");
 const data=sh.getDataRange().getValues();
 let row=data.findIndex(r=>r[0]===b.email);
 if(row<0){sh.appendRow([b.email,b.name,b.xpDelta]); row=data.length;}
 else{sh.getRange(row+1,3).setValue(data[row][2]+b.xpDelta);}
 return json({xp:sh.getRange(row+1,3).getValue()});
}

function json(o){
 return ContentService.createTextOutput(JSON.stringify(o))
 .setMimeType(ContentService.MimeType.JSON);
}