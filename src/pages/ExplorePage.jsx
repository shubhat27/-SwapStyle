import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { categories, products } from "../data/products.js";

export default function ExplorePage({ wishlist, toggleWishlist }) {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "All";
  const size = params.get("size") || "All";
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let result = products.filter((item) =>
      (!query || `${item.name} ${item.brand} ${item.category}`.toLowerCase().includes(query.toLowerCase())) &&
      (category === "All" || item.category === category) &&
      (size === "All" || item.size === size),
    );
    if (sort === "low") result = [...result].sort((a, b) => a.value - b.value);
    if (sort === "high") result = [...result].sort((a, b) => b.value - a.value);
    return result;
  }, [query, category, size, sort]);

  const updateFilter = (key, value) => {
    setParams((current) => {
      if (!value || value === "All") current.delete(key);
      else current.set(key, value);
      return current;
    });
  };

  return (
    <main className="browse-page">
      <section className="explore-banner">
        <div>
          <span className="section-kicker light">DISCOVER PRE-LOVED STYLE</span>
          <h1>{category === "All" ? "Explore Clothes" : category}</h1>
          <p>{filtered.length} curated pieces ready for their next wardrobe.</p>
        </div>
        <label>Sort:
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
      </section>
      <div className="explore-category-strip" aria-label="Clothing categories">
        <button className={category === "All" ? "active" : ""} onClick={() => updateFilter("category", "All")}>All</button>
        {categories.map((item) => (
          <button
            key={item.name}
            className={category === item.name ? "active" : ""}
            onClick={() => updateFilter("category", item.name)}
          >
            <img src={item.image} alt="" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="browse-layout">
        <aside className="filters">
          <div className="filters-title"><SlidersHorizontal size={16} /> Filters {(query || category !== "All" || size !== "All") && <button onClick={() => setParams({})}><X size={13} /> Clear</button>}</div>
          <label>Search<input value={query} onChange={(event) => updateFilter("q", event.target.value)} placeholder="Name or brand" /></label>
          <label>Category<select value={category} onChange={(event) => updateFilter("category", event.target.value)}><option>All</option>{categories.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
          <label>Size<select value={size} onChange={(event) => updateFilter("size", event.target.value)}><option>All</option><option>S</option><option>M</option><option>L</option></select></label>
        </aside>
        <div>
          <p className="result-count">{filtered.length} items found</p>
          <div className="products-grid browse-grid">
            {filtered.map((product) => <ProductCard key={product.id} product={product} wishlisted={wishlist.includes(product.id)} onWishlistToggle={toggleWishlist} />)}
          </div>
        </div>
      </div>
    </main>
  );
}
