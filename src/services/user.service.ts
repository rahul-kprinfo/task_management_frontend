import apiInstance from "../axios";

class UserService {
  createUser = async (data: any) => {
    return await apiInstance.post("/create-user", data);
  };

  getUser = async (payload:any) => {
    return await apiInstance.post("/get-users", payload);
  };

  updateUser = async (id: any, payload:any) => {
    return await apiInstance.patch(`/update-user/${id}`, payload);
  };

  deleteUser = async (id: any) => {
    return await apiInstance.delete(`/delete-user/${id}`);
  };

 
}

const UserServices = new UserService();

export default UserServices;

