import { toast } from "sonner";
import cakeApi, { type Tcakes } from "../../../../features/Cakes/cakeAPI";

type DeleteProps = {
  cake: Tcakes | null;
};

export const DeleteCake = ({ cake }: DeleteProps) => {
  const [deleteCake, { isLoading }] = cakeApi.useDeleteCakeMutation();

  const handleDelete = async () => {
    try {
      if (!cake) {
        toast.error("No cake selected for deletion.");
        return;
      }
      await deleteCake(cake.cakeId);
      toast.success("Cake deleted Successfully");
      (document.getElementById("delete_cake") as HTMLDialogElement)?.close();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <dialog id="delete_cake" className="modal sm:modal-middle">
      <div className="modal-box relative overflow-hidden border border-white/60 bg-gradient-to-br from-white via-red-50/30 to-pink-50/40 backdrop-blur-xl shadow-2xl shadow-red-200/50 w-full max-w-lg mx-auto rounded-3xl p-0">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-pink-200/30 blur-3xl" />

        {/* Header */}
        <div className="relative z-10 flex-shrink-0 p-8 pb-4 border-b border-red-100/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-black tracking-tight bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Delete Cake
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This action cannot be undone
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                (
                  document.getElementById("delete_cake") as HTMLDialogElement
                )?.close()
              }
              className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 px-8 py-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Warning Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-pink-100">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Warning Message */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-800">
                Are you sure you want to delete this cake?
              </p>
              <p className="text-base text-gray-600">
                The cake{" "}
                <span className="font-bold text-red-600">{cake?.cakeName}</span>{" "}
                will be permanently removed from the system.
              </p>
            </div>

            {/* Warning Box */}
            <div className="w-full rounded-2xl border-2 border-red-200 bg-red-50/80 p-4">
              <p className="text-sm font-medium text-red-800">
                ⚠️ This action cannot be undone. All associated data will be
                permanently deleted.
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className="relative z-10 flex-shrink-0 border-t border-red-100/50 bg-white/50 backdrop-blur-sm px-8 py-4">
          <div className="flex gap-3">
            <button
              data-test="delete-cake-confirm-button"
              className="btn flex-1 rounded-2xl bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 border-none px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/30 transition-all hover:translate-y-0.5 hover:shadow-xl hover:shadow-red-500/40 disabled:opacity-50"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Deleting...
                </>
              ) : (
                "Yes, Delete"
              )}
            </button>
            <button
              className="btn btn-ghost rounded-2xl border-2 border-gray-200 px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
              type="button"
              onClick={() =>
                (
                  document.getElementById("delete_cake") as HTMLDialogElement
                )?.close()
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
