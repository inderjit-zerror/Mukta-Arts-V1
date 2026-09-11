export default function Noise({ baseFrequency = 0.65, pixelSize = "200px" }) {
  return (
    <>
      <style>
        {`
          @keyframes noise-anim {
            0% { transform: translateY(9rem) }
            10% { transform: translate(-1rem,-4rem) }
            20% { transform: translate(-8rem,2rem) }
            30% { transform: translate(9rem,-9rem) }
            40% { transform: translate(-2rem,7rem) }
            50% { transform: translate(-9rem,-4rem) }
            60% { transform: translate(2rem,6rem) }
            70% { transform: translate(7rem,-8rem) }
            80% { transform: translate(-9rem,1rem) }
            90% { transform: translate(6rem,-5rem) }
            100% { transform: translate(-7rem, 0) }
          }
        `}
      </style>
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          top: "-10rem",
          left: "-10rem",
          width: "calc(100vw + 20rem)",
          height: "calc(100vh + 20rem)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: pixelSize,
          opacity: 0.5,
          animation: "noise-anim 1s steps(2,end) infinite",
          willChange: "transform",
        }}
      />
    </>
  );
}
