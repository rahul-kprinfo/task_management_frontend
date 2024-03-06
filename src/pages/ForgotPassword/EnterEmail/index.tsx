import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import AuthServices from "../../services/auth.service";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

import { useDispatch } from "react-redux";
import AuthServices from "../../../services/auth.service";
// import { loginUser } from "../../redux/slice/authSlice";

function ForgotEmail() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const initialvalue = {
    email: "",
  };

  const formik: any = useFormik({
    initialValues: initialvalue,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
    }),
    onSubmit: (values: any) => {
      verifyEmail(values);
    },
  });

  const { mutate: verifyEmail } = useMutation<any, Error>(
    async (payload: any) => {
      return await AuthServices.verifyEmail(payload);
    },
    {
      onSuccess: (res: any) => {
        navigate("/confirm-password", { state: { data: res?.data } });
      },
      onError: (err: any) => {
        setErrorMsg(err?.response?.data?.message);
      },
    }
  );
  const handleChange = (event: any) => {
    formik.handleChange(event);
    setErrorMsg("");
  };

  return (
    <div className="bg-gray-200 flex h-[100vh]">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-[400px] min-h-72 bg-white rounded-xl">
          <div className="text-center">
            <h2 className="pt-6 font-bold text-xl">Forgot Password</h2>
          </div>
          <form
            action=""
            className="flex flex-col gap-[15px] p-6"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="p-[10px] rounded-[5px] bg-gray-100"
                placeholder="Email"
                value={formik.values.email}
                onChange={handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="ml-0 text-red-600">{formik.errors.email}</div>
              ) : null}
              {errorMsg ? (
                <div className="ml-0 text-red-600">{errorMsg}</div>
              ) : null}
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-green-500 w-[100px] h-[40px] rounded-[5px] text-white hover:bg-green-600"
              >
                Next
              </button>
            </div>
          </form>
          <Link to="/login">
            <div className="text-center text-xs cursor-pointer text-blue-500 hover:underline">
              &lt; Back To Login
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

export default ForgotEmail;
