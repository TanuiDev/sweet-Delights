import cakeApi, { type Tcakes } from "../../../../features/Cakes/cakeAPI";
import { MdAdd, MdOutlineAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { AddCake } from "./AddCake";
import { UpdateCake } from "./UpdateCake";
import { useState } from "react";
import { DeleteCake } from "./DeleteCake";

export const ReadyMade = () => {
  const [updateCakeData, setUpdateCake] = useState<Tcakes | null>(null);
  const [deleteCakeData, setDeleteCake] = useState<Tcakes | null>(null);
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

  return (
    <>
      <div className="min-h-screen w-full bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50 py-4 px-1 sm:px-3 lg:px-4">
        <div className="">
          <h2
            className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4"
            data-test="ready-made-cakes-header"
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
              onClick={() =>
                (
                  document.getElementById("newcake") as HTMLDialogElement
                )?.showModal()
              }
              className="bg-pink-500 text-white px-4 py-2 rounded-md w-fit flex items-center gap-2 "
              data-test="add-new-cake-button"
            >
              <MdAdd size={20} />
              Add New Cake
            </button>
          </div>
          <AddCake />
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
                  data-test="cake-card-container"                  
                    key={cake.cakeId}
                    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1 group"
                  >
                    {updateCakeData && <UpdateCake cake={updateCakeData} />}
                    {deleteCakeData && <DeleteCake cake={deleteCakeData} />}

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
                        <h3   className="text-base font-semibold text-gray-900 flex-1">
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
                    <div   className="flex justify-between shadow-sm mt-2 px-4 gap-2 pb-2">
                      <button
                      data-test="delete-cake-button"
                        className=" text-red-800 px-4 py-2 rounded-xl hover:bg-rose-600 transition-colors duration-300"
                        onClick={() => {
                          setDeleteCake(cake);
                          (
                            document.getElementById(
                              "delete_cake",
                            ) as HTMLDialogElement
                          )?.showModal();
                        }}
                      >
                        <MdOutlineAutoDelete size={28} />
                      </button>
                      <button

                      data-test="edit-cake-button"
                      type="button"
                        className=" text-green-500 px-4 py-2 rounded-xl hover:bg-green-600 transition-colors duration-300"
                        onClick={() => {
                          setUpdateCake(cake);
                          (
                            document.getElementById(
                              "updatecake",
                            ) as HTMLDialogElement
                          )?.showModal();
                        }}
                      >
                        <FaEdit size={28} />
                      </button>
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
