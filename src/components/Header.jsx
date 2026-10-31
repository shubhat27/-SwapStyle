import { Bell, ChevronDown, Heart, LogIn, LogOut, Menu, MessageCircle, PackageCheck, Search, Settings, ShoppingBag, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categories } from "../data/products.js";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("swapstyle-user"));
    } catch {
      return null;
    }
  })();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setCategoryOpen(false);
    setNotificationOpen(false);
    setAccountOpen(false);
  }, [location.pathname, location.search]);

  const searchProducts = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("search")?.trim();
    navigate(query ? `/explore?q=${encodeURIComponent(query)}` : "/explore");
  };

  const logout = () => {
    localStorage.removeItem("swapstyle-user");
    setAccountOpen(false);
    navigate("/login");
  };

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="SwapStyle home">
        <span className="brand-mark"><ShoppingBag size={20} /></span>
        <span>SwapStyle</span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
        <Link className={location.pathname.startsWith("/explore") ? "active" : ""} to="/explore">Explore</Link>
        <div
          className="nav-category"
          onMouseEnter={() => setCategoryOpen(true)}
          onMouseLeave={() => setCategoryOpen(false)}
        >
          <button
            className="nav-category-button"
            type="button"
            aria-expanded={categoryOpen}
            onClick={() => {
              setCategoryOpen((open) => !open);
              setNotificationOpen(false);
              setAccountOpen(false);
            }}
          >
            Categories <ChevronDown size={13} />
          </button>
          {categoryOpen && (
            <div className="category-dropdown">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/explore?category=${encodeURIComponent(category.name)}`}
                  onClick={() => setCategoryOpen(false)}
                >
                  <img src={category.image} alt="" />
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link to="/how-it-works">How It Works</Link>
        <Link to="/about">About</Link>
      </nav>

      <div className="header-actions">
        <form className="header-search" onSubmit={searchProducts}>
          <Search size={17} />
          <input name="search" type="search" placeholder="Search clothes..." aria-label="Search clothes" />
        </form>
        <Link className="icon-button search-mobile-button" to="/explore" aria-label="Search"><Search size={19} /></Link>
        <button
          className="icon-button notification-button"
          type="button"
          aria-label="Notifications"
          aria-expanded={notificationOpen}
          onClick={() => {
            setNotificationOpen((open) => !open);
            setAccountOpen(false);
            setUnread(false);
          }}
        >
          <Bell size={19} />{unread && <span />}
        </button>
        {notificationOpen && (
          <div className="notification-panel" role="dialog" aria-label="Notifications">
            <div className="notification-panel-head">
              <strong>Notifications</strong>
              <button type="button" onClick={() => setNotificationOpen(false)}>Close</button>
            </div>
            <Link to="/swap-requests" onClick={() => setNotificationOpen(false)}>
              <span className="notification-icon"><ShoppingBag size={16} /></span>
              <div>
                <strong>Swap requests</strong>
                <p>Review your current swap activity.</p>
              </div>
            </Link>
            <Link to="/messages" onClick={() => setNotificationOpen(false)}>
              <span className="notification-icon"><UserRound size={16} /></span>
              <div>
                <strong>Messages</strong>
                <p>Open your swap conversations.</p>
              </div>
            </Link>
          </div>
        )}
        <Link className="icon-button" to="/wishlist" aria-label="Wishlist"><Heart size={19} /></Link>
        <Link className="icon-button" to="/messages" aria-label="Messages"><MessageCircle size={19} /></Link>
        <Link className="icon-button" to="/swap-requests" aria-label="Swap requests"><PackageCheck size={19} /></Link>
        <div className="account-menu-wrap">
          <button
            className="avatar-button"
            type="button"
            aria-label="Account menu"
            aria-expanded={accountOpen}
            onClick={() => {
              setAccountOpen((open) => !open);
              setNotificationOpen(false);
              setCategoryOpen(false);
            }}
          ><UserRound size={17} /></button>
          {accountOpen && (
            <div className="account-dropdown">
              <div className="account-summary">
                <span><UserRound size={18} /></span>
                <div><strong>My Account</strong><small>Demo profile</small></div>
              </div>
              <Link to="/profile" onClick={() => setAccountOpen(false)}><Settings size={16} /> Profile & Settings</Link>
              <Link to="/swap-requests" onClick={() => setAccountOpen(false)}><PackageCheck size={16} /> Swap Requests</Link>
              <Link to="/messages" onClick={() => setAccountOpen(false)}><MessageCircle size={16} /> Messages</Link>
              {savedUser ? (
                <button type="button" onClick={logout}><LogOut size={16} /> Log out</button>
              ) : (
                <Link to="/login" onClick={() => setAccountOpen(false)}><LogIn size={16} /> Log in</Link>
              )}
            </div>
          )}
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        ><Menu size={23} /></button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/explore" onClick={() => setMenuOpen(false)}>Explore</Link>
          <Link to="/explore?category=All" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
          <Link to="/swap-requests" onClick={() => setMenuOpen(false)}>Swap Requests</Link>
          <Link to="/messages" onClick={() => setMenuOpen(false)}>Messages</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile & Settings</Link>
          {savedUser ? (
            <button className="mobile-logout" type="button" onClick={() => { setMenuOpen(false); logout(); }}>Log out</button>
          ) : (
            <Link className="mobile-login" to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
          )}
        </nav>
      )}

      <form className="mobile-search" onSubmit={searchProducts}>
        <Search size={17} />
        <input name="search" type="search" placeholder="Search clothes, brands or styles" aria-label="Search clothes" />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
