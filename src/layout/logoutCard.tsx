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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import AuthServices from "../services/auth.service";
import { useMutation } from "react-query";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function LogoutCard() {
  const [alertOpen, setAlertOpen] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  const userId = localStorage.getItem("USER_ID");

  const { mutate: Logout } = useMutation<any, Error>(
    async (payload: any) => {
      return await AuthServices.logout({ userId: userId });
    },
    {
      onSuccess: (res: any) => {
        handleLogout();
      },
      onError: (err: any) => {},
    }
  );

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_NAME");
    localStorage.removeItem("EMAIL");
    localStorage.removeItem("USER_ID");
    navigate("/");
  };
  const alertClose = () => {
    setAlertOpen(false);
  };

  const alertConfirm = () => {
    Logout();
    setAlertOpen(false);
  };

  const name = localStorage.getItem("USER_NAME");
  const email = localStorage.getItem("EMAIL");

  useEffect(() => {
    socket.on("logout", () => {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("USER_NAME");
      localStorage.removeItem("EMAIL");
      // localStorage.removeItem("SessionId");
      // localStorage.removeItem("USER_ID");

      navigate("/");
    });

    return () => {
      socket.off("logout");
    };
  }, []);

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
