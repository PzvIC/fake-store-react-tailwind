import { useEffect, useRef, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import "../styles/MasonryGrid.css";

function MasonryGrid({ categoryId }) {
  const { data: products, loading, error } = useProducts(categoryId);

  const getHeight = useRef(createRandomHeightGenerator()).current;

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="masonry-grid">
      {products.map((product) => (
        <FadeInImageCard
          key={product.id}
          product={product}
          heightClass={getHeight()}
        />
      ))}
    </div>
  );
}

function FadeInImageCard({ product, heightClass }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="masonry-item">
      <img
        loading="lazy"
        src={product.images[0]}
        alt={product.title}
        className={`product-image fade-in ${heightClass} ${show ? "show" : ""}`}
      />
    </div>
  );
}

function createRandomHeightGenerator() {
  const baseHeights = ["h-64", "h-72", "h-80"];
  const remaining = ["h-64", "h-72", "h-80", "h-96"];
  const usedHeights = [...baseHeights].sort(() => 0.5 - Math.random());
  let index = 0;

  return function () {
    if (index < usedHeights.length) {
      return usedHeights[index++];
    } else {
      return remaining[Math.floor(Math.random() * remaining.length)];
    }
  };
}

export { MasonryGrid };
