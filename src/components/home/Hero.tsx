export const Hero = () => {
  return (
    <>
      <section className="py-20 md:py-10  bg-white dark:bg-gray-900 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center  max-w-6xl mx-auto">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
              Welcome to Sweet Delights
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 md:text-lg">
              Indulge in the finest selection of desserts crafted with love and
              passion.
            </p>
            <div className="mt-6">
              <a
                href="#explore"
                className="px-5 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              >
                Explore Our Menu
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://i.pinimg.com/736x/50/87/0b/50870b77b0ab6ed969a9a43b2d4ddfbc.jpg"
              alt="Delicious Dessert"
              className="w-full  max-w-lg h-auto mt-10 md:mt-0 md:ml-4 rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
};
