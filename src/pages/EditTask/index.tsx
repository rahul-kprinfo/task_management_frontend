import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import CommentServices from "../../services/comment.service";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";

export default function EditTask() {
  const state = useLocation();
  const projectName = state?.state?.projectName;
  const taskName = state?.state?.taskName;
  const data = state?.state?.data;
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState<any>("");
  console.log("content", content);
  const user: any = localStorage.getItem("USER_NAME");

  const getComments = useQuery(
    ["getComments"],
    async () => {
      const payload = {
        taskId: data?.id,
      };
      return await CommentServices.getComment(data?.id);
    },
    {
      onSuccess: (res: any) => {
        setComments(res.data);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const { mutate: createComment } = useMutation<any, Error>(
    async () => {
      const payload = { taskId: data?.id, content: content };
      return await CommentServices.createComment(payload);
    },
    {
      onSuccess: (res: any) => {
        // toast.success(res?.message);
        // formik.resetForm();
        // onClose();
        // fetchData();
        // setIsEdit(false);
        getComments.refetch();
        console.log("created", res);
      },
      onError: (err: any) => {
        console.log(err);
        // toast.error(err?.response?.data?.message);
      },
    }
  );

  return (
    <div className="p-4 w-[100%]">
      <div className="mb-4">
        <div className="bg-white-500 p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 w-2 h-2 rounded-full"></div>
            <div
              onClick={() => {
                navigate("/home");
              }}
              className="text-gray-500 cursor-pointer"
            >
              Project
            </div>
            <div className="mx-2 text-gray-500 font-bold">&#62;</div>
            <h2 className="text-blue-500">{projectName}</h2>
            <div className="mx-2 text-gray-500 font-bold">&#62;</div>
            <h2 className="text-blue-500">{taskName}</h2>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-2 align-center">
          {" "}
          <input type="checkbox" defaultChecked />
          Task {data?.id}
        </div>
        <div className="flex justify-center text-lg font-bold">
          {data?.id} {data?.taskName}
        </div>

        <div className="mt-6">
          <div className="flex justify-between w-[40%]">
            <div className="text-md font-font-light text-gray-400">
              Unassigned
            </div>
            <div className="text-md font-extra-light">5 comment</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md ">
            <div className="ml-2">
              {/* <div className="text-gray-500">
                Status <span>{data?.taskStatus}</span>
              </div> */}
              <div className="text-gray-500 flex gap-6">
                <div>Status</div>
                <span>
                  <ul className="list-disc ml-4">
                    <li className="bullet">{data?.taskStatus}</li>
                  </ul>
                </span>
              </div>

              <div className="text-gray-500">Reason</div>
            </div>
          </div>
        </div>
        <div className="p-4 flex gap-4">
          <div className="flex-1" style={{ flexBasis: "80%" }}>
            <div className="text-md font-medium border-b mb-2">Discussion</div>
            <div className="">
              <div className="flex items-center">
                <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                  <span className="text-xl font-bold">{user?.charAt(0)}</span>
                </div>
                <div className="flex-grow">
                  <textarea
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    className="w-full min-h-24 border rounded-md shadow-md resize-none focus:outline-none focus:border-gray-400 focus:ring-sky-500"
                    placeholder="Write your comment here..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end">
                {content && (
                  <Button
                    onClick={() => {
                      createComment();
                    }}
                    variant="outline"
                  >
                    Save
                  </Button>
                )}
              </div>

              <div className="flex mt-2 flex-row">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                    <span className="text-xl font-bold">{user?.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  {comments.map((comment: any) => {
                    return (
                      <div
                        key={comment.id}
                        className="bg-gray-50 rounded-md p-2"
                      >
                        <div className="flex flex-row items-center gap-4">
                          <p className="text-gray-700 font-semibold text-sm">
                            {user}{" "}
                          </p>
                          <p className="text-gray-500 text-sm">3 minutes ago</p>{" "}
                        </div>
                        <p className="text-gray-700">{comment.content}</p>{" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1" style={{ flexBasis: "20%" }}>
            <div className="text-md font-medium border-b mb-2">Planning</div>

            <div className="flex flex-col">
              <div className="min-h-24 min-w-24 bg-white-100 flex items-center justify-center m-2 rounded-lg shadow-md">
                <div>
                  <div>Priority</div>
                  <div>{data?.priority}</div>
                </div>
              </div>
              <div className="min-h-24 min-w-24 bg-white-100 flex items-center justify-center m-2 rounded-lg shadow-md">
                <div>
                  <div>
                    Child Task:{" "}
                    {data?.childTaskId?.map((item: any) => {
                      return <span>{item},</span>;
                    })}
                  </div>
                  <div>
                    Parent Task: <span>{data?.parentTaskId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
