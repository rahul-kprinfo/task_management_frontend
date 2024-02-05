import { useState } from "react";
import { Button } from "../../components/ui/button";
import { DataTableDemo } from "../../components/tableComponent";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { CreateTaskModal } from "./createTaskModal";

function TaskCreation() {
  const [data, setData] = useState<any>([]);
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "sno",
      header: () => <div className=" font-bold">S.No</div>,
      cell: ({ row }: any) => <div className="">{row.index + 1}</div>,
    },
    {
      accessorKey: "projectName",
      header: () => <div className=" font-bold">Project Name</div>,
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
      <CreateTaskModal open={open} onClose={onClose} />
    </div>
  );
}

export default TaskCreation;
