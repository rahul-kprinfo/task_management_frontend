import apiInstance from "../axios";

class ProjectService {
  createProject = async (data: any) => {
    return await apiInstance.post("/create-project", data);
  };

  getProject = async (payload:any) => {
    return await apiInstance.post("/get-project", payload);
  };

  upateProject = async (id: any, payload:any) => {
    return await apiInstance.patch(`/update-project/${id}`, payload);
  };

  deleteProject = async (id: any) => {
    return await apiInstance.delete(`/delete-project/${id}`);
  };

 
}

const ProjectServices = new ProjectService();

export default ProjectServices;

