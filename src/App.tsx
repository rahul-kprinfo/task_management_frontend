import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { routeConfig } from "./config/routeConfig";

function App() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  return (
    <div>
      <Toaster richColors position="top-right" closeButton />
      <BrowserRouter>
        <Routes>
          {routeConfig.map(({ path, element }: any) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route
            path="*"
            element={token ? <Navigate to="/home" /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
