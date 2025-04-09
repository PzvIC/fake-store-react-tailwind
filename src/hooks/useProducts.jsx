import { useEffect, useState } from "react";

function useProducts(categoryId = null) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }
        return res.json();
      })
      .then((json) => {
        // 🔍 Filtrar productos sin imágenes válidas
        const productsWithImages = json.filter(
          (product) =>
            Array.isArray(product.images) &&
            product.images.length > 0 &&
            product.images[0] &&
            product.images[0].trim() !== ""
        );

        setData(productsWithImages);

        // Aplicar filtrado por categoría si se usa
        if (categoryId) {
          const filteredByCategory = productsWithImages.filter(
            (product) => product.category?.id === categoryId
          );
          setFiltered(filteredByCategory);
        } else {
          setFiltered(productsWithImages);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err);
        setLoading(false);
      });
  }, [categoryId]);

  return { data: filtered, loading, error };
}

export { useProducts };
