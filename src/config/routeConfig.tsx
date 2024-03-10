import LayoutWrapper from "../layout/wrapper";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import TaskManagement from "../pages/taskManagement";
import ForgotEmail from "../pages/ForgotPassword/EnterEmail";
import ConfirmPassword from "../pages/ForgotPassword/ConfirmPassword";
import DuplicatePage from "../pages/DuplicatePage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
    path: "/forgot-password",
    displayName: "Forgot Password",
    showInNavigate: false,
    element: <ForgotEmail />,
  },
  {
    path: "/confirm-password",
    displayName: "Confirm Password",
    showInNavigate: false,
    element: <ConfirmPassword />,
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
  {
    path: "/taskmanagement",
    displayName: "Task",
    showInNavigate: false,
    element: (
      <LayoutWrapper>
        <TaskManagement />
      </LayoutWrapper>
    ),
  },
  {
    path: "/duplicate",
    displayName: "DP",
    showInNavigate: false,
    element: (
      // <LayoutWrapper>
      <DuplicatePage />
      // </LayoutWrapper>
    ),
  },
];
