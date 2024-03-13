// import axios from "axios";
import apiInstance from "../axios";

class AuthService {
  signUp = async (data: any) => {
    return await apiInstance.post("/register", data);
  };

  signIn = async (data: any) => {
    return await apiInstance.post("/signin", data);
  };
  logout = async (userId:any) => {
    return await apiInstance.post("/logout", userId);
  };

  getSession = async (data: any) => {
    return await apiInstance.post("/getSession", data);
  };

  verifyEmail = async (data: any) => {
    return await apiInstance.post("/verifyEmail", data);
  };
  forgotPassword = async (data: any) => {
    return await apiInstance.patch("/forgotPassword", data);
  };
 
}

const AuthServices = new AuthService();

export default AuthServices;
