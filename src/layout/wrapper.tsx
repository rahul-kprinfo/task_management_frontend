import { useEffect } from "react";
import CustomNavbar from "./navbar";
import { routeConfig } from "../config/routeConfig";
import { useNavigate } from "react-router-dom";
import { Navbar1 } from "./navbar1";

interface ILayoutProps {
  children: JSX.Element;
}
export default function LayoutWrapper({ children }: ILayoutProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem("ACCESS_TOKEN");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex flex-row ">
      <nav className="basis-72 border h-sceen">
        <CustomNavbar
           routes={routeConfig.filter((route:any) => route.showInNavigate)}
        />  
      </nav>
     <div className="basis-full">
      <Navbar1/>
      <div className="flex w-full h-full overflow-y-auto">{children}</div>
      </div>  
      </div>
  );
}
