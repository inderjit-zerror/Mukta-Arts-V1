import React from 'react';

const FacebookIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const XIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedinIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
);

const YoutubeIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" clipRule="evenodd" />
    </svg>
);

const LocationInfo = () => {
    return (
        <section className="bg-[#FAFAFA] py-16 md:py-24 px-4 md:px-8 lg:px-16 border-t border-[#202020]">
            <div className=" mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Map */}
                    <div className="w-full h-[450px] lg:h-[600px] bg-gray-200">
                        <iframe
                            src="https://maps.google.com/maps?q=Mukta%20Arts%20Ltd,%20Film%20City,%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Mukta Arts Location"
                        ></iframe>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">

                        {/* Address Block */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-16 pb-8 border-b border-[#202020]">
                            <h3 className="text-2xl md:text-[1.75rem] font-semibold text-black min-w-[150px] leading-tight tracking-tight">
                                Registered<br />Office
                            </h3>
                            <p className="text-[#555] text-[15px] leading-[1.6]">
                                3rd Floor, Mukta House, Behind<br />
                                Whistling Woods Institute,<br />
                                Filmcity, Goregaon(E), Mumbai<br />
                                — 400065
                            </p>
                        </div>

                        {/* Careers Block */}
                        <div className="py-8 border-b border-[#202020]">
                            <p className="text-[15px] text-black mb-4">Careers:</p>
                            <p className="text-[#555] text-[15px] leading-[1.7]">
                                At Mukta Arts, we are always looking for bright and passionate people who will bring their unique ideas, perspective, and ways of thinking to make a difference. We are committed to the growth and development of our employees, and we work with them to help them reach their full potential.
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="py-5 border-b border-[#202020]">
                            <p className="text-[#555] text-[15px]">Tel.: + 91 22 3364 9400</p>
                        </div>

                        <div className="py-5 border-b border-[#202020]">
                            <p className="text-[#555] text-[15px]">Fax : +91 22 33649401</p>
                        </div>

                        <div className="py-5 border-b border-[#202020]">
                            <p className="text-[#555] text-[15px]">Email — investorrelations@muktaarts.com</p>
                        </div>

                        {/* Join Us & Social */}
                        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="text-[#555] text-[15px]">Join us:</span>
                                <a href="mailto:hr@muktaarts.com" className="text-xl md:text-[1.35rem] font-bold text-black hover:underline tracking-tight">
                                    hr@muktaarts.com
                                </a>
                            </div>

                            <div className="flex items-center gap-5">
                                <a href="#" className="text-black hover:text-gray-600 transition-colors">
                                    <FacebookIcon className="w-[18px] h-[18px]" />
                                </a>
                                <a href="#" className="text-black hover:text-gray-600 transition-colors">
                                    <XIcon className="w-[16px] h-[16px]" />
                                </a>
                                <a href="#" className="text-black hover:text-gray-600 transition-colors">
                                    <LinkedinIcon className="w-[18px] h-[18px]" />
                                </a>
                                <a href="#" className="text-black hover:text-gray-600 transition-colors">
                                    <YoutubeIcon className="w-[20px] h-[20px]" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationInfo;
