import { useState } from "react";
import { ArrowRight, Eye, EyeOff, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", terms: false });

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || form.password.length < 6 || !form.terms) {
      setError("Enter your details, use 6+ password characters, and accept the terms.");
      return;
    }
    localStorage.setItem("swapstyle-user", JSON.stringify({ name: form.name, email: form.email, demo: true }));
    navigate("/profile");
  };

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <Link className="auth-brand" to="/"><span className="brand-mark"><ShoppingBag size={21} /></span><span>SwapStyle</span></Link>
        <div className="auth-brand-copy"><span className="section-kicker light">JOIN THE CIRCLE</span><h1>Make your wardrobe go further.</h1></div>
      </section>
      <section className="auth-form-panel">
        <form className="auth-card" onSubmit={submit}>
          <div className="auth-heading"><span className="section-kicker">CREATE ACCOUNT</span><h2>Join SwapStyle</h2></div>
          {error && <div className="auth-error">{error}</div>}
          <label className="auth-field"><span>Full name</span><div><input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your name" /></div></label>
          <label className="auth-field"><span>Email address</span><div><input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="you@example.com" /></div></label>
          <label className="auth-field"><span>Password</span><div><input required type={show ? "text" : "password"} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="Minimum 6 characters" /><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>
          <label className="terms-row"><input type="checkbox" checked={form.terms} onChange={(e) => setForm({...form, terms: e.target.checked})} /> I agree to the demo terms</label>
          <button className="auth-submit" type="submit">Create account <ArrowRight size={18}/></button>
          <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </form>
      </section>
    </main>
  );
}
