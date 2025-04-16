import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "all-products-cache";
const TIMESTAMP_KEY = "all-products-cache-timestamp";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas

function useProducts(category = null) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(() => {
    const now = Date.now();
    setLoading(true);
    setError(null);

    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((allProducts) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
        localStorage.setItem(TIMESTAMP_KEY, now.toString());

        const validProducts = allProducts.filter(
          (product) =>
            product.image &&
            typeof product.image === "string" &&
            product.image.trim() !== ""
        );

        const filtered = category
          ? validProducts.filter((p) => p.category === category)
          : validProducts;

        setItems(filtered);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("No se pudieron cargar los productos.");
      })
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    const timestamp = localStorage.getItem(TIMESTAMP_KEY);
    const now = Date.now();

    const isValid =
      cached && timestamp && now - Number(timestamp) < CACHE_DURATION_MS;

    if (isValid) {
      const allProducts = JSON.parse(cached);
      const validProducts = allProducts.filter(
        (product) =>
          product.image &&
          typeof product.image === "string" &&
          product.image.trim() !== ""
      );

      const filtered = category
        ? validProducts.filter((p) => p.category === category)
        : validProducts;

      setItems(filtered);
      setLoading(false);
    } else {
      loadData();
    }
  }, [category, loadData]);

  return { items, loading, error, refetch: loadData };
}

export { useProducts };
