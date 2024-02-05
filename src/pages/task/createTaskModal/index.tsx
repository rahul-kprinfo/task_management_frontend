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
import ProjectServices from "../../../services/project.service";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import CustomSelect from "../../../components/customSelect";
import TaskServices from "../../../services/task.service";

export function CreateTaskModal({
  open,
  onClose,
  projectId,
}: // refetch,
// updateData,
// isEdit,
// setIsEdit,
any) {
  const formik: any = useFormik({
    initialValues: {
      taskName: "",
      user: "",
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
        // updateProject(values);
      } else {
        createProject(values);
      }
    },
  });
  // useEffect(() => {
  //   formik.setValues({
  //     projectName: updateData?.projectName || "",
  //   });
  // }, [updateData]);

  const { mutate: createProject } = useMutation<any, Error>(
    async (payload: any) => {
      return await TaskServices.createTask(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        //   navigate("/");
        formik.resetForm();
        onClose();
        // refetch();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );
  // const { mutate: updateProject } = useMutation<any, Error>(
  //   async (payload: any) => {
  //     return await ProjectServices.upateProject(updateData?.id, payload);
  //   },
  //   {
  //     onSuccess: (res: any) => {
  //       toast.success(res?.message);
  //       formik.resetForm();
  //       onClose();
  //       // refetch();
  //       // setIsEdit(false);
  //     },
  //     onError: (err: any) => {
  //       toast.error(err?.response?.data?.message);
  //     },
  //   }
  // );

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
  const isEdit = false;
  const title = isEdit ? "Update Task" : "Create Task";
  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        onClose();
        // setIsEdit(false);
      }}
    >
      <SheetContent>
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
                // onBlur={formik.handleBlur}
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
              <CustomSelect
                options={priorityOptions}
                customOnChange={(e: any) => {
                  formik.setFieldValue("user", e);
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
                value={formik?.values?.estimation}
                // onBlur={formik.handleBlur}
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
                // onBlur={formik.handleBlur}
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
