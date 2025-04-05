import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./paginas/Login";
import { MenuAd } from "./paginas/MenuAd";
import { MenuUs } from "./paginas/MenuUs.jsx";
import "./estilos/main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menuus/" element={<MenuUs />} />
        <Route path="/menuad" element={<MenuAd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
