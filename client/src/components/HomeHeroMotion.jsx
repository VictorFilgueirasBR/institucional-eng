// client/src/components/HomeHeroMotion.jsx
// React component (Tailwind + Framer Motion) that implements the motion described
// How to use:
// 1) npm install framer-motion
// 2) Import and place <HomeHeroMotion /> in your Home page
// 3) You can pass `autoPlay={false}` to disable automatic transition (useful during development)

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// << REMOVIDO: COMPONENTE THREE.JS PARA O GRÁFICO 3D >>
// A lógica do ThreeDBarChart foi removida pois estamos usando um vídeo.

// << NOVO COMPONENTE: BOTÃO COM EFEITO DE GRADIENTE E SEGUIMENTO DO CURSOR >>
const GradientButton = ({ children, variants }) => {
  const btnRef = useRef(null);
  
  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    btnRef.current.style.setProperty("--x", `${x}%`);
    btnRef.current.style.setProperty("--y", `${y}%`);
  }, []);

  return (
    <motion.button 
      ref={btnRef}
      onMouseMove={handleMouseMove}
      variants={variants}
      className="submit-gradient-btn"
    >
      {children}
    </motion.button>
  );
};


// << COMPONENTE DE CHAT COM CAMPO DE UPLOAD E MOTION >>
const ChatUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [showDoc, setShowDoc] = useState(false);

  // Simula o arrastar do documento em um loop contínuo
  useEffect(() => {
    let timers = [];
    const startAnimation = () => {
      // Começa a arrastar após um pequeno atraso
      timers.push(setTimeout(() => setIsDragging(true), 1500));
      // Termina de arrastar e mostra o documento "chegando"
      timers.push(setTimeout(() => {
        setIsDragging(false);
        setShowDoc(true);
      }, 3000));
      // Esconde o documento após um tempo para reiniciar o ciclo
      timers.push(setTimeout(() => {
        setShowDoc(false);
        // Reinicia a animação após um pequeno atraso
        timers.push(setTimeout(startAnimation, 1000)); 
      }, 5000)); // Documento fica visível por 2 segundos antes de sumir (3000ms + 2000ms)
    };

    startAnimation(); // Inicia a primeira animação

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const dragVariants = {
    initial: { x: -50, y: -50, opacity: 0, scale: 0.5 },
    dragging: { x: 0, y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    dropped: { y: 20, opacity: 0, scale: 0.8, transition: { duration: 0.5, ease: "easeIn" } },
  };

  const docVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
  };

  return (
    <motion.div
      className="w-64 h-auto rounded-lg bg-white/5 backdrop-blur-md border border-white/20 p-4 shadow-xl flex flex-col items-center justify-between z-20"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.8, ease: "easeOut" } }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.5, ease: "easeIn" } }}
      style={{ minHeight: '180px' }}
    >
      <div className="text-white/80 text-sm mb-3">Analytics e Insights</div>
      
      {/* Mensagens de chat fictícias */}
      <div className="w-full flex justify-start mb-2">
        <div className="bg-blue-500 text-white text-xs p-2 rounded-lg max-w-[80%]">Olá! Tem um documento ou contrato para análise?</div>
      </div>
      <div className="w-full flex justify-end mb-2">
        <div className="bg-gray-700 text-white text-xs p-2 rounded-lg max-w-[80%]">Tenho sim, estou te enviando em anexo.</div>
      </div>

      <div className="relative w-full h-20 border-2 border-dashed border-white/30 rounded-md flex items-center justify-center text-white/50 text-xs overflow-hidden mt-3">
        {showDoc ? (
          <motion.div
            className="absolute flex items-center justify-center p-2 bg-purple-600 text-white rounded-md text-sm"
            variants={docVariants}
            initial="hidden"
            animate="visible"
          >
            <i className="fas fa-file-alt mr-2"></i> Documento.pdf
          </motion.div>
        ) : (
          <>
            Arraste e solte o documento
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  className="absolute p-2 bg-blue-500 text-white rounded-md flex items-center text-sm"
                  variants={dragVariants}
                  initial="initial"
                  animate="dragging"
                  exit="dropped"
                >
                  <i className="fas fa-file-upload mr-2"></i> Meus Anúncios.docx
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
};


export default function HomeHeroMotion({ autoPlay = true }) {
  const [phase, setPhase] = useState("intro");
  const [showNotification, setShowNotification] = useState(false);
  const videoRef = useRef(null); // << NOVO: Referência para o elemento de vídeo >>

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) {
        setPhase("expanded");
        return;
      }
    }

    if (!autoPlay) return;
    const t = setTimeout(() => setPhase("expanded"), 1200);
    return () => clearTimeout(t);
  }, [autoPlay]);

  // Efeito para mostrar a notificação popup (agora permanece visível)
  useEffect(() => {
    if (phase === "expanded") {
      const showTimer = setTimeout(() => {
        setShowNotification(true);
      }, 2000); // Aparece 2 segundos após a expansão
      
      return () => {
        clearTimeout(showTimer);
      };
    }
  }, [phase]);

  // << NOVO: Efeito para reproduzir o vídeo programaticamente >>
  useEffect(() => {
    if (videoRef.current && phase === "expanded") {
      videoRef.current.play().catch(error => {
        console.error("Erro ao tentar reproduzir o vídeo:", error);
      });
    }
  }, [phase]); // Roda quando a fase muda para 'expanded'


  // Variants para elementos
  const introVariants = {
    initial: { opacity: 0, x: -80, scale: 0.85 },
    animate: { opacity: 1, x: -16, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    center: { x: 0, scale: 1.02, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  // Animações de looping
  const loopBounceVariant = {
    animate: {
      y: [0, -5, 0], // Move para cima e volta
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const pulseVariant = {
    animate: {
      scale: [1, 1.02, 1], // Pulsa levemente
      boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(139, 92, 246, 0.4)", "0 0 0px rgba(0,0,0,0)"],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  // Variantes para a notificação popup (card)
  const popupNotificationVariants = {
    hidden: { opacity: 0, x: -50, y: -20, scale: 0.7, filter: "blur(5px)" },
    visible: { 
      opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3,
          ease: "easeInOut",
        }
      } 
    },
    exit: { opacity: 0, x: -50, y: -20, scale: 0.8, filter: "blur(5px)", transition: { duration: 0.4, ease: "easeIn" } },
  };


  const SmallPreview = () => (
    <motion.div
      className="w-48 h-56 rounded-2xl bg-white/6 backdrop-blur-md p-3 shadow-xl flex flex-col cursor-pointer"
      layoutId="hero-card"
      variants={introVariants}
      initial="initial"
      animate="animate"
      onClick={() => setPhase("expanded")}
      role="button"
      aria-label="Abrir demonstração do site"
    >
      <div className="w-full h-28 rounded-xl bg-gradient-to-br from-white/6 to-white/3" />
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="w-3/4 h-4 rounded-md bg-white/8 mb-2" />
          <div className="w-1/2 h-3 rounded-md bg-white/6" />
        </div>
        <motion.div 
          className="text-xs text-white/60 text-center mt-2 whitespace-nowrap"
          variants={loopBounceVariant}
          animate="animate"
        >
          V-AIRON
        </motion.div>
      </div>
    </motion.div>
  );

  const ExpandedMock = () => (
    <motion.div
  className="w-[980px] max-w-full rounded-2xl p-6 shadow-2xl 
          bg-white/10 backdrop-blur-md
          border border-white/20"
  layoutId="hero-card"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
      {/* Top mock browser */}
      <motion.div
        className="rounded-xl bg-white/5 p-4 h-[500px] flex flex-col" // Aumentado a altura para acomodar o vídeo maior
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* top bar */}
        <motion.div className="flex items-center justify-between mb-4" variants={itemVariants}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 rounded-md bg-white/6" />
            <div className="w-48 h-3 rounded-full bg-white/6" />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-white bg-white/6 px-3 py-1 rounded-full whitespace-nowrap">V-Airon
            </div>
            
          </div>
        </motion.div>

        {/* hero area (purple strip) com animação de pulsação e TEXTO */}
        <motion.div
  className="h-16 sm:h-20 rounded-lg
             bg-gradient-to-r from-violet-500 via-violet-400 to-indigo-400
             mb-4 flex items-center justify-center
             text-white text-[1.3rem] font-bold text-center px-4 whitespace-nowrap"
  variants={itemVariants}
  animate={pulseVariant.animate}
>
  Otimize suas vendas com IA
</motion.div>


        {/* Layout para o VÍDEO e elementos laterais */}
        <div className="flex-1 flex gap-4 relative"> {/* flex-1 para ocupar o espaço restante, relative para posicionamento absoluto interno */}
            {/* Bloco de métricas (mantido à esquerda) */}
            <motion.div className="flex flex-col gap-3 w-32" variants={itemVariants}> {/* Largura fixa para métricas */}
              <div className="px-3 py-2 rounded-xl bg-white/5">
                <div className="text-sm text-white/70">Cliques</div>
                <div className="text-lg font-semibold text-white">12.412</div>
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/5">
                <div className="text-sm text-white/70">Impressões</div>
                <div className="text-lg font-semibold text-white">523.123</div>
              </div>
            </motion.div>
  
            {/* Container para o VÍDEO (ocupa o espaço restante no centro) */}
            <motion.div className="flex-1 h-[350px] flex items-center justify-center rounded-lg overflow-hidden bg-black/50" variants={itemVariants}>
                <video 
                    ref={videoRef} // << NOVO: Adicionado ref ao elemento de vídeo >>
                    src="/reels/card-bg-reel.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="auto" // << NOVO: Adicionado preload="auto" >>
                    className="w-full h-full object-cover"
                >
                    Seu navegador não suporta o elemento de vídeo.
                </video>
            </motion.div>

            {/* Container para Pop-up e Chat (posicionado à direita do vídeo) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20"> {/* Posicionado à direita */}
              {/* Pop-up de notificação */}
              <AnimatePresence>
                {showNotification && (
                  <motion.div
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl w-64 text-white flex flex-col items-start text-left" 
                    variants={popupNotificationVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 mr-2">
                        <i className="fas fa-magic text-white text-md"></i>
                      </div>
                      <h4 className="text-md font-semibold">Controle Total!</h4>
                    </div>
                    <p className="text-xs text-white/80">Tenha controle total dos seus anúncios otimizados por IA.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Componente de Chat com Campo de Upload */}
              <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.8, ease: "easeOut" } }}
                  exit={{ opacity: 0, x: 100, transition: { duration: 0.5, ease: "easeIn" } }}
              >
                  <ChatUpload />
              </motion.div>
            </div> {/* Fim do container de Pop-up e Chat */}

        </div> {/* Fim do layout para vídeo e elementos laterais */}
      </motion.div>

      {/* footer call-to-action (below the mock browser) */}
      <motion.div className="mt-6 flex items-center justify-between" variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants} className="text-white">
          <div className="text-2xl font-semibold">Seus anúncios com SEO inteligente</div>
          <div className="text-sm text-white/70 mt-1">Design profissional + otimização automática por IA para aumentar seu alcance e Leads.</div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <GradientButton variants={itemVariants}>
            Teste grátis →
          </GradientButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="w-full flex justify-center items-center py-16 bg-transparent">

      <AnimatePresence>
        {phase === "intro" && <SmallPreview key="intro" />}
        {phase === "expanded" && <ExpandedMock key="expanded" />}
      </AnimatePresence>
    </div>
  );
}