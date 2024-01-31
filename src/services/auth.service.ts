import axios from "axios";

class AuthService {
  signUp = async (data: any) => {
    return await axios.post("http://localhost:3000/register", data);
  };

  signIn = async (data: any) => {
    return await axios.post("http://localhost:3000/signin", data);
  };

 
}

const AuthServices = new AuthService();

export default AuthServices;
