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
  const [updateUser, { isLoading }] = userApi.useUpdateUserMutation();

  const onSubmit: SubmitHandler<UpdateProfileInputs> = async (data) => {
    try {
      await updateUser({ user_Id: user.user_Id, ...data });

      toast.success("Profile updated successfully");
      if (refetch) {
        refetch();
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
  });

  return (
    <dialog id="update_profile_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            {...register("name")}
            placeholder="Full Name"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.name && (
            <span className="text-sm text-red-700">{errors.name.message}</span>
          )}

          <input
            type="text"
            {...register("phone")}
            placeholder="Phone Number"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.phone && (
            <span className="text-red-700 text-sm">{errors.phone.message}</span>
          )}
          <input
            type="text"
            {...register("address")}
            placeholder="Address"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.address && (
            <span className="text-red-700 text-sm">
              {errors.address.message}
            </span>
          )}

          <div className="modal-action flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" />{" "}
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
            <button
              className="btn w-full sm:w-auto"
              type="button"
              onClick={() => {
                (
                  document.getElementById(
                    "update_profile_modal",
                  ) as HTMLDialogElement
                )?.close();
                reset();
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
