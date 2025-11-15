import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userApi from "../features/Auth/userApi";
import { useLocation } from "react-router-dom";

import * as yup from "yup";
import { toast } from "sonner";

type inputData = {
  email: string;
  code: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  code: yup
    .string()
    .min(6, "Verification code must be at least 6 characters")
    .required("Verification code is required"),
});
export const Verify = () => {
  const [verifyUser, { isLoading }] = userApi.useVerifyUserMutation();
  const location = useLocation();
  const state = (location.state as { email: string }) || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: state.email || "",
    },
  });

  const onsubmit: SubmitHandler<inputData> = async (data) => {
    try {
      console.log("Form Data:", data);
      const response = await verifyUser(data).unwrap();
      console.log("User verified successfully:", response);
      toast.success("User verified successfully!");
    } catch (error) {
      console.error("Failed to verify user:", error);
      toast.error("Failed to verify user.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 mb-10 w-full md:w-1/2 sm:mx-auto  py-6 rounded-b-lg shadow-lg p-6">
        <h1 className="text-center text-2xl font-bold">Verify your account</h1>
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
              {...register("code")}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <span className="text-red-500 text-xs">
              {errors.code?.message}
            </span>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500 px-3 py-1.5 text-base  hover:bg-indigo-600 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              disabled={isLoading}
              style={
                isLoading ? { cursor: "not-allowed" } : { cursor: "pointer" }
              }
            >
              {isLoading ? (
                <>
                  <span className="loading loading-dots loading-xs" />{" "}
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
