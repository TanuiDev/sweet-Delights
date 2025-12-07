import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import {
  FaClock,
  FaSpinner,
  FaTruck,
  FaXmark,
  FaCircleCheck,
  FaCircleXmark,
  FaPenToSquare,
} from "react-icons/fa6";

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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <FaClock className="text-amber-500" />;
      case "In Progress":
        return <FaSpinner className="text-blue-500 animate-spin" />;
      case "Completed":
        return <FaCircleCheck className="text-green-500" />;
      case "Delivered":
        return <FaTruck className="text-purple-500" />;
      case "Cancelled":
        return <FaCircleXmark className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "border-amber-300 bg-amber-50 text-amber-700";
      case "In Progress":
        return "border-blue-300 bg-blue-50 text-blue-700";
      case "Completed":
        return "border-green-300 bg-green-50 text-green-700";
      case "Delivered":
        return "border-purple-300 bg-purple-50 text-purple-700";
      case "Cancelled":
        return "border-red-300 bg-red-50 text-red-700";
      default:
        return "border-gray-300 bg-gray-50 text-gray-700";
    }
  };

  return (
    <dialog id="order_Status" className="modal sm:modal-middle">
      <div className="modal-box relative overflow-hidden border border-white/60 bg-linear-to-br from-white via-purple-50/30 to-pink-50/40 backdrop-blur-xl shadow-2xl shadow-purple-200/50 w-full max-w-md mx-auto rounded-3xl p-0">
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />

        <div className="relative z-10 shrink-0 p-6 pb-4 border-b border-purple-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 via-pink-500 to-indigo-500 shadow-lg">
                <FaPenToSquare className="text-xl text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Update Order Status
                </h3>
                <p className="mt-0.5 text-sm text-gray-500">
                  Order ID:{" "}
                  <span className="font-semibold text-gray-700">
                    {order?.Id || "N/A"}
                  </span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                (
                  document.getElementById("order_Status") as HTMLDialogElement
                )?.close();
                reset();
              }}
              className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <FaXmark className="text-lg" />
            </button>
          </div>
        </div>

        <div className="relative z-10 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span>Select Status</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  data-test="order-status-select"
                  {...register("Status")}
                  className="select w-full h-fit rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 pr-10 text-base text-gray-800 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none appearance-none cursor-pointer hover:border-purple-300"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors.Status && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5">
                  <span className="text-sm font-medium text-red-600">
                    {errors.Status.message}
                  </span>
                </div>
              )}

              {order?.Status && (
                <div className="mt-4 rounded-xl border-2 bg-white/80 p-4 backdrop-blur-sm">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Current Status
                  </p>
                  <div
                    className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 ${getStatusColor(order.Status)}`}
                  >
                    <span className="text-xl">
                      {getStatusIcon(order.Status)}
                    </span>
                    <span className="font-bold">{order.Status}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn flex-1 rounded-2xl bg-linear-to-r from-purple-500 via-pink-500 to-indigo-500 border-none px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-pink-500/30 transition-all hover:translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FaCircleCheck className="text-lg" />
                    Update Status
                  </>
                )}
              </button>
              <button
                data-test="save-order-status-btn"
                className="btn btn-ghost rounded-2xl border-2 border-gray-200 px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                type="button"
                onClick={() => {
                  (
                    document.getElementById("order_Status") as HTMLDialogElement
                  )?.close();
                  reset();
                }}
              >
                <FaXmark className="text-base" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
