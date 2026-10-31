import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";

export default function WishlistPage({ wishlist, toggleWishlist }) {
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <main className="browse-page">
      <div className="browse-heading"><div><span className="section-kicker">YOUR SAVED PIECES</span><h1>Wishlist</h1></div></div>
      {saved.length === 0 ? (
        <div className="empty-state"><Heart size={38} /><h2>No saved items yet</h2><Link className="button button-primary" to="/explore">Explore clothes</Link></div>
      ) : (
        <div className="products-grid browse-grid">{saved.map((product) => <ProductCard key={product.id} product={product} wishlisted onWishlistToggle={toggleWishlist} />)}</div>
      )}
    </main>
  );
}
