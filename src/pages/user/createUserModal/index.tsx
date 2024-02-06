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
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import CustomSelect from "../../../components/customSelect";
import UserServices from "../../../services/user.service";

export function CreateUserModal({
  open,
  onClose,
  projectId,
  fethhData,
  updateData,
  isEdit,
  setIsEdit,
}: any) {
  const formik: any = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      projectId: projectId,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("User Name is required"),
      email: Yup.string().required("Email is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        updateUser(values);
      } else {
        createProject(values);
      }
    },
  });
  useEffect(() => {
    formik.setValues({
      name: updateData?.name || "",
      email: updateData?.email || "",
      role: updateData?.role || "",
      projectId: projectId,
    });
  }, [updateData, isEdit]);

  const { mutate: createProject } = useMutation<any, Error>(
    async (payload: any) => {
      return await UserServices.createUser(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        formik.resetForm();
        onClose();
        fethhData();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );
  const { mutate: updateUser } = useMutation<any, Error>(
    async (payload: any) => {
      return await UserServices.updateUser(updateData?.id, payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        formik.resetForm();
        onClose();
        fethhData();
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

  const title = isEdit ? "Update User" : "Create User";
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
                Name
              </Label>
              <Input
                onChange={formik.handleChange}
                id="name"
                value={formik?.values?.name}
                className="col-span-3"
                placeholder="Enter Name"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="ml-0 text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                onChange={formik.handleChange}
                id="email"
                value={formik?.values?.email}
                className="col-span-3"
                placeholder="Enter Email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="ml-0 text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Input
                onChange={formik.handleChange}
                id="role"
                value={formik?.values?.role}
                className="col-span-3"
                placeholder="Enter Role"
              />
              {formik.touched.role && formik.errors.role ? (
                <div className="ml-0 text-red-600">{formik.errors.role}</div>
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
