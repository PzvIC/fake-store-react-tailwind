import { useProducts } from "../hooks/useProducts";
import "../styles/SearchGrid.css";

function SearchGrid({ searchTerm }) {
  const { items, loading, error } = useProducts();

  const filteredItems = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="p-4">Cargando productos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (filteredItems.length === 0)
    return <p className="p-4 text-gray-600">No se encontraron productos.</p>;

  return (
    <div className="search-grid-container">
      {filteredItems.map((product) => (
        <div key={product.id} className="search-grid-item">
          <img src={product.image} alt={product.title} className="search-grid-image" />
          <h3 className="search-grid-title">{product.title}</h3>
          <p className="search-grid-price">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export { SearchGrid };
