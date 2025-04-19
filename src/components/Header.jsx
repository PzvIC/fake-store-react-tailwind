import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import "../styles/Header.css";

function Header({ onGoHome, setSelectedCategory, setCurrentSection }) {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setItemCount(total);
    };

    updateCartCount();

    // 🔄 Escucha más eventos que podrían indicar cambios
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("hashchange", updateCartCount);
    window.addEventListener("focus", updateCartCount); // por si vuelve de otra pestaña

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("hashchange", updateCartCount);
      window.removeEventListener("focus", updateCartCount);
    };
  }, []);

  const handleCart = () => {
    setSelectedCategory("cart");
    setCurrentSection("cart");
    window.location.hash = "#cart";
  };

  return (
    <header className="header-container">
      <h1 className="header-title cursor-pointer" onClick={onGoHome}>
        Fake<span className="underscore">_</span>Store
        <span className="underscore">_</span>
      </h1>

      <div className="header-search">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="search-input"
        />
      </div>

      <button className="cart-button" onClick={handleCart}>
        <ShoppingCartIcon className="cart-icon" />
        {itemCount > 0 && (
          <span className="cart-badge">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </button>
    </header>
  );
}

export { Header };
