// GlassCardPremium.jsx
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function GlassCardPremium() {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) * 100; // 0-100%
      const py = (y / rect.height) * 100;
      cardRef.current.style.setProperty('--mouse-x', `${px}%`);
      cardRef.current.style.setProperty('--mouse-y', `${py}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="grid place-items-center bg-transparent relative mt-20">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/images/background-heronslides.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <style>{`
        .glass-card {
          position: relative;
          border-radius: 28px;
          background: rgba(255,255,255,0.01);
          backdrop-filter: blur(1.2px) saturate(180%);
          -webkit-backdrop-filter: blur(2px) saturate(180%);
          border: 3px solid rgba(255,255,255,0.15);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.06),
            0 28px 70px rgba(0,0,0,0.45);
          overflow: hidden;
          --mouse-x: 50%;
          --mouse-y: 50%; 
        }

        /* Reflexo solar que segue o mouse */
        .glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            rgba(255,255,255,0.3) 0%,
            rgba(255,255,255,0) 60%
          );
          mix-blend-mode: screen;
          transition: background 0.05s ease-out;
          animation: wave 4s infinite ease-in-out;
        }

        /* Brilho solar contínuo (cinematográfico) */
        .glass-card::after {
          content: "";
          position: absolute;
          width: 0.5px;
          height: 500px;
          pointer-events: none;
          background: linear-gradient(
            120deg,
            rgba(134, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(135, 255, 255, 0.12) 70%,
            rgba(255, 255, 255, 1) 100%,
          );
          transform: translateX(-100%) rotate(55deg);
          animation: sun-glow 12s linear infinite;
        }

        @keyframes sun-glow {
          0% { transform: translateX(-60px) rotate(55deg); }
          50% { transform: translateX(calc(100% + 600px)) rotate(15deg); }
          100% { transform: translateX(-60px) rotate(15deg); }
        }


        /* Borda elegante com leve brilho */
        .glass-card::after {
          content:"";
          position:absolute;
          inset:-2px;
          border-radius: inherit;
          padding:4px;
          background: rgba(255,255,255,0.06);
          filter: blur(0.2px);
          
        }

        /* Ondulação suave do vidro */
        @keyframes wave {
          0%, 100% { transform: scale(1) translateX(100); }
          50% { transform: scale(1.1) translateX(20px); }
        }



      `}</style>

      <motion.div
        ref={cardRef}
        className="glass-card w-[86vw] max-w-4xl h-[260px]"
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
