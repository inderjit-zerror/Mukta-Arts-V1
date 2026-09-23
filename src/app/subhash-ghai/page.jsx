import HeroSG from "@/components/subhash-ghai/HeroSG";
import StorySG from "@/components/subhash-ghai/StorySG";
import CareerMilestones from "@/components/subhash-ghai/CareerMilestones";
import FilmsSection from "@/components/home/FilmsSection";
import AwardsSG from "@/components/subhash-ghai/AwardsSG";

const page = () => {
    return (
        <>
            <HeroSG />
            <StorySG />
            <CareerMilestones />
            <FilmsSection />
            <AwardsSG />
        </>
    );
};

export default page;