import { useFormik } from "formik";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import * as Yup from "yup";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import ProjectServices from "../../services/project.service";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useEffect } from "react";

export function SheetDemo({
  open,
  onClose,
  refetch,
  updateData,
  isEdit,
  setIsEdit,
}: any) {
  const formik: any = useFormik({
    initialValues: {
      projectName: updateData?.projectName || "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project Name is required"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        updateProject(values);
      } else {
        createProject(values);
      }
    },
  });
  useEffect(() => {
    formik.setValues({
      projectName: updateData?.projectName || "",
    });
  }, [updateData, isEdit]);

  const { mutate: createProject } = useMutation<any, Error>(
    async (payload: any) => {
      return await ProjectServices.createProject(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        formik.resetForm();
        onClose();
        refetch();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );
  const { mutate: updateProject } = useMutation<any, Error>(
    async (payload: any) => {
      return await ProjectServices.upateProject(updateData?.id, payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        formik.resetForm();
        onClose();
        refetch();
        setIsEdit(false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  useEffect(() => {
    if (open === false) {
      formik.resetForm();
    }
  }, [open]);

  const title = isEdit ? "Update Project" : "Create Project";
  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        onClose();
        setIsEdit(false);
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <form action="">
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="name" className="text-right">
                Project Name
              </Label>
              <Input
                onChange={formik.handleChange}
                id="projectName"
                value={formik?.values?.projectName}
                className="col-span-3"
                placeholder="Enter Project Name"
              />
              {formik.touched.projectName && formik.errors.projectName ? (
                <div className="ml-0 text-red-600">
                  {formik.errors.projectName}
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
