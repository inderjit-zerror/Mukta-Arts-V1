import React from 'react';
import Image from 'next/image';

const WorkHero = () => {
    return (
        <div className="w-full min-h-screen bg-white text-black flex flex-col md:flex-row items-center justify-center px-10 gap-12 mx-auto">

            {/* Left Column - Text Content */}
            <div className="flex-1 w-full max-w-2xl flex flex-col justify-center">
                {/* Title Area */}
                <div className="flex items-baseline mb-12">
                    {/* Using tracking and scale to mimic the condensed font look without needing a custom font */}
                    <h2 className=" uppercase font-bold!"
                        style={{ transform: 'scaleY(1.5) scaleX(0.95)' }}>
                        Yaadein
                    </h2>
                    <h5 className="text-3xl md:text-5xl font-bold ml-6 lg:ml-8 mb-4 tracking-tight text-black whitespace-nowrap">
                        (1942)
                    </h5>
                </div>

                {/* Paragraphs */}
                <div className="  max-w-[90%] ">
                    <p>
                        Yaadein (Transl. Memories) Is A 2001 Indian Hindi-Language Musical Drama Film
                        Written, Directed, Edited And Produced By Subhash Ghai.[2] The Film Stars Hrithik
                        Roshan, Kareena Kapoor, Jackie Shroff And Amrish Puri.
                    </p>
                    <p>
                        TheYaadein (Transl. Memories) Is A 2001 Indian Hindi-Language Musical Drama Film
                        Written, Directed, Edited And
                    </p>
                </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex-1 w-full flex justify-center md:justify-end items-center mt-12 md:mt-0">
                <div className="relative w-full max-w-[600px] aspect-[4/5] bg-gray-100 shadow-2xl">
                    {/* Fallback image as standard img tag to avoid Next.js domain config issues for external URLs */}
                    <img
                        src="https://m.media-amazon.com/images/M/MV5BNTI3M2Y1YzYtYzNkZC00OTc0LTk0MGQtYWM1ZWU1Yzk4N2VmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
                        alt="Yaadein Movie Poster"
                        className="w-full h-full object-cover"

                    />
                </div>
            </div>

        </div>
    );
};

export default WorkHero;