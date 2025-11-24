import cakeApi from "../../../../features/Cakes/cakeAPI";

export const ReadyMade = () => {
  const {
    data: cakeDetails,
    isLoading: loading,
    isError: error,
  } = cakeApi.useGetCakesQuery();

  const res = cakeDetails?.data || [];
  console.log("Ready Made Cakes Data:", res);

  return (
    <>
      <div className="min-h-screen w-full bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Ready Made Cakes
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-8">
            Explore our delightful collection of ready-made cakes, perfect for
            any occasion. From classic flavors to trendy designs, find your next
            favorite treat here!
          </p>
          <div className="grid grid-cols-1 justify-between max-w-full sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {loading ? (
              <p>Loading cakes...</p>
            ) : error ? (
              <p>Error loading cakes. Please try again later.</p>
            ) : res.length === 0 ? (
              <p>No ready-made cakes available at the moment.</p>
            ) : (
              res.map((cake) => (
                <div
                  key={cake.cakeId}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 bg-linear-to-br from-purple-100 to-pink-100 overflow-hidden">
                    <img
                      src={cake.imageURL}
                      alt="Ready Made Cake 1"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xs font-bold text-gray-800 mb-2">
                      {cake.cakeName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      <span className="text-purple-600">Flavours: </span>
                      {cake.flavorsUsed}
                    </p>
                    <div className="text-lg font-semibold text-purple-600">
                      <span>Ksh </span>
                      {cake.price}
                    </div>
                  </div>
                  <div className="">
                    <div>{cake.isactive}</div>
                    <div>{cake.size}</div>
                    <div className=""></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
