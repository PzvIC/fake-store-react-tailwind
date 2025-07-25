import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useIsMobile } from "../hooks/useIsMobile";
import "../styles/Header.css";

function Header({
  onGoHome,
  setSelectedCategory,
  setCurrentSection,
  setSearchTerm,
  searchTerm,
}) {
  const [itemCount, setItemCount] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setItemCount(total);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("hashchange", updateCartCount);
    window.addEventListener("focus", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("hashchange", updateCartCount);
      window.removeEventListener("focus", updateCartCount);
    };
  }, []);

  const handleCart = () => {
    setSearchTerm("");
    setSelectedCategory("cart");
    setCurrentSection("cart");
    window.location.hash = "#cart";
  };

  return (
    <header className="header-container">
      <div className="header-title cursor-pointer" onClick={onGoHome}>
        <h1>Fake<span className="underscore">_</span></h1>
        <h1>Store<span className="underscore">_</span></h1>
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder={isMobile ? "Search.." : "What are you looking for?"}
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);

            if (value.trim() === "") {
              setSelectedCategory(null);
              setCurrentSection("home");
              window.location.hash = "#home";
            } else {
              setSelectedCategory("searching");
              setCurrentSection("searching");
              window.location.hash = "#searching";
            }
          }}
        />
      </div>

      <button className="cart-button" onClick={handleCart}>
        <ShoppingCartIcon className="cart-icon" />
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount > 9 ? "9+" : itemCount}</span>
        )}
      </button>
    </header>
  );
}

export { Header };
