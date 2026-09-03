import WorkHero from "@/components/workinprogress/WorkHero"
import WorkCarousel from "@/components/workinprogress/WorkCarousel"
import WorkVideo from "@/components/workinprogress/WorkVideo"

const page = () => {
    return (
        <main>
            <WorkHero />
            <WorkCarousel />
            <WorkVideo />
        </main>
    )
}

export default page