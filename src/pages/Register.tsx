import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
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
  password: yup.string().min(8, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required("Confirm Password is required"),
  address: yup.string().required("Address is required"),
});
export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputData>();
  const onsubmit: SubmitHandler<inputData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Register Page</h1>
        <div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <input type="text" placeholder="Firstname" {...register("name")} />
            <input type="email" placeholder="Email" {...register("email")} />
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
            />
            <input type="text" placeholder="Address" {...register("address")} />
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
