import { useEffect, useState } from "react";
import { useIsTablet } from "../hooks/useIsTablet";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import "../styles/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [animateIn, setAnimateIn] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const isCompact = useIsTablet(1300);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const timeout = setTimeout(() => {
      setAnimateIn(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const renderSummary = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (isCompact) {
      return createPortal(
        <div
          className={`summary-panel-vertical ${
            showSummary ? "visible" : ""
          }`}
        >
          <div className="summary-close-wrapper">
            <button
              className="summary-close-button"
              onClick={() => setShowSummary(false)}
            >
              <ChevronLeftIcon className="icon-chevron rotated" />
            </button>
          </div>

          <div className="summary-content">
            <h3 className="summary-title">Summary</h3>
            <hr className="summary-separator" />
            <p className="summary-line">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="summary-line">Tax (10%): ${tax.toFixed(2)}</p>
            <hr className="summary-separator" />
            <p className="summary-total">Total: ${total.toFixed(2)}</p>
            <button className="checkout-button">Checkout</button>
          </div>
        </div>,
        document.getElementById("portal-root")
      );
    }

    return createPortal(
      <div
        className={`summary-panel-fixed fade-in ${animateIn ? "visible" : ""}`}
      >
        <h3 className="summary-title">Summary</h3>
        <hr className="summary-separator" />
        <p className="summary-line">Subtotal: ${subtotal.toFixed(2)}</p>
        <p className="summary-line">Tax (10%): ${tax.toFixed(2)}</p>
        <hr className="summary-separator" />
        <p className="summary-total">Total: ${total.toFixed(2)}</p>
        <button className="checkout-button">Checkout</button>
      </div>,
      document.getElementById("portal-root")
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className={`cart-container empty`}>
        <p className="cart-empty-message">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <div className={`cart-container fade-in ${animateIn ? "visible" : ""}`}>
        <div className={`cart-layout ${isCompact ? "compact" : ""}`}>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={item.id}>
                <div className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="cart-item-controls">
                      <label>
                        Qty:
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="cart-quantity-input"
                        />
                      </label>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="cart-remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {index < cartItems.length - 1 && (
                  <hr className="cart-separator" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {renderSummary()}

      {isCompact &&
        !showSummary &&
        createPortal(
          <button
            className="summary-floating-button summary-vertical-label"
            onClick={() => setShowSummary(true)}
          >
            <span className="summary-label-text">Checkout</span>
            <ChevronLeftIcon className="icon-chevron arrow-before-text" />
          </button>,
          document.getElementById("portal-root")
        )}
    </div>
  );
}

export { Cart };
