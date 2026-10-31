import { useState } from "react";
import { CheckCircle2, MapPin, PackageCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products.js";

export default function SwapConfirmPage() {
  const { id } = useParams();
  const [confirmed, setConfirmed] = useState(false);

  const confirmSwap = () => {
    setConfirmed(true);
    try {
      const requests = JSON.parse(localStorage.getItem("swapstyle-requests")) || [];
      const numericId = Number(id);
      const updated = requests.map((request) =>
        request.id === numericId ? { ...request, status: "Confirmed" } : request,
      );
      localStorage.setItem("swapstyle-requests", JSON.stringify(updated));
    } catch {
      setConfirmed(true);
    }
  };

  return (
    <main className="confirm-page">
      <div className="confirm-card">
        <div className="confirm-heading"><span className="confirm-icon">{confirmed ? <CheckCircle2 /> : <PackageCheck />}</span><div><span className="section-kicker">{confirmed ? "SWAP CONFIRMED" : "FINAL STEP"}</span><h1>{confirmed ? "Your swap is confirmed!" : "Confirm your swap"}</h1></div></div>
        <p>{confirmed ? "Both items are reserved for this exchange." : "Review the two items and confirm the agreed exchange."}</p>
        <div className="confirm-items">
          {[products[2], products[1]].map((item, index) => (
            <article key={item.id}>
              <img src={item.image} alt={item.name} />
              <small>{index === 0 ? "You receive" : "You offer"}</small>
              <h2>{item.name}</h2>
              <span>{item.brand} · Size {item.size}</span>
              <strong>₹{item.value.toLocaleString("en-IN")}</strong>
            </article>
          ))}
        </div>
        <div className="value-difference"><span>Value difference</span><strong>₹1,500 · Fair exchange</strong></div>
        <div className="confirm-location"><MapPin size={17} /><div><small>Exchange location</small><strong>Central Indore, MP</strong></div></div>
        {!confirmed ? (
          <div className="confirm-actions"><Link className="reject-button" to="/swap-requests">Back</Link><button className="accept-button" onClick={confirmSwap}><CheckCircle2 size={17} /> Confirm Swap</button></div>
        ) : (
          <div className="confirm-actions"><Link className="accept-button" to="/messages">Open chat</Link><Link className="chat-button" to="/swap-requests">View swaps</Link></div>
        )}
        <span className="demo-note">Demo request ID: {id}</span>
      </div>
    </main>
  );
}
