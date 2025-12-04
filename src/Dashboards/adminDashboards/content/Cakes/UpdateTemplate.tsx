import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import templatesApi, {
  type Tdesigns,
} from "../../../../features/Cakes/templatesAPI";
import { toast } from "sonner";

type UpdateDesignProps = {
  design: Tdesigns | null;
};

type UpdateDesign = {
  DesignName: string;
  description: string;
  BasePrice: number;
  availability: boolean;
  BaseFlavor: string;
  Size: string;
  Category: string;
  Images: string;
};

const schema = yup.object({
  DesignName: yup
    .string()
    .max(75, "Max 75 characters")
    .required("Design name is required"),
  description: yup
    .string()
    .max(255, "Max 255 characters")
    .required("Description is required"),
  BasePrice: yup
    .number()
    .required("Base Price is required")
    .positive("Base Price must be a positive number"),
  availability: yup.boolean().default(true),
  BaseFlavor: yup
    .string()
    .max(50, "Max 50 characters")
    .required("Base Flavor is required"),
  Size: yup.string().max(20, "Max 20 characters").required("Size is required"),
  Category: yup
    .string()
    .max(50, "Max 50 characters")
    .required("Category is required"),
  Images: yup.string().required("Image URL is required"),
});

export const UpdateTemplate = ({ design }: UpdateDesignProps) => {
  const [updateData, { isLoading }] = templatesApi.useUpdateDesignMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateDesign>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (design) {
      setValue("DesignName", design.DesignName);
      setValue("description", design.Description);
      setValue("BasePrice", design.BasePrice);
      setValue("BaseFlavor", design.BaseFlavor);
      setValue("Size", design.Size);
      setValue("Category", design.Category);
      setValue("availability", design.Availability);
      setValue("Images", design.ImageUrl);
    } else {
      reset();
    }
  }, [design, setValue, reset]);

  const onSubmit: SubmitHandler<UpdateDesign> = async (data) => {
    console.log(data);
    try {
      if (!design) {
        toast.error("No design selected for update.");
        return;
      }

      const res = await updateData({ DesignID: design.DesignID, ...data });
      console.log(res.data);
      toast("Design updated successfully!");
      (
        document.getElementById("update_template") as HTMLDialogElement
      )?.close();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to update Template. Please try again.");
    }
  };
  return (
    <dialog id="update_template" className="modal sm:modal-middle">
      <div
        data-test="update-template-modal"
        className="modal-box relative overflow-hidden border border-white/60 bg-linear-to-br from-white via-purple-50/30 to-pink-50/40 backdrop-blur-xl shadow-2xl shadow-purple-200/50 w-full max-w-2xl mx-auto rounded-3xl p-0 max-h-[90vh] flex flex-col"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />

        <div className="relative z-10 flex-linear-0 p-8 pb-4 border-b border-purple-100/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-black tracking-tight bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Update Template
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Modify your cake design details
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                (
                  document.getElementById(
                    "update_template",
                  ) as HTMLDialogElement
                )?.close();
                reset();
              }}
              className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto px-8 py-6">
          <form
            data-test="update-template-form"
            onSubmit={handleSubmit(onSubmit)}
            id="update-form"
            className="space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Design Name <span className="text-red-500">*</span>
              </label>
              <input
                data-test="edit-design-name-input"
                type="text"
                {...register("DesignName")}
                placeholder="Enter design name"
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
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                data-test="edit-description-input"
                {...register("description")}
                placeholder="Enter description"
                rows={4}
                className="textarea w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none resize-none"
              />
              {errors.description && (
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span>⚠</span> {errors.description.message}
                </span>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Base Price <span className="text-red-500">*</span>
                </label>
                <input
                  data-test="edit-base-price-input"
                  type="number"
                  {...register("BasePrice")}
                  placeholder="0.00"
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
                  Size <span className="text-red-500">*</span>
                </label>
                <input
                  data-test="edit-size-input"
                  type="text"
                  {...register("Size")}
                  placeholder="e.g., Small, Medium, Large"
                  className="input w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                />
                {errors.Size && (
                  <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                    <span>⚠</span> {errors.Size.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Base Flavor <span className="text-red-500">*</span>
                </label>
                <input
                  data-test="edit-base-flavor-input"
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  data-test="edit-category-input"
                  type="text"
                  {...register("Category")}
                  placeholder="e.g., Birthday, Wedding"
                  className="input w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                />
                {errors.Category && (
                  <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                    <span>⚠</span> {errors.Category.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                data-test="edit-image-input"
                type="file"
                {...register("Images")}
                placeholder="https://example.com/image.jpg"
                className="input w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
              />
              {errors.Images && (
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span>⚠</span> {errors.Images.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Availability Status <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 rounded-2xl border-2 border-gray-200 bg-white p-4">
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 transition-all hover:bg-gray-100 has-checked:border-red-300 has-checked:bg-red-50">
                  <input
                    data-test="edit-availability-Unavailable"
                    type="radio"
                    value="false"
                    {...register("availability")}
                    className="radio radio-error"
                  />
                  <span className="font-semibold text-gray-700">
                    Unavailable
                  </span>
                </label>
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-gray-50 px-4 py-3 transition-all hover:bg-gray-100 has-checked:border-green-300 has-checked:bg-green-50">
                  <input
                    data-test="edit-availability-Available"
                    type="radio"
                    value="true"
                    {...register("availability")}
                    className="radio radio-success"
                  />
                  <span className="font-semibold text-gray-700">Available</span>
                </label>
              </div>
              {errors.availability && (
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span>⚠</span> {errors.availability.message}
                </span>
              )}
            </div>
          </form>
        </div>

        <div className="relative z-10 shrink-0 border-t border-purple-100/50 bg-white/50 backdrop-blur-sm px-8 py-4">
          <div className="flex gap-3">
            <button
              data-test="update-template-button"
              type="submit"
              form="update-form"
              className="btn flex-1 rounded-2xl bg-linear-to-r from-purple-500 via-pink-500 to-indigo-500 border-none px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-pink-500/30 transition-all hover:translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Updating...
                </>
              ) : (
                "Update Template"
              )}
            </button>
            <button
              data-test="cancel-update-button"
              className="btn btn-ghost rounded-2xl border-2 border-gray-200 px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
              type="button"
              onClick={() => {
                (
                  document.getElementById(
                    "update_template",
                  ) as HTMLDialogElement
                )?.close();
                reset();
              }}
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
