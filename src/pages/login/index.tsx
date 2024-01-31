import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthServices from "../../services/auth.service";
import { useMutation } from "react-query";

function Login() {
    const navigate= useNavigate()
  const [userData, setUserData] = useState({ email: "", password: "" });
  const submitData=((e:any)=>{
    e.preventDefault()
    Login()
  })

  const { mutate: Login } = useMutation<any, Error>(
    async () => {
      return await AuthServices.signIn(userData);
    },
    {
      onSuccess: (res: any) => {
        console.log("data", res)
        navigate("/");
      },
      onError: (err: any) => {
       console.log("errr", err)
      },
    }
  );
  




  return (
    <div>
      <div
      className=" bg-gray-200 w-[600px] min-h-80  p-[30px] rounded-[10px]"
      >
         <div >
          <h2 className="text-center">Login</h2>
          </div>
        <div className="flex items-center justify-between">
        <div>
          <form
            action=""
            className="flex flex-col gap-[30px] "
            onSubmit={submitData}
          >
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
              value="Login"
              className="bg-green-500 w-[100px] h-[40px] rounded-md text-white cursor-pointer hover:bg-green-600"
            />
          </form>
        </div>
        <div className="mr-12">
          <a>Logo</a>
        </div>
      </div>
      <div className="text-center">
      Don't have an account?
      {" "}<Link to="/register"><a href="">Register Now</a></Link>
      </div>
      </div>
    </div>
  );
}

export default Login;
