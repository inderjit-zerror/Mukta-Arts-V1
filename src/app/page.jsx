import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import FilmsSection from "@/components/home/FilmsSection";
import { createPageMetadata } from "@/lib/seo";

const HomePage = () => {
  return (
    <>
      <Hero />
      <VideoSection />
      <FilmsSection />
    </>
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
