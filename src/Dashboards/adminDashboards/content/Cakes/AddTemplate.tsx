import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "sonner";
import templatesApi from "../../../../features/Cakes/templatesAPI";

type AddTemplateInputs = {
  DesignName: string;
  Description: string;
  BasePrice: number;
  Availability: boolean;
  BaseFlavor: string;
  Size: string;
  ImageUrl: string;
  QuantityAvailable: number;
  Category: string;
};

const schema = yup.object({
  DesignName: yup.string().required("Design Name is required"),
  Description: yup.string().required("Description is required"),
  Size: yup.string().required("Size is required"),
  ImageUrl: yup.string().required("Image URL is required"),
  BaseFlavor: yup.string().required("Base Flavor is required"),
  Category: yup.string().required("Category is required"),

  BasePrice: yup
    .number()
    .required("Base Price is required")
    .min(1000, "Base Price must be at least 1000"),
  Availability: yup.boolean().required("Availability is required"),
  QuantityAvailable: yup
    .number()
    .required("Quantity Available is required")
    .min(0, "Quantity must be 0 or greater"),
});

export const AddTemplate = () => {
  const [addDesign, { isLoading }] = templatesApi.useAddDesignMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTemplateInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      QuantityAvailable: 0,
      Availability: true,
    },
  });

  const onsubmit: SubmitHandler<AddTemplateInputs> = async (data) => {
    try {
      await addDesign(data).unwrap();
      toast.success("Design added successfully");
      (document.getElementById("newdesign") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error adding design:", error);
      toast.error("Failed to add design. Please try again.");
    }
  };

  return (
    <dialog id="newdesign" className="modal sm:modal-middle">
      <div className="modal-box relative overflow-hidden border border-white/60 bg-linear-to-br from-white via-purple-50/30 to-pink-50/40 backdrop-blur-xl shadow-2xl shadow-purple-200/50 w-full max-w-2xl mx-auto rounded-3xl p-0 max-h-[90vh] flex flex-col">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />

        {/* Header - Fixed */}
        <div className="relative z-10 shrink-0 p-8 pb-4 border-b border-purple-100/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-purple-600 font-semibold mb-1">
                Inventory
              </p>
              <h3 className="text-3xl font-black tracking-tight bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Add New Cake Template
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Provide details for the ready-made cake you want to stock
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                (
                  document.getElementById("newdesign") as HTMLDialogElement
                )?.close();
              }}
              className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        
        <div className="relative z-10 flex-1 overflow-y-auto px-8 py-6">
          <form
            data-test="add-template-form"
            onSubmit={handleSubmit(onsubmit)}
            id="add-template-form"
            className="space-y-5"
          >
            
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Cake Name <span className="text-red-500">*</span>
                </label>
                <input
                  data-test="add-new-template-designName"
                  id="cakeName"
                  type="text"
                  {...register("DesignName")}
                  placeholder="e.g. Velvet Berry Bliss"
                  className="input w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                />
                {errors.DesignName && (
                  <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                    <span>⚠</span> {errors.DesignName.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Base Flavor <span className="text-red-500">*</span>
                </label>
                <input
                  data-test="add-new-template-baseFlavor"
                  type="text"
                  {...register("BaseFlavor")}
                  placeholder="e.g., Vanilla, Chocolate"
                  className="input w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                />
                {errors.BaseFlavor && (
                  <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                    <span>⚠</span> {errors.BaseFlavor.message}
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Size <span className="text-red-500">*</span>
                </label>
                <input
                  data-test="add-new-template-sizeOptions"
                  type="text"
                  {...register("Size")}
                  placeholder="e.g., 8-inch round, serves 10"
                  className="input w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                />
                {errors.Size && (
                  <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                    <span>⚠</span> {errors.Size.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Quantity Available
                </label>
                <input
                  data-test="add-new-template-quantityAvailable"
                  type="number"
                  min={0}
                  {...register("QuantityAvailable")}
                  placeholder="10"
                  className="input w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                />
                {errors.QuantityAvailable && (
                  <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                    <span>⚠</span> {errors.QuantityAvailable.message}
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Base Price <span className="text-red-500">*</span>
              </label>
              <input
                data-test="add-new-template-basePrice"  
                type="number"
                min={1000}
                step="0.01"
                {...register("BasePrice")}
                placeholder="1000.00"
                className="input w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
              />
              {errors.BasePrice && (
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span>⚠</span> {errors.BasePrice.message}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                data-test="add-new-template-description"
                {...register("Description")}
                placeholder="Enter a detailed description of the cake..."
                rows={4}
                className="textarea w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none resize-none"
              />
              {errors.Description && (
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span>⚠</span> {errors.Description.message}
                </span>
              )}
            </div>
           
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Select Images <span className="text-red-500">*</span>
              </label>
              <input
                data-test="add-new-template-imageURL"
                type="file"
                {...register("ImageUrl")}
                multiple
                className="file-input w-full rounded-2xl border-2 border-gray-200 bg-white file:mr-4 file:rounded-xl file:border-0 file:bg-linear-to-r file:from-purple-500 file:to-pink-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:cursor-pointer hover:file:opacity-90 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
              />
              {errors.ImageUrl && (
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span>⚠</span> {errors.ImageUrl.message}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-test="add-new-template-category"
                {...register("Category")}
                placeholder="e.g., Birthday, Wedding"
                className="input w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
              />
              {errors.Category && (
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span><></></span> {errors.Category.message}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-4">
              <input
                data-test="add-new-template-availability"
                type="checkbox"
                {...register("Availability")}
                className="checkbox checkbox-primary checkbox-lg"
              />
              <label className="text-sm font-semibold text-gray-700 cursor-pointer">
                Available for order
              </label>
            </div>
            {errors.Availability && (
              <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                <span>⚠</span> {errors.Availability.message}
              </span>
            )}
          </form>
        </div>

        <div className="relative z-10 shrink-0 border-t border-purple-100/50 bg-white/50 backdrop-blur-sm px-8 py-4">
          <div className="flex gap-3">
            <button
            data-test="add-new-template-submit-button"
              type="submit"
              form="add-template-form"
              className="btn flex-1 rounded-2xl bg-linear-to-r from-purple-500 via-pink-500 to-indigo-500 border-none px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-pink-500/30 transition-all hover:translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Adding...
                </>
              ) : (
                "Add Template"
              )}
            </button>
            <button
              data-test="add-new-template-cancel-button"
              className="btn btn-ghost rounded-2xl border-2 border-gray-200 px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
              type="button"
              onClick={() => {
                (
                  document.getElementById("newdesign") as HTMLDialogElement
                )?.close();
              }}
              disabled={isLoading}
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
