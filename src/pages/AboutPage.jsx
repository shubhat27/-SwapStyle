import { Leaf, RefreshCcw, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="simple-page">
      <section className="swap-page-heading">
        <span className="section-kicker">ABOUT SWAPSTYLE</span>
        <h1>Wear better, together</h1>
        <p>SwapStyle is a frontend demonstration for discovering and exchanging pre-loved clothing.</p>
      </section>
      <div className="info-card-grid">
        <article className="info-card">
          <RefreshCcw size={28} />
          <h2>Keep clothes in use</h2>
          <p>Extend the life of clothing by giving suitable pieces a new owner.</p>
        </article>
        <article className="info-card">
          <Users size={28} />
          <h2>Community exchange</h2>
          <p>Explore listings and coordinate swaps through a simple local demo experience.</p>
        </article>
        <article className="info-card">
          <Leaf size={28} />
          <h2>Demo, not checkout</h2>
          <p>All accounts, listings, requests, and messages are stored locally in the browser.</p>
        </article>
      </div>
    </main>
  );
}
