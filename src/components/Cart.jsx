import { useEffect, useState } from "react";
import { useIsTablet } from "../hooks/useIsTablet";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import "../styles/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [animateIn, setAnimateIn] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const isCompact = useIsTablet(1160);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const timeout = setTimeout(() => {
      setAnimateIn(true);
    }, 30);

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
      return (
        <>
          {/* Botón SIEMPRE visible, pegado al borde derecho */}
          {!showSummary && (
            <button
              className="summary-floating-toggle-button"
              onClick={() => setShowSummary(true)}
            >
              <ChevronLeftIcon className="w-5 h-5 text-white" />
            </button>
          )}

          <div
            className={`cart-summary-vertical ${
              showSummary ? "translate-x-0" : ""
            }`}
          >
            {/* Botón para cerrar dentro del panel */}
            <div className="p-2 flex justify-end">
              <button
                className="summary-close-button"
                onClick={() => setShowSummary(false)}
              >
                <ChevronLeftIcon className="w-5 h-5 text-white rotate-180" />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-4">
              <h3 className="summary-title">Summary</h3>
              <hr className="summary-separator" />
              <p className="summary-line">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="summary-line">Tax (10%): ${tax.toFixed(2)}</p>
              <hr className="summary-separator" />
              <p className="summary-total">Total: ${total.toFixed(2)}</p>
              <button className="checkout-button">Checkout</button>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className={`cart-summary-fixed ${animateIn ? "show" : ""}`}>
        <h3 className="summary-title">Summary</h3>
        <hr className="summary-separator" />
        <p className="summary-line">Subtotal: ${subtotal.toFixed(2)}</p>
        <p className="summary-line">Tax (10%): ${tax.toFixed(2)}</p>
        <hr className="summary-separator" />
        <p className="summary-total">Total: ${total.toFixed(2)}</p>
        <button className="checkout-button">Checkout</button>
      </div>
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className={`cart-container cart-empty ${animateIn ? "show" : ""}`}>
        <p className="cart-empty-message">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className={`cart-wrapper ${animateIn ? "show" : ""}`}>
      <div className={`cart-container ${animateIn ? "show" : ""}`}>
        <h2 className="cart-title">Your Cart</h2>

        <div className={`cart-main-layout ${isCompact ? "compact" : ""}`}>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
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
              </li>
            ))}
          </ul>
        </div>
      </div>

      {renderSummary()}
    </div>
  );
}

export { Cart };
