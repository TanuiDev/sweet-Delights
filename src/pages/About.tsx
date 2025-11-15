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
    },
    {
      name: "Fresh Baked Pastries",
      icon: <GiCroissant />,
      description:
        "Enjoy a variety of freshly baked pastries made with quality ingredients.",
    },
    {
      name: "Fast Delivery",
      icon: <MdOutlineLocalShipping />,
      description:
        "We deliver your cakes and pastries right to your doorstep, fresh and on time.",
    },
    {
      name: "Event Catering",
      icon: <MdOutlineCelebration />,
      description:
        "We cater desserts and cakes for events, parties, and corporate functions.",
    },
    {
      name: "Customer Support",
      icon: <MdSupportAgent />,
      description:
        "Our team is available to help you choose flavors, designs, and manage orders.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="items-center justify-center flex flex-col text-center  space-y-6 px-4">
        <h1 className="text-4xl mt-3 font-bold text-blue-600">
          About SweetDelights
        </h1>

        <div className="card mt-4 rounded-lg bg-gray-200 p-6">
          <p className="text-lg sm:text-xl md:text-2xl">
            Founded in 2025, SweetDelights began with one goal: to create
            delicious, beautifully crafted cakes and pastries that make every
            moment memorable. What started as a small home bakery has grown into
            a trusted go-to spot for custom cakes, desserts, and sweet treats.
          </p>
          <p className="text-sm sm:text-sm md:text-2xl mt-4">
            Our team of passionate bakers is committed to quality, creativity,
            and exceptional service. Whether you're celebrating a birthday, a
            wedding, or simply craving something sweet, SweetDelights brings
            your ideas to life with flavors you'll love and designs that stand
            out.
          </p>
        </div>

        <div className="mt-3 p-4">
          <h3 className="text-2xl font-bold text-secondary">Why choose us?</h3>
          <div className="gap-4  sm:w-full md:flex justify-between mb-3 mt-3 space-y-4 ">
            {services.map((service) => (
              <div
                key={service.name}
                className="card w-full md:flex bg-blue-50  shadow-sm items-center  p-3 "
              >
                <div className="text-6xl items-center text-gray-700 pb-10 ">
                  {service.icon}
                </div>
                <h2 className="text-2xl  text-gray-700 text-center ">
                  {service.name}
                </h2>
                <h3 className="text-2xs font-bold text-center text-gray-500 mt-8 ">
                  {service.description}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="card  mt-4 rounded-lg bg-gray-200 p-6">
          <h3 className="text-2xl font-bold text-secondary">Our Commitment</h3>
          <p className=" text-sm sm:text-sm md:text-2xl mt-2">
            At SweetDelights, we are dedicated to giving our customers the best
            experience with every order. We stand by the quality of our cakes
            and pastries and are always here to help you choose the perfect
            treat for any occasion.
          </p>
        </div>
        <div className="flex justify-center mb-4">
          <button className="btn btn-primary text-xl">Learn More</button>
        </div>
      </div>
      <Footer />
    </>
  );
};
