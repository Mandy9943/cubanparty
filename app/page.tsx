import Footer from "@/components/Footer/Footer";
import Header from "@/components/Home/Header";
import AboutUs from "@/components/Home/Sections/AboutUs";
import Gallery from "@/components/Home/Sections/Gallery";
import Hero from "@/components/Home/Sections/Hero";
import Managers from "@/components/Home/Sections/Managers";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <div
        id="home"
        className="relative h-screen w-full flex flex-col items-center justify-center z-10"
      >
        <Header />

        {/* Hero section */}
        <Hero />
      </div>

      {/* About us section */}
      <AboutUs />

      <Managers />

      {/* Gallery section */}
      <Gallery />

      <Footer />
    </main>
  );
};
export default Home;
