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
  Images: yup
    .string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
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

  // popilate the form with the data to update
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

      const res = await updateData({ ...data, DesignID: design.DesignID });
      console.log(res.data);
      // toast(res.data?.message || "Design updated successfully!");
      (document.getElementById("update_modal") as HTMLDialogElement)?.close();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to update todo. Please try again.");
    }
  };
  return (
    <dialog id="update_template" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Todo</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            data-test="edit-todo-name-input"
            type="text"
            {...register("DesignName")}
            placeholder="Design Name"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.DesignName && (
            <span className="text-sm text-red-700">
              {errors.DesignName.message}
            </span>
          )}

          <textarea
            data-test="edit-todo-description-input"
            {...register("description")}
            placeholder="Description"
            className="textarea textarea-bordered w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.description && (
            <span className="text-sm text-red-700">
              {errors.description.message}
            </span>
          )}

          <input
            data-test="edit-todo-userid-input"
            type="number"
            {...register("BasePrice")}
            placeholder="Base Price"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.BasePrice && (
            <span className="text-sm text-red-700">
              {errors.BasePrice.message}
            </span>
          )}
          <input
            data-test="edit-todo-userid-input"
            type="text"
            {...register("Size")}
            placeholder="Size"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.Size && (
            <span className="text-sm text-red-700">{errors.Size.message}</span>
          )}

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-4 text-white">Status</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    data-test="edit-todo-status-completed"
                    type="radio"
                    value="false"
                    {...register("availability")}
                    className="radio radio-primary text-green-400"
                  />
                  Completed
                </label>
                <label className="flex items-center gap-1">
                  <input
                    data-test="edit-todo-status-pending"
                    type="radio"
                    value="true"
                    {...register("availability")}
                    className="radio radio-primary text-yellow-400"
                  />
                  Pending
                </label>
              </div>
            </label>
          </div>
          {errors.availability && (
            <span className="text-sm text-red-700">
              {errors.availability.message}
            </span>
          )}

          <div className="modal-action">
            <button
              data-test="update-todo-button"
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" />{" "}
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
            <button
              className="btn"
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
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
