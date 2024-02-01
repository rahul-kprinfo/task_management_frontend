import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/auth.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

function Register() {
  const navigate = useNavigate();

  const formik: any = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values: any) => {
      registerUser(values)
    },
  });

  const { mutate: registerUser } = useMutation<any, Error>(
    async (payload:any) => {
      return await AuthServices.signUp(payload);
    },
    {
      onSuccess: (res: any) => {
        toast.success(res?.message)
        navigate("/");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message)
        console.log("errr", err);
      },
    }
  );

  return (
    <div className="bg-gray-200 flex h-[100vh]">
    <div className="flex flex-1 justify-center items-center">
      <div className="w-[400px] min-h-[450px] bg-white rounded-xl">
        <div className="text-center">
          <h2 className="pt-6 font-bold text-xl">Register</h2>
        </div>
        <form
          action=""
          className="flex flex-col gap-[15px] p-6"
          onSubmit={formik.handleSubmit}
        >
           <div className="flex flex-col">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="p-[10px] rounded-[5px] bg-gray-100"
                  placeholder="Name"
                  id="name"
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="ml-0 text-red-600">{formik.errors.name}</div>
                ) : null}
              </div>
          <div className="flex flex-col">
            <label htmlFor="">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-[10px] rounded-[5px] bg-gray-100"
              placeholder="Email"
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="ml-0 text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-green-500 w-[100px] h-[40px] rounded-[5px] text-white hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <div className="text-center mb-2">
          Have an account?{" "}
          <Link to="/">
            <a href="">Login</a>
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
  </div>
  );
}

export default Register;
