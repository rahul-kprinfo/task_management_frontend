import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import CommentServices from "../../services/comment.service";
import { useMutation, useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import CustomSelect from "../../components/customSelect";
import UCustomSelect from "../../components/userCustomSelect";
import UserServices from "../../services/user.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "../../components/ui/label";
import TaskServices from "../../services/task.service";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "sonner";
import { colorMap } from "./constant";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditTask() {
  const state = useLocation();
  const projectName = state?.state?.projectName;
  const projectId = state?.state?.projectId;
  const taskName = state?.state?.taskName;
  const data = state?.state?.data;
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState<any>("");
  const [users, setUser] = useState([]);
  const [taskOption, setTaskOption] = useState<any>([]);
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user: any = localStorage.getItem("USER_NAME");
  const [openDropdownId, setOpenDropdownId] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [value, setValue] = useState("");

  const toggleDropdown = (id: any) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const calculateTimeFromNow = (createdAt: any) => {
    const createdAtDate: any = new Date(createdAt);
    const now: any = new Date();
    const timeDiffInMilliseconds = now - createdAtDate;

    const millisecondsInMinute = 1000 * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInWeek = millisecondsInDay * 7;
    const millisecondsInMonth = millisecondsInDay * 30;

    if (timeDiffInMilliseconds < millisecondsInMinute) {
      return "Just now";
    } else if (timeDiffInMilliseconds < millisecondsInHour) {
      const minutes = Math.floor(timeDiffInMilliseconds / millisecondsInMinute);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (timeDiffInMilliseconds < millisecondsInDay) {
      const hours = Math.floor(timeDiffInMilliseconds / millisecondsInHour);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (timeDiffInMilliseconds < millisecondsInWeek) {
      const days = Math.floor(timeDiffInMilliseconds / millisecondsInDay);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (timeDiffInMilliseconds < millisecondsInMonth) {
      const weeks = Math.floor(timeDiffInMilliseconds / millisecondsInWeek);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      const months = Math.floor(timeDiffInMilliseconds / millisecondsInMonth);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }
  };

  const getBackgroundColor = (letter: any) => {
    const upperCaseLetter = letter.toUpperCase();
    if (colorMap.hasOwnProperty(upperCaseLetter)) {
      return colorMap[upperCaseLetter];
    } else {
      return "bg-gray-500";
    }
  };

  const formik: any = useFormik({
    initialValues: {
      taskName: "",
      user: "",
      projectUserId: "",
      estimation: "",
      description: "",
      priority: "",
      projectId: projectId,
      parentTaskId: 0,
      taskStatus: "",
      childTaskId: [],
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Task Name is required"),
      user: Yup.string().required("User Name is required"),
      estimation: Yup.string().required("Estimation is required"),
      description: Yup.string().required("Description is required"),
      priority: Yup.string().required("Priority is required"),
      taskStatus: Yup.string().required("Priority is required"),
    }),
    onSubmit: (values: any) => {
      updateTask(values);
    },
  });

  useEffect(() => {
    formik.setValues({
      taskName: data?.taskName || "",
      user: data?.user || "",
      estimation: data?.estimation || "",
      description: data?.description || "",
      priority: data?.priority || "",
      projectId: projectId,
      projectUserId: data?.projectUserId || "",
      parentTaskId: data?.parentTaskId || 0,
      taskStatus: data?.taskStatus || "",
      childTaskId: data?.childTaskId || [],
    });
  }, []);

  const { mutate: updateTask } = useMutation<any, Error>(
    async (payload: any) => {
      return await TaskServices.upateTask(data?.id, payload);
    },
    {
      onSuccess: (res: any) => {
        // toast.success(res?.message);
        // window.history.back();
        // formik.resetForm();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

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
        const sortComment = res?.data.sort((a: any, b: any) => {
          return b.id - a.id;
        });
        setComments(sortComment);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const getUserData = useQuery(
    ["getUserss"],
    async () => {
      const payload = {
        skip: 0,
        limit: 100,
        projectId: projectId,
      };
      return await UserServices.getUser(payload);
    },
    {
      onSuccess: (res: any) => {
        const resArr = res?.data?.map((val: any) => {
          return {
            id: val.id,
            label: val.name,
            value: val.name,
          };
        });
        setUser(resArr);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const { mutate: createComment } = useMutation<any, Error>(
    async () => {
      const payload = { taskId: data?.id, content: content, userName: user };
      return await CommentServices.createComment(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        setContent("");
        getComments.refetch();

        console.log("created", res);
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  const getTaskData = useQuery(
    ["getTasksId"],
    async () => {
      const payload = {
        skip: 0,
        limit: 100,
        projectId: projectId,
      };
      return await TaskServices.getTask(payload);
    },
    {
      onSuccess: (res: any) => {
        const modiFiedData = res?.data?.map((i: any) => {
          return {
            label: i?.taskName,
            value: i?.taskName,
            id: i.id,
          };
        });
        const removeCurrTask = modiFiedData?.filter((item: any) => {
          return item?.id !== data?.id;
        });
        setTaskOption(removeCurrTask);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const taskStatusOption = [
    {
      value: "Backlog",
      label: "Backlog",
    },
    {
      value: "Todo",
      label: "Todo",
    },
    {
      value: "In Progress",
      label: "In Progress",
    },
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Canceled",
      label: "Canceled",
    },
  ];

  const priorityOptions = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  const { mutate: updateComment } = useMutation<any, Error>(
    async (id: any) => {
      const payload = { content: content, userName: user };
      return await CommentServices.updateComment(id, payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        setContent("");
        getComments.refetch();
        setIsUpdate(false);

        // console.log("created", res);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
        setIsUpdate(false);
        setContent("");

        console.log(err);
      },
    }
  );

  const { mutate: deleteComment } = useMutation<any, Error>(
    async (id: any) => {
      return await CommentServices.deleteComment(id, user);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        setContent("");
        getComments.refetch();

        // console.log("created", res);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const initialValue: any = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

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
            <h2
              onClick={() => {
                window.history.back();
              }}
              className="text-blue-500 cursor-pointer"
            >
              {projectName}
            </h2>
            <div className="mx-2 text-gray-500 font-bold">&#62;</div>
            <h2 className="text-blue-500">{taskName}</h2>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            {" "}
            <input type="checkbox" defaultChecked disabled />
            Task {data?.id}
          </div>
          <div className="text-lg font-bold">{formik?.values.taskName}</div>
        </div>
        <div className="p-2">
          Description: <span>{formik?.values.description}</span>
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <div className="text-md font-font-light text-gray-400">
                Assignee
              </div>
              <span>
                {" "}
                <UCustomSelect
                  defaultVal={formik?.values?.user}
                  options={users}
                  customOnChange={(e: any) => {
                    formik.setFieldValue("user", e?.value);
                    formik.setFieldValue("projectUserId", e?.id);
                    formik.handleSubmit();
                  }}
                  styles={""}
                  placeholder="Select User"
                />
              </span>
            </div>

            <div className="text-gray-500 flex gap-6 flex items-center">
              <div>Status</div>
              <span>
                <CustomSelect
                  defaultVal={formik?.values.taskStatus}
                  options={taskStatusOption}
                  customOnChange={(e: any) => {
                    formik.setFieldValue("taskStatus", e);
                    formik.handleSubmit();
                  }}
                  styles={""}
                  placeholder="Select Status"
                />
              </span>
            </div>
            <div className="text-md font-extra-light t">
              {comments?.length} comment
            </div>
          </div>
        </div>
        <div className="p-4 flex gap-4">
          <div className="flex-1" style={{ flexBasis: "80%" }}>
            <div className="text-md font-medium border-b p-2">Discussion</div>
            <div className="">
              <div className="flex items-center">
                <div
                  className={`h-8 w-8 flex items-center justify-center rounded-full mr-4 ${getBackgroundColor(
                    user.charAt(0)
                  )}`}
                >
                  <span className="text-xl font-bold">{user?.charAt(0)}</span>
                </div>
                <div className="flex-grow p-2">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={(e) => setContent(e)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                {content && (
                  <Button
                    onClick={() => {
                      {
                        isUpdate
                          ? updateComment(openDropdownId)
                          : createComment();
                      }
                    }}
                    variant="outline"
                  >
                    {isUpdate ? "Update" : "Save"}
                  </Button>
                )}
              </div>
              <div className="overflow-y-auto max-h-80">
                {comments.map((comment: any) => {
                  return (
                    <div key={comment.id} className="flex mt-2 flex-row">
                      <div className="flex items-center mb-2">
                        <div
                          className={`h-8 w-8 flex items-center justify-center rounded-full mr-4 ${getBackgroundColor(
                            comment?.userName.charAt(0)
                          )}`}
                        >
                          <span className="text-xl font-bold">
                            {comment?.userName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      {/* <div className="flex-grow relative">
                        <div className="bg-gray-50 rounded-md p-2">
                          <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                              <p className="text-gray-700 font-semibold text-sm">
                                {comment?.userName}{" "}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {calculateTimeFromNow(comment.createdAt)}
                              </p>{" "}
                            </div>
                            <div className="relative inline-block text-left">
                              <button
                                type="button"
                                className="inline-flex flex-col justify-between w-8 h-4 rounded-full "
                                id="dropdownMenuButton"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={() => {
                                  setIsOpen(true);
                                }}
                              >
                                <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
                                <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
                                <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
                              </button>

                              {isOpen && (
                                <div className="absolute z-10 right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
                                  <button
                                    // onClick={handleUpdate}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Update
                                  </button>
                                  <button
                                    // onClick={handleDelete}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>{" "}
                        </div>
                      </div> */}

                      <div className="flex-grow relative" ref={dropdownRef}>
                        <div className="bg-gray-50 rounded-md p-2">
                          <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                              <p className="text-gray-700 font-semibold text-sm">
                                {comment?.userName}{" "}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {calculateTimeFromNow(comment.createdAt)}
                              </p>{" "}
                            </div>
                            <div className="relative inline-block text-left">
                              <button
                                type="button"
                                className="inline-flex flex-col justify-between w-8 h-4 rounded-full "
                                id={`dropdownMenuButton_${comment.id}`}
                                aria-expanded={openDropdownId === comment.id}
                                aria-haspopup="true"
                                onClick={() => toggleDropdown(comment.id)}
                              >
                                <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
                                <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
                                <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
                              </button>
                              {openDropdownId === comment.id && (
                                <div className="absolute z-10 right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
                                  <button
                                    onClick={(e) => {
                                      setContent(comment?.content);
                                      setIsUpdate(true);
                                      // console.log("comment", comment);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      deleteComment(openDropdownId);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          {/* <p className="text-gray-700">{comment.content}</p>{" "} */}
                          <p
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: comment.content,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex-1" style={{ flexBasis: "20%" }}>
            <div className="text-md font-medium border-b p-2">Planning</div>

            <div className="flex flex-col">
              <div className="min-h-24 min-w-24 bg-white-100 p-2  m-2 rounded-lg shadow-md">
                <div>
                  <Label htmlFor="name" className="text-right">
                    Priority
                  </Label>
                  <CustomSelect
                    defaultVal={formik?.values.priority}
                    options={priorityOptions}
                    customOnChange={(e: any) => {
                      formik.setFieldValue("priority", e);
                      formik.handleSubmit();
                    }}
                    styles={""}
                    placeholder="Select Priority"
                  />
                </div>
              </div>
              <div className="min-h-[200px] min-w-24 bg-white-100  p-2  justify-center m-2 rounded-lg shadow-md">
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="">
                      <Label htmlFor="user" className="text-right">
                        Select Parent Task
                      </Label>
                      <UCustomSelect
                        options={taskOption}
                        customOnChange={(e: any) => {
                          formik.setFieldValue("parentTaskId", e?.id);
                          formik.handleSubmit();
                        }}
                        defaultVal={
                          taskOption.find(
                            (task: any) =>
                              task.id === formik?.values?.parentTaskId
                          )?.value
                        }
                        styles={""}
                        placeholder="Select Parent Task"
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label htmlFor="user" className="">
                      Select Child Task
                    </Label>
                    <Autocomplete
                      disablePortal
                      size="small"
                      value={formik?.values?.childTaskId.map(
                        (taskId: string) => {
                          return taskOption.find(
                            (task: any) => task.id === taskId
                          );
                        }
                      )}
                      multiple
                      onChange={(e: any, value: any) => {
                        const selectedIds = value?.map((item: any) => item.id);
                        formik.setFieldValue("childTaskId", selectedIds);
                        formik.handleSubmit();
                      }}
                      id="combo-box-demo"
                      options={taskOption}
                      getOptionLabel={(option) => option?.value}
                      sx={{ width: "full" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={
                            <div className="text-sm text-black">Select</div>
                          }
                        />
                      )}
                    />
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
