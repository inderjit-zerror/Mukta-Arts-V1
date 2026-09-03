"use client"
import React, { useRef, useEffect } from 'react';
import { useGLTF, Environment, OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Model(props) {
  const { scene } = useGLTF('/model/headphones.glb');
  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;

    // Animate the headphones into the navbar when scrolling
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "100vh top", // Finishes when you've scrolled past the hero (100vh)
          scrub: 1, // Smooth animation linked to scroll
          onUpdate: (self) => {
            const canvasContainer = document.getElementById('3d-canvas-container');
            if (canvasContainer) {
              // Disable interactions on the 3D model when scrolled down
              // so the user can interact with the video section and background
              if (self.progress > 0.05) {
                canvasContainer.style.pointerEvents = 'none';
              } else {
                canvasContainer.style.pointerEvents = 'auto';
              }
            }
          }
        }
      });

      // Target scale and position in the navbar
      tl.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        ease: "power2.inOut"
      }, 0);

      tl.to(groupRef.current.position, {
        y: 3, // Moves up towards the top edge of the camera (navbar)
        ease: "power2.inOut"
      }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/model/headphones.glb');

export default function HeadphonesCanvas() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
      <div id="3d-canvas-container" className="w-full h-full pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full">
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          <Environment preset="city" />

          {/* We scale the model based on the viewport to make it responsive, but 1.5 is a good start */}
          <Model position={[0, 0.2, 0]} scale={11} />

          {/* <ContactShadows
            position={[0, -3, 0]}
            opacity={0.6}
            scale={15}
            blur={2.5}
            far={4}
          /> */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </div>
  );
}
