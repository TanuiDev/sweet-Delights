export const Featured = () => {
  // const featuredDesserts = [

  // ];
  return (
    <>
      <div className="py-10 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
          Our Featured <span className="text-pink-500 text-3xl">Desserts</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://www.thespruceeats.com/thmb/1J1YkYJX1j6u0bX3F4Z3Z5v6j5E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheesecake-recipe-995524-hero-01-5c7b1f2c46e0fb0001f3d4d6.jpg"
              alt="Cheesecake"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Classic Cheesecake
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                A rich and creamy cheesecake with a buttery graham cracker
                crust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
