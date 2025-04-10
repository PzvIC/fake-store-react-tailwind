import { useEffect, useState } from "react";

function useCategories(
  endpoint = "https://fakestoreapi.com/products/categories"
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener categorías");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
}

export { useCategories };
