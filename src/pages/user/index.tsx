import { useState } from "react";
import { Button } from "../../components/ui/button";
import { DataTableDemo } from "../../components/tableComponent";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { CreateUserModal } from "./createUserModal";
import { useQuery } from "react-query";
import UserServices from "../../services/user.service";

function UserCreation({ projectId }: any) {
  const [data, setData] = useState<any>([]);
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const getUserData = useQuery(
    ["getUser"],
    async () => {
      const payload = { skip: (skip - 1) * limit, limit: limit };
      return await UserServices.getUser(payload);
    },
    {
      onSuccess: (res: any) => {
        console.log("resss", res);
        setData(res?.data);
        setCount(res?.totalcount);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
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
                // setUpdateData(row.original);
                // setIsEdit(true);
                // setOpen(true);
              }}
              variant="ghost"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                // setAlertOpen(true);
                // setDeleteId(row.original.id);
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
      />
    </div>
  );
}

export default UserCreation;
