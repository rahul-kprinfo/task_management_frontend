import "./App.css";
import { BrowserRouter,RouterProvider,createBrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { routeConfig } from "./config/routeConfig";

function App() {
  const router = createBrowserRouter(routeConfig);

  // const token = localStorage.getItem("ACCESS_TOKEN");
  return (
    <div>
      <Toaster richColors position="top-right" closeButton />
      <RouterProvider router={router} />;
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<LayoutWrapper><Home /></LayoutWrapper>} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={token ? <Navigate to="/home" /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
