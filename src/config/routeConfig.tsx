import LayoutWrapper from "../layout/wrapper";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
// import { RouteItem } from "@/types/route.type";

export const routeConfig: any = [
  {
    path: "/",
    displayName: "Login",
    showInNavigate: false,
    element: <Login />,
  },

  {
    path: "/register",
    displayName: "Register",
    showInNavigate: false,
    element: <Register />,
  },
  {
    path: "/home",
    displayName: "Projects",
    showInNavigate: true,
    element: (
      <LayoutWrapper>
        <Home />
      </LayoutWrapper>
    ),
  },
];
