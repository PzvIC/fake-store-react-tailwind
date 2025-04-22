import "../styles/NavBar.css";
import { useCategories } from "../hooks/useCategories";
import { useIsMobile } from "../hooks/useIsMobile";

function NavBar({ selectedCategory, onSelectCategory }) {
  const { data: categories, loading, error } = useCategories();
  const isMobile = useIsMobile();

  const handleClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  const shortenCategory = (category) => {
    if (!isMobile) return category;
  
    const lower = category.toLowerCase();
  
    if (lower === "men's clothing") return "Men's";
    if (lower === "women's clothing") return "Women's";
  
    return category.length > 10 ? category.slice(0, 8) + "…" : category;
  };
  

  const renderWithSeparators = () => {
    if (!Array.isArray(categories)) return [];

    const items = [];
    categories.forEach((category, index) => {
      const isActive = selectedCategory === category;

      items.push(
        <li key={category} className="navbar-item">
          <button
            className={`navbar-link ${isActive ? "active" : ""}`}
            onClick={() => handleClick(category)}
          >
            {shortenCategory(category)}
          </button>
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
