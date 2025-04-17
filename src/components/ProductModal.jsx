import { useEffect, useState } from "react";
import "../styles/ProductModal.css";

function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Oculta el mensaje después de 2s
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <button onClick={onClose} className="modal-close">
          &times;
        </button>

        <h2 className="modal-title">{product.title}</h2>
        <img src={product.image} alt={product.title} className="modal-image" />

        <hr className="modal-separator" />

        <p className="modal-price">${product.price}</p>

        <hr className="modal-separator" />

        <div className="modal-quantity">
          <label htmlFor="quantity" className="modal-quantity-label">
            Quantity:
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="modal-input"
          />
        </div>

        <hr className="modal-separator" />

        <button onClick={handleAddToCart} className="modal-button">
          Add to Cart
        </button>

        {added && (
          <p className="modal-confirmation">✅ Added to cart!</p>
        )}
      </div>
    </div>
  );
}

export { ProductModal };
