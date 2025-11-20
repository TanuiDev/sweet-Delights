// import { CiEdit } from "react-icons/ci";
// import { RiDeleteBinLine } from "react-icons/ri";
// Id: number;
// UserId: number;
// DesignId?: number;
// Size: string;
// Flavor: string;
// Message: string;
// Status: string;
// DeliveryDate: string;
// Price: number;
// Notes: string;
// ExtendedDescription: string;
// SampleImages: string[];
// ColorPreferences: string;
// CreatedAt: string;
// UpdatedAt: string;

import orderApi, { type Torders } from "../../../../features/Auth/orderAPI";

export const Orders = () => {
  // const [deleteUser, setDeleteUser] = useState<Tuser | null>(null);

  // const [updateUser, setUpdateUser] = useState<Tuser | null>(null);

  const {
    data: orderDetails,
    isLoading: loadingOrders,
    isError: orderError,
  } = orderApi.useGetOrdersQuery();

  console.log("orderDetails", orderDetails);

  return (
    <div>
      {loadingOrders && (
        <p className="text-xl ">
          <span className="loading loading-spinner loading-2xl"></span>
        </p>
      )}
      {orderError && (
        <p className="text-xl text-red-500 ">Error loading orders.</p>
      )}
      {!loadingOrders && !orderError && orderDetails && (
        <div>
          <h2 className="text-xl md:text-2xl text-center text">All Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4">
            {orderDetails.data.length === 0 ? (
              <p className="text-xl ">No orders found.</p>
            ) : (
              orderDetails.data.map((data: Torders) => (
                <div
                  key={data.Id}
                  className="card bg-base-100 w-96 shadow-sm border border-gray-200 sm:w-full"
                >
                  <figure className="px-10 pt-10">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                      alt="Shoes"
                      className="rounded-xl"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">
                      {data.Flavor || "Card Title"}
                    </h2>
                    <p>
                      {data.ExtendedDescription ||
                        "A card component has a figure, a body part, and inside body there are title and actions parts"}
                    </p>
                    <div className="card-actions">
                      <button className="btn btn-primary">View</button>
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
