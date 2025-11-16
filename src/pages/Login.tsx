import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import userApi from "../features/Auth/userApi";
import { useNavigate } from "react-router-dom";
import loginApi from "../features/Auth/loginApi";

import * as yup from "yup";
import { toast } from "sonner";

type inputData = {
  email: string;
  password: string;
};
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 6 characters")
    .required("Password is required"),
});
export const Login = () => {
  const [loginUser, { isLoading }] = loginApi.useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputData>({
    resolver: yupResolver(schema),
  });

  const onsubmit: SubmitHandler<inputData> = async (data) => {
    try {
      console.log("Form Data:", data);
      const response = await loginUser(data).unwrap();
      console.log("User logged in successfully:", response);
      toast.success("User logged in successfully!");

      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to login user:", error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 mb-10 w-full md:w-1/2 sm:mx-auto  py-6 rounded-b-lg shadow-lg p-6">
        <h1 className="text-center text-2xl font-bold">Login Page</h1>
        <div className="mt-6 px-6 bg-gray-100 rounded-md py-6">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col gap-3 "
          >
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <span className="text-red-500 text-xs">
              {errors.email?.message}
            </span>

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <span className="text-red-500 text-xs">
              {errors.password?.message}
            </span>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500 px-3 py-1.5 text-base  hover:bg-indigo-600 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-dots loading-xs"></span>
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
