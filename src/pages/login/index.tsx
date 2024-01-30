import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate= useNavigate()
  const [userData, setUserData] = useState({ email: "", password: "" });
  const submitData=((e:any)=>{
    e.preventDefault()
    signIn()
  })

const signIn= async()=>{
    try {
        const response = await fetch('http://localhost:3000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        navigate("/")
        console.log('Post successful:', responseData);
      } catch (error:any) {
        // Handle errors during the fetch
        console.error('Error during POST request:', error.message);
      }

}



  return (
    <div>
      <div
      className=" bg-gray-200 w-[600px] h-[300px] flex items-center justify-between p-[30px] rounded-[10px]"
      >
        <div>
            <h3>SignIn</h3>
          <form
            action=""
            className="flex flex-col gap-[30px]"
            onSubmit={submitData}
          >
            <div style={{display:"flex",flexDirection:"column"}}>
            <label htmlFor="" className="">Email</label>
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
            <div style={{display:"flex",flexDirection:"column"}}>
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              style={{ padding: "10px", borderRadius: "5px" }}
              onChange={(e: any) => {
                const { value } = e.target;
                setUserData({ ...userData, password: value });
              }}
            />
            </div>
            <button
              type="submit"
              style={{ background: "green", width: "100px", outline: "none", color:"white" }}
            >
              Login
            </button>
          </form>
        </div>
        <div className="m-8">
          <a>Logo</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
