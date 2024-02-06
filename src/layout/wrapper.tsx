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
    <div>
      <Navbar1 />
      <div className="flex mt-0 pt-0">
        <nav className="basis-72 shadow-[rgba(0.5,0,0,0.5)_0px_4px_8px_0px] h-screen mt-0 pt-0">
          <CustomNavbar
            routes={routeConfig.filter((route: any) => route.showInNavigate)}
          />
        </nav>
        <div className="flex w-full h-full overflow-y-auto">{children}</div>
        {/* <div className="basis-full">
        <Navbar1 />
        </div> */}
      </div>
    </div>
  );
}
