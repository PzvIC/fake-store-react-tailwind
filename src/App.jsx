import "./App.css";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ImgBanner } from "./components/ImgBanner";
import { NavBar } from "./components/NavBar";
import { MasonryGrid } from "./components/MasonryGrid";
import { CategoryGrid } from "./components/CategoryGrid";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { SearchGrid } from "./components/SearchGrid";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentSection, setCurrentSection] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setSelectedCategory("search");
      setCurrentSection("search");
      window.location.hash = "#search";
    } else if (selectedCategory === "search") {
      setSelectedCategory(null);
      setCurrentSection("home");
      window.location.hash = "#home";
    }
  }, [searchTerm]);

  return (
    <div className="app-wrapper">
      <Header
        onGoHome={() => {
          window.location.hash = "#home";
          setSearchTerm("");
        }}
        setSelectedCategory={setSelectedCategory}
        setCurrentSection={setCurrentSection}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />

      <NavBar
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSearchTerm("");
          setSelectedCategory(category);
          setCurrentSection(category);
          window.location.hash = `#${category}`;
        }}
      />

      <ImgBanner selectedCategory={selectedCategory} />

      <main className="main-content">
        {searchTerm ? (
          <SearchGrid searchTerm={searchTerm} />
        ) : (
          <>
            {selectedCategory !== "cart" && (
              <>
                {currentSection === "home" && <MasonryGrid />}

                {selectedCategory && currentSection !== "home" && (
                  <CategoryGrid selectedCategory={selectedCategory} />
                )}
              </>
            )}

            {selectedCategory === "cart" && <Cart />}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
