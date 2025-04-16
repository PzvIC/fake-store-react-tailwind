import { useProducts } from "../hooks/useProducts";
import { FadeInImageCard } from "./FadeInImageCard";
import "../styles/MasonryGrid.css";

function MasonryGrid({ category }) {
  const { items: products, loading, error } = useProducts(category);

  if (loading) return <p className="p-4">Cargando productos...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="masonry-wrapper">
      <div className="masonry-grid">
        {products.map((product) => (
          <FadeInImageCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export { MasonryGrid };
