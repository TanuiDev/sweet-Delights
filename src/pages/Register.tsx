import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userApi from "../features/Auth/userApi";

import * as yup from "yup";

type inputData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
};
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  address: yup.string().required("Address is required"),
});
export const Register = () => {
  const [createUser] = userApi.useCreateUserMutation();

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
      const response = await createUser(data).unwrap();
      console.log("User registered successfully:", response);
   
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 mb-10 w-full md:w-1/2 sm:mx-auto  py-6 rounded-b-lg shadow-lg p-6">
        <h1 className="text-center text-2xl font-bold">Register Page</h1>
        <div className="mt-6 px-6 bg-gray-100 rounded-md py-6">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col gap-3 "
          >
            <input
              type="text"
              placeholder="Firstname"
              {...register("name")}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <span className="text-red-500 text-xs">{errors.name?.message}</span>
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
              placeholder="Phone Number"
              {...register("phone")}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <span className="text-red-500 text-xs">
              {errors.phone?.message}
            </span>
            <input
              type="text"
              placeholder="Address"
              {...register("address")}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <span className="text-red-500 text-xs">
              {errors.address?.message}
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
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
            <span className="text-red-500 text-xs">
              {errors.confirmPassword?.message}
            </span>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500 px-3 py-1.5 text-base  hover:bg-indigo-600 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
