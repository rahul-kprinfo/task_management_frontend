import { useState } from "react";
import { Button } from "../../components/ui/button";
import { DataTableDemo } from "../../components/tableComponent";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { CreateUserModal } from "./createUserModal";
import { useMutation, useQuery } from "react-query";
import UserServices from "../../services/user.service";
import { toast } from "sonner";
import { AlertDialogDemo } from "../../components/alertBox";

function UserCreation({ projectId }: any) {
  const [data, setData] = useState<any>([]);
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [userId, setUserId] = useState<any>();
  const [isEdit, setIsEdit] = useState(false);
  const [updateData, setUpdateData] = useState<any>({});
  const desc =
    "This action cannot be undone. This will permanently delete your data.";

  const alertClose = () => {
    setAlertOpen(false);
  };

  const alertConfirm = () => {
    deleteUser(userId);
    setAlertOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getUserData = useQuery(
    ["getUser"],
    async () => {
      const payload = {
        skip: (skip - 1) * limit,
        limit: limit,
        projectId: projectId,
      };
      return await UserServices.getUser(payload);
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

  const { mutate: deleteUser } = useMutation<any, Error>(
    async (payload: any) => {
      return await UserServices.deleteUser(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        //   navigate("/");
        // formik.resetForm();
        // onClose();
        getUserData.refetch();
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
      accessorKey: "name",
      header: () => <div className=" font-bold">User Name</div>,
    },
    {
      accessorKey: "email",
      header: () => <div className=" font-bold">Email</div>,
    },
    {
      accessorKey: "role",
      header: () => <div className=" font-bold">Role</div>,
    },
    {
      accessorKey: "createdAt",
      header: () => <div className=" font-bold">Date</div>,
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
                setUserId(row.original.id);
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
        <h2>User</h2>
        <div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Create User
          </Button>
        </div>
      </div>
      <div className="mt-2">
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
      <CreateUserModal
        open={open}
        onClose={onClose}
        projectId={projectId}
        fethhData={getUserData.refetch}
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
    </div>
  );
}

export default UserCreation;
