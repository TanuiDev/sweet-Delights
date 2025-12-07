import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";

import {
  MdBakeryDining,
  MdOutlineLocalShipping,
  MdOutlineCelebration,
  MdSupportAgent,
} from "react-icons/md";
import { GiCroissant } from "react-icons/gi";
import { FaBook, FaCakeCandles, FaHeart } from "react-icons/fa6";
import { PiChefHatDuotone } from "react-icons/pi";

export const About = () => {
  const services = [
    {
      name: "Custom Cake Orders",
      icon: <MdBakeryDining />,
      description:
        "Order delicious custom-made cakes for birthdays, weddings, and special occasions.",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Fresh Baked Pastries",
      icon: <GiCroissant />,
      description:
        "Enjoy a variety of freshly baked pastries made with quality ingredients.",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Fast Delivery",
      icon: <MdOutlineLocalShipping />,
      description:
        "We deliver your cakes and pastries right to your doorstep, fresh and on time.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Event Catering",
      icon: <MdOutlineCelebration />,
      description:
        "We cater desserts and cakes for events, parties, and corporate functions.",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Customer Support",
      icon: <MdSupportAgent />,
      description:
        "Our team is available to help you choose flavors, designs, and manage orders.",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 dark:bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 dark:bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-300 dark:bg-rose-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-linear-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-semibold mb-6 shadow-sm">
              <FaBook className="text-base" />
              Our Story
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
              data-test="about-title"
            >
              About SweetDelights
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Crafting memorable moments with delicious, beautifully designed
              cakes and pastries since 2025
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
                    <FaCakeCandles />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Our Beginning
                  </h3>
                </div>
                <p className="text-base text-gray-600 leading-relaxed">
                  Founded in 2025,{" "}
                  <span className="font-semibold text-purple-600">
                    SweetDelights
                  </span>{" "}
                  began with one goal: to create delicious, beautifully crafted
                  cakes and pastries that make every moment memorable. What
                  started as a small home bakery has grown into a trusted go-to
                  spot for custom cakes, desserts, and sweet treats.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl">
                    <PiChefHatDuotone />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Our Mission
                  </h3>
                </div>
                <p className="text-base text-gray-600 leading-relaxed">
                  Our team of passionate bakers is committed to quality,
                  creativity, and exceptional service. Whether you're
                  celebrating a birthday, a wedding, or simply craving something
                  sweet, SweetDelights brings your ideas to life with flavors
                  you'll love and designs that stand out.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 text-base max-w-2xl mx-auto">
                Discover what makes SweetDelights the perfect choice for your
                sweet cravings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-purple-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 w-14 h-14 rounded-lg bg-linear-to-br ${service.color} flex items-center justify-center text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl shadow-xl p-10 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
              <div className="relative z-10 text-center">
                <div className="inline-block mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mx-auto">
                    <FaHeart />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Our Commitment
                </h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto opacity-95">
                  At SweetDelights, we are dedicated to giving our customers the
                  best experience with every order. We stand by the quality of
                  our cakes and pastries and are always here to help you choose
                  the perfect treat for any occasion.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-purple-600 to-pink-600 text-white text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
              Explore Our Menu
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
