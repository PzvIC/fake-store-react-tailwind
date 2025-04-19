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
    <div className="app-wrapper">
      <Header
        onGoHome={() => {
          window.location.hash = "#home";
        }}
        setSelectedCategory={setSelectedCategory}
        setCurrentSection={setCurrentSection}
      />

      <NavBar
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          window.location.hash = `#${category}`;
        }}
      />

      <ImgBanner selectedCategory={selectedCategory} />

      <main className="main-content">
        {selectedCategory !== "cart" && (
          <>
            {currentSection === "home" && <MasonryGrid />}

            {selectedCategory && currentSection !== "home" && (
              <CategoryGrid selectedCategory={selectedCategory} />
            )}
          </>
        )}

        {selectedCategory === "cart" && <Cart />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
