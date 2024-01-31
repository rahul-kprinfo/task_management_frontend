import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthServices from "../../services/auth.service";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const token = localStorage.getItem("ACCESS_TOKEN");

  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("*Email required"),
      password: Yup.string().required("*Password required"),
    }),
    onSubmit: (values: any) => {
      Login(values)
    },
  });

  const { mutate: Login } = useMutation<any, Error>(
    async (payload:any) => {
      return await AuthServices.signIn(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message)
        localStorage.setItem("ACCESS_TOKEN", res?.token);
        localStorage.setItem("USER_NAME", res?.username);
        navigate("/home");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message)
        console.log("errr", err);
      },
    }
  );

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  });

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className=" bg-gray-200 w-[600px] min-h-80  p-[30px] rounded-[10px]">
        <div>
          <h2 className="text-center font-bold">Task Management-Login</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <form
              action=""
              className="flex flex-col gap-[30px] "
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="p-[10px] rounded-[5px]"
                  placeholder="Email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="ml-5 text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="p-[10px] rounded-[5px]"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}

                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="ml-5 text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-green-500 w-[100px] h-[40px] rounded-md text-white cursor-pointer hover:bg-green-600"
              >Login
                </button>
            </form>
          </div>
          <div className="mr-8">
            <img
              className="w-[200px] h-[200px]"
              src="data:image/jpeg;base64,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xnioZcp02sTxfzGeK2aLUwzU+dKf18Xxs8U86U/r4vjZ4rbItzE5TU+dKf18Xxs8VwtHVmDLUj5pzLTTROdC8XkjjkLmhrCW3EZDWvF8MCCda9QRbmXNCmtmcRw6yuwUTzA5ksgfFZjXB5IzxcgNxwF1HwN4UUz4WQuEkEoaS8SscxudrcWyEZpFzgCQehd2ijLDNny/62vs6uovNPLkv/N3XaanzpT+vi+NnioanKdOW200XKZ99vOHSt4itS1IcTQZSylAYpAJoyTG4AB7SSbdaVVVSyROhdOwNdGWOLZWscARYlrgbg9K36Lc+lDLrZxOQcosieaeaRpLLOZPnMLJY7FoJIPFkFxdp33GGroPOlP6+L42eK2yKFUVSRsrk7bNT51p/XxfzG+Kedaf18Xxt8VtkW5jMppX5Tp7t9NFrP327j0qTzpT+vi+NnitsiZhlNKMp0+dfTRckffbvPSsTlOnzwdNFyCOW3eOnrW8RbnMyGhkylT6Vh00dtHKCc9u0stt6CtNwg4T0jo5qbPluWOjc6OKVws4WJY4NIdr1i4XbokpWururr7UzYxSd7nB8C8l5Po2GSOcGSVrC50rmNe1lgRHm4ZtjrBxvr1K/l3L1EWSU75C7SQvadG18gzXAt5bQW36L36F1qJKbk7e/WFFLlp1HEcDJqKnpM1k1hpJXO0vo3k3tfMIDrWAthjZcF5SK411XGKZkjo2RiMPdG+Nukc85xu4CzeTxjhgvdEVwxXGWbd9pkoJqtu45jJgpIaVlIJ4s1sOjJz2Y3FnHXtJJ968+8kEehnndP6P0LGNMnow452OaXWvydm8L2hEWM0musfjVp9RqfOlP6+L42eKDKlP6+L42eK2yLjzG5SiMrUvr4v5jPFSU9fDIc2OWN5tezXNcbb7BWkUlBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf/Z"
              alt=""
            />{" "}
          </div>
        </div>
        <div className="text-center ">
          Don't have an account?{" "}
          <Link to="/register">
            <a href="">Register Now</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
