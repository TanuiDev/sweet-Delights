import orderApi, { type Torders } from "../../../../features/Auth/orderAPI";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";

export const MyOrders = () => {
  const userId = useSelector(
    (state: RootState) => state.user.user?.user_id as number,
  );
  const {
    data: orderDetails,
    isLoading: loadingOrders,
    isError: orderError,
  } = orderApi.useGetOrderByUserIdQuery(userId);

  const getStatusBadgeColor = (status: string) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("pending")) {
      return "bg-amber-100 text-amber-800 border-amber-300";
    } else if (statusLower.includes("progress")) {
      return "bg-blue-100 text-blue-800 border-blue-300";
    } else if (statusLower.includes("completed")) {
      return "bg-green-100 text-green-800 border-green-300";
    } else if (statusLower.includes("delivered")) {
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    } else if (statusLower.includes("cancelled")) {
      return "bg-red-100 text-red-800 border-red-300";
    }
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      {loadingOrders && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-purple-600"></span>
            <p className="text-lg text-gray-600 font-medium">
              Loading orders...
            </p>
          </div>
        </div>
      )}
      {orderError && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-md">
            <p className="text-xl text-red-600 font-semibold text-center">
              Error loading orders. Please try again later.
            </p>
          </div>
        </div>
      )}
      {!loadingOrders && !orderError && orderDetails && (
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              All Orders
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Manage and track all customer orders
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {!orderDetails.data || orderDetails.data.length === 0 ? (
              <div className="col-span-full flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-xl text-gray-600 font-medium">
                    No orders found.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Orders will appear here once customers place them.
                  </p>
                </div>
              </div>
            ) : (
              orderDetails.data.map((data: Torders) => (
                <div
                  key={data.Id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative h-48 bg-linear-to-br from-purple-100 to-pink-100 overflow-hidden">
                    <img
                      src={
                        !data?.SampleImages?.[0]
                          ? "https://i.pinimg.com/736x/00/ff/08/00ff085a771bf7891878900694e677bf.jpg"
                          : data.SampleImages[0]
                      }
                      alt="Cakes"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(
                          data.Status,
                        )} backdrop-blur-sm bg-opacity-90`}
                      >
                        {data.Status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                        {data.Flavor || "Custom Order"}
                      </h3>
                      <div className="h-1 w-12 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    </div>

                    <div className="space-y-3 text-sm">
                      {data.ExtendedDescription && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-gray-700 min-w-[140px]">
                            Description:
                          </span>
                          <p className="text-gray-600 flex-1 line-clamp-2">
                            {data.ExtendedDescription}
                          </p>
                        </div>
                      )}

                      {data.Message && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-gray-700 min-w-[140px]">
                            Message:
                          </span>
                          <p className="text-gray-600 flex-1 line-clamp-2">
                            {data.Message}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 min-w-[140px]">
                          Price:
                        </span>
                        <span className="text-lg font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          KSh {data.Price?.toLocaleString() || "0"}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-700 min-w-[140px]">
                          Delivery Date:
                        </span>
                        <span className="text-gray-600 flex items-center gap-1">
                          <span>📅</span>
                          {new Date(data.DeliveryDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      {data.Notes && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-gray-700 min-w-[140px]">
                            Notes:
                          </span>
                          <p className="text-gray-600 flex-1 line-clamp-2 italic">
                            {data.Notes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <select
                        defaultValue={data.Status}
                        className="select select-bordered w-full bg-white border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-sm font-medium transition-all"
                      >
                        <option disabled>Update Order Status</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Delivered</option>
                        <option value="">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
