import { useState, useEffect } from "react";
import "../styles/CategoryGrid.css";

function CategoryGrid({ selectedCategory }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => setItems(data));
    }
  }, [selectedCategory]);

  return (
    <div className="category-grid-container">
      <div className="category-grid">
        {items.map((item) => (
          <div key={item.id} className="category-card">
            <div className="card-title-block">
              <h3 className="category-card-title">{item.title}</h3>
            </div>
            <hr className="category-separator" />
            <div className="card-image-block">
              <img
                src={item.image}
                alt={item.title}
                className="category-card-image"
              />
            </div>
            <hr className="category-separator" />
            <div className="card-price-block">
              <p className="category-card-price">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CategoryGrid };
