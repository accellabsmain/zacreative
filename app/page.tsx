import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import LazyHomeSections from "@/components/sections/LazyHomeSections";
import Reveal from "@/components/motion/Reveal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero is above the fold: loaded eagerly for best LCP */}
        <Reveal distance={20}>
          <HeroSection />
        </Reveal>
        <LazyHomeSections />
      </main>
      <Reveal>
        <Footer />
      </Reveal>
    </div>
  );
}
