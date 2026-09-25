'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import { User, Mail, Phone, PenLine } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SubmitScriptPage = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Header animation
        tl.from(".header-anim", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.2
        })
            // Form fields animation
            .from(".form-element", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out"
            }, "-=0.4")
            // Image animation
            .from(".image-anim", {
                scale: 1.05,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=0.6");
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-[#FAFAFA] min-h-screen pt-32 pb-24 px-4 md:px-8 lg:px-16">
            <div className=" mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8">
                    <h2 className="header-anim text-6xl md:text-7xl lg:text-[7.5rem] font-medium tracking-tighter text-black leading-[0.95]">
                        Script<br />Submission
                    </h2>
                    <p className="header-anim text-[#555] text-base md:text-lg max-w-md leading-relaxed lg:pb-3">
                        Submit your original screenplay to Mukta Arts and give your story the opportunity to be discovered and considered by our creative team.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-stretch">
                    {/* Form */}
                    <div className="lg:col-span-2 flex flex-col gap-6 w-full ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div className="form-element flex flex-col gap-2.5">
                                <label className="text-[15px] text-[#555]">First name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-[18px] w-[18px] text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input type="text" placeholder="example name" className="w-full pl-12 pr-4 py-3.5 border border-[#202020] bg-transparent text-[15px] placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="form-element flex flex-col gap-2.5">
                                <label className="text-[15px] text-[#555]">Last name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-[18px] w-[18px] text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input type="text" placeholder="example name" className="w-full pl-12 pr-4 py-3.5 border border-[#202020] bg-transparent text-[15px] placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div className="form-element flex flex-col gap-2.5">
                                <label className="text-[15px] text-[#555]">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-[18px] w-[18px] text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input type="email" placeholder="example@mail.com" className="w-full pl-12 pr-4 py-3.5 border border-[#202020] bg-transparent text-[15px] placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="form-element flex flex-col gap-2.5">
                                <label className="text-[15px] text-[#555]">Phone number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-[18px] w-[18px] text-gray-400" strokeWidth={1.5} />
                                    </div>
                                    <input type="tel" placeholder="123 456 7890" className="w-full pl-12 pr-4 py-3.5 border border-[#202020] bg-transparent text-[15px] placeholder-gray-400 focus:outline-none focus:border-black transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="form-element flex flex-col gap-2.5">
                            <label className="text-[15px] text-[#555]">Message</label>
                            <div className="relative">
                                <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                                    <PenLine className="h-[18px] w-[18px] text-gray-400" strokeWidth={1.5} />
                                </div>
                                <textarea rows="4" placeholder="Text here..." className="w-full pl-12 pr-4 py-3.5 border border-[#202020] bg-transparent text-[15px] placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"></textarea>
                            </div>
                        </div>

                        {/* Attachments */}
                        <div className="form-element flex flex-col gap-2.5 mt-2">
                            <label className="text-[15px] text-[#555]">Attachments</label>
                            <div className="border border-[#202020] bg-white py-10 flex flex-col items-center justify-center gap-1.5 transition-colors hover:border-gray-400 cursor-pointer">
                                <p className="text-[14px] font-semibold text-black">Choose file or drag here</p>
                                <p className="text-[12px] text-gray-400 mb-2">Supported format: JPG, PNG, PDF</p>
                                <button type="button" className="px-6 py-2 border border-[#202020] bg-transparent text-[11px] font-bold tracking-[0.1em] text-black hover:bg-gray-50 transition-colors">
                                    BROWSE FILE
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button className="form-element mt-2 w-full py-4 bg-black text-white text-[13px] font-medium tracking-[0.1em] hover:bg-gray-900 transition-colors">
                            SUBMIT MESSAGE
                        </button>
                    </div>

                    {/* Image */}
                    <div className="image-anim lg:col-span-1 relative w-full h-[400px] md:h-[500px] lg:h-auto overflow-hidden">
                        <Image
                            src="/img/home/1.jpg"
                            alt="Script writing placeholder"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubmitScriptPage;
