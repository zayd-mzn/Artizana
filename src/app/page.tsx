import Motion from "@/components/Motion";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Metiers from "@/components/Metiers";
import Atelier from "@/components/Atelier";
import Geste from "@/components/Geste";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Motion />
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Metiers />
        <Atelier />
        <Geste />
        <Products />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
