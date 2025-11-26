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
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <dialog id="delete_cake" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Cake</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{cake?.cakeName}</span>?
        </p>
        <div className="modal-action flex gap-4">
          <button
            data-test="delete-cake-confirm-button"
            className="btn btn-error"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-primary" />{" "}
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
          <button
            className="btn"
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
    </dialog>
  );
};
