import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userApi from "../../../../features/Auth/userApi";
import { useEffect } from "react";
import { toast } from "sonner";

type UpdateProfileInputs = {
  name: string;
  address: string;
  phone: string;
};

const schema = yup.object({
  name: yup
    .string()
    .max(50, "Max 50 characters")
    .required("First name is required"),
  phone: yup
    .string()
    .max(20, "Max 20 characters")
    .required("Phone number is required"),
  address: yup
    .string()
    .max(100, "Max 100 characters")
    .required("Address is required"),
});

interface User {
  user_Id: number;
  name?: string;
  phone?: string;
  address?: string;
}

interface UpdateUserProps {
  user: User;
  refetch?: () => void;
}

export const UpdateProfile = ({ user, refetch }: UpdateUserProps) => {
  const [updateUser, { isLoading }] = userApi.useUpdateUserProfileMutation();

  const onSubmit: SubmitHandler<UpdateProfileInputs> = async (data) => {
    try {
      const result = await updateUser({ user_Id: user.user_Id, ...data });
      console.log(result);
      toast.success("Profile updated successfully");
      reset(result.data);
      if (refetch) {
        await refetch();
      }
      (document.getElementById("update_profile") as HTMLDialogElement)?.close();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("address", user.address || "");
      setValue("phone", user.phone || "");
    }
  }, [user, setValue]);

  return (
    <dialog id="update_profile" className="modal sm:modal-middle">
      <div className="modal-box w-full max-w-2xl bg-white px-0 py-0 text-gray-900 shadow-xl rounded-3xl">
        <div className="bg-linear-to-r from-purple-600 via-pink-500 to-indigo-500 px-6 py-5 text-white rounded-t-3xl border-b border-white/20">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/80">
            Profile
          </p>
          <h3 className="mt-1 text-2xl sm:text-3xl font-semibold">
            Update Profile
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-white/80">
            Update your personal information and contact details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-h-[70vh] flex-col gap-6 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent"
        >
          <div className="grid grid-cols-1 gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Full Name
                </span>
                <span className="text-[10px] rounded-full bg-purple-50 px-2 py-0.5 text-purple-600">
                  Required
                </span>
              </span>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
              {errors.name && (
                <span className="text-xs font-normal text-red-600">
                  {errors.name.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Phone Number
                </span>
                <span className="text-[10px] rounded-full bg-purple-50 px-2 py-0.5 text-purple-600">
                  Required
                </span>
              </span>
              <input
                type="text"
                {...register("phone")}
                placeholder="Enter your phone number"
                className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
              {errors.phone && (
                <span className="text-xs font-normal text-red-600">
                  {errors.phone.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Address
                </span>
                <span className="text-[10px] rounded-full bg-purple-50 px-2 py-0.5 text-purple-600">
                  Required
                </span>
              </span>
              <input
                type="text"
                {...register("address")}
                placeholder="Enter your address"
                className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
              {errors.address && (
                <span className="text-xs font-normal text-red-600">
                  {errors.address.message}
                </span>
              )}
            </label>
          </div>

          <div className="mt-2 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              className="btn btn-ghost order-2 w-full sm:order-1 sm:w-auto"
              type="button"
              onClick={() => {
                (
                  document.getElementById("update_profile") as HTMLDialogElement
                )?.close();
                reset();
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary order-1 w-full sm:order-2 sm:w-auto gap-2 bg-gradient-to-r from-purple-600 to-pink-500 border-none text-white"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="loading loading-spinner loading-sm text-primary-content" />
              )}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{isLoading ? "Updating..." : "Update Profile"}</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
