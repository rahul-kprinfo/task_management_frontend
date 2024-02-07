import apiInstance from "../axios";

class TaskService {
  createTask = async (data: any) => {
    return await apiInstance.post("/create-task", data);
  };

  getTask = async (payload:any) => {
    return await apiInstance.post("/get-task", payload);
  };

  getTaskById = async (id: any) => {
    return await apiInstance.get(`/get-task-by-id/${id}`);
  };

  upateTask = async (id: any, payload:any) => {
    return await apiInstance.patch(`/update-task/${id}`, payload);
  };

  deleteTask = async (id: any) => {
    return await apiInstance.delete(`/delete-task/${id}`);
  };

 
}

const TaskServices = new TaskService();

export default TaskServices;

