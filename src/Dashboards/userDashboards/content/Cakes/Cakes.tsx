import cakeApi from "../../../../features/Cakes/cakeAPI";
import { MdAdd } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { CreateOrder } from "../Orders/CreateOrder";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../features/cart/cartSlice";
import { useState } from "react";

export const Cake = () => {
  //  const userId = useSelector((state: RootState) => state.user.user?.user_id as number);
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  
  const {
    data: cakeDetails,
    isLoading: loading,
    isError: error,
  } = cakeApi.useGetCakesQuery();

  const res = cakeDetails?.data || [];

  const formatPrice = (price: number | string) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(Number(price) || 0);

  const getAvailabilityBadge = (isActive?: boolean) =>
    isActive
      ? {
          label: "In stock",
          className: "bg-emerald-100 text-emerald-700 border-emerald-200",
        }
      : {
          label: "Out of stock",
          className: "bg-rose-100 text-rose-700 border-rose-200",
        };

  const handleAddToCart = (cake: typeof res[0]) => {
    dispatch(
      addToCart({
        cakeId: cake.cakeId,
        cakeName: cake.cakeName,
        price: Number(cake.price),
        imageURL: cake.imageURL,
        size: cake.size,
        flavorsUsed: cake.flavorsUsed,
      })
    );
    
    setAddedItems((prev) => new Set(prev).add(cake.cakeId));
    
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cake.cakeId);
        return newSet;
      });
    }, 2000);
  };

  return (
    <>
      <div
        data-test="cakes-container"
        className="min-h-screen w-full bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50 py-4 px-1 sm:px-3 lg:px-4"
      >
        <div className="">
          <h2
            data-test="cakes-title"
            className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4"
          >
            Ready Made Cakes
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-8">
            Explore our delightful collection of ready-made cakes, perfect for
            any occasion. From classic flavors to trendy designs, find your next
            favorite treat here!
          </p>
          <div className="flex justify-end mb-4">
            <button
              data-test="order-cake-btn"
              onClick={() =>
                (
                  document.getElementById("newOrder") as HTMLDialogElement
                )?.showModal()
              }
              className="bg-pink-500 text-white px-4 py-2 rounded-md w-fit flex items-center gap-2 "
            >
              <MdAdd size={20} />
              Place New Order
            </button>
          </div>
          <div className="grid grid-cols-1 justify-between max-w-full sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {loading ? (
              <p>Loading cakes...</p>
            ) : error ? (
              <p>Error loading cakes. Please try again later.</p>
            ) : res.length === 0 ? (
              <p>No ready-made cakes available at the moment.</p>
            ) : (
              res.map((cake) => {
                const availability = getAvailabilityBadge(
                  Boolean(cake.isactive),
                );

                return (
                  <div
                    data-test="cake-card"
                    key={cake.cakeId}
                    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1 group"
                  >
                    <div className="relative h-52 bg-linear-to-br from-purple-100 to-pink-100 overflow-hidden">
                      <img
                        src={cake.imageURL}
                        alt="ready made cake"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <span
                        className={`absolute top-4 right-4 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase ${availability.className}`}
                      >
                        {availability.label}
                      </span>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base font-semibold text-gray-900 flex-1">
                          {cake.cakeName}
                        </h3>
                        <div className="text-right">
                          <p className="text-xs uppercase text-gray-400 tracking-wide">
                            Starting at
                          </p>
                          <p className="text-lg font-bold text-purple-600">
                            {formatPrice(cake.price)}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-purple-600">
                          Flavours:
                        </span>{" "}
                        {cake.flavorsUsed || "Chef's selection"}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                          <p className="text-xs uppercase text-gray-400 tracking-wide">
                            Size
                          </p>
                          <p className="text-base font-semibold text-gray-900">
                            {cake.size || "Standard"}
                          </p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                          <p className="text-xs uppercase text-gray-400 tracking-wide">
                            Qty
                          </p>
                          <p className="text-base font-semibold text-gray-900">
                            {cake.quantityAvailable ?? "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CreateOrder />
                    <div className="flex justify-between shadow-sm mt-2 px-4 gap-2 pb-2">
                      <button 
                        onClick={() => handleAddToCart(cake)}
                        disabled={!cake.isactive}
                        className={`p-2 text-xs h-fit font-bold rounded-sm transition-colors duration-300 ${
                          addedItems.has(cake.cakeId)
                            ? "bg-green-500 text-white"
                            : cake.isactive
                            ? "bg-red-500 hover:bg-rose-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {addedItems.has(cake.cakeId) ? "ADDED ✓" : "ADD TO CART"}
                      </button>
                      <button className=" p-2 h-fit text-green-500 text-xs  rounded-sm hover:bg-green-600 font-bold transition-colors duration-300 bg-red-200">
                        BUY NOW
                      </button>
                      <div className="flex gap-2 ">
                        <div className="grid col-end-1 align-middle justify-center p-2">
                          <button className="text-green-500 font-bold transition-colors duration-300 flex items-center justify-center">
                            <AiOutlineLike />
                          </button>
                          <h4 className="text-green-500 text-center font-bold"></h4>
                        </div>
                        <div className="grid col-end-1 align-middle justify-center p-2">
                          <button className=" text-green-500 rounded-xl font-bold transition-colors duration-300">
                            <FaShare />
                          </button>
                          <h4 className="text-green-500 text-center font-bold"></h4>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};
