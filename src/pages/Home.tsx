import { Footer } from "../components/footer/Footer";
import { Featured } from "../components/home/Featured";
import { Hero } from "../components/home/Hero";
import { Navbar } from "../components/navbar/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <Hero />
        <Featured />
      </div>
      <Footer />
    </>
  );
};
