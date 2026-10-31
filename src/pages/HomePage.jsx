import { useState } from "react";
import { ArrowRight, Leaf, Recycle, Search, Shirt, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { categories, products } from "../data/products.js";

export default function HomePage({ wishlist, toggleWishlist }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const searchProducts = (event) => {
    event.preventDefault();
    navigate(search.trim() ? `/explore?q=${encodeURIComponent(search.trim())}` : "/explore");
  };

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">A FRESH WAY TO WEAR</span>
          <h1>Swap more.<br />Waste less.<br /><em>Wear better.</em></h1>
          <p>Give your wardrobe a new story and discover pre-loved pieces from people near you.</p>
          <form className="hero-search" onSubmit={searchProducts}>
            <Search size={20} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search clothes, brands or styles" aria-label="Search clothing" />
            <button type="submit">Explore clothes</button>
          </form>
          <div className="hero-actions">
            <Link className="button button-primary" to="/explore">Explore clothes <ArrowRight size={18} /></Link>
            <Link className="text-link" to="/upload">List your clothes</Link>
          </div>
        </div>
        <div className="hero-image-wrap" aria-label="Fashion portrait">
          <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=88" alt="Woman in sustainable fashion" />
          <div className="impact-card"><strong>Circle</strong><span>give clothes new life</span></div>
        </div>
      </section>

      <section className="category-section">
        <div className="section-heading"><h2>Shop by Category</h2><Link to="/explore">View All <ArrowRight size={14} /></Link></div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link className="category-card" to={`/explore?category=${encodeURIComponent(category.name)}`} key={category.name}>
              <img src={category.image} alt={category.name} /><span>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="section-heading"><div><span className="section-kicker">TRENDING NOW</span><h2>Featured Collections</h2></div><Link to="/explore">View All <ArrowRight size={14} /></Link></div>
        <div className="products-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} wishlisted={wishlist.includes(product.id)} onWishlistToggle={toggleWishlist} />)}
        </div>
      </section>

      <section className="sustainability-section">
        <div><span className="section-kicker light">SMALL CHANGES, REAL IMPACT</span><h2>Fashion that helps<br />our planet</h2></div>
        <div className="impact-grid">
          <div><Leaf /><strong>Reuse</strong><span>Extend clothing life</span></div>
          <div><Recycle /><strong>Swap</strong><span>Share without waste</span></div>
          <div><Shirt /><strong>Discover</strong><span>Find unique pre-loved pieces</span></div>
          <div><Truck /><strong>Local</strong><span>Explore nearby wardrobes</span></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><Link className="brand" to="/"><span className="brand-mark"><Shirt size={18} /></span><span>SwapStyle</span></Link><p>Swap clothes. Share stories. Wear sustainably.</p></div>
        <div><h3>Discover</h3><Link to="/explore">Explore</Link><Link to="/upload">List Clothes</Link><Link to="/wishlist">Wishlist</Link></div>
        <div><h3>Support</h3><Link to="/how-it-works">How it works</Link><Link to="/about">About us</Link><Link to="/messages">Messages</Link></div>
        <div className="footer-newsletter"><h3>Get fresh finds first</h3><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Email address" /><button type="submit"><ArrowRight size={17} /></button></form></div>
      </footer>
    </main>
  );
}
