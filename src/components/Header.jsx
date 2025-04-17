import "../styles/Header.css";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Header({ onGoHome, onToggleCart }) {
  return (
    <header className="header-container">
      <h1 className="header-title cursor-pointer" onClick={onGoHome}>
        Fake<span className="underscore">_</span>Store<span className="underscore">_</span>
      </h1>

      <div className="header-search">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="search-input"
        />
      </div>

      <button className="cart-button" onClick={onToggleCart}>
        <ShoppingCartIcon className="cart-icon" />
        <span className="cart-badge">3</span>
      </button>
    </header>
  );
}

export { Header };
