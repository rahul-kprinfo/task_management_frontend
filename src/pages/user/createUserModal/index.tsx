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

export function CreateUserModal({
  open,
  onClose,
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
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Task Name is required"),
      user: Yup.string().required("User Name is required"),
      estimation: Yup.string().required("Estimation is required"),
      description: Yup.string().required("Description is required"),
      priority: Yup.string().required("Priority is required"),
    }),
    onSubmit: (values: any) => {
      // if (isEdit) {
      //   updateProject(values);
      // } else {
      //   createProject(values);
      // }
    },
  });
  // useEffect(() => {
  //   formik.setValues({
  //     projectName: updateData?.projectName || "",
  //   });
  // }, [updateData]);

  const { mutate: createProject } = useMutation<any, Error>(
    async (payload: any) => {
      return await ProjectServices.createProject(payload);
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

  const rolesOptions = [
    { label: "Admin", value: "admin" },
    { label: "SuperAdmin", value: "superadmin" },
    { label: "User", value: "user" },
  ];

  useEffect(() => {
    if (open === false) {
      formik.resetForm();
    }
  }, [open]);
  const isEdit = false;
  const title = isEdit ? "Update User" : "Create User";
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
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                onChange={formik.handleChange}
                id="name"
                value={formik?.values?.name}
                // onBlur={formik.handleBlur}
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
                value={formik?.values?.estimation}
                // onBlur={formik.handleBlur}
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
              <CustomSelect
                options={rolesOptions}
                customOnChange={(e: any) => {
                  formik.setFieldValue("role", e);
                }}
                styles={""}
                placeholder="Select Role"
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
