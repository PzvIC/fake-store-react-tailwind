import "../styles/NavBar.css";
import { useCategories } from "../hooks/useCategories";

function NavBar({ selectedCategory, onSelectCategory }) {
  const { data: categories, loading, error } = useCategories();

  const handleClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  const renderWithSeparators = () => {
    if (!Array.isArray(categories)) return [];

    const items = [];
    categories.forEach((category, index) => {
      const isActive = selectedCategory === encodeURIComponent(category);

      items.push(
        <li key={category} className="navbar-item">
          <button
            className={`navbar-link ${isActive ? "active" : ""}`}
            onClick={() => handleClick(encodeURIComponent(category))}

          >
            {category}
          </button>
        </li>
      );

      if (index < categories.length - 1) {
        items.push(
          <li key={`sep-${index}`} className="navbar-separator" aria-hidden="true" />
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
