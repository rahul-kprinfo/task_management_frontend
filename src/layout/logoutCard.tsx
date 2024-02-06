import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { Separator } from "../components/ui/separator";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { AlertDialogDemo } from "../components/alertBox";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

export default function LogoutCard() {
  const [alertOpen, setAlertOpen] = useState(false);
  const user = useSelector((state: any) => state.auth.user);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_NAME");
    localStorage.removeItem("EMAIL");
    navigate("/");
  };
  const alertClose = () => {
    setAlertOpen(false);
  };

  const alertConfirm = () => {
    handleLogout();
    setAlertOpen(false);
  };

  const name = localStorage.getItem("USER_NAME");
  const email = localStorage.getItem("EMAIL");

  return (
    <div>
      <HoverCard>
        <HoverCardTrigger>
          <CgProfile size={25} className="cursor-pointer" />
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="">
            <div className="flex items-center gap-2 p-2">
              <FaUser size={32} />
              <div>
                <span className="font-semibold">Name: </span>
                <span>{name}</span>
                <br />
                <span className="font-semibold">Email: </span>
                <span>{email}</span>
              </div>
            </div>
            <Separator className="" />
            <div
              onClick={() => {
                setAlertOpen(true);
              }}
              className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100"
            >
              <TbLogout2 />
              <div className="font-medium">Logout</div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <AlertDialogDemo
        open={alertOpen}
        onClose={alertClose}
        onConfirm={alertConfirm}
        title="Are you sure you want to log out?"
        desc=""
      />
    </div>
  );
}
