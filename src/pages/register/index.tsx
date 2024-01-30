import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate= useNavigate()
  const [userData, setUserData] = useState({name:"", email: "", password: "" });
  const submitData=((e:any)=>{
    e.preventDefault()
    register()
  })

const register= async()=>{
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
        navigate("/login")
        console.log('Post successful:', responseData);
      } catch (error:any) {
        // Handle errors during the fetch
        console.error('Error during POST request:', error.message);
      }

}



  return (
    <div>
      <div
        style={{
          border: "1px solid lightgrey",
          width: "600px",
          height: "350px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px",
          background: "lightgrey",
          borderRadius:"5px"
        }}
      >
        <div>
            <h3>Register</h3>
          <form
            action=""
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
            onSubmit={submitData}
          >
             <div style={{display:"flex",flexDirection:"column"}}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              style={{ padding: "10px", borderRadius: "5px" }}
              placeholder="Email"
              onChange={(e: any) => {
                const { value } = e.target;
                setUserData({ ...userData, name: value });
              }}
            />
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              style={{ padding: "10px", borderRadius: "5px" }}
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
              Register
            </button>
          </form>
        </div>
        <div style={{ marginRight: "50px" }}>
          <img style={{height:"200px"}} src="https://i.pinimg.com/1200x/97/d1/e3/97d1e37ae0f898e03c51d446bd522ffc.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
