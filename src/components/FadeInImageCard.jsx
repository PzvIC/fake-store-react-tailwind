import { useRef, useState, useEffect } from "react";
import "../styles/FadeInImageCard.css";

function FadeInImageCard({ product }) {
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="masonry-item relative">
      {/* Placeholder */}
      {(!isLoaded || !isVisible) && (
        <div className="image-placeholder absolute top-0 left-0 w-full h-full z-10" />
      )}

      {/* Imagen real */}
      <img
        ref={imgRef}
        src={product.image}
        alt={product.title}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`product-image ${isLoaded && isVisible ? "show" : "opacity-0"}`}
      />
    </div>
  );
}

export { FadeInImageCard };
