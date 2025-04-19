import { useEffect, useState } from "react";
import "../styles/ProductModal.css";

function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [product]);

  if (!product) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
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
  
    window.dispatchEvent(new Event("cartUpdated"));
  
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  

  return (
    <div
      className={`modal-overlay ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`modal-container ${
          isClosing ? "animate-modalOut" : "animate-modalIn"
        }`}
      >
        <button onClick={handleClose} className="modal-close">
          &times;
        </button>

        <hr className="modal-separator" />

        <h2 className="modal-title">{product.title}</h2>

        <hr className="modal-separator" />

        <img src={product.image} alt={product.title} className="modal-image" />

        <hr className="modal-separator" />

        <div className="modal-row">
          <p className="modal-price">
            <span className="modal-price-span">Price:</span> ${product.price}
          </p>
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
        </div>

        <hr className="modal-separator" />

        <button onClick={handleAddToCart} className="modal-button">
          Add to Cart
        </button>

        {added && <p className="modal-confirmation">✅ Added to cart!</p>}
      </div>
    </div>
  );
}

export { ProductModal };
