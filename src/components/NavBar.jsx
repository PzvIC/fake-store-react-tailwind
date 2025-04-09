import "../styles/NavBar.css";
import { useCategories } from "../hooks/useCategories";

function NavBar() {
    const {
        data: categories,
        loading,
        error,
    } = useCategories("https://api.escuelajs.co/api/v1/categories");


    const renderWithSeparators = () => {
        if (!Array.isArray(categories)) return [];
      
        const items = [];
        categories.forEach((category, index) => {
          items.push(
            <li key={category.id || category.name} className="navbar-item">
              <a href={`#${category.name}`} className="navbar-link">
                {category.name}
              </a>
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
