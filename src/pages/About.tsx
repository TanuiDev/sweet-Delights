import { Footer } from "../components/footer/Footer";
import { Navbar } from "../components/navbar/Navbar";

import {
  MdBakeryDining,
  MdOutlineLocalShipping,
  MdOutlineCelebration,
  MdSupportAgent,
} from "react-icons/md";
import { GiCroissant } from "react-icons/gi";

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
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50">
        
        <div className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-linear-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-semibold mb-4">
                Our Story
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent" data-test="about-title">
              About SweetDelights
            </h1>
            <div className="h-1.5 w-24 bg-linear-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-8"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Story Section */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Founded in 2025,{" "}
                  <span className="font-semibold text-purple-600">
                    SweetDelights
                  </span>{" "}
                  began with one goal: to create delicious, beautifully crafted
                  cakes and pastries that make every moment memorable. What
                  started as a small home bakery has grown into a trusted go-to
                  spot for custom cakes, desserts, and sweet treats.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Our team of passionate bakers is committed to quality,
                  creativity, and exceptional service. Whether you're
                  celebrating a birthday, a wedding, or simply craving something
                  sweet, SweetDelights brings your ideas to life with flavors
                  you'll love and designs that stand out.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover what makes SweetDelights the perfect choice for your
                sweet cravings
              </p>
              <div className="h-1.5 w-24 bg-linear-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2"
                >
                  <div
                    className={`bg-linear-to-br ${service.color} p-6 text-white`}
                  >
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commitment Section */}
          <div className="mb-12">
            <div className="bg-linear-to-br from-purple-600 via-pink-600 to-indigo-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                  Our Commitment
                </h3>
                <p className="text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto">
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
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Learn More
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
