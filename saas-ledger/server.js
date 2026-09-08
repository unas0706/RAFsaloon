const http=require('http');
const fs=require('fs');
const path=require('path');
const root=__dirname;
const port=Number(process.env.PORT)||10000;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'};
function transformHtml(h){
  const replacements=[
    ['status:i===2||i===3?"active":i<2?"done":"upcoming"','status:i===2||i===3?"In Progress":i<2?"Complete":"Not Started"'],
    ['type:"task"','type:"Task"'],['status:i<2?"done":"open"','status:i<2?"Done":"Not Started"'],
    ['p.status==="active"','p.status==="In Progress"'],['p.status==="done"','p.status==="Complete"'],
    ['p.status===\'done\'','p.status===\'Complete\''],['p.status===\'active\'','p.status===\'In Progress\''],['p.status===\'upcoming\'','p.status===\'Not Started\''],
    ['t.completed?"open":"done"','t.completed?"Not Started":"Done"'],['type:"issue"','type:"Issue"'],
    ['<option>P0</option><option>High</option><option>Normal</option>','<option>Critical</option><option>High</option><option>Medium</option>'],
    ['<option>upcoming</option><option>active</option><option>done</option>','<option>Not Started</option><option>In Progress</option><option>Complete</option>'],
    ['status:"active"','status:"Active"'],['status:"unpaid"','status:"Open"']
  ];
  for(const [a,b] of replacements)h=h.split(a).join(b);
  h=h.replace('SB.from("work_items").select("*").eq("workspace_id",id).eq("type","task")','SB.from("work_items").select("*").eq("workspace_id",id)');
  h=h.replace('data={phases:p.data||[],tasks:t.data||[],issues:i.data||[]','data={phases:p.data||[],tasks:(t.data||[]).filter(x=>x.type==="Task"),issues:i.data||[]');
  h=h.replace('data={phases:p.data||[],tasks:(t.data||[]).filter(x=>x.type==="Task"),issues:i.data||[],ledger:l.data||[],customers:c.data||[],plans:pl.data||[],invoices:iv.data||[]};phaseId=', 'data={phases:p.data||[],tasks:(t.data||[]).filter(x=>x.type==="Task"),issues:i.data||[],ledger:l.data||[],customers:c.data||[],plans:pl.data||[],invoices:iv.data||[]};data._workItems=t.data||[];phaseId=');
  h=h.replace('data.tasks.some(t=>t.id===i.work_item_id&&t.phase_id===p.id)','data._workItems?.some(t=>t.id===i.work_item_id&&t.phase_id===p.id)');
  h=h.replace('SB.auth.getSession().then(x=>boot(x.data.session)).catch(e=>$("authErr").textContent=e.message);','SB.auth.getSession().then(x=>boot(x.data.session)).catch(e=>{console.error(e);$("authErr").textContent=e?.message||"Unable to initialize the application."});');
  h=h.replace("s==='done'||s==='paid'||s==='active'","s==='Done'||s==='Complete'||s==='Paid'||s==='Active'");
  h=h.replace("s==='Blocked'||s==='unpaid'||s==='at-risk'","s==='Blocked'||s==='Open'||s==='Overdue'||s==='at-risk'");
  return h;
}
function safeFile(urlPath){let clean=decodeURIComponent(urlPath.split('?')[0]);if(clean==='/'||clean==='/index.html')clean='/index.html';const file=path.resolve(root,clean.replace(/^\/+/,''));const rr=path.resolve(root);return file.startsWith(rr+path.sep)?file:null;}
const server=http.createServer((req,res)=>{const u=(req.url||'/').split('?')[0];if(u==='/health'){res.writeHead(200,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'});return res.end(JSON.stringify({ok:true,service:'saas-ledger'}));}const file=safeFile(u);if(!file){res.writeHead(400);return res.end('Bad path');}fs.readFile(file,(err,buf)=>{if(err){res.writeHead(err.code==='ENOENT'?404:500);return res.end(err.code==='ENOENT'?'Not found':'Server error');}let body=buf;if(path.extname(file)==='.html')body=Buffer.from(transformHtml(buf.toString('utf8')),'utf8');res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(body);});});
server.listen(port,'0.0.0.0',()=>console.log(`SaaS Ledger listening on ${port}`));
