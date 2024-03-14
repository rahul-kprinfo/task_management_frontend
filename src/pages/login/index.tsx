import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthServices from "../../services/auth.service";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import io from "socket.io-client";
const socket = io("http://localhost:3000");
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";
import { AlertDialogDemo } from "../../components/alertBox";
import { AlertBox } from "../../components/multipleLoginAlert";

function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("ACCESS_TOKEN");
  const dispatch = useDispatch();
  const [alertOpen, setAlertOpen] = useState(false);

  const userId = localStorage.getItem("USER_ID");
  const alertClose = () => {
    setAlertOpen(false);
  };

  const initialvalue = {
    email: "",
    password: "",
  };
  const formik: any = useFormik({
    initialValues: initialvalue,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values: any) => {
      Login(values);
    },
  });

  const alertConfirm = () => {
    socket.emit("confirmLogin", formik.values.email);
    setAlertOpen(false);
    // formik.handleSubmit();
  };
  useEffect(() => {
    socket.on("multipleLogin", ({ message }) => {
      console.log("multiple login detected");
      setAlertOpen(true);
    });

    return () => {
      // Clean up event listener when component unmounts
      socket.off("multipleLogin");
    };
  }, []);

  useEffect(() => {
    socket.on("proceedWithLogin", () => {
      formik.handleSubmit();
      console.log("proceed login");
    });

    return () => {
      // Clean up event listener when component unmounts
      socket.off("proceedWithLogin");
    };
  }, []);

  const { mutate: Login } = useMutation<any, Error>(
    async (payload: any) => {
      socket.emit("login", payload?.email);
      return await AuthServices.signIn(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message);
        localStorage.setItem("ACCESS_TOKEN", res?.token);
        localStorage.setItem("USER_NAME", res?.username);
        localStorage.setItem("EMAIL", res?.email);
        localStorage.setItem("USER_ID", res?.id);
        dispatch(
          loginUser({ user: { username: res?.username, email: res?.email } })
        );

        navigate("/home");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    }
  );

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="bg-gray-200 flex h-[100vh]">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-[400px] min-h-96 bg-white rounded-xl">
          <div className="text-center">
            <h2 className="pt-6 font-bold text-xl">Login</h2>
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
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="ml-0 text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="p-[10px] rounded-[5px] bg-gray-100"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="ml-0 text-red-600">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <Link to="/forgot-password">
              <div className="text-xs flex justify-end cursor-pointer text-blue-500 hover:underline">
                Forgot Password
              </div>
            </Link>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 w-[100px] h-[40px] rounded-[5px] text-white hover:bg-green-600"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            Don't have an account?{" "}
            <Link to="/register">
              <a href="" className="text-blue-500 hover:underline">
                Register Now
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-blue-300">
        <img
          className="h-[100%] w-[100%] object-fill"
          src="https://ideascale.com/wp-content/uploads/2022/03/Task-Management-Advantages-scaled.jpg"
          alt=""
        />
      </div>
      <AlertBox
        open={alertOpen}
        onClose={alertClose}
        onConfirm={alertConfirm}
        title="Multiple Logins Detected"
        desc="You are currently logged in on another device. If you proceed with login here, you will be logged out from the other session."
      />
    </div>
  );
}

export default Login;
