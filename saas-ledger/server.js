const http=require('http');
const fs=require('fs');
const path=require('path');
const root=__dirname;
const port=process.env.PORT||10000;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'};

function transformHtml(h){
  const replacements=[
    ['status:i===2||i===3?"active":i<2?"done":"upcoming"','status:i===2||i===3?"In Progress":i<2?"Complete":"Not Started"'],
    ['type:"task"','type:"Task"'],
    ['status:i<2?"done":"open"','status:i<2?"Done":"Not Started"'],
    ['p.status==="active"','p.status==="In Progress"'],
    ['p.status==="done"','p.status==="Complete"'],
    ['p.status===\'done\'','p.status===\'Complete\''],
    ['p.status===\'active\'','p.status===\'In Progress\''],
    ['p.status===\'upcoming\'','p.status===\'Not Started\''],
    ['p.status===\'In Progress\'','p.status===\'In Progress\''],
    ['t.completed?"open":"done"','t.completed?"Not Started":"Done"'],
    ['type:"issue"','type:"Issue"'],
    ['<option>P0</option><option>High</option><option>Normal</option>','<option>Critical</option><option>High</option><option>Medium</option>'],
    ['<option>upcoming</option><option>active</option><option>done</option>','<option>Not Started</option><option>In Progress</option><option>Complete</option>'],
    ['status:"active"','status:"Active"'],
    ['i.status===\'paid\'?\'unpaid\':\'paid\'','i.status===\'Paid\'?\'Open\':\'Paid\''],
    ['status:i.status===\'paid\'?\'unpaid\':\'paid\'','status:i.status===\'Paid\'?\'Open\':\'Paid\''],
    ['status:"unpaid"','status:"Open"'],
    ['status===\'paid\'','status===\'Paid\''],
    ['paid_at:i.status===\'paid\'?null','paid_at:i.status===\'Paid\'?null']
  ];
  for(const [a,b] of replacements)h=h.split(a).join(b);
  h=h.replace('SB.from("work_items").select("*").eq("workspace_id",id).eq("type","task")','SB.from("work_items").select("*").eq("workspace_id",id)');
  h=h.replace('data={phases:p.data||[],tasks:t.data||[],issues:i.data||[]','data={phases:p.data||[],tasks:(t.data||[]).filter(x=>x.type==="Task"),issues:i.data||[]');
  h=h.replace('data={phases:p.data||[],tasks:(t.data||[]).filter(x=>x.type==="Task"),issues:i.data||[],ledger:l.data||[],customers:c.data||[],plans:pl.data||[],invoices:iv.data||[]};phaseId=', 'data={phases:p.data||[],tasks:(t.data||[]).filter(x=>x.type==="Task"),issues:i.data||[],ledger:l.data||[],customers:c.data||[],plans:pl.data||[],invoices:iv.data||[]};data._workItems=t.data||[];phaseId=');
  h=h.replace('data.tasks.some(t=>t.id===i.work_item_id&&t.phase_id===p.id)','data._workItems?.some(t=>t.id===i.work_item_id&&t.phase_id===p.id)');
  h=h.replace('SB.auth.getSession().then(x=>boot(x.data.session)).catch(e=>$("authErr").textContent=e.message);','SB.auth.getSession().then(x=>boot(x.data.session)).catch(e=>{console.error(e);$("authErr").textContent=e?.message||"Unable to initialize the application."});');
  // Make status badges match the real database enum values.
  h=h.replace("s==='done'||s==='paid'||s==='active'","s==='Done'||s==='Complete'||s==='Paid'||s==='Active'");
  h=h.replace("s==='Blocked'||s==='unpaid'||s==='at-risk'","s==='Blocked'||s==='Open'||s==='Overdue'||s==='at-risk'");
  return h;
}

http.createServer((req,res)=>{
  let p=(req.url||'/').split('?')[0];
  if(p==='/health'){
    res.writeHead(200,{'content-type':'application/json','cache-control':'no-store'});
    return res.end(JSON.stringify({ok:true,service:'saas-ledger'}));
  }
  if(p==='/'||p==='/index.html')p='/index.html';
  const f=path.resolve(root+'.'+p);
  if(!f.startsWith(path.resolve(root)))return res.writeHead(400).end('Bad path');
  fs.readFile(f,(e,d)=>{
    if(e)return res.writeHead(404,{'content-type':'text/plain'}).end('Not found');
    if(f.endsWith('.html'))d=Buffer.from(transformHtml(d.toString()));
    res.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream','cache-control':'no-store'});
    res.end(d);
  });
}).listen(port,'0.0.0.0',()=>console.log(`SaaS Ledger listening on ${port}`));
