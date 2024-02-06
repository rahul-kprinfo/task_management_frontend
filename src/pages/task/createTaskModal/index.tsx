import { useFormik } from "formik";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import * as Yup from "yup";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import CustomSelect from "../../../components/customSelect";
import TaskServices from "../../../services/task.service";
import UserServices from "../../../services/user.service";
import UCustomSelect from "../../../components/userCustomSelect";
export function CreateTaskModal({
  open,
  onClose,
  projectId,
  fetchData,
  isEdit,
  updateData,
  setIsEdit,
}: any) {
  const [user, setUser] = useState([]);
  const today = new Date().toISOString().slice(0, 10);

  const formik: any = useFormik({
    initialValues: {
      taskName: "",
      user: "",
      projectUserId: "",
      estimation: "",
      description: "",
      priority: "",
      projectId: projectId,
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Task Name is required"),
      user: Yup.string().required("User Name is required"),
      estimation: Yup.string().required("Estimation is required"),
      description: Yup.string().required("Description is required"),
      priority: Yup.string().required("Priority is required"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        updateTask(values);
      } else {
        createProject(values);
      }
    },
  });
  useEffect(() => {
    formik.setValues({
      taskName: updateData?.taskName || "",
      user: updateData?.user || "",
      estimation: updateData?.estimation || "",
      description: updateData?.description || "",
      priority: updateData?.priority || "",
      projectId: projectId,
      projectUserId: updateData?.projectUserId || "",
    });
  }, [updateData, isEdit]);

  const { mutate: createProject } = useMutation<any, Error>(
    async (payload: any) => {
      return await TaskServices.createTask(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        formik.resetForm();
        onClose();
        fetchData();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );
  const { mutate: updateTask } = useMutation<any, Error>(
    async (payload: any) => {
      return await TaskServices.upateTask(updateData?.id, payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        formik.resetForm();
        onClose();
        fetchData();
        setIsEdit(false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  const getUserData = useQuery(
    ["getUsers"],
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

  const priorityOptions = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  useEffect(() => {
    if (open === false) {
      formik.resetForm();
    }
  }, [open]);

  const title = isEdit ? "Update Task" : "Create Task";
  return (
    <Sheet
      key="left"
      open={open}
      onOpenChange={() => {
        onClose();
        setIsEdit(false);
      }}
    >
      <SheetContent key="left">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <form action="">
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="taskName" className="text-right">
                Task Name
              </Label>
              <Input
                onChange={formik.handleChange}
                id="taskName"
                value={formik?.values?.taskName}
                className="col-span-3"
                placeholder="Enter Task Name"
              />
              {formik.touched.taskName && formik.errors.taskName ? (
                <div className="ml-0 text-red-600">
                  {formik.errors.taskName}
                </div>
              ) : null}
            </div>
            <div className="">
              <Label htmlFor="user" className="text-right">
                Select User
              </Label>
              <UCustomSelect
                defaultVal={formik?.values?.user}
                options={user}
                customOnChange={(e: any) => {
                  formik.setFieldValue("user", e?.value);
                  formik.setFieldValue("projectUserId", e?.id);
                }}
                styles={""}
                placeholder="Select User"
              />
              {formik.touched.user && formik.errors.user ? (
                <div className="ml-0 text-red-600">{formik.errors.user}</div>
              ) : null}
            </div>
            <div className="">
              <Label htmlFor="estimation" className="text-right">
                Estimation
              </Label>
              <Input
                onChange={formik.handleChange}
                id="estimation"
                type="date"
                min={today}
                value={formik?.values?.estimation}
                className="col-span-3"
                placeholder="Enter Project Name"
              />
              {formik.touched.estimation && formik.errors.estimation ? (
                <div className="ml-0 text-red-600">
                  {formik.errors.estimation}
                </div>
              ) : null}
            </div>
            <div className="">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Input
                onChange={formik.handleChange}
                id="description"
                value={formik?.values?.description}
                className="col-span-3"
                placeholder="Description"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="ml-0 text-red-600">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
            <div className="">
              <Label htmlFor="name" className="text-right">
                Priority
              </Label>
              <CustomSelect
                defaultVal={formik?.values?.priority}
                options={priorityOptions}
                customOnChange={(e: any) => {
                  formik.setFieldValue("priority", e);
                }}
                styles={""}
                placeholder="Select Priority"
              />
              {formik.touched.priority && formik.errors.priority ? (
                <div className="ml-0 text-red-600">
                  {formik.errors.priority}
                </div>
              ) : null}
            </div>
          </div>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={formik.handleSubmit}
              className="flex justify-right items-end"
            >
              Save
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
