// useCategories.js
import { useEffect, useState } from "react";

function useCategories(endpoint = "https://api.escuelajs.co/api/v1/categories"
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
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
