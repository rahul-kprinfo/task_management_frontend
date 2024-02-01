// import axios from "axios";
import apiInstance from "../axios";

class ProjectService {
  createProject = async (data: any) => {
    return await apiInstance.post("/create-project", data);
  };

  getProject = async (payload:any) => {
    return await apiInstance.get("/get-project", payload);
  };

  upateProject = async (data: any) => {
    return await apiInstance.post("/signin", data);
  };

  deleteProject = async (data: any) => {
    return await apiInstance.post("/signin", data);
  };

 
}

const ProjectServices = new ProjectService();

export default ProjectServices;

