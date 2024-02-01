import apiInstance from "../axios";

class ProjectService {
  createProject = async (data: any) => {
    return await apiInstance.post("/create-project", data);
  };

  getProject = async (payload:any) => {
    return await apiInstance.post("/get-project", payload);
  };

  upateProject = async (data: any) => {
    return await apiInstance.post("/signin", data);
  };

  deleteProject = async (id: any) => {
    return await apiInstance.delete(`/delete-project/${id}`);
  };

 
}

const ProjectServices = new ProjectService();

export default ProjectServices;

