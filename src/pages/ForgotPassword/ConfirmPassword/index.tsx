import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import AuthServices from "../../../services/auth.service";
import { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function ConfirmPassword() {
  const navigate = useNavigate();
  const state = useLocation();
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const initialvalue = {
    id: state?.state?.data[0]?.id,
    email: state?.state?.data[0]?.email,
    newPassword: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: initialvalue,
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Password required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password required"),
    }),
    onSubmit: (values) => {
      ForgotPassword(values);
    },
  });

  const { mutate: ForgotPassword } = useMutation<any, Error>(
    async (payload: any) => {
      return await AuthServices.forgotPassword(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        navigate("/login");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  return (
    <div className="bg-gray-200 flex h-[100vh]">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-[400px] min-h-96 bg-white rounded-xl">
          <div className="text-center">
            <h2 className="pt-6 font-bold text-xl">Confirm Password</h2>
          </div>
          <form
            action=""
            className="flex flex-col gap-[15px] p-6"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="">New Password</label>
              <div className="flex">
                <input
                  type={type}
                  id="newPassword"
                  name="newPassword"
                  className="p-[10px] rounded-[5px] bg-gray-100 w-[100%]"
                  placeholder="New Password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                <span
                  className="flex justify-around items-center"
                  onClick={handleToggle}
                >
                  <Icon className="absolute mr-10" icon={icon} size={25} />
                </span>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="ml-0 text-red-600">
                  {formik.errors.newPassword}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Password"
                className="p-[10px] rounded-[5px] bg-gray-100"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="ml-0 text-red-600">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 w-[100px] h-[40px] rounded-[5px] text-white hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </form>
          <Link to="/forgot-password">
            <div className="text-center text-xs cursor-pointer text-blue-500 hover:underline">
              &lt; Back
            </div>
          </Link>
        </div>
      </div>

      <div className="flex-1 bg-blue-300">
        <img
          className="h-[100%] w-[100%] object-fill"
          src="https://ideascale.com/wp-content/uploads/2022/03/Task-Management-Advantages-scaled.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default ConfirmPassword;
