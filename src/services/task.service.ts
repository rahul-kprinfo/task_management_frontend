import apiInstance from "../axios";

class TaskService {
  createTask = async (data: any) => {
    return await apiInstance.post("/task/create", data);
  };

  getTask = async (payload:any) => {
    return await apiInstance.post("task/get", payload);
  };

  getTaskById = async (id: any) => {
    return await apiInstance.get(`/task/get-one/${id}`);
  };

  upateTask = async (id: any, payload:any) => {
    return await apiInstance.patch(`/task/update/${id}`, payload);
  };

  deleteTask = async (id: any) => {
    return await apiInstance.delete(`/task/delete/${id}`);
  };

 
}

const TaskServices = new TaskService();

export default TaskServices;

