import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ImgBanner } from "./components/ImgBanner";
import { NavBar } from "./components/NavBar";
import { MasonryGrid } from "./components/MasonryGrid";
import { CategoryGrid } from "./components/CategoryGrid";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { SearchGrid } from "./components/SearchGrid";
import { Contact } from "./pages/contact.jsx"; // <-- Importa la nueva página Contact

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
                    {selectedCategory !== "cart" ? (
                      <>
                        {!selectedCategory && <MasonryGrid />}
                        {selectedCategory && <CategoryGrid selectedCategory={selectedCategory} />}
                      </>
                    ) : (
                      <Cart />
                    )}
                  </>
                )
              }
            />
            <Route path="/contact" element={<Contact />} /> {/* Nueva ruta */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
