"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";

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
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[120vw] z-[100] transform -rotate-[3deg] pointer-events-none">
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
                            className={`flex flex-col items-center justify-center min-w-[300px] h-[90px] px-8 ${item.active ? 'bg-[#0077b6]' : 'bg-transparent'
                                }`}
                        >
                            <h3 className="text-[#f97316] text-3xl font-bold font-serif mb-1">{item.title}</h3>
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

export default function OldCamera() {
    return (
        <section className="relative w-full h-[100vh] bg-white overflow-hidden flex items-center justify-center">

            {/* Title */}
            <h2 className="absolute top-[10%] tracking-tighter font-bold left-[4%] f z-40 text-black leading-none pointer-events-none">
                About us.
            </h2>

            {/* Projection Cone */}
            <div
                className="absolute top-[-10%] right-0 h-full w-[70vw] z-40 pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, rgba(230, 165, 126, 0.05) 0%, rgba(216, 108, 35, 0.8) 50%, rgba(200, 80, 20, 1) 100%)',
                    clipPath: 'polygon(0% 60%, 100% 10%, 100% 90%)'
                }}
            ></div>

            {/* Projection Text Content */}
            <div className="absolute top-[45%] -translate-y-1/2 right-[5%] md:right-[5%] w-full max-w-lg z-[60] text-white pointer-events-none">
                <h3 className="text-4xl md:text-5xl font-serif mb-2">45+ Years Of Cinema</h3>
                <p className="tracking-[0.2em] uppercase text-xs mb-6 opacity-80">LEGACY</p>
                <p className="text-base opacity-90 leading-relaxed font-light">
                    For Over Four Decades, Mukta Arts Has Been Part Of India's Cinematic Journey, Creating Films And Stories That Have Entertained, Inspired, And Stayed With Audiences Across Generations.
                </p>
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

                    <group position={[-2, -2.5, 0]} scale={0.05} rotation={[0, Math.PI / 1.3, 0]}>
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
    );
}

// Preload the model to prevent popping in
useGLTF.preload("/model/camera.glb");
