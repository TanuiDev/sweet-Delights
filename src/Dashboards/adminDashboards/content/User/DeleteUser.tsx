import { toast } from "sonner";
import { FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import userApi, { type Tuser } from "../../../../features/Auth/userApi";

type DeleteUserProps = {
  user: Tuser | null;
};

export const DeleteUser = ({ user }: DeleteUserProps) => {
  const [deleteUser, { isLoading }] = userApi.useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      if (!user) {
        toast.error("No user selected for deletion.");
        return;
      }
      await deleteUser(user.user_Id);
      toast.success("User deleted Successfully");
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <dialog
      id="delete_modal"
      className="modal sm:modal-middle backdrop-blur-sm"
    >
      <div className="modal-box bg-linear-to-br from-gray-800 to-gray-900 text-white w-full max-w-xs sm:max-w-md mx-auto rounded-2xl shadow-2xl border border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <button
          type="button"
          onClick={() =>
            (
              document.getElementById("delete_modal") as HTMLDialogElement
            )?.close()
          }
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10"
          aria-label="Close"
        >
          <IoClose size={24} />
        </button>

        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-red-500/20 p-4 rounded-full border-2 border-red-500/50">
              <FaExclamationTriangle className="text-red-500 text-4xl" />
            </div>
          </div>
        </div>

        <h3 className="font-bold text-2xl mb-3 text-center bg-linear-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          Delete User
        </h3>

        <div className="bg-gray-700/50 rounded-lg p-4 mb-6 border border-gray-600">
          <p className="text-center text-gray-200 leading-relaxed">
            Are you sure you want to permanently delete{" "}
            <span className="font-bold text-white bg-red-500/20 px-2 py-1 rounded">
              {user?.name}
            </span>
            ?
          </p>
          <p className="text-center text-sm text-gray-400 mt-2">
            This action cannot be undone.
          </p>
        </div>

        <div className="modal-action flex gap-3 justify-center mt-6">
          <button
            data-test="delete-user-confirm-button"
            className="btn bg-linear-to-r from-pink-600 to-pink-700 hover:from-red-700 hover:to-red-800 text-white border-none shadow-lg hover:shadow-red-500/50 transition-all duration-300 flex items-center gap-2 px-6"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <FaTrashAlt className="text-lg" />
                <span>Yes, Delete</span>
              </>
            )}
          </button>
          <button
            className="btn bg-gray-700 hover:bg-gray-600 text-white border-gray-600 shadow-lg transition-all duration-300 px-6"
            type="button"
            onClick={() =>
              (
                document.getElementById("delete_modal") as HTMLDialogElement
              )?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};
