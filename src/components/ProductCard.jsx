import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, wishlisted = false, onWishlistToggle }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/fashion-rack.jpg";
          }}
        />
        <button
          className={`wishlist-button ${wishlisted ? "wishlisted" : ""}`}
          type="button"
          aria-label={`${wishlisted ? "Remove" : "Add"} ${product.name} ${wishlisted ? "from" : "to"} wishlist`}
          onClick={() => onWishlistToggle?.(product.id)}
        >
          <Heart size={16} />
        </button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-brand">{product.brand}</p>
        <div className="product-meta">
          <span>{product.size}</span>
          <span>{product.condition}</span>
        </div>
        <p className="product-location"><MapPin size={13} /> {product.location}</p>
        <strong className="product-value">₹{product.value.toLocaleString("en-IN")}</strong>
        <Link className="request-button" to={`/products/${product.id}`}>View Details</Link>
      </div>
    </article>
  );
}
