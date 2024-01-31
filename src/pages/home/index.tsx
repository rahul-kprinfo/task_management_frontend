import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";


export default function Home() {
  const token = localStorage.getItem("ACCESS_TOKEN");
const navigate= useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_NAME");
    navigate("/");
  };



  useEffect(()=>{
   if(!token){
    navigate("/")
   }
  },[token])
  return (

    <div className="flex justify-between m-[20px] ">
      Home Page
      <div>
        <Button onClick={()=>handleLogout()} className="bg-green-500 rounded-md" variant="outline">Logout</Button>
      </div>
    </div>
  )
}
