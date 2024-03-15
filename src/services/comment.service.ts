import apiInstance from "../axios";

class CommentService {
  createComment = async (data: any) => {
    return await apiInstance.post("/comment/create", data);
  };

  getComment = async (taskId:any) => {
    return await apiInstance.get(`/comment/get/${taskId}`,);
  };

  
 
}

const CommentServices = new CommentService();

export default CommentServices;

