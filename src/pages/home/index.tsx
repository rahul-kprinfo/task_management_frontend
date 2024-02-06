import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { DataTableDemo } from "../../components/tableComponent";
import { ColumnDef } from "@tanstack/react-table";
import { SheetDemo } from "../../components/customPopUp";
import { useMutation, useQuery } from "react-query";
import moment from "moment";
import ProjectServices from "../../services/project.service";
import { toast } from "sonner";
import { AlertDialogDemo } from "../../components/alertBox";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [updateData, setUpdateData] = useState<any>();
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState<any>();
  const token = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();
  const desc =
    "This action cannot be undone. This will permanently delete your data.";
  const onClose = () => {
    setOpen(false);
  };
  const alertClose = () => {
    setAlertOpen(false);
  };

  const alertConfirm = () => {
    deleteProject(deleteId);
    setAlertOpen(false);
  };

  const getProjectData = useQuery(
    ["getProject"],
    async () => {
      const payload = { skip: (skip - 1) * limit, limit: limit };
      return await ProjectServices.getProject(payload);
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

  const { mutate: deleteProject } = useMutation<any, Error>(
    async (id: any) => {
      return await ProjectServices.deleteProject(id);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        getProjectData.refetch();
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
      cell: ({ row }) => <div className="">{row.index + 1}</div>,
    },
    {
      accessorKey: "projectName",
      header: () => <div className=" font-bold">Project Name</div>,
      cell: ({ row }) => {
        return (
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/taskManagement", {
                state: {
                  projectId: row.original.id,
                  projectName: row.original.projectName,
                },
              });
            }}
          >
            {row.getValue("projectName")}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className=" font-bold">Date</div>,
      cell: ({ row }) => {
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
      cell: ({ row }) => {
        return (
          <div className="flex  justify-center">
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
                setDeleteId(row.original.id);
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

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    getProjectData.refetch();
  }, [skip, limit]);
  return (
    <>
      <div className="h-full w-full p-4">
        <div className="flex justify-between pb-4">
          <h2 className="font-bold">Projects</h2>
          <div>
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              Create Project
            </Button>
          </div>
        </div>
        <div>
          <DataTableDemo
            data={data}
            columns={columns}
            skip={skip}
            take={limit}
            setSkip={setSkip}
            setTake={setLimit}
            totalcount={count}
          />
        </div>
      </div>
      <SheetDemo
        updateData={updateData}
        open={open}
        onClose={onClose}
        refetch={getProjectData.refetch}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <AlertDialogDemo
        open={alertOpen}
        onClose={alertClose}
        onConfirm={alertConfirm}
        title="Are you sure you want to delete this?"
        desc={desc}
      />
    </>
  );
}
