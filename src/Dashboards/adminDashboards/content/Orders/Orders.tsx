import orderApi, { type Torders } from "../../../../features/Auth/orderAPI";

export const Orders = () => {
  const {
    data: orderDetails,
    isLoading: loadingOrders,
    isError: orderError,
  } = orderApi.useGetOrdersQuery();
  return (
    <div className="px-3 w-full">
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
          <h2 className="text-xl md:text-2xl text-center text-purple-500 font-bold">
            All Orders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:p-8">
            {orderDetails.data.length === 0 ? (
              <p className="text-xl ">No orders found.</p>
            ) : (
              orderDetails.data.map((data: Torders) => (
                <div
                  key={data.Id}
                  className="card bg-base-100 w-full h-96 shadow-sm border border-gray-200 bg-purple-100"
                >
                  <figure className="px-2 pt-2">
                    <img
                      src={
                        !data?.SampleImages?.[0]
                          ? "https://i.pinimg.com/736x/00/ff/08/00ff085a771bf7891878900694e677bf.jpg"
                          : data.SampleImages[0]
                      }
                      alt="Cakes"
                      className=" h-40 w-40 object-cover"
                    />
                  </figure>
                  <div className="card-body  ">
                    <h2 className="card-title text-purple-500">
                      {data.Flavor || "Card Title"}
                    </h2>
                    <p>
                      <span className="font-bold    ">
                        Extended Description:{" "}
                      </span>{" "}
                      {data.ExtendedDescription}
                    </p>
                    <p>
                      <span className="font-bold   ">Message: </span>{" "}
                      {data.Message}
                    </p>
                    <p>
                      <span className="font-bold   ">Price: </span> ksh
                      {data.Price}
                    </p>
                    <p>
                      <span className="font-bold   ">Status: </span>{" "}
                      {data.Status}
                    </p>
                    <p>
                      <span className="font-bold   ">To be delivered on: </span>
                      {new Date(data.DeliveryDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-bold   ">Notes: </span> {data.Notes}
                    </p>
                    <div className="card-actions justify-between gap-2">
                      <select
                        defaultValue="Pick a Framework"
                        className="select select-info"
                      >
                        <option disabled={true}>Update the order Status</option>
                        <option> Pending</option>
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
