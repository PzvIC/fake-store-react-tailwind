import { useEffect, useState } from "react";

function useProducts(category = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define la URL según si se quiere filtrar por categoría
    const url = category
      ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
      : "https://fakestoreapi.com/products";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((json) => {
        // Algunos productos podrían tener imágenes vacías o inválidas
        const productsWithImages = json.filter(
          (product) =>
            product.image &&
            typeof product.image === "string" &&
            product.image.trim() !== ""
        );

        setData(productsWithImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err);
        setLoading(false);
      });
  }, [category]);

  return { data, loading, error };
}

export { useProducts };
