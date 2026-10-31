import { useState } from "react";
import { CheckCircle2, UserRound } from "lucide-react";

export default function ProfilePage() {
  const stored = JSON.parse(localStorage.getItem("swapstyle-user") || "{}");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: stored.name || "", email: stored.email || "", location: stored.location || "", bio: stored.bio || "" });
  const submit = (e) => { e.preventDefault(); localStorage.setItem("swapstyle-user", JSON.stringify({...stored,...form,demo:true})); setSaved(true); };
  return (
    <main className="simple-page profile-page">
      <div className="page-heading"><div><span className="section-kicker">MY ACCOUNT</span><h1>Profile</h1></div></div>
      {saved && <div className="success-message"><CheckCircle2 size={18}/> Profile saved.</div>}
      <form className="profile-card" onSubmit={submit}><div className="profile-avatar"><UserRound size={42}/></div><label><span>Full name</span><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label><span>Email</span><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label><span>Location</span><input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="City or area"/></label><label><span>Bio</span><textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/></label><button className="auth-submit" type="submit">Save profile</button></form>
    </main>
  );
}
