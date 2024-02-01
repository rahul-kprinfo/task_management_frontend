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

export function SheetDemo({ open, onClose, refetch }: any) {
  const formik: any = useFormik({
    initialValues: {
      projectName: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project Name is required"),
    }),
    onSubmit: (values: any) => {
      createProject(values);
    },
  });

  const { mutate: createProject } = useMutation<any, Error>(
    async (payload: any) => {
      return await ProjectServices.createProject(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        //   navigate("/");
        onClose();
        refetch();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
        console.log("errr", err);
      },
    }
  );

  return (
    <Sheet open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Project</SheetTitle>
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
                onBlur={formik.handleBlur}
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
