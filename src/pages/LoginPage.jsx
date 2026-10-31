import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const login = (event) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      const user = {
        name: form.email.split("@")[0].replace(/[._-]/g, " "),
        email: form.email,
        demo: true,
      };
      localStorage.setItem("swapstyle-user", JSON.stringify(user));
      setLoading(false);
      navigate("/");
    }, 500);
  };

  return (
    <main className="auth-page">
      <section className="auth-brand-panel" aria-label="SwapStyle introduction">
        <Link className="auth-brand" to="/">
          <span className="brand-mark"><ShoppingBag size={21} /></span>
          <span>SwapStyle</span>
        </Link>
        <div className="auth-brand-copy">
          <span className="section-kicker light">A CIRCULAR WARDROBE</span>
          <h1>Style you love.<br />Impact you can feel.</h1>
          <p>Discover pre-loved clothing and give your wardrobe a more sustainable story.</p>
        </div>
      </section>

      <section className="auth-form-panel">
        <form className="auth-card" onSubmit={login}>
          <div className="auth-heading">
            <span className="section-kicker">WELCOME BACK</span>
            <h2>Log in to SwapStyle</h2>
            <p>Continue swapping, saving and discovering.</p>
          </div>

          {error && <div className="auth-error" role="alert">{error}</div>}

          <label className="auth-field">
            <span>Email address</span>
            <div>
              <Mail size={17} />
              <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" />
            </div>
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div>
              <LockKeyhole size={17} />
              <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={updateField} placeholder="Enter your password" autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </label>

          <div className="auth-options">
            <label><input name="remember" type="checkbox" checked={form.remember} onChange={updateField} /> Remember me</label>
            <button type="button">Forgot password?</button>
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"} <ArrowRight size={18} />
          </button>

          <p className="auth-switch">New to SwapStyle? <Link to="/register">Create an account</Link></p>
        </form>
      </section>
    </main>
  );
}
