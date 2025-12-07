import { toast } from "sonner";
import type { Tdesigns } from "../../../../features/Cakes/templatesAPI";
import templatesApi from "../../../../features/Cakes/templatesAPI";
import { IoClose } from "react-icons/io5";
import { FaExclamationTriangle, FaTrashAlt } from "react-icons/fa";

type DeleteProps = {
  design: Tdesigns | null;
};

export const DeleteDesign = ({ design }: DeleteProps) => {
  const [deleteDesign, { isLoading }] = templatesApi.useDeleteDesignMutation();

  const handleDelete = async () => {
    try {
      if (!design) {
        toast.error("No design selected for deletion.");
        return;
      }
      await deleteDesign(design.DesignID);
      toast.success("Design deleted Successfully");
      (document.getElementById("delete_design") as HTMLDialogElement)?.close();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <dialog id="delete_design" className="modal sm:modal-middle">
      <div
        data-test="delete-design-modal"
        className="modal-box relative overflow-hidden border border-red-500/20 bg-linear-to-br from-gray-800 via-gray-900 to-black backdrop-blur-xl shadow-2xl shadow-red-500/30 w-full max-w-lg mx-auto rounded-3xl p-0"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-red-600/10 blur-3xl" />

        <div className="relative z-10 shrink-0 p-6 border-b border-red-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold bg-linear-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                Delete Template
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                This action cannot be undone
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                (
                  document.getElementById("delete_design") as HTMLDialogElement
                )?.close()
              }
              className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        </div>

        <div className="relative z-10 px-6 py-6">
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 ring-4 ring-red-500/20 animate-pulse">
              <FaExclamationTriangle className="h-10 w-10 text-red-400" />
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl" />
            </div>

            <div className="space-y-2">
              <p className="text-base font-semibold text-gray-100">
                Are you sure you want to delete this template?
              </p>
              <p className="text-sm text-gray-300">
                The template{" "}
                <span className="font-bold text-red-400">
                  {design?.DesignName}
                </span>{" "}
                will be permanently removed from the system.
              </p>
            </div>

            <div className="w-full rounded-xl border border-red-500/30 bg-red-500/5 backdrop-blur-sm p-4">
              <p className="text-xs font-medium text-red-300">
                This action cannot be undone. All associated data will be
                permanently deleted.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 shrink-0 border-t border-red-500/20 bg-gray-800/50 backdrop-blur-sm px-6 py-4">
          <div className="flex gap-3">
            <button
              data-test="delete-design-confirm-button"
              className="btn flex-1 rounded-xl bg-linear-to-r from-red-600 to-red-700 border-none px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:shadow-xl hover:shadow-red-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Deleting...
                </>
              ) : (
                <>
                  <FaTrashAlt className="mr-2" />
                  Yes, Delete
                </>
              )}
            </button>
            <button
              className="btn btn-ghost rounded-xl border border-gray-600 px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700/50 hover:text-white"
              type="button"
              onClick={() =>
                (
                  document.getElementById("delete_design") as HTMLDialogElement
                )?.close()
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
