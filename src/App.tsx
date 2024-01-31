import Login from "./pages/login";
import "./App.css";
import Home from "./pages/home";
import Register from "./pages/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
function App() {
  return (
    <div>
      <Toaster richColors position="top-right" closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
