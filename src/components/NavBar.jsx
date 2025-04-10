import "../styles/NavBar.css";
import { useCategories } from "../hooks/useCategories";

function NavBar() {
  const {
    data: categories,
    loading,
    error,
  } = useCategories(); // sin necesidad de pasar endpoint

  const renderWithSeparators = () => {
    if (!Array.isArray(categories)) return [];

    const items = [];
    categories.forEach((category, index) => {
      items.push(
        <li key={category} className="navbar-item">
          <a href={`#${category}`} className="navbar-link capitalize">
            {category}
          </a>
        </li>
      );

      if (index < categories.length - 1) {
        items.push(
          <li
            key={`sep-${index}`}
            className="navbar-separator"
            aria-hidden="true"
          />
        );
      }
    });
    return items;
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {loading && <li className="navbar-item">Loading...</li>}
        {error && <li className="navbar-item">Error loading categories</li>}
        {!loading && !error && renderWithSeparators()}
      </ul>
    </nav>
  );
}

export { NavBar };
