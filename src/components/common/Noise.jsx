export default function Noise() {
  return (
    <>
      <style>
        {`
          @keyframes noise-anim {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-10px, -10px); }
            20% { transform: translate(-20px, 10px); }
            30% { transform: translate(10px, -20px); }
            40% { transform: translate(-10px, 20px); }
            50% { transform: translate(-20px, 10px); }
            60% { transform: translate(20px, 0); }
            70% { transform: translate(0, 20px); }
            80% { transform: translate(10px, 30px); }
            90% { transform: translate(-10px, 10px); }
          }
        `}
      </style>
      <div
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          top: "-50%",
          left: "-50%",
          width: "200vw",
          height: "200vh",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "120px",
          backgroundRepeat: "repeat",
          opacity: 0.37,
          animation: "noise-anim 0.2s infinite steps(1)",
          willChange: "transform",
        }}
      />
    </>
  );
}
