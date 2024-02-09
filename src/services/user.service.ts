import apiInstance from "../axios";

class UserService {
  createUser = async (data: any) => {
    return await apiInstance.post("/user/create", data);
  };

  getUser = async (payload:any) => {
    return await apiInstance.post("/user/get", payload);
  };

  updateUser = async (id: any, payload:any) => {
    return await apiInstance.patch(`/user/update/${id}`, payload);
  };

  deleteUser = async (id: any) => {
    return await apiInstance.delete(`/user/delete/${id}`);
  };

 
}

const UserServices = new UserService();

export default UserServices;

