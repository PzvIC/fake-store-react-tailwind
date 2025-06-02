import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ImgBanner } from "./components/ImgBanner";
import { NavBar } from "./components/NavBar";
import { MasonryGrid } from "./components/MasonryGrid";
import { CategoryGrid } from "./components/CategoryGrid";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { SearchGrid } from "./components/SearchGrid";
import { Contact } from "../src/pages/contact.jsx";
import { About } from "../src/pages/about.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedCategory]);

  return (
    <Router>
      <div className="app-wrapper">
        <Header
          onGoHome={() => {
            setSelectedCategory(null);
            setSearchTerm("");
          }}
          setSelectedCategory={setSelectedCategory}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />

        <NavBar
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSearchTerm("");
            setSelectedCategory(category);
          }}
        />

        <ImgBanner selectedCategory={selectedCategory} />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                searchTerm ? (
                  <SearchGrid searchTerm={searchTerm} />
                ) : (
                  <>
                    {selectedCategory === "cart" ? (
                      <Cart />
                    ) : selectedCategory === "contact" ? (
                      <Contact />
                    ) : selectedCategory === "about" ? (
                      <About />
                    ) : (
                      <>
                        {!selectedCategory && <MasonryGrid />}
                        {selectedCategory && (
                          <CategoryGrid selectedCategory={selectedCategory} />
                        )}
                      </>
                    )}
                  </>
                )
              }
            />
          </Routes>
        </main>

        <Footer
          onSelectCategory={(category) => {
            setSearchTerm("");
            setSelectedCategory(category);
          }}
        />
      </div>
    </Router>
  );
}

export default App;
