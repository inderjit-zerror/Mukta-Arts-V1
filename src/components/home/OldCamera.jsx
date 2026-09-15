"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function FilmReel() {
    const marqueeRef = useRef();

    useGSAP(() => {
        if (marqueeRef.current) {
            // Infinite horizontal scrolling from left to right (or right to left)
            gsap.to(marqueeRef.current, {
                x: "-50%", // Move half the width
                duration: 25,
                repeat: -1,
                ease: "none",
            });
        }
    });

    const content = [
        { title: "1976", subtitle: "Founded", active: true },
        { title: "300+", subtitle: "Films Produced" },
        { title: "5+", subtitle: "National & international awards" },
        { title: "45+", subtitle: "Years of Legacy" },
    ];

    // Duplicate multiple times for a seamless scroll effect
    const loopContent = [...content, ...content, ...content, ...content, ...content, ...content];

    return (
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[120vw] z-[100] transform -rotate-[3deg] pointer-events-none">
            <div className="bg-black py-8 relative flex shadow-2xl overflow-hidden">
                {/* Top holes */}
                <div
                    className="absolute top-1.5 left-0 w-full h-2.5 z-10"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(to right, #ffffff 0, #ffffff 12px, transparent 12px, transparent 24px)'
                    }}
                ></div>

                {/* Scrolling content */}
                <div className="flex w-max" ref={marqueeRef}>
                    {loopContent.map((item, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center justify-center min-w-[300px] h-[120px] px-8 ${item.active ? 'bg-[#0077b6]' : 'bg-transparent'
                                }`}
                        >
                            <h3 className="text-[#f97316] text-3xl font-bold mb-1">{item.title}</h3>
                            <p className="text-white text-sm opacity-90">{item.subtitle}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom holes */}
                <div
                    className="absolute bottom-1.5 left-0 w-full h-2.5 z-10"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(to right, #ffffff 0, #ffffff 12px, transparent 12px, transparent 24px)'
                    }}
                ></div>
            </div>
        </div>
    );
}

function CameraModel({ url }) {
    const { scene } = useGLTF(url);
    const modelRef = useRef();

    useGSAP(() => {
        if (modelRef.current) {


            // Floating animation up and down
            gsap.to(modelRef.current.position, {
                y: 0.15,
                duration: 2.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
        }
    });

    useFrame((state) => {
        if (modelRef.current) {
            // Calculate target rotation based on horizontal mouse movement (left/right)
            const targetZ = (state.pointer.x * Math.PI) / 20;
            const targetY = (state.pointer.x * Math.PI) / 20;

            // Smoothly interpolate current rotation towards target on Z and Y axis
            // modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, -targetZ, 0.05);
            modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetY, 0.05);
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            position={[0, 0, 0]}
            scale={1} // You might need to adjust this scale based on your exact model size
        />
    );
}

function AnimatedCameraGroup() {
    const groupRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".old-camera-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Initial state
        gsap.set(groupRef.current.position, { x: 0, y: -2, z: 0 });
        gsap.set(groupRef.current.rotation, { x: 0, y: -2, z: 0 });

        tl.to(groupRef.current.position, { x: 2, y: -2.5, z: 0, duration: 1 }, 0)
            .to(groupRef.current.rotation, { y: -Math.PI / 1.3 - Math.PI * 2, duration: 1 }, 0)
            .to(groupRef.current.rotation, { y: "-=" + Math.PI * 2, duration: 1 }, 1.5)
            .to(groupRef.current.rotation, { y: "-=" + Math.PI * 2, duration: 1 }, 2.7)
            .to({}, { duration: 0.3 }); // pad to 4.0
    });

    return (
        <group ref={groupRef} scale={0.05}>
            <CameraModel url="/model/camera.glb" />
            <ContactShadows
                position={[0, -1, 0]}
                opacity={0.6}
                scale={10}
                blur={2.5}
                far={4}
                color="#000000"
            />
        </group>
    );
}

export default function OldCamera() {
    const containerRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const text3Ref = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0, y: 30 });

        tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 0.8)
            .to(text1Ref.current, { opacity: 0, y: -20, duration: 0.2 }, 1.5)
            .to(text2Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 2.0)
            .to(text2Ref.current, { opacity: 0, y: -20, duration: 0.2 }, 2.7)
            .to(text3Ref.current, { opacity: 1, y: 0, duration: 0.2 }, 3.2)
            .to({}, { duration: 0.6 }); // pad to 4.0
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="old-camera-container w-full h-[400vh] relative">


            <section className="sticky top-0 w-full h-[100vh] bg-white  flex items-center justify-center">

                {/* Title */}
                <h2 className="absolute top-[10%] tracking-tighter font-bold left-[4%] f z-40 text-black leading-none pointer-events-none">
                    About us.
                </h2>

                {/* Text Content */}
                <div className="absolute top-[45%] -translate-y-1/2 left-[5%] md:left-[4%] w-full max-w-lg z-[60] text-black pointer-events-none">

                    {/* Text Content 1 */}
                    <div ref={text1Ref} className="absolute top-0 left-0 w-full">
                        <h3 className="text-4xl md:text-5xl font-semibold mb-2">45+ Years Of Cinema</h3>
                        <p className="text-base opacity-90 leading-relaxed ">
                            For Over Four Decades, Mukta Arts Has Been Part Of India's Cinematic Journey, Creating Films And Stories That Have Entertained, Inspired, And Stayed With Audiences Across Generations.For Over Four Decades, Mukta Arts Has Been Part Of India's Cinematic Journey, Creating Films And Stories That Have Entertained, Inspired, And Stayed With Audiences Across Generations.
                        </p>
                    </div>

                    {/* Text Content 2 */}
                    <div ref={text2Ref} className="absolute top-0 left-0 w-full">
                        <h3 className="text-4xl md:text-5xl font-semibold mb-2">Global Recognition</h3>
                        <p className="text-base opacity-90 leading-relaxed ">
                            With numerous national and international awards, our commitment to excellence has resonated with audiences and critics alike, setting new benchmarks in the industry.  With numerous national and international awards, our commitment to excellence has resonated with audiences and critics alike, setting new benchmarks in the industry.
                        </p>
                    </div>

                    {/* Text Content 3 */}
                    <div ref={text3Ref} className="absolute top-0 left-0 w-full">
                        <h3 className="text-4xl md:text-5xl font-semibold mb-2">Future of Storytelling</h3>
                        <p className="text-base opacity-90 leading-relaxed ">
                            Embracing new technologies and fresh narratives, we continue to evolve, bringing innovative and captivating stories to screens worldwide for the next generation. Embracing new technologies and fresh narratives, we continue to evolve, bringing innovative and captivating stories to screens worldwide for the next generation.
                        </p>
                    </div>

                </div>

                {/* 3D Canvas */}
                <div className="absolute inset-0 z-50">
                    <Canvas

                        camera={{ position: [0, 0, 5], fov: 45 }}
                        className="w-full h-full cursor-grab active:cursor-grabbing"
                        dpr={[1, 2]} // Support for high-res screens
                    >
                        <ambientLight intensity={0.4} />
                        <directionalLight position={[5, 10, 5]} intensity={1.2} />
                        <Environment preset="studio" />

                        <AnimatedCameraGroup />

                        {/* <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.5}
                    /> */}
                    </Canvas>
                </div>

                <FilmReel />

            </section>
        </div>
    );
}

// Preload the model to prevent popping in
useGLTF.preload("/model/camera.glb");
