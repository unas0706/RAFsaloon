import React,{useEffect,useState} from 'react';
import {APP_URL,supabase} from './supabase';
import './auth.css';

const MIN_PASSWORD=12;

export default function AuthGate({children}){
 const [session,setSession]=useState(null),[loading,setLoading]=useState(true),[mode,setMode]=useState('login'),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[confirm,setConfirm]=useState(''),[name,setName]=useState(''),[workspace,setWorkspace]=useState('My SaaS'),[message,setMessage]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const clear=()=>{setError('');setMessage('')};
 useEffect(()=>{
  let mounted=true;
  const finish=async(s,event)=>{
   if(!mounted)return;
   setSession(s);
   if(event==='PASSWORD_RECOVERY')setMode('recovery');
   if(s){
    const token=new URLSearchParams(window.location.search).get('invite');
    if(token&&event!=='PASSWORD_RECOVERY'){
     const r=await supabase.rpc('accept_invitation',{raw_token:token});
     if(r.error)setError(r.error.message);else window.history.replaceState({},'',window.location.pathname);
    }
   }
   setLoading(false);
  };
  supabase.auth.getSession().then(({data})=>{
   const recovery=new URLSearchParams(window.location.hash.replace(/^#/,'')).get('type')==='recovery';
   if(recovery)window.history.replaceState({},'',window.location.pathname);
   finish(data.session,recovery?'PASSWORD_RECOVERY':undefined);
  });
  const {data:{subscription}}=supabase.auth.onAuthStateChange((event,s)=>finish(s,event));
  return()=>{mounted=false;subscription.unsubscribe()};
 },[]);

 const submit=async e=>{
  e.preventDefault();clear();setBusy(true);
  try{
   if(mode==='recovery'){
    if(password.length<MIN_PASSWORD)throw new Error(`Use a password with at least ${MIN_PASSWORD} characters.`);
    if(password!==confirm)throw new Error('Passwords do not match.');
    const r=await supabase.auth.updateUser({password});
    if(r.error)throw r.error;
    setPassword('');setConfirm('');setMessage('Password updated successfully. You can continue to your workspace.');
    setMode('login');
    return;
   }
   if(password.length<MIN_PASSWORD)throw new Error(`Use a password with at least ${MIN_PASSWORD} characters.`);
   if(mode==='signup'&&password!==confirm)throw new Error('Passwords do not match.');
   const cleanEmail=email.trim().toLowerCase();
   if(mode==='login'){
    const r=await supabase.auth.signInWithPassword({email:cleanEmail,password});
    if(r.error)throw r.error;
   }else{
    const r=await supabase.auth.signUp({email:cleanEmail,password,options:{data:{display_name:name.trim()||cleanEmail.split('@')[0],workspace_name:workspace.trim()||'My SaaS'},emailRedirectTo:APP_URL}});
    if(r.error)throw r.error;
    if(r.data.session)setMessage('Account created.');
    else setMessage('Account created. Check your email to verify the account, then sign in.');
   }
  }catch(err){setError(err?.message||'Authentication failed. Please try again.');}
  finally{setBusy(false)}
 };
 const forgot=async()=>{
  clear();
  const cleanEmail=email.trim().toLowerCase();
  if(!cleanEmail)return setError('Enter your email address first.');
  setBusy(true);
  try{
   const r=await supabase.auth.resetPasswordForEmail(cleanEmail,{redirectTo:APP_URL});
   if(r.error)throw r.error;
   setMessage('If an account exists for this email, a password reset link has been sent. Check your inbox and spam folder.');
  }catch(err){setError(err?.message||'Could not send the reset email. Please try again.');}
  finally{setBusy(false)}
 };
 const switchMode=m=>{setMode(m);setPassword('');setConfirm('');clear()};
 if(loading)return <div className="auth-shell"><div className="auth-card">Loading secure session…</div></div>;
 if(session&&mode!=='recovery')return children;
 return <div className="auth-shell"><div className="auth-card">
  <div className="brand">SAAS OPERATING LEDGER</div>
  <h1>{mode==='login'?'Welcome back':mode==='signup'?'Create your workspace':'Reset your password'}</h1>
  <p>{mode==='login'?'Private CRM and operating system.':mode==='signup'?'Your team data is isolated by workspace.':'Choose a new password for your account.'}</p>
  {error&&<div className="auth-error" role="alert">{error}</div>}
  {message&&<div className="auth-message" role="status">{message}</div>}
  <form onSubmit={submit}>
   {mode==='signup'&&<><label>Name<input value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></label><label>Workspace<input value={workspace} onChange={e=>setWorkspace(e.target.value)} autoComplete="organization"/></label></>}
   {mode!=='recovery'&&<label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label>}
   <label>Password<input type="password" required minLength={MIN_PASSWORD} value={password} onChange={e=>setPassword(e.target.value)} autoComplete={mode==='login'?'current-password':'new-password'}/></label>
   {mode!=='login'&&<label>Confirm password<input type="password" required minLength={MIN_PASSWORD} value={confirm} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password"/></label>}
   {mode!=='recovery'&&<small>Password must be at least {MIN_PASSWORD} characters.</small>}
   <button className="auth-submit" disabled={busy}>{busy?'Please wait…':mode==='login'?'Sign in':mode==='signup'?'Create account':'Update password'}</button>
  </form>
  {mode==='login'&&<><button className="auth-link" disabled={busy} onClick={forgot}>Forgot password?</button><button className="auth-switch" onClick={()=>switchMode('signup')}>Create a new workspace</button></>}
  {mode==='signup'&&<button className="auth-switch" onClick={()=>switchMode('login')}>Already have an account? Sign in</button>}
  {mode==='recovery'&&<button className="auth-switch" onClick={()=>{supabase.auth.signOut();switchMode('login')}}>Back to sign in</button>}
 </div></div>;
}
