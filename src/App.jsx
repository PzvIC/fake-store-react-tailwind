import "./App.css";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ImgBanner } from "./components/ImgBanner";
import { NavBar } from "./components/NavBar";
import { MasonryGrid } from "./components/MasonryGrid";
import { CategoryGrid } from "./components/CategoryGrid";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentSection, setCurrentSection] = useState("home");

  const handleToggleCart = () => {
    const newCategory = selectedCategory === "cart" ? null : "cart";
    setSelectedCategory(newCategory);
    setCurrentSection(newCategory === "cart" ? "cart" : "home");
    window.location.hash = newCategory === "cart" ? "#cart" : "#home";
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash =
        decodeURIComponent(window.location.hash.replace("#", "")) || "home";
      setCurrentSection(hash);

      if (hash !== "home" && hash !== selectedCategory) {
        setSelectedCategory(hash);
      } else if (hash === "home" && selectedCategory !== null) {
        setSelectedCategory(null);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [selectedCategory]);

  return (
    <>
      <Header
        onGoHome={() => {
          window.location.hash = "#home";
        }}
        onToggleCart={handleToggleCart}
      />

      <NavBar
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          window.location.hash = `#${category}`;
        }}
      />

      {selectedCategory !== "cart" && (
        <>
          <ImgBanner selectedCategory={selectedCategory} />

          {currentSection === "home" && <MasonryGrid />}
          
          {selectedCategory && currentSection !== "home" && (
            <CategoryGrid selectedCategory={selectedCategory} />
          )}
        </>
      )}

      {selectedCategory === "cart" && <Cart />}

      <Footer />
    </>
  );
}

export default App;
