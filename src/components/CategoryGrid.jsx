import { useState, useEffect } from "react";
import "../styles/CategoryGrid.css";

function CategoryGrid({ selectedCategory }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then(res => res.json())
        .then(data => setItems(data));
    }
  }, [selectedCategory]);

  return (
    <div className="category-grid-container">
      <div className="category-grid">
        {items.map(item => (
          <div key={item.id} className="category-card">
            <img
              src={item.image}
              alt={item.title}
              className="category-card-image"
            />
            <h3 className="category-card-title">{item.title}</h3>
            <p className="category-card-price">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CategoryGrid };
