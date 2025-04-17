import { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductModal } from "./ProductModal";
import "../styles/CategoryGrid.css";

function CategoryGrid({ selectedCategory }) {
  const { items, loading, error, refetch } = useProducts(selectedCategory);
  const [visibleItems, setVisibleItems] = useState({});
  const [activeProduct, setActiveProduct] = useState(null); // 👈 Modal

  useEffect(() => {
    if (items.length > 0) {
      setVisibleItems({});
      items.forEach((item, i) => {
        const baseDelay = 300;
        const delay = baseDelay + i * 100;
        setTimeout(() => {
          setVisibleItems((prev) => ({ ...prev, [item.id]: true }));
        }, delay);
      });
    }
  }, [items]);

  if (loading) {
    return <p className="p-6">Loading Products...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold mb-4">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="category-grid-container">
      <div className="category-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className={`category-card fade-in ${
              visibleItems[item.id] ? "show" : ""
            } cursor-pointer`}
            onClick={() => setActiveProduct(item)} // 👈 Click abre modal
          >
            <div className="card-title-block">
              <h3 className="category-card-title">{item.title}</h3>
            </div>
            <hr className="category-separator" />
            <div className="card-image-block">
              <img
                src={item.image}
                alt={item.title}
                className="category-card-image"
              />
            </div>
            <hr className="category-separator" />
            <div className="card-price-block">
              <p className="category-card-price">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </div>
  );
}

export { CategoryGrid };
