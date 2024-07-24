import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />

        <Route element={<Coin />} path="/coin/:coin" />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
