
"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { DoubleSide } from "three";
import gsap from "gsap";


let arr = [
  {
    no: 1,
    clr: `#0470B1`,
  },
  {
    no: 2
  },
  {
    no: 3,
    clr: `#0470B1`,
  },
  {
    no: 4
  },
  {
    no: 5, clr: `#0470B1`,
  },
  {
    no: 6, clr: `#00A7E1`,
  },
  {
    no: 7, clr: `#0470B1`,
  },
  {
    no: 8, clr: `#00A7E1`,
  },
  {
    no: 9, clr: `#0470B1`,
  },
  {
    no: 10, clr: `#00A7E1`,
  },
  {
    no: 11, clr: `#0470B1`,
  },
  {
    no: 12, clr: `#00A7E1`,
  },
  {
    no: 13, clr: `#0470B1`,
  },
  {
    no: 14, clr: `#00A7E1`,
  },
  {
    no: 15, clr: `#0470B1`,
  },
  {
    no: 16, clr: `#00A7E1`,
  },
  {
    no: 17, clr: `#0470B1`,
  },
  {
    no: 18, clr: `#00A7E1`,
  },
  {
    no: 19, clr: `#0470B1`,
  },
  {
    no: 20, clr: `#00A7E1`,
  },
  {
    no: 21, clr: `#0470B1`,
  },
  {
    no: 22, clr: `#00A7E1`,
  },
  {
    no: 23, clr: `#0470B1`,
  },
  {
    no: 24, clr: `#00A7E1`,
  },
  {
    no: 25, clr: `#0470B1`,
  },
  {
    no: 26, clr: `#00A7E1`,
  },
  {
    no: 27, clr: `#0470B1`,
  },
  {
    no: 28, clr: `#00A7E1`,
  },
  {
    no: 29, clr: `#0470B1`,
  },
  {
    no: 30, clr: `#00A7E1`,
  },
  {
    no: 31, clr: `#0470B1`,
  },
  {
    no: 32, clr: `#00A7E1`,
  },
  {
    no: 33, clr: `#0470B1`,
  },
  {
    no: 34, clr: `#00A7E1`,
  },
  {
    no: 35, clr: `#0470B1`,
  },
  {
    no: 36, clr: `#00A7E1`,
  },
  {
    no: 37, clr: `#0470B1`,
  },
  {
    no: 38, clr: `#00A7E1`,
  },
  {
    no: 39, clr: `#0470B1`,
  },
  {
    no: 40, clr: `#00A7E1`,
  },
]


const Card = ({ index, total }) => {
  const meshRef = useRef();

  // Adjust gapX and gapZ to change the spacing between cards
  const gapX = 80;
  const gapZ = 10;

  // Center the stack around the origin
  const xOffset = (index - total / 2) * gapX;
  const zOffset = (index - total / 16) * gapZ;

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        y: -100,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const handlePointerOut = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        y: -350,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[xOffset, -350, zOffset]}
      rotation={[0, Math.PI / 8, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry args={[280, 400]} />
      <meshBasicMaterial color={arr[index].clr} side={DoubleSide} />
    </mesh>
  );
};

export default function CardsShowcase() {
  const distance = 600;
  const [fov, setFov] = useState(75);

  useEffect(() => {
    const FovCalculator = () => {
      const newFov =
        2 *
        Math.atan(window.innerHeight / 2 / distance) *
        (180 / Math.PI);

      setFov(newFov);
    };

    FovCalculator();

    window.addEventListener("resize", FovCalculator);

    return () => {
      window.removeEventListener("resize", FovCalculator);
    };
  }, []);

  return (
    <div className="w-full h-screen max-sm:hidden relative z-[10] ">
      <Canvas className="w-full h-full">
        <PerspectiveCamera
          makeDefault
          fov={fov}
          position={[0, 0, distance]}
        />

        {
          arr.map((item, index) => {
            return (
              <Card key={index} index={index} total={arr.length} />
            )
          })
        }
      </Canvas>

      <div className="w-full absolute top-5 left-2 px-10 pt-20">
        <h1 className="text-[8vw] font-semibold tracking-tighter">Awards.</h1>
      </div>
    </div>
  );
}

