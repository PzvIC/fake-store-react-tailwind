import { useEffect, useState } from "react";

const CATEGORIES_KEY = "categories-cache";
const CATEGORIES_TIMESTAMP_KEY = "categories-cache-timestamp";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas

function useCategories(
  endpoint = "https://fakestoreapi.com/products/categories"
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem(CATEGORIES_KEY);
    const timestamp = localStorage.getItem(CATEGORIES_TIMESTAMP_KEY);
    const now = Date.now();
    const isValid = cached && timestamp && now - Number(timestamp) < CACHE_DURATION_MS;

    if (isValid) {
      setData(JSON.parse(cached));
      setLoading(false);
    } else {
      fetch(endpoint)
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener categorías");
          return res.json();
        })
        .then((json) => {
          localStorage.setItem(CATEGORIES_KEY, JSON.stringify(json));
          localStorage.setItem(CATEGORIES_TIMESTAMP_KEY, now.toString());
          setData(json);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setError(err);
        })
        .finally(() => setLoading(false));
    }
  }, [endpoint]);

  return { data, loading, error };
}

export { useCategories };
