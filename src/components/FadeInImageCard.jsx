import { useRef, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useOnScreen } from "../hooks/useOnScreen";
import "../styles/FadeInImageCard.css";

function FadeInImageCard({ product }) {
  const [ref, isVisible] = useOnScreen(
    { threshold: 0.01, rootMargin: "0px 0px -100px 0px" },
    true
  );
  const [loaded, setLoaded] = useState(false);

  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * 8);
    rotateY.set(((x - centerX) / centerX) * -8);
  };

  const resetRotation = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="masonry-item"
      ref={(node) => {
        ref.current = node;
        cardRef.current = node;
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <AnimatePresence>
        {isVisible && !loaded && (
          <motion.div
            className="placeholder"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>

      {isVisible && (
        <motion.img
          src={product.image}
          alt=""
          className={`product-image ${loaded ? "show" : ""}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ willChange: "transform" }}
        />
      )}
    </motion.div>
  );
}

export { FadeInImageCard };
