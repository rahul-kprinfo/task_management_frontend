import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";


export const Navbar1 = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const navigate= useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_NAME");
    navigate("/");
  };
  return <nav className=" h-[82px] border-b py-6 mb-2">
    <div className="text-end p-4">
        <Button variant="ghost" onClick={()=>{handleLogout()}}>Logout</Button>
    </div>
  </nav>;
};
