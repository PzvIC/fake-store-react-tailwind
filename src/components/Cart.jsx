import { useEffect, useState } from "react";
import "../styles/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [animateIn, setAnimateIn] = useState(false);

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

        <div className="cart-main-layout">
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

      <div className={`cart-summary-fixed ${animateIn ? "show" : ""}`}>

        <h3 className="summary-title">Summary</h3>
        <hr className="summary-separator" />
        <p className="summary-line">
          Subtotal: $
          {cartItems
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
        <p className="summary-line">
          
          Tax (10%): $
          {(
            cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ) * 0.1
          ).toFixed(2)}
        </p>
        <hr className="summary-separator" />
        <p className="summary-total">
          Total: $
          {(
            cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ) * 1.1
          ).toFixed(2)}
        </p>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export { Cart };
