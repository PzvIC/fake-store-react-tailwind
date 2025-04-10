import { useEffect, useRef, useState } from "react";

/**
 * Hook para detectar si un elemento está visible en el viewport (o en un contenedor).
 * @param {Object} options - Opciones de IntersectionObserver.
 * @param {boolean} once - Si es true, solo observa hasta que el elemento es visible una vez.
 * @returns {[React.RefObject, boolean]}
 */
function useOnScreen(options = {}, once = false) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const isIntersecting = entry.isIntersecting;
      setIsVisible(isIntersecting);

      // Si solo queremos una vez, dejamos de observar cuando se vea
      if (isIntersecting && once && ref.current) {
        observer.unobserve(ref.current);
      }
    }, options);

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [options, once]);

  return [ref, isVisible];
}

export { useOnScreen };
