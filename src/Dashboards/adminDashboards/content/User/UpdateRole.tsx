import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { FaUserShield, FaUserTie } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

import { toast } from "sonner";
import userApi, { type Tuser } from "../../../../features/Auth/userApi";

const schema = yup.object({
  role: yup.string().oneOf(["customer", "admin"]).required("Role is required"),
});

type ChangeRoleInputs = {
  role: "customer" | "admin";
};

type ChangeRoleProps = {
  user: Tuser | null;
};

export const UpdateRole = ({ user }: ChangeRoleProps) => {
  const [updateUser, { isLoading }] = userApi.useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ChangeRoleInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      setValue("role", user.role as "customer" | "admin");
    } else {
      reset();
    }
  }, [user, setValue, reset]);

  const onSubmit: SubmitHandler<ChangeRoleInputs> = async (data) => {
    try {
      if (!user) {
        toast.error("No user selected for role change.");
        return;
      }

      await updateUser({ user_Id: user?.user_Id, ...data });

      toast.success("User role updated Successfully");
      (document.getElementById("role") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role. Please try again.");
    }
  };

  return (
    <dialog id="role" className="modal sm:modal-middle backdrop-blur-sm">
      <div className="modal-box bg-linear-to-br from-gray-800 to-gray-900 text-white w-full max-w-xs sm:max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

        <button
          type="button"
          onClick={() => {
            (document.getElementById("role") as HTMLDialogElement)?.close();
            reset();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10"
          aria-label="Close"
        >
          <IoClose size={24} />
        </button>

        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
            <div className="relative bg-blue-500/20 p-4 rounded-full border-2 border-blue-500/50">
              <MdAdminPanelSettings className="text-blue-400 text-4xl" />
            </div>
          </div>
        </div>

        <h3 className="font-bold text-2xl mb-2 text-center bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Change User Role
        </h3>
        <p className="text-center text-gray-400 mb-6">
          Update role for{" "}
          <span className="font-semibold text-white">{user?.name}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="bg-gray-700/50 rounded-lg p-5 border border-gray-600">
            <label className="text-white font-semibold mb-3 flex items-center gap-2">
              <FaUserShield className="text-blue-400" />
              Select Role:
            </label>

            <select
              {...register("role")}
              className="select select-bordered w-full bg-gray-800 text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
            >
              <option value="customer" className="bg-gray-800">
                Customer
              </option>
              <option value="admin" className="bg-gray-800">
                Admin
              </option>
            </select>

            {errors.role && (
              <div className="mt-2 text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded border border-red-500/30">
                {errors.role.message}
              </div>
            )}

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-start gap-2 text-gray-300">
                <FaUserTie className="text-gray-400 mt-1 shrink-0" />
                <span>
                  <strong>Customer:</strong> Standard user access
                </span>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <FaUserShield className="text-blue-400 mt-1 shrink-0" />
                <span>
                  <strong>Admin:</strong> Full system privileges
                </span>
              </div>
            </div>
          </div>

          <div className="modal-action flex flex-col sm:flex-row gap-3 justify-center mt-2">
            <button
              type="submit"
              className="btn bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 px-6 w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <MdAdminPanelSettings className="text-lg" />
                  <span>Update Role</span>
                </>
              )}
            </button>
            <button
              className="btn bg-gray-700 hover:bg-gray-600 text-white border-gray-600 shadow-lg transition-all duration-300 px-6 w-full sm:w-auto"
              type="button"
              onClick={() => {
                (document.getElementById("role") as HTMLDialogElement)?.close();
                reset();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
