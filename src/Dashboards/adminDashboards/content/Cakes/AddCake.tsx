/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

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

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddCakeInputs>({
    resolver: yupResolver(schema),
  });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sweetDelights");
    formData.append("cloud_name", "dmskflgvr");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dmskflgvr/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      setValue("imageURL", imageUrl);
      setImagePreview(imageUrl);
      toast.success("Image uploaded successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit: SubmitHandler<AddCakeInputs> = async (data) => {
    try {
      await addCake(data).unwrap();
      toast.success("Cake added successfully");
      (document.getElementById("newcake") as HTMLDialogElement)?.close();
    } catch (error) {
      toast.error("Error adding cake" + (error as Error).message);
    }
  };
  return (
    <dialog id="newcake" className="modal sm:modal-middle">
      <div className="modal-box w-full max-w-2xl bg-white px-0 py-0 text-gray-900">
        <div className="bg-linear-to-r from-purple-600 via-pink-500 to-indigo-500 px-6 py-5 text-white rounded-t-2xl">
          <p className="text-sm uppercase tracking-widest text-white/80">
            Inventory
          </p>
          <h3 className="text-2xl font-semibold">Add New Cake</h3>
          <p className="text-sm text-white/80">
            Provide details for the ready-made cake you want to stock.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 px-6 py-6"
          data-test="add-new-cake-form"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Cake name
              <input
                data-test="add-new-cake-cakeName"
                id="cakeName"
                type="text"
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
                data-test="add-new-cake-flavorsUsed"
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
                data-test="add-new-cake-size"
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
                data-test="add-new-cake-quantityAvailable"
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
              data-test="add-new-cake-imageURL"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadingImage}
              className="file:mr-5 file:py-1 file:px-3 
              file:border-gray-300 file:rounded-md file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
            />
            {uploadingImage && (
              <span className="text-xs text-blue-600 flex items-center gap-2">
                <span className="loading loading-spinner loading-xs" />
                Uploading image...
              </span>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mt-2"
              />
            )}
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
                  document.getElementById("newcake") as HTMLDialogElement
                )?.close();
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              data-test="add-new-cake-submit-button"
              type="submit"
              className="btn btn-primary order-1 w-full sm:order-2 sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner text-primary" />
              ) : (
                "Save cake"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
