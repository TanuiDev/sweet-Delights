export const Hero = () => {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
                  data-test="hero-title"
                >
                  <span className="bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    Welcome to
                  </span>
                  <br />
                  <span className="text-gray-800 dark:text-white">
                    Sweet Delights
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Indulge in the finest selection of desserts crafted with{" "}
                  <span className="text-pink-600 dark:text-pink-400 font-semibold">
                    love
                  </span>{" "}
                  and{" "}
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    passion
                  </span>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a className="group relative px-8 py-4 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold text-lg shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Explore Our Menu</span>
                  <div className="absolute inset-0 bg-linear-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full font-semibold text-lg border-2 border-gray-300 dark:border-gray-600 hover:border-pink-500 dark:hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400 transform hover:scale-105 transition-all duration-300">
                  View Specials
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    100+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Delicious Cakes
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    5K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                    10+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
              <div className="relative group">
                <div className="absolute -inset-4 bg-linear-to-r from-pink-400 to-purple-400 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://i.pinimg.com/736x/50/87/0b/50870b77b0ab6ed969a9a43b2d4ddfbc.jpg"
                    alt="Delicious Dessert"
                    className="w-full max-w-lg h-auto object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t k/20 to-transparent"></div>
                </div>

                <div className="absolute -top-6 -right-6 w-20 h-20 bg-pink-400 rounded-full opacity-80 blur-xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-400 rounded-full opacity-80 blur-xl animate-pulse animation-delay-2000"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>
    </>
  );
};
