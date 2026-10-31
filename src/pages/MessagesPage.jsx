import { useEffect, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Link } from "react-router-dom";

const seed = [
  { id: 1, text: "Hi! Is this jacket still available for a swap?", mine: false, time: "10:32 AM" },
  { id: 2, text: "Yes, it is. Would you like to offer another item?", mine: true, time: "10:35 AM" },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem("swapstyle-messages")) || seed; } catch { return seed; }
  });
  const [text, setText] = useState("");
  useEffect(() => localStorage.setItem("swapstyle-messages", JSON.stringify(messages)), [messages]);
  const send = (event) => { event.preventDefault(); if (!text.trim()) return; setMessages([...messages, { id: Date.now(), text: text.trim(), mine: true, time: "Now" }]); setText(""); };
  return (
    <main className="messages-page">
      <aside className="conversation-list"><div className="conversation-head"><h1>Messages</h1></div><button className="conversation active"><span>AS</span><div><strong>Arjun Patel</strong><small>Would you like to swap?</small></div></button></aside>
      <section className="chat-panel">
        <header><span>AS</span><div><strong>Arjun Patel</strong><small>Online</small></div></header>
        <div className="swap-chat-body">
          <div className="chat-product-preview">
            <img src="https://images.unsplash.com/photo-1543077557-215ad9ba6923?auto=format&fit=crop&w=300&q=80" alt="Classic Denim Jacket" />
            <div><small>REQUESTED SWAP</small><strong>Classic Denim Jacket</strong><span>Levi&apos;s · Size L</span></div>
            <Link to="/swap-confirm/2"><CheckCircle2 size={16} /> Confirm Swap</Link>
          </div>
          <div className="chat-history">{messages.map(m => <div key={m.id} className={`message ${m.mine ? "mine" : ""}`}><p>{m.text}</p><small>{m.time}</small></div>)}</div>
        </div>
        <form className="chat-input" onSubmit={send}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Write a message..." /><button aria-label="Send message"><Send size={18}/></button></form>
      </section>
    </main>
  );
}
