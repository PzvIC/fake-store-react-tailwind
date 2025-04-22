import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { FadeInImageCard } from "./FadeInImageCard";
import { ProductModal } from "./ProductModal";
import "../styles/MasonryGrid.css";

function MasonryGrid({ category }) {
  const { items: products, loading, error } = useProducts(category);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (loading) return <p className="masonry-loading">Cargando productos...</p>;
  if (error) return <p className="masonry-error">Error: {error.message}</p>;

  return (
    <>
      <div className="masonry-wrapper">
        <div className="masonry-grid">
          {products.map((product) => (
            <FadeInImageCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export { MasonryGrid };
