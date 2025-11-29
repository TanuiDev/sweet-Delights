import { toast } from "sonner";
import type { Tdesigns } from "../../../../features/Cakes/templatesAPI";
import templatesApi from "../../../../features/Cakes/templatesAPI";

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
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <dialog id="delete_design" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Template</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{design?.DesignName}</span>?
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
                document.getElementById("delete_design") as HTMLDialogElement
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
