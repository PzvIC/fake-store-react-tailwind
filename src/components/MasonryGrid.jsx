import Masonry from "react-masonry-css";
import { useProducts } from "../hooks/useProducts";
import { FadeInImageCard } from "./FadeInImageCard";
import "../styles/MasonryGrid.css";

function MasonryGrid({ category }) {
  const { data: products, loading, error } = useProducts(category);

  if (loading) return <p className="p-4">Cargando productos...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    0: 1,
  };

  return (
    <div className="masonry-wrapper">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {products.map((product) => (
          <FadeInImageCard key={product.id} product={product} />
        ))}
      </Masonry>
    </div>
  );
}

export { MasonryGrid };
