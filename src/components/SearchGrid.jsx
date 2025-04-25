import { useEffect, useRef, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductModal } from "./ProductModal"; // Make sure the path is correct
import "../styles/SearchGrid.css";

function SearchGrid({ searchTerm }) {
  const { items, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredItems = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="search-loading">Loading products...</p>;
  if (error) return <p className="search-error">{error}</p>;
  if (filteredItems.length === 0)
    return (
      <p className="search-no-product">No products found. Try again...</p>
    );

  return (
    <div className="search-grid-container">
      <div className="search-grid">
        {filteredItems.map((product) => (
          <FadeInCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

function FadeInCard({ product, onClick }) {
  const cardRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`search-grid-item fade-in ${visible ? "show" : ""} cursor-pointer`}
    >
      <div className="card-title-block">
        <h3 className="search-grid-title">{product.title}</h3>
      </div>
      <hr className="search-separator" />
      <div className="card-image-block">
        <img
          src={product.image}
          alt={product.title}
          className="search-grid-image"
        />
      </div>
      <hr className="search-separator" />
      <div className="card-price-block">
        <p className="search-grid-price">${product.price}</p>
      </div>
    </div>
  );
}

export { SearchGrid };
