import Login from "./pages/login";
import "./App.css";
import Home from "./pages/home";
import Register from "./pages/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="main">
      <BrowserRouter >
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
