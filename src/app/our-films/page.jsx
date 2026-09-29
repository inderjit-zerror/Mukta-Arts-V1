import FilmsComponent from "@/components/our-film/FilmsComponent";
import OFHero from "@/components/our-film/OFHero";
import WWStats from "@/components/whistling-woods/WWStats";

const page = () => {
    return (
        <>
            <OFHero />
            <WWStats />
            <FilmsComponent />
        </>
    );
};

export default page;