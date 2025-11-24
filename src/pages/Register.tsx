import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userApi from "../features/Auth/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const [createUser, { isLoading }] = userApi.useCreateUserMutation();
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
      const response = await createUser(data).unwrap();
      console.log("User registered successfully:", response);
      toast.success("User registered successfully!");
      navigate("/verify", { state: { email: data.email } });
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          {/* Register Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 dark:border-gray-700/50 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join Sweet Delights and start your sweet journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      errors.name
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 dark:border-gray-600 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-pink-500/20"
                    } bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-200 dark:border-gray-600 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-pink-500/20"
                      } bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <input
                      id="phone"
                      type="text"
                      placeholder="Enter your phone"
                      {...register("phone")}
                      className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-200 dark:border-gray-600 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-pink-500/20"
                      } bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Field */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 pt-4 flex items-start pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    {...register("address")}
                    className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                      errors.address
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 dark:border-gray-600 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-pink-500/20"
                    } bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4`}
                  />
                </div>
                {errors.address && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Password Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="Create password"
                      {...register("password")}
                      className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                        errors.password
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-200 dark:border-gray-600 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-pink-500/20"
                      } bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                      className={`block w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
                        errors.confirmPassword
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-200 dark:border-gray-600 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-pink-500/20"
                      } bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800/80 text-gray-500 dark:text-gray-400">
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <a
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Sign in instead
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
