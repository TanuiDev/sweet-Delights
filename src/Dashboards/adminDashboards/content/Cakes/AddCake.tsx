import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

import { toast } from "sonner";
import cakeApi from "../../../../features/Cakes/cakeAPI";

type AddCakeInputs = {
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

export const AddCake = () => {
  const [addCake, { isLoading }] = cakeApi.useAddCakeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCakeInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<AddCakeInputs> = async (data) => {
    try {
      await addCake(data).unwrap();
      toast.success("Cake added successfully");
      (document.getElementById("newcake") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error adding cake:", error);
    }
  };
  return (
    <dialog id="newcake" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Add New Cake</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            id="cakeName"
            type="text"
            {...register("cakeName")}
            className="input input-bordered w-full"
            placeholder="Cake Name"
          />
          {errors.cakeName && (
            <span className="text-sm text-red-700">
              {errors.cakeName.message}
            </span>
          )}
          <input
            type="text"
            {...register("flavorsUsed")}
            className="input input-bordered w-full"
            placeholder="Flavors Used"
          />
          {errors.flavorsUsed && (
            <span className="text-sm text-red-700">
              {errors.flavorsUsed.message}
            </span>
          )}
          <input
            type="text"
            {...register("size")}
            className="input input-bordered w-full"
            placeholder="Size"
          />
          {errors.size && (
            <span className="text-sm text-red-700">{errors.size.message}</span>
          )}
          <input
            type="file"
            {...register("imageURL")}
            className="input input-bordered w-full"
            placeholder="Image URL"
          />
          {errors.imageURL && (
            <span className="text-sm text-red-700">
              {errors.imageURL.message}
            </span>
          )}
          <input
            type="number"
            {...register("quantityAvailable")}
            className="input input-bordered w-full"
            placeholder="Quantity Available"
          />
          {errors.quantityAvailable && (
            <span className="text-sm text-red-700">
              {errors.quantityAvailable.message}
            </span>
          )}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner text-primary" />
            ) : (
              "Add Cake"
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
};
