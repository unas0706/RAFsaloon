import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';
import './ledger.css';

const quickTypes = ['Snapshot','Issue','Learning','Decision','Experiment','Invoice'];
const nav = [['all','All'],['build','🏗️ Build'],['knowledge','🧠 Knowledge'],['business','💼 Business'],['growth','📈 Growth']];

export default function SaaSLedger() {
  const [phases,setPhases]=useState([]), [items,setItems]=useState([]), [stats,setStats]=useState(null);
  const [filter,setFilter]=useState('all'), [modal,setModal]=useState(false), [type,setType]=useState('Task');
  const [form,setForm]=useState({title:'',notes:'',phase_id:'',priority:'Medium',status:'Not Started',due_date:''});
  const [selected,setSelected]=useState(null), [loading,setLoading]=useState(true), [error,setError]=useState('');

  const load=async()=>{
    setLoading(true); setError('');
    const [p,w,s]=await Promise.all([
      supabase.from('phases').select('*').order('phase_number'),
      supabase.from('work_items').select('*').order('updated_at',{ascending:false}),
      supabase.from('dashboard_stats').select('*').single()
    ]);
    if(p.error||w.error||s.error) setError((p.error||w.error||s.error).message); else {setPhases(p.data||[]);setItems(w.data||[]);setStats(s.data||null)}
    setLoading(false);
  };
  useEffect(()=>{load()},[]);
  const phaseMap=useMemo(()=>Object.fromEntries(phases.map(p=>[p.id,p])),[phases]);
  const filtered=items.filter(i=>filter==='all'||(filter==='build'&&i.phase_id)||(filter==='knowledge'&&['Learning','Decision'].includes(i.type))||(filter==='business'&&['Invoice'].includes(i.type))||(filter==='growth'&&['Experiment'].includes(i.type)));
  const save=async()=>{
    if(!form.title.trim()) return;
    const payload={...form,type,phase_id:form.phase_id||null,due_date:form.due_date||null,completed:form.status==='Done'};
    const {error:e}=await supabase.from('work_items').insert(payload);
    if(e) setError(e.message); else {setModal(false);setForm({title:'',notes:'',phase_id:'',priority:'Medium',status:'Not Started',due_date:''});load()}
  };
  const toggle=async i=>{const done=i.status!=='Done'; await supabase.from('work_items').update({status:done?'Done':'In Progress',completed:done,updated_at:new Date().toISOString()}).eq('id',i.id);load()};
  if(loading) return <div className="ledger"><div className="loader">Loading your operating ledger…</div></div>;
  return <div className="ledger">
    <header><div><div className="brand">SAAS OPERATING LEDGER</div><h1>My SaaS</h1><p>One visual workspace for the entire SaaS journey.</p></div><button className="add" onClick={()=>setModal(true)}>＋ Add</button></header>
    {error&&<div className="error">{error}</div>}
    <section className="stats">
      <Stat label="Build progress" value={`${Math.round((stats?.build_progress||0)*100)}%`} sub="from completed work"/>
      <Stat label="Open issues" value={stats?.open_issues||0} sub={`${stats?.overdue||0} overdue`}/>
      <Stat label="Revenue" value={`₹${Number(stats?.revenue||0).toLocaleString('en-IN')}`} sub="successful payments"/>
      <Stat label="Learnings" value={stats?.learnings||0} sub="captured insights"/>
    </section>
    <nav>{nav.map(([k,v])=><button className={filter===k?'active':''} key={k} onClick={()=>setFilter(k)}>{v}</button>)}</nav>
    <main>
      <div className="section-head"><div><span>BUILD JOURNEY</span><h2>10 phases</h2></div><button className="ghost" onClick={()=>setFilter('all')}>View all work</button></div>
      <div className="phase-grid">{phases.map(p=><PhaseCard key={p.id} phase={p} items={items.filter(i=>i.phase_id===p.id)} onClick={()=>setSelected(p)}/>)}</div>
      <div className="section-head lower"><div><span>OPERATING LOG</span><h2>{filter==='all'?'Recent work':filter[0].toUpperCase()+filter.slice(1)}</h2></div><button className="ghost" onClick={()=>setModal(true)}>Quick capture</button></div>
      <div className="work-grid">{filtered.slice(0,18).map(i=><article className="work" key={i.id}><button className={`check ${i.status==='Done'?'done':''}`} onClick={()=>toggle(i)}>{i.status==='Done'?'✓':'○'}</button><div className="work-body"><div className="work-meta"><span>{i.type}</span><span>{i.priority}</span>{i.phase_id&&<span>{phaseMap[i.phase_id]?.name}</span>}</div><h3>{i.title}</h3>{i.notes&&<p>{i.notes}</p>}<small>{i.due_date?`Due ${i.due_date}`:'No due date'} · {new Date(i.updated_at).toLocaleDateString()}</small></div></article>)}</div>
    </main>
    {selected&&<div className="drawer-backdrop" onClick={()=>setSelected(null)}><aside className="drawer" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><div className="phase-num">PHASE {selected.phase_number}</div><h2>{selected.icon} {selected.name}</h2><p className="goal">{selected.goal}</p><div className="drawer-stat">{items.filter(i=>i.phase_id===selected.id&&i.status==='Done').length} / {items.filter(i=>i.phase_id===selected.id).length} complete</div><button className="primary" onClick={()=>{setForm({...form,phase_id:selected.id});setSelected(null);setModal(true)}}>＋ Add work to phase</button></aside></div>}
    {modal&&<div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span>QUICK CAPTURE</span><h2>Add to your ledger</h2></div><button className="close" onClick={()=>setModal(false)}>×</button></div><div className="type-row">{quickTypes.map(t=><button className={type===t?'selected':''} onClick={()=>setType(t)} key={t}>{t}</button>)}</div><input autoFocus placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><textarea placeholder="Details / notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/><div className="two"><select value={form.phase_id} onChange={e=>setForm({...form,phase_id:e.target.value})}><option value="">No phase</option>{phases.map(p=><option key={p.id} value={p.id}>Phase {p.phase_number} · {p.name}</option>)}</select><select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>{['Low','Medium','High','Critical'].map(x=><option key={x}>{x}</option>)}</select></div><div className="two"><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>{['Not Started','In Progress','Done','Blocked'].map(x=><option key={x}>{x}</option>)}</select><input type="date" value={form.due_date} onChange={e=>setForm({...form,due_date:e.target.value})}/></div><div className="modal-actions"><button className="ghost" onClick={()=>setModal(false)}>Cancel</button><button className="primary" onClick={save}>Save</button></div></div></div>}
  </div>
}
function Stat({label,value,sub}){return <div className="stat"><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>}
function PhaseCard({phase,items,onClick}){const done=items.filter(i=>i.status==='Done').length,total=items.length,pct=total?Math.round(done/total*100):0;return <button className="phase" onClick={onClick}><div className="phase-top"><span className="phase-icon">{phase.icon}</span><span className="phase-no">0{phase.phase_number}</span></div><h3>{phase.name}</h3><p>{phase.goal}</p><div className="bar"><i style={{width:`${pct}%`}}/></div><div className="phase-bottom"><span>{done}/{total} done</span><b>{pct}%</b></div></button>}
