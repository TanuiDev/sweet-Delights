import templatesApi from "../../../../features/Cakes/templatesAPI";

export const Templates = () => {
  const {
    data: templatesDetails,
    isLoading: templatesLoading,
    isError: templatesError,
  } = templatesApi.useGetDesignsQuery();

  const res = templatesDetails?.data || [];

  console.log("Data", res);

  return (
    <>
      <div className="min-h-screen w-full bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50 py-2 px-1 sm:px-2 lg:px-2">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
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
            >
              Add New Cake Template
            </button>
          </div>

          <div className="grid grid-cols-1  max-w-full sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {templatesLoading ? (
              <p>Loading...</p>
            ) : templatesError ? (
              <p>Error loading templates.</p>
            ) : (
              res.map((template) => (
                <div
                  key={template.DesignID}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={template.ImageUrl}
                    alt={template.DesignName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {template.DesignName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {template.Description}
                    </p>
                    <div className="flex  items-center">
                      <h3>Flavor: </h3>
                      <span className="text-purple-600 font-bold">
                        {template.BaseFlavor}
                      </span>
                    </div>
                    <div className="flex  items-center">
                      <h3 className="flex  gap-2 items-center">Category: </h3>
                      <span className="text-purple-600 font-bold">
                        {template.Category}
                      </span>
                    </div>
                    <div className="flex  items-center">
                      <h3>Price: </h3>
                        <span className="text-purple-600 font-bold">
                           {template.BasePrice}
                        </span>                        
                    </div>
                    <div className="flex  items-center">
                      <h3>Size: </h3>
                      <span className="text-purple-600 font-bold">
                        {template.Size}
                      </span>
                    </div>
                    <div className="flex  items-center">
                      <h3>Availability: </h3>
                      <span className="text-purple-600 font-bold">
                        {template.Availability}
                      </span>
                    </div>

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
