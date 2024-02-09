import apiInstance from "../axios";

class ProjectService {
  createProject = async (data: any) => {
    return await apiInstance.post("/project/create", data);
  };

  getProject = async (payload:any) => {
    return await apiInstance.post("/project/get", payload);
  };

  upateProject = async (id: any, payload:any) => {
    return await apiInstance.patch(`/project/update/${id}`, payload);
  };

  deleteProject = async (id: any) => {
    return await apiInstance.delete(`/project/delete/${id}`);
  };

 
}

const ProjectServices = new ProjectService();

export default ProjectServices;

