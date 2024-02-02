import { Link, useNavigate } from "react-router-dom";
import { RouteItem } from "../types/routesTypes";

interface INavbarProps {
  routes: RouteItem[];
}
export default function CustomNavbar(props: INavbarProps) {
  const { routes } = props;
  const currentPath = window.location.pathname;
  const navLinks = routes.map((item, index) => {
    const isCurrentPath = currentPath.includes(item.path);
    const currentPathStyle =
      "bg-primary text-primary-foreground shadow hover:bg-primary/90";
    const defaultNavItemStyle = "hover:bg-accent hover:text-accent-foreground";
    return item.showInNavigate ? (
      <Link
        key={index}
        className={`inline-flex items-center gap-3 rounded-sm text-sm whitespace-nowrap px-4 py-2 ${
          isCurrentPath ? currentPathStyle : defaultNavItemStyle
        }`}
        to={item.path}
      >
        {/* {item.icon} */}
        {item.displayName}
      </Link>
    ) : null;
  });
  return (
    <div className="h-screen">
      {/* <div className="py-6 mb-2">
        <h1 className="text-center text-2xl font-extrabold">Task Management</h1>
      </div> */}
      <div className="flex flex-col gap-y-0.5 p-2">{navLinks}</div>
    </div>
  );
}
