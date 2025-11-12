import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import userApi from "../features/Auth/userApi";

import * as yup from "yup";

type inputData = {
  email: string;
  verification_code: string;
};
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  verification_code: yup
    .string()
    .min(8, "Verification code must be at least 6 characters")
    .required("Verification code is required"),
});
export const Verify = () => {
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
    } catch (error) {
      console.error("Failed to login user:", error);
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
              type="text"
              placeholder="Enter Verification Code"
              {...register("verification_code")}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <span className="text-red-500 text-xs">
              {errors.verification_code?.message}
            </span>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500 px-3 py-1.5 text-base  hover:bg-indigo-600 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
