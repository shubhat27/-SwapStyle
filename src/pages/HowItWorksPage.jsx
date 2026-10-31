import { ArrowRight, MessageCircle, PackageSearch, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function HowItWorksPage() {
  return (
    <main className="simple-page">
      <section className="swap-page-heading">
        <span className="section-kicker">SWAPSTYLE GUIDES</span>
        <h1>How it works</h1>
        <p>Give pre-loved clothing a new wardrobe in three simple steps.</p>
      </section>
      <div className="info-card-grid">
        <article className="info-card">
          <PackageSearch size={28} />
          <span>01</span>
          <h2>List an item</h2>
          <p>Add clothing details, an estimated value, and a clear photograph.</p>
          <Link className="text-link" to="/upload">List clothes <ArrowRight size={14} /></Link>
        </article>
        <article className="info-card">
          <RefreshCcw size={28} />
          <span>02</span>
          <h2>Find a swap</h2>
          <p>Browse categories and choose an item you would like to exchange.</p>
          <Link className="text-link" to="/explore">Explore clothes <ArrowRight size={14} /></Link>
        </article>
        <article className="info-card">
          <MessageCircle size={28} />
          <span>03</span>
          <h2>Connect and confirm</h2>
          <p>Send a request, use chat to agree details, and confirm the exchange.</p>
          <Link className="text-link" to="/swap-requests">View requests <ArrowRight size={14} /></Link>
        </article>
      </div>
    </main>
  );
}
