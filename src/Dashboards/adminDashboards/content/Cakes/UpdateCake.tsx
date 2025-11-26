import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "sonner";
import cakeApi, { type Tcakes } from "../../../../features/Cakes/cakeAPI";

// type UpdateCakeProps = {
//   cake: Tcakes | null;
// };

type UpdateCakeInputs = {
  cakeName: string;
  flavorsUsed: string;
  size: string;
  imageURL: string;
  quantityAvailable: number;
};

const schema = yup.object({
  cakeName: yup.string().required("Cake Name is required"),
  flavorsUsed: yup.string().required("Flavors Used is required"),
  size: yup.string().required("Size is required"),
  imageURL: yup.string().required("Image URL is required"),
  quantityAvailable: yup.number().required("Quantity Available is required"),
});

type ChangeCakeProps = {
  cake: Tcakes;
};
export const UpdateCake = ({ cake }: ChangeCakeProps) => {
  const [updateCake, { isLoading }] = cakeApi.useUpdateCakeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCakeInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UpdateCakeInputs> = async (data) => {
    try {
      await updateCake(data).unwrap();
      await updateCake({ cakeId: cake?.cakeId, ...data });
      toast.success("Cake updated successfully");
      (document.getElementById("updatecake") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating cake:", error);
    }
  };
  return (
    <dialog id="updatecake" className="modal sm:modal-middle">
      <div className="modal-box w-full max-w-2xl bg-white px-0 py-0 text-gray-900">
        <div className="bg-linear-to-r from-purple-600 via-pink-500 to-indigo-500 px-6 py-5 text-white rounded-t-2xl">
          <p className="text-sm uppercase tracking-widest text-white/80">
            Inventory
          </p>
          <h3 className="text-2xl font-semibold">Update Cake</h3>
          <p className="text-sm text-white/80">
            Provide details for the ready-made cake you want to update.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 px-6 py-6"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Cake name
              <input
                id="cakeName"
                type="text"
                defaultValue={""}
                {...register("cakeName")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
                placeholder="e.g. Velvet Berry Bliss"
              />
              {errors.cakeName && (
                <span className="text-xs font-normal text-red-600">
                  {errors.cakeName.message}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Flavors used
              <input
                type="text"
                {...register("flavorsUsed")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
                placeholder="Strawberry • Vanilla • White chocolate"
              />
              {errors.flavorsUsed && (
                <span className="text-xs font-normal text-red-600">
                  {errors.flavorsUsed.message}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Size
              <input
                type="text"
                {...register("size")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
                placeholder="8-inch round, serves 10"
              />
              {errors.size && (
                <span className="text-xs font-normal text-red-600">
                  {errors.size.message}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Quantity available
              <input
                type="number"
                min={0}
                {...register("quantityAvailable")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
                placeholder="12"
              />
              {errors.quantityAvailable && (
                <span className="text-xs font-normal text-red-600">
                  {errors.quantityAvailable.message}
                </span>
              )}
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Select Images
            <input
              type="file"
              {...register("imageURL")}
              className="file:mr-5 file:py-1 file:px-3 
              file:border-gray-300 file:rounded-md file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
              multiple
            />
            {errors.imageURL && (
              <span className="text-xs font-normal text-red-600">
                {errors.imageURL.message}
              </span>
            )}
          </label>
          <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
            <button
              className="btn btn-ghost order-2 w-full sm:order-1 sm:w-auto"
              type="button"
              onClick={() => {
                (
                  document.getElementById("updatecake") as HTMLDialogElement
                )?.close();
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary order-1 w-full sm:order-2 sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner text-primary" />
              ) : (
                "Save Updates"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
