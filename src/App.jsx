import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import SwapRequestsPage from "./pages/SwapRequestsPage.jsx";
import SwapConfirmPage from "./pages/SwapConfirmPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("swapstyle-wishlist"));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("swapstyle-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((productId) => productId !== id)
        : [...current, id],
    );
  };

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route
          path="/"
          element={<HomePage wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        />
        <Route
          path="/explore"
          element={<ExplorePage wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        />
        <Route
          path="/wishlist"
          element={<WishlistPage wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetailsPage wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route
          path="/swap-requests"
          element={<SwapRequestsPage />}
        />
        <Route
          path="/swap-confirm/:id"
          element={<SwapConfirmPage />}
        />
        <Route
          path="*"
          element={<HomePage wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        />
      </Routes>
    </>
  );
}

export default App;
