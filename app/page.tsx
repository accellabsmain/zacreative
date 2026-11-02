import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import LazyHomeSections from "@/components/sections/LazyHomeSections";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Reveal from "@/components/motion/Reveal";
import { getInstagramFeed } from "@/lib/instagram";
import { PORTFOLIO_COPY } from "@/lib/copywriting";

export default async function Home() {
  const { posts } = await getInstagramFeed(PORTFOLIO_COPY.maxItems);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero is above the fold: loaded eagerly for best LCP */}
        <Reveal distance={20}>
          <HeroSection />
        </Reveal>
        <LazyHomeSections instagramPosts={posts} />
      </main>
      <Reveal>
        <Footer />
      </Reveal>
      <FloatingWhatsApp />
    </div>
  );
}
