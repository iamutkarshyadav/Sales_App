import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddSale from "./pages/AddSale";
import Header from "./components/Header";
import TopSales from "./pages/TopSales";
import Revenue from "./pages/Revenue";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="app-bg">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route exact path="/addsale" element={<AddSale />} />
          <Route path="/top-five" element={<TopSales />} />
          <Route exact path="/revenue" element={<Revenue />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
