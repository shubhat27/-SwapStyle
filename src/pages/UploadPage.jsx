import { useState } from "react";
import { CheckCircle2, ImagePlus } from "lucide-react";

export default function UploadPage() {
  const [preview, setPreview] = useState("");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", brand: "", category: "Tops", size: "M", condition: "Excellent", value: "", location: "" });

  const selectImage = (event) => {
    const file = event.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const submit = (event) => {
    event.preventDefault();
    const listings = JSON.parse(localStorage.getItem("swapstyle-listings") || "[]");
    localStorage.setItem("swapstyle-listings", JSON.stringify([...listings, { ...form, id: Date.now(), image: preview }]));
    setSaved(true);
    setForm({ name: "", brand: "", category: "Tops", size: "M", condition: "Excellent", value: "", location: "" });
    setPreview("");
  };

  return (
    <main className="simple-page upload-page">
      <div className="page-heading"><div><span className="section-kicker">LIST YOUR CLOTHES</span><h1>Add an item</h1></div></div>
      {saved && <div className="success-message"><CheckCircle2 size={18}/> Your item was saved to demo listings.</div>}
      <form className="upload-layout" onSubmit={submit}>
        <label className="upload-image">{preview ? <img src={preview} alt="Clothing preview"/> : <><ImagePlus size={36}/><strong>Add clothing photo</strong><span>Choose an image from your device</span></>}<input type="file" accept="image/*" onChange={selectImage} /></label>
        <div className="upload-fields">
          <label><span>Item name</span><input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} /></label>
          <label><span>Brand</span><input required value={form.brand} onChange={(e)=>setForm({...form,brand:e.target.value})} /></label>
          <div className="form-row"><label><span>Category</span><select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}><option>Tops</option><option>Jeans</option><option>Dresses</option><option>Jackets</option><option>Shoes</option><option>Bags</option></select></label><label><span>Size</span><select value={form.size} onChange={(e)=>setForm({...form,size:e.target.value})}><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option></select></label></div>
          <div className="form-row"><label><span>Condition</span><select value={form.condition} onChange={(e)=>setForm({...form,condition:e.target.value})}><option>Excellent</option><option>Good</option><option>Like New</option></select></label><label><span>Estimated value (₹)</span><input required type="number" min="1" value={form.value} onChange={(e)=>setForm({...form,value:e.target.value})} /></label></div>
          <label><span>Location</span><input required value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} placeholder="City or area" /></label>
          <button className="auth-submit" type="submit">Publish item</button>
        </div>
      </form>
    </main>
  );
}
