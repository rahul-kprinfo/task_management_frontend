// import "./App.css";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { Toaster } from "sonner";
// import { routeConfig } from "./config/routeConfig";

// function App() {
//   const token = localStorage.getItem("ACCESS_TOKEN");
//   return (
//     <div>
//       <Toaster richColors position="top-right" closeButton />
//       <BrowserRouter>
//         <Routes>
//           {routeConfig.map(({ path, element }: any) => (
//             <Route key={path} path={path} element={element} />
//           ))}
//           <Route
//             path="*"
//             element={token ? <Navigate to="/home" /> : <Navigate to="/" />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { routeConfig } from "./config/routeConfig";

const TAB_KEY = "uniqueTabIdentifier";

function App() {
  const navigate = useNavigate();

  const generateUniqueTabId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const checkDuplicateTab = () => {
    const uniqueTabId = localStorage.getItem(TAB_KEY);
    if (!uniqueTabId) {
      const newUniqueTabId = generateUniqueTabId();
      localStorage.setItem(TAB_KEY, newUniqueTabId);
    } else {
      navigate("/duplicate");
    }
  };

  const removeTab = () => {
    localStorage.removeItem(TAB_KEY);
  };

  useEffect(() => {
    checkDuplicateTab();

    window.addEventListener("unload", removeTab);

    return () => {
      removeTab();
      window.removeEventListener("unload", removeTab);
    };
  }, []);

  const token = localStorage.getItem("ACCESS_TOKEN");
  return (
    <div>
      <Toaster richColors position="top-right" closeButton />

      <Routes>
        {routeConfig.map(({ path, element }: any) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route
          path="*"
          element={token ? <Navigate to="/home" /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
