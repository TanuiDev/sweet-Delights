import  { Footer } from "../components/footer/Footer"
import { Hero } from "../components/home/Hero"
import { Navbar } from "../components/navbar/Navbar"


export const Home = () => {
  return (
    <>
      <Navbar />   
      <div>
        <Hero />        
      </div>
      <Footer /> 
    </>
  )
}
