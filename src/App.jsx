import "./App.css";
import { Header } from "./components/Header";
import { ImgBanner } from "./components/ImgBanner";
import { NavBar } from "./components/NavBar";
import { MasonryGrid } from "./components/MasonryGrid";

function App() {
  return (
    <>
      <Header/>
      <NavBar/>
      <ImgBanner/>
      <MasonryGrid/>
    </>
  );
}

export default App;
