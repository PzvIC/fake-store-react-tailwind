import { useEffect, useState } from "react";
import "../styles/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  if (cartItems.length === 0) {
    return <p className="cart-empty-message">Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-info">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-quantity">Qty: {item.quantity}</p>
              <p className="cart-item-price">${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Cart };
