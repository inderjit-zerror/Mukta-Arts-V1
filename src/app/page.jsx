import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import FilmsSection from "@/components/home/FilmsSection";
import { createPageMetadata } from "@/lib/seo";
import Elder from "@/components/home/Elder";
import SpiralScene from "@/components/home/SpiralScene";
import CardsShowcase from "@/components/home/CardsShowcase";
import StackedCards from "@/components/home/StackedCards";

const HomePage = () => {
  return (
    <>
      <Hero />
      <VideoSection />

      <SpiralScene />
      <FilmsSection />
      <Elder />
      <div className="w-full h-fit relative">
        <img src={'/img/home/TempMovie.png'} className="w-full object-cover object-center" />
      </div>

      <CardsShowcase />
    </>
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
