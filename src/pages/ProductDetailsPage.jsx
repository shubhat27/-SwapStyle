import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { products } from "../data/products.js";

export default function ProductDetailsPage({ wishlist, toggleWishlist }) {
  const { id } = useParams();
  const [requested, setRequested] = useState(false);
  const product = products.find((item) => item.id === Number(id)) || products[0];

  const requestSwap = () => {
    setRequested(true);
    try {
      const saved = JSON.parse(localStorage.getItem("swapstyle-requests")) || [];
      localStorage.setItem("swapstyle-requests", JSON.stringify([
        ...saved,
        {
          id: Date.now(),
          requestedId: product.id,
          offeredId: 2,
          status: "Pending",
          from: "Demo User",
          createdAt: "Just now",
        },
      ]));
    } catch {
      // Keep the interaction functional even if browser storage is unavailable.
    }
  };

  return (
    <main className="details-page">
      <div className="details-image"><img src={product.image} alt={product.name} /></div>
      <div className="details-copy">
        <span className="section-kicker">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="details-brand">{product.brand}</p>
        <p className="details-location"><MapPin size={16} /> {product.location}</p>
        <div className="detail-values">
          <span><small>Size</small>{product.size}</span>
          <span><small>Condition</small>{product.condition}</span>
          <span><small>Swap value</small>₹{product.value.toLocaleString("en-IN")}</span>
        </div>
        <p>A carefully worn {product.name.toLowerCase()} ready for a new wardrobe. Available for exchange with a similar-value clothing item.</p>
        <button className="button button-primary swap-button" onClick={requestSwap}>{requested ? "Swap Request Sent" : "Request a Swap"}</button>
        <button className={`detail-wishlist ${wishlist.includes(product.id) ? "wishlisted" : ""}`} onClick={() => toggleWishlist(product.id)}>
          <Heart size={17} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /> {wishlist.includes(product.id) ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </main>
  );
}
