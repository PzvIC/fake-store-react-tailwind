import "./App.css";
import { Header } from "./components/Header";
import { ImgBanner } from "./components/ImgBanner";
import { NavBar } from "./components/NavBar";
import { MasonryGrid } from "./components/MasonryGrid";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header/>
      <NavBar/>
      <ImgBanner/>
      <MasonryGrid/>
      <Footer/>
    </>
  );
}

export default App;
