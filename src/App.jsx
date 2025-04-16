import "./App.css";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ImgBanner } from "./components/ImgBanner";
import { NavBar } from "./components/NavBar";
import { MasonryGrid } from "./components/MasonryGrid";
import { CategoryGrid } from "./components/CategoryGrid";
import { Footer } from "./components/Footer";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setCurrentSection(hash);

      if (hash !== "home") {
        setSelectedCategory(hash);
      } else {
        setSelectedCategory(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Header
        onGoHome={() => {
          setSelectedCategory(null);
          window.location.hash = "#home";
        }}
      />

      <NavBar
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          window.location.hash = `#${category}`;
        }}
      />

      <ImgBanner selectedCategory={selectedCategory} />

      {currentSection === "home" && <MasonryGrid />}
      {selectedCategory && currentSection !== "home" && (
        <CategoryGrid selectedCategory={selectedCategory} />
      )}

      <Footer />
    </>
  );
}

export default App;
