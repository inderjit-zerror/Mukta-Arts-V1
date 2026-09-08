"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

// --- SHADERS ---
// Vertex Shader: Standard projection for PlaneGeometry
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader: Colorful gradients, rounded corners via discard, and a fake chip
const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  varying vec2 vUv;

  // Signed Distance Function for a rounded box
  float roundedBoxSDF(vec2 CenterPosition, vec2 Size, float Radius) {
      return length(max(abs(CenterPosition) - Size + Radius, 0.0)) - Radius;
  }

  void main() {
    // 1. Create a colorful gradient based on UVs and time
    vec3 color = mix(uColorA, uColorB, vUv.y + sin(vUv.x * 5.0 + uTime) * 0.1);

    // 2. Add a shiny credit card "chip" to make it look like a card
    if (vUv.y > 0.75 && vUv.y < 0.85 && vUv.x > 0.15 && vUv.x < 0.3) {
        color = vec3(0.85, 0.75, 0.4); // Golden chip color
    }

    // 3. Fake rounded corners on the PlaneGeometry
    float d = roundedBoxSDF(vUv - 0.5, vec2(0.5, 0.5), 0.08);
    if (d > 0.0) {
        discard;
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;

// --- RESPONSIVE BREAKPOINT HOOK ---
// Drives both the 3D layout math (card count/spread/camera) and a few
// layout choices in the surrounding HTML (nav links, footer wrapping).
function useBreakpoint() {
  const [bp, setBp] = useState("desktop");

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return bp;
}

// Keeps the camera's aspect/fov in sync with the canvas size on every
// resize (belt-and-braces on top of R3F's own automatic handling), and
// eases the fov out a touch on narrow screens so the fanned cards stay
// framed instead of clipping off the sides.
function ResponsiveCamera({ breakpoint }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const fov = breakpoint === "mobile" ? 60 : breakpoint === "tablet" ? 55 : 50;
    const z = breakpoint === "mobile" ? 7 : 8;
    camera.fov = fov;
    camera.position.z = z;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [breakpoint, size, camera]);

  return null;
}

// --- INDIVIDUAL CARD COMPONENT ---
const Card = ({ position, rotation, colorA, colorB, liftY, liftZ }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);

  const baseY = position[1];

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    }),
    [colorA, colorB]
  );

  // GSAP animation for the hover effect: lift up, pop forward, and untwist
  // toward the camera — matches the reference design's highlighted card.
  useEffect(() => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.position, {
      y: hovered ? baseY + liftY : baseY,
      z: hovered ? position[2] + liftZ : position[2],
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(meshRef.current.rotation, {
      y: hovered ? rotation[1] * 0.15 : rotation[1],
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(meshRef.current.scale, {
      x: hovered ? 1.06 : 1,
      y: hovered ? 1.06 : 1,
      z: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [hovered, baseY, position, rotation, liftY, liftZ]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <planeGeometry args={[2.2, 3.4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
};

// --- CARD FAN (rebuilt per breakpoint so it always fills the width nicely) ---
function CardFan({ breakpoint }) {
  const config = useMemo(() => {
    switch (breakpoint) {
      case "mobile":
        return { totalCards: 9, spreadX: 0.62, groupY: -2.7, liftY: 0.9, liftZ: 1.5 };
      case "tablet":
        return { totalCards: 12, spreadX: 0.66, groupY: -3.0, liftY: 1.05, liftZ: 1.55 };
      default:
        return { totalCards: 15, spreadX: 0.7, groupY: -3.2, liftY: 1.2, liftZ: 1.6 };
    }
  }, [breakpoint]);
  const palette = [
    { a: "#3B82F6", b: "#60A5FA" }, // Bright blue
    { a: "#F5C542", b: "#FFD966" }, // Bright gold
    { a: "#2DD4BF", b: "#5EEAD4" }, // Bright teal
    { a: "#FF7A59", b: "#FFB199" }, // Coral
    { a: "#94A3B8", b: "#CBD5E1" }, // Silver
    { a: "#A66A3F", b: "#D99A6C" }, // Warm brown
    { a: "#4ADE80", b: "#86EFAC" }, // Bright green
    { a: "#E85D75", b: "#F58FA0" }, // Pink / wine
  ];

  const { totalCards, spreadX, groupY, liftY, liftZ } = config;

  const cardsData = useMemo(() => {
    return Array.from({ length: totalCards }).map((_, i) => {
      const x = (i - totalCards / 2) * spreadX;
      const z = i * 0.4 - totalCards * 0.13;
      const y = -Math.abs(i - totalCards / 2) * 0.1;
      const rotY = 0.5 - i * (1 / totalCards) * 0.6;
      const colors = palette[i % palette.length];

      return {
        id: i,
        position: [x, y, z],
        rotation: [0, rotY, 0],
        colorA: colors.a,
        colorB: colors.b,
      };
    });
  }, [totalCards, spreadX]);

  return (
    <group position={[0, groupY, 0]}>
      {cardsData.map((card) => (
        <Card
          key={card.id}
          position={card.position}
          rotation={card.rotation}
          colorA={card.colorA}
          colorB={card.colorB}
          liftY={liftY}
          liftZ={liftZ}
        />
      ))}
    </group>
  );
}

// --- TOP NAV ---
function TopNav({ breakpoint }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.navBrand}>
        <span style={styles.navLogo} />
        <div style={styles.navBrandText}>
          <span style={styles.navBrandTitle}>Alinma</span>
          {breakpoint !== "mobile" && (
            <span style={styles.navBrandSubtitle}>Digital Bank</span>
          )}
        </div>
      </div>

      {breakpoint === "desktop" && (
        <div style={styles.navLinks}>
          <span>Products</span>
          <span>Business</span>
          <span>More</span>
        </div>
      )}

      <div style={styles.navActions}>
        {breakpoint !== "mobile" && <span style={styles.navSignIn}>Sign in</span>}
        <button style={styles.navCta}>Open an account</button>
      </div>
    </nav>
  );
}

// --- FOOTER LINKS ROW ---
function FooterLinks() {
  const links = [
    "Website terms",
    "Legal Agreements",
    "Complaints",
    "Privacy",
    "Customer Vulnerability",
    "Newsroom",
  ];

  return (
    <div style={styles.footerLinks}>
      {links.map((link) => (
        <span key={link} style={styles.footerLink}>
          {link}
        </span>
      ))}
    </div>
  );
}

// --- MAIN SCENE COMPONENT ---
export default function CardsShowcase() {
  const breakpoint = useBreakpoint();

  return (
    <div style={styles.page}>


      <div style={styles.canvasWrap}>
        <Canvas camera={{ position: [-2, -4, 8], fov: 80 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 4]} intensity={0.4} />
          <ResponsiveCamera breakpoint={breakpoint} />
          <CardFan breakpoint={breakpoint} />
        </Canvas>
      </div>
    </div>
  );
}

// --- STYLES ---
const styles = {
  page: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: "white",
    overflow: "hidden",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#fff",
  },
  nav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px clamp(16px, 4vw, 48px)",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  navLogo: {
    width: 18,
    height: 18,
    border: "1.5px solid #fff",
    borderRadius: 3,
    display: "inline-block",
  },
  navBrandText: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.1,
  },
  navBrandTitle: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 16,
    letterSpacing: "-0.01em",
  },
  navBrandSubtitle: {
    fontSize: 9,
    opacity: 0.55,
    letterSpacing: "0.02em",
  },
  navLinks: {
    display: "flex",
    gap: 32,
    fontSize: 13,
    opacity: 0.85,
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  navSignIn: {
    fontSize: 13,
    opacity: 0.85,
  },
  navCta: {
    background: "#fff",
    color: "#000",
    border: "none",
    borderRadius: 999,
    padding: "9px 18px",
    fontSize: 13,
    cursor: "pointer",
  },
  centerContent: {
    position: "absolute",
    inset: 0,
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "16vh",
    pointerEvents: "none",
  },
  title: {
    margin: 0,
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(52px, 15vw, 180px)",
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  footerLinks: {
    marginTop: "clamp(16px, 3vh, 28px)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "clamp(12px, 2.5vw, 28px)",
    padding: "0 16px",
    pointerEvents: "auto",
  },
  footerLink: {
    fontSize: "clamp(10px, 1.1vw, 12px)",
    opacity: 0.6,
    whiteSpace: "nowrap",
  },
  canvasWrap: {
    position: "absolute",
    inset: 0,
    zIndex: 10,
  },
};
