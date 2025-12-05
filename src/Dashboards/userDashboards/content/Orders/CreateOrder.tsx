import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";

import { toast } from "sonner";
import orderApi from "../../../../features/Auth/orderAPI";

type PlaceOrderInputs = {
  Size: string;
  Flavor: string;
  Message: string;
  DeliveryDate: string;
  Notes: string;
  ExtendedDescription: string;
  SampleImages: string;
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
  SampleImages: yup.string().required("Image URL is required"),
  ColorPreferences: yup.string().required("Color Preferences are required"),
});

export const CreateOrder = () => {
  const [placeOrders, { isLoading }] = orderApi.useCreateOrderMutation();
  const user = useSelector((state: RootState) => state.user.user);
  const user_id = user?.user_id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlaceOrderInputs>({
    resolver: yupResolver(schema),
  });

  const onPlaceOrder: SubmitHandler<PlaceOrderInputs> = async (data) => {
    if (!user_id) {
      toast.error("Please log in to place an order");
      return;
    }
    const payload = {
      ...data,
      user_id: user_id,
    };

    try {
      await placeOrders(payload).unwrap();
      toast.success("Order placed successfully");
      (document.getElementById("newOrder") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  return (
    <dialog data-test="create-order-dialog" id="newOrder" className="modal sm:modal-middle">
      <div className="modal-box w-full max-w-2xl bg-white px-0 py-0 text-gray-900 shadow-xl rounded-3xl">
        <div className="bg-linear-to-r from-purple-600 via-pink-500 to-indigo-500 px-6 py-5 text-white rounded-t-3xl border-b border-white/20">
          <p  className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/80">
            Orders
          </p>
          <h3 className="mt-1 text-2xl sm:text-3xl font-semibold">
            Place New Order
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-white/80">
            Provide delightful details for your custom cake so we can craft it
            perfectly.
          </p>
        </div>

        <form
          data-test="create-order-form"
          onSubmit={handleSubmit(onPlaceOrder)}
          className="flex max-h-[70vh] flex-col gap-6 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
              <span className="flex items-center justify-between">
                <span>Cake Size</span>
                <span className="text-[10px] rounded-full bg-purple-50 px-2 py-0.5 text-purple-600">
                  Required
                </span>
              </span>
              <select
                data-test="create-order-size"
                {...register("Size")}
                className="select select-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
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

            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
              Cake Flavor
              <input
                  data-test="create-order-flavor"
                type="text"
                placeholder="e.g. Vanilla, Chocolate, Red Velvet"
                {...register("Flavor")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
              {errors.Flavor && (
                <span className="text-xs font-normal text-red-600">
                  {errors.Flavor.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700 md:col-span-2">
              Message on Cake
              <input
                  data-test="create-order-message"
                type="text"
                placeholder="Happy Birthday Sarah!"
                {...register("Message")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
              {errors.Message && (
                <span className="text-xs font-normal text-red-600">
                  {errors.Message.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
              Notes
              <input
                data-test="create-order-notes"
                type="text"
                placeholder="Allergies, serving count, or special requests"
                {...register("Notes")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
              Delivery Date
              <input
                data-test="create-order-delivery-date"
                type="date"
                {...register("DeliveryDate")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
              {errors.DeliveryDate && (
                <span className="text-xs font-normal text-red-600">
                  {errors.DeliveryDate.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
              Color Preferences
              <input
                data-test="create-order-color-preferences"
                type="text"
                placeholder="Pastels, gold accents, brand colors..."
                {...register("ColorPreferences")}
                className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
              {errors.ColorPreferences && (
                <span className="text-xs font-normal text-red-600">
                  {errors.ColorPreferences.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700 md:col-span-2">
              Extended Description
              <textarea
                data-test="create-order-extended-description"
                {...register("ExtendedDescription")}
                placeholder="Describe your dream cake in detail – theme, layers, fillings, decorations, and more."
                className="textarea textarea-bordered min-h-28 w-full resize-y bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
              {errors.ExtendedDescription && (
                <span className="text-xs font-normal text-red-600">
                  {errors.ExtendedDescription.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700 md:col-span-2">
              Sample Images
              <span className="text-xs font-normal text-gray-500">
                Upload 1–3 inspiration photos to help us match your desired
                style.
              </span>
              <input
                data-test="create-order-sample-images"  
                type="file"
                multiple
                {...register("SampleImages")}
                className="file-input file-input-bordered w-full bg-gray-50 focus:bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
              {errors.SampleImages && (
                <span className="text-xs font-normal text-red-600">
                  {errors.SampleImages.message}
                </span>
              )}
            </label>
          </div>

          <div className="mt-2 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              data-test="create-order-cancel-btn"
              className="btn btn-ghost order-2 w-full sm:order-1 sm:w-auto"
              type="button"
              onClick={() => {
                (
                  document.getElementById("newOrder") as HTMLDialogElement
                )?.close();
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              data-test="create-order-submit-btn"
              type="submit"
              className="btn btn-primary order-1 w-full sm:order-2 sm:w-auto gap-2"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="loading loading-spinner loading-sm text-primary-content" />
              )}
              <span>{isLoading ? "Placing Order..." : "Place Order"}</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
