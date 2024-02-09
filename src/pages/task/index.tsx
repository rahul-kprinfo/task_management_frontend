import { useState } from "react";
import { Button } from "../../components/ui/button";
import { DataTableDemo } from "../../components/tableComponent";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { CreateTaskModal } from "./createTaskModal";
import TaskServices from "../../services/task.service";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { AlertDialogDemo } from "../../components/alertBox";
import TaskView from "../../components/taskViewComponent";
import Loader from "../../components/spinner";

function TaskCreation({ projectId }: any) {
  const [data, setData] = useState<any>([]);
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [taskId, setTaskId] = useState<any>();
  const [isEdit, setIsEdit] = useState(false);
  const [updateData, setUpdateData] = useState<any>({});
  const [openView, setOpenView] = useState(false);
  const [viewData, setViewData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const desc =
    "This action cannot be undone. This will permanently delete your data.";

  const onClose = () => {
    setOpen(false);
  };
  const alertClose = () => {
    setAlertOpen(false);
  };

  const alertConfirm = () => {
    deleteTask(taskId);
    setAlertOpen(false);
  };

  const closeView = () => {
    setOpenView(false);
  };

  const getUserData = useQuery(
    ["getTasks"],
    async () => {
      const payload = {
        skip: (skip - 1) * limit,
        limit: limit,
        projectId: projectId,
      };
      return await TaskServices.getTask(payload);
    },
    {
      onSuccess: (res: any) => {
        setData(res?.data);
        setCount(res?.totalcount);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const { mutate: deleteTask } = useMutation<any, Error>(
    async (payload: any) => {
      return await TaskServices.deleteTask(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        getUserData.refetch();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  const { mutate: getTaskById } = useMutation<any, Error>(
    async (payload: any) => {
      return await TaskServices.getTaskById(payload);
      setIsLoading(true);
    },
    {
      onSuccess: (res: any) => {
        setIsLoading(false);
        setViewData(res?.data);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "sno",
      header: () => <div className=" font-bold">S.No</div>,
      cell: ({ row }: any) => <div className="">{row.index + 1}</div>,
    },
    {
      accessorKey: "taskName",
      header: () => <div className=" font-bold">Task Name</div>,
    },
    {
      accessorKey: "user",
      header: () => <div className=" font-bold">Assignee Name</div>,
    },
    {
      accessorKey: "estimation",
      header: () => <div className=" font-bold">Estimation</div>,
    },
    {
      accessorKey: "priority",
      header: () => <div className=" font-bold">Priority</div>,
    },
    {
      accessorKey: "taskStatus",
      header: () => <div className=" font-bold">Status</div>,
      cell: ({ row }: any) => {
        if (row.original.taskStatus === "Backlog") {
          return (
            <div className="text-[#FFA500]">{row.getValue("taskStatus")}</div>
          );
        } else if (row.original.taskStatus === "Todo") {
          return (
            <div className="text-[#FFFF00]">{row.getValue("taskStatus")}</div>
          );
        } else if (row.original.taskStatus === "In Progress") {
          return (
            <div className="text-[#00BFFF]">{row.getValue("taskStatus")}</div>
          );
        } else if (row.original.taskStatus === "Done") {
          return (
            <div className="text-[#008000]">{row.getValue("taskStatus")}</div>
          );
        } else if (row.original.taskStatus === "Canceled") {
          return (
            <div className="text-[#FF0000]">{row.getValue("taskStatus")}</div>
          );
        }
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className=" font-bold">Created Date</div>,
      cell: ({ row }: any) => {
        return (
          <div className="">
            {moment(row.getValue("createdAt")).format("DD-MM-YYYY")}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-center font-bold">Actions</div>
      ),
      enableHiding: false,
      cell: ({ row }: any) => {
        return (
          <div className="flex  justify-center">
            <Button
              onClick={() => {
                getTaskById(row.original.id);
                setOpenView(true);
              }}
              variant="ghost"
            >
              View
            </Button>
            <Button
              onClick={() => {
                setUpdateData(row.original);
                setIsEdit(true);
                setOpen(true);
              }}
              variant="ghost"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setAlertOpen(true);
                setTaskId(row.original.id);
              }}
              variant="ghost"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <h2>Task</h2>
        <div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Create Task
          </Button>
        </div>
      </div>
      <div className="mt-2">
        {getUserData?.isLoading ? (
          <Loader isLoading={getUserData?.isLoading} />
        ) : (
          <DataTableDemo
            data={data}
            columns={columns}
            skip={skip}
            take={limit}
            setSkip={setSkip}
            setTake={setLimit}
            totalcount={count}
          />
        )}
      </div>
      <CreateTaskModal
        open={open}
        onClose={onClose}
        projectId={projectId}
        fetchData={getUserData.refetch}
        isEdit={isEdit}
        updateData={updateData}
        setIsEdit={setIsEdit}
      />
      <AlertDialogDemo
        open={alertOpen}
        onClose={alertClose}
        onConfirm={alertConfirm}
        title="Are you sure you want to delete this?"
        desc={desc}
      />
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <TaskView open={openView} onClose={closeView} viewData={viewData} />
      )}
    </div>
  );
}

export default TaskCreation;
