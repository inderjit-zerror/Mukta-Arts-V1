import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import { createPageMetadata } from "@/lib/seo";

const HomePage = () => {
  return (
    <>
      <Hero />
      <VideoSection />
    </>
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
