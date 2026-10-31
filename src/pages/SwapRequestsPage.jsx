import { useEffect, useState } from "react";
import { Check, Clock3, MessageCircle, PackageCheck, X } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products.js";

const defaultRequests = [
  { id: 1, requestedId: 3, offeredId: 2, status: "Pending", from: "Arjun Patel", createdAt: "Today, 10:30 AM" },
  { id: 2, requestedId: 4, offeredId: 1, status: "Accepted", from: "Mira Shah", createdAt: "Yesterday, 6:15 PM" },
];

export default function SwapRequestsPage() {
  const [requests, setRequests] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("swapstyle-requests"));
      return Array.isArray(saved) ? saved : defaultRequests;
    } catch {
      return defaultRequests;
    }
  });

  useEffect(() => {
    localStorage.setItem("swapstyle-requests", JSON.stringify(requests));
  }, [requests]);

  const updateStatus = (id, status) => {
    setRequests((current) => current.map((request) => request.id === id ? { ...request, status } : request));
  };

  return (
    <main className="swap-page">
      <div className="page-heading">
        <div><span className="section-kicker">MY SWAPS</span><h1>Swap Requests</h1></div>
        <Link className="button button-primary" to="/explore">Explore items</Link>
      </div>

      <div className="swap-summary">
        <div><Clock3 size={18} /><span><strong>{requests.filter((item) => item.status === "Pending").length}</strong>Pending</span></div>
        <div><Check size={18} /><span><strong>{requests.filter((item) => item.status === "Accepted").length}</strong>Accepted</span></div>
        <div><PackageCheck size={18} /><span><strong>{requests.length}</strong>Total requests</span></div>
      </div>

      <div className="swap-list">
        {requests.length === 0 ? (
          <div className="empty-state"><PackageCheck size={38} /><h2>No swap requests</h2><Link className="button button-primary" to="/explore">Browse clothes</Link></div>
        ) : requests.map((request) => {
          const requested = products.find((item) => item.id === request.requestedId);
          const offered = products.find((item) => item.id === request.offeredId);
          return (
            <article className="swap-card" key={request.id}>
              <div className="swap-card-head">
                <div><strong>{request.from}</strong><span>{request.createdAt}</span></div>
                <span className={`status status-${request.status.toLowerCase()}`}>{request.status}</span>
              </div>
              <div className="swap-items">
                <div className="swap-item"><img src={requested?.image} alt={requested?.name} /><small>Requested</small><strong>{requested?.name}</strong><span>₹{requested?.value.toLocaleString("en-IN")}</span></div>
                <div className="swap-arrow">⇄</div>
                <div className="swap-item"><img src={offered?.image} alt={offered?.name} /><small>Offered</small><strong>{offered?.name}</strong><span>₹{offered?.value.toLocaleString("en-IN")}</span></div>
              </div>
              <div className="swap-card-actions">
                <Link className="chat-button" to="/messages"><MessageCircle size={16} /> Chat</Link>
                {request.status === "Pending" ? (
                  <>
                    <button className="reject-button" onClick={() => updateStatus(request.id, "Rejected")}><X size={16} /> Reject</button>
                    <button className="accept-button" onClick={() => updateStatus(request.id, "Accepted")}><Check size={16} /> Accept</button>
                  </>
                ) : (
                  <Link className="accept-button" to={`/swap-confirm/${request.id}`}>View confirmation</Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
