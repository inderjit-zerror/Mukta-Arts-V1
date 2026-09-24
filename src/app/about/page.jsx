import { createPageMetadata } from "@/lib/seo";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import AboutEcosystem from "@/components/about/AboutEcosystem";
import BoardOfDirectors from "@/components/about/BoardOfDirectors";
import TeamMembers from "@/components/about/TeamMembers";

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <AboutEcosystem />
      <BoardOfDirectors />
      <TeamMembers />
    </>
  );
};

export default AboutPage;

export async function generateMetadata() {
  return createPageMetadata("/about");
}
