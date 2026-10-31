import { Boxes, ClipboardCheck, Package, Users, UserX } from "lucide-react";
import { products } from "../data/products.js";

export default function AdminDashboardPage() {
  const users = [
    { name: "Kiran Mehta", email: "kiran@example.com", status: "Active" },
    { name: "Arjun Patel", email: "arjun@example.com", status: "Active" },
    { name: "Mira Shah", email: "mira@example.com", status: "Active" },
  ];

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="brand admin-brand"><span className="brand-mark"><Boxes size={18} /></span><span>SwapStyle</span></div>
        <nav><button className="active">Dashboard</button><button>Users</button><button>Listings</button><button>Swap Requests</button></nav>
      </aside>
      <section className="admin-content">
        <div className="admin-heading"><div><span className="section-kicker">DEMO ADMIN</span><h1>Dashboard</h1></div><span className="admin-badge">Admin access</span></div>
        <div className="admin-stats">
          <article><Users /><div><small>Total users</small><strong>3</strong></div></article>
          <article><Package /><div><small>Demo listings</small><strong>{products.length}</strong></div></article>
          <article><ClipboardCheck /><div><small>Swap requests</small><strong>2</strong></div></article>
          <article><UserX /><div><small>Reported listings</small><strong>0</strong></div></article>
        </div>
        <div className="admin-grid">
          <section className="admin-panel"><div className="panel-heading"><h2>Demo users</h2><span>3 users</span></div><div className="admin-table"><div className="table-head"><span>User</span><span>Email</span><span>Status</span></div>{users.map((user) => <div className="table-row" key={user.email}><strong>{user.name}</strong><span>{user.email}</span><span className="status status-accepted">Active</span></div>)}</div></section>
          <section className="admin-panel"><div className="panel-heading"><h2>Recent listings</h2><span>{products.length} items</span></div>{products.slice(0, 4).map((item) => <div className="listing-row" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>{item.brand} · {item.category}</span></div><strong>₹{item.value.toLocaleString("en-IN")}</strong></div>)}</section>
        </div>
      </section>
    </main>
  );
}
