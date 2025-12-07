import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

import { toast } from "sonner";

import orderApi, { type Torders } from "../../../../features/Auth/orderAPI";

const schema = yup.object({
  Status: yup
    .string()
    .oneOf(["Pending", "In Progress", "Completed", "Delivered", "Cancelled"])
    .required("Status is required"),
});

type ChangeStatusInputs = {
  Status: "Pending" | "In Progress" | "Completed" | "Delivered" | "Cancelled";
};

type ChangeStatusProps = {
  order: Torders | null;
};

export const UpdateOrderStatus = ({ order }: ChangeStatusProps) => {
  const [updateOrder, { isLoading }] = orderApi.useUpdateOrderStatusMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ChangeStatusInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (order) {
      setValue("Status", order.Status as ChangeStatusInputs["Status"]);
    } else {
      reset();
    }
  }, [order, setValue, reset]);

  const onSubmit: SubmitHandler<ChangeStatusInputs> = async (data) => {
    try {
      if (!order) {
        toast.error("No order selected for status change.");
        return;
      }

      await updateOrder({ Id: order.Id, ...data });
      toast.success("Order status updated Successfully");
      (document.getElementById("order_Status") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };
  return (
    <dialog id="order_Status" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Change Role for {order?.Id}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label className="text-white font-semibold">Select Role:</label>
          <select
            data-test="order-status-select"
            {...register("Status")}
            className="select select-bordered w-full bg-white text-black dark:bg-gray-200 dark:text-black"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {errors.Status && (
            <span className="text-sm text-red-700">
              {errors.Status.message}
            </span>
          )}

          <div className="modal-action flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" />{" "}
                  Updating...
                </>
              ) : (
                "Update Order Status"
              )}
            </button>
            <button
              data-test="save-order-status-btn"
              className="btn w-full sm:w-auto"
              type="button"
              onClick={() => {
                (
                  document.getElementById("order_Status") as HTMLDialogElement
                )?.close();
                reset();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
