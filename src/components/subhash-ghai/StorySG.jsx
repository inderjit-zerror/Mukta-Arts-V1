import React from 'react';

const StorySG = () => {
    return (
        <section className="bg-[#0b6baa] relative px-6 py-16 md:px-12 md:py-24 lg:px-10 overflow-hidden font-['SwitzerR']">


            {/* Background Graphic Placeholder */}
            <div className="absolute -top-20 left-0 w-full h-[60%] flex items-center justify-center opacity-30 pointer-events-none">
                {/* Assuming this might be the film reel or a circular graphic */}
                <div className="w-[600px] h-[600px]  ">
                    <img src="/img/sg/HeadLogo.png" alt="img" className='w-full h-full object-cover object-center' />
                </div>
            </div>

            {/* Top Text Section */}
            <div className="max-w-5xl mx-auto text-center relative z-10">
                <p className="text-white/90 text-sm md:text-base tracking-wide mb-6 font-['SwitzerR']">
                    The story so far
                </p>
                <h4 className=" text-white font-['SwitzerM'] capitalize">
                    Subhash Ghai’s Journey Reflects Decades Of Influential Filmmaking And A Passion For Meaningful Storytelling. As The Founder Of Mukta Arts, He Shaped Indian Cinema Through Iconic Films Such As Karz, Hero, Ram Lakhan, Saudagar, And Taal.
                </h4>
            </div>

            {/* Bottom Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-16 md:mt-24 lg:mt-32 items-end relative z-10">

                {/* Left Column - Image */}
                <div className="lg:col-span-8">
                    <img
                        src="/img/sg/2.jpg"
                        alt="Subhash Ghai"
                        className="w-full h-auto object-cover max-h-[600px]"
                    />
                </div>

                {/* Right Column - Text & Signature */}
                <div className="lg:col-span-4 flex flex-col justify-end lg:pb-12">
                    <p className="text-white text-sm md:text-[1.05rem] font-medium! leading-relaxed font-['SwitzerR'] mb-12">
                        His vision extended beyond filmmaking with Whistling Woods International, creating a platform for aspiring filmmakers and creative professionals to learn, innovate, and shape the future of entertainment. Through cinema and education, he continues to inspire new talent while building a lasting legacy in Indian entertainment.
                    </p>

                    <div>
                        {/* Signature - Using a stylized font or an image placeholder. If you have a signature image, update the src here */}
                        <div className="text-white font-[cursive] text-4xl mb-4 opacity-90">
                            {/* Fallback to text if no image is present, otherwise use img tag */}
                            <img src="/img/signature.png" alt="Signature" className="h-16 w-auto mb-2 invert hidden" />
                            <span style={{ fontFamily: 'Brush Script MT, cursive' }}>Subhash Ghai</span>
                        </div>
                        <p className="text-white text-lg font-['SwitzerM'] tracking-wide">Subhash Ghai</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StorySG;
