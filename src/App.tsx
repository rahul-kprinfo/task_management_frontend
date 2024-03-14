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
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { routeConfig } from "./config/routeConfig";
import DuplicatePage from "./pages/DuplicatePage";
import io from "socket.io-client";
// const socket = io("http://localhost:3000");

function App() {
  const SESSION_TAB_KEY = "uniqueTabIdentifier";
  const SESSION_IS_DUPLICATE = "isDuplicate";
  const SESSION_TAB_COUNT = "tabCount"; // Add tab count key
  const [isDuplicate, setIsDuplicate] = useState<any>(false);
  const token = localStorage.getItem("ACCESS_TOKEN");

  const navigate = useNavigate();

  const socket = io("http://localhost:3000", {
    auth: {
      token: token, // Include the authentication token here
    },
  });

  socket.on("connect", () => {
    console.log("Connected to the server");
  });

  // Event listener for handling errors
  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });

  useEffect(() => {
    // Increase tab count when component mounts
    let tabCount = localStorage.getItem(SESSION_TAB_COUNT);
    if (!tabCount) {
      tabCount = "1";
    } else {
      tabCount = String(parseInt(tabCount) + 1);
    }
    localStorage.setItem(SESSION_TAB_COUNT, tabCount);

    const checkDuplicateTab = () => {
      const sessionUniqueTabId = sessionStorage.getItem(SESSION_TAB_KEY);
      if (!sessionUniqueTabId) {
        const newUniqueTabId = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem(SESSION_TAB_KEY, newUniqueTabId);
      } else {
        setIsDuplicate(true);
        sessionStorage.setItem(SESSION_IS_DUPLICATE, "true");
        navigate("/duplicate");
      }
    };

    checkDuplicateTab();

    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem(SESSION_TAB_KEY);
      // sessionStorage.removeItem(SESSION_IS_DUPLICATE);
      // Decrease tab count when component unmounts (tab is closed)
      let tabCount: any = localStorage.getItem(SESSION_TAB_COUNT);
      if (tabCount) {
        tabCount = Math.max(parseInt(tabCount) - 1, 0); // Ensure tab count doesn't go below 0
        localStorage.setItem(SESSION_TAB_COUNT, String(tabCount));
      }
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        sessionStorage.removeItem(SESSION_TAB_KEY);
        // sessionStorage.removeItem(SESSION_IS_DUPLICATE);
      });
    };
  }, []);

  const isdup = sessionStorage.getItem(SESSION_IS_DUPLICATE);

  useEffect(() => {
    if (isdup && isDuplicate) {
      // sessionStorage.removeItem(SESSION_TAB_KEY);
      navigate("/duplicate");
      // sessionStorage.removeItem(SESSION_IS_DUPLICATE);
    }
  }, [isdup]);

  let tabCount: any = localStorage.getItem(SESSION_TAB_COUNT);
  useEffect(() => {
    if (parseInt(tabCount) === 1) {
      // sessionStorage.removeItem(SESSION_TAB_KEY);
      // sessionStorage.removeItem(SESSION_IS_DUPLICATE);
      sessionStorage.setItem(SESSION_IS_DUPLICATE, "false");
      // navigate("/");
    }
  }, []);

  return (
    <div>
      <Toaster richColors position="top-right" closeButton />
      <Routes>
        {routeConfig.map(({ path, element }: any) => (
          <Route key={path} path={path} element={element} />
        ))}
        {isDuplicate && isdup ? (
          <Route path="/duplicate" element={<DuplicatePage />} />
        ) : null}

        <Route
          path="*"
          element={token ? <Navigate to="/home" /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
