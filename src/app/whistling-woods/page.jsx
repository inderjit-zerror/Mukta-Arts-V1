import PartnersSection from "@/components/whistling-woods/PartnersSection";
import WWHERO from "@/components/whistling-woods/WWHERO";
import WWlast from "@/components/whistling-woods/WWlast";
import WWStats from "@/components/whistling-woods/WWStats";

const page = () => {
    return (
        <>
            <WWHERO />
            <WWStats />
            <WWlast />
            <PartnersSection />
        </>
    );
};

export default page;