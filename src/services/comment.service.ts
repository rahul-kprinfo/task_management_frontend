import apiInstance from "../axios";

class CommentService {
  createComment = async (data: any) => {
    return await apiInstance.post("/comment/create", data);
  };

  getComment = async (taskId:any) => {
    return await apiInstance.get(`/comment/get/${taskId}`,);
  };

  deleteComment = async (id:any) => {
    return await apiInstance.delete(`/comment/delete/${id}`,);
  };

  updateComment = async (id:any, payload:any) => {
    return await apiInstance.patch(`/comment/update/${id}`,payload);
  };

  
 
}

const CommentServices = new CommentService();

export default CommentServices;

