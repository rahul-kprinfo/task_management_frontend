import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/auth.service";

function Register() {
    const navigate= useNavigate()
  const [userData, setUserData] = useState({name:"", email: "", password: "" });
  const submitData=((e:any)=>{
    e.preventDefault()
    registerUser()
  })


const { mutate: registerUser } = useMutation<any, Error>(
  async () => {
    return await AuthServices.signUp(userData);
  },
  {
    onSuccess: (res: any) => {
      console.log("data", res)
      navigate("/login");
    },
    onError: (err: any) => {
     console.log("errr", err)
    },
  }
);



  return (
    <div>
      <div
      className=" bg-gray-200 w-[600px] h-[400px]  p-[30px] rounded-[10px]"
      >
         <div >
          <h2 className="text-center">Register</h2>
          </div>
        <div className="flex items-center justify-between">
        <div>
          <form
            action=""
            className="flex flex-col gap-[20px] "
            onSubmit={submitData}
          >
             <div className="flex flex-col" >
            <label htmlFor="" >Name</label>
            <input
              type="text"
              className="p-[10px] rounded-[5px]"
              placeholder="Name"
              onChange={(e: any) => {
                const { value } = e.target;
                setUserData({ ...userData, email: value });
              }}
            />
            </div>
            <div className="flex flex-col" >
            <label htmlFor="" >Email</label>
            <input
              type="email"
              className="p-[10px] rounded-[5px]"
              placeholder="Email"
              onChange={(e: any) => {
                const { value } = e.target;
                setUserData({ ...userData, email: value });
              }}
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="p-[10px] rounded-[5px]"
              onChange={(e: any) => {
                const { value } = e.target;
                setUserData({ ...userData, password: value });
              }}
            />
            </div>
            <input
              type="submit"
              value="Register"
              className="bg-green-500 w-[100px] h-[40px] rounded-md  text-white cursor-pointer hover:bg-green-600"
            />
          </form>
        </div>
        <div className="mr-12">
          <a>Logo</a>
        </div>
      </div>
      <div className="text-center">
      Have an account?
      {" "}<Link to="/login"><a href="">Login</a></Link>
      </div>
      </div>
    </div>
  );
}

export default Register;
