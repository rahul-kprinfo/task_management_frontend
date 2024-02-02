import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import LogoutCard from "./logoutCard";

export const Navbar1 = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_NAME");
    navigate("/");
  };
  return (
    <nav className=" h-[70px] shadow-md py-6 mb-2">
      <div className="flex justify-between mr-12 ml-4 items-center">
        <h1 className="text-center text-2xl font-extrabold">Task Management</h1>
        <LogoutCard />
      </div>
    </nav>
  );
};
