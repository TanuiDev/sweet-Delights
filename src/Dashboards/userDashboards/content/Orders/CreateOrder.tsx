import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "sonner";
import orderApi from "../../../../features/Auth/orderAPI";

type PlaceOrderInputs = {
  Size: string;
  Flavor: string;
  Message: string;
  DeliveryDate: string;
  Notes: string;
  ExtendedDescription: string;
  SampleImages: (string | undefined)[];
  ColorPreferences: string;
};

const schema = yup.object({
  Size: yup.string().required("Size is required"),
  Flavor: yup.string().required("Flavor is required"),
  Message: yup.string().required("Message is required"),
  DeliveryDate: yup.string().required("Delivery Date is required"),
  Notes: yup.string().required("Notes are required"),
  ExtendedDescription: yup
    .string()
    .required("Extended Description is required"),
  SampleImages: yup
    .array()
    .of(yup.string())
    .required("Sample Images are required"),
  ColorPreferences: yup.string().required("Color Preferences are required"),
});

export const AddCake = () => {
  const [placeOrder, { isLoading }] = orderApi.useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlaceOrderInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<PlaceOrderInputs> = async (data) => {
    try {
      const payload = {
        ...data,
        SampleImages: (data.SampleImages || []).filter(
          (s): s is string => s !== undefined && s !== null,
        ),
      };
      await placeOrder(payload).unwrap();
      toast.success("Cake added successfully");
      (document.getElementById("newcake") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error adding cake:", error);
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
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Cake Size
              <select
                {...register("Size")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              {errors.Size && (
                <span className="text-xs font-normal text-red-600">
                  {errors.Size.message}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Cake flavor
              <input
                type="text"
                {...register("Flavor")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
              />
              {errors.Flavor && (
                <span className="text-xs font-normal text-red-600">
                  {errors.Flavor.message}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Message on Cake
              <input
                type="text"
                {...register("Message")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
              />
              {errors.Message && (
                <span className="text-xs font-normal text-red-600">
                  {errors.Message.message}
                </span>
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Notes
              <input
                type="text"
                {...register("Notes")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Delivery Date
              <input
                type="date"
                {...register("DeliveryDate")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Color Preferences
              <input
                type="text"
                {...register("ColorPreferences")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Extended Description
              <textarea
                {...register("ExtendedDescription")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Sample Images (comma separated URLs)
              <input
                type="file"
                multiple
                {...register("SampleImages")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white"
              />
            </label>
          </div>
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
