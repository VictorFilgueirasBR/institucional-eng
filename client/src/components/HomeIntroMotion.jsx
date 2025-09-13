import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaGift } from "react-icons/fa"; // Importa o ícone de presente

// << NOVO COMPONENTE: ThreeDLogoMotion para animação 3D da sua logo >>
const ThreeDLogoMotion = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const logoMeshRef = useRef(null);

  const initThree = useCallback(() => {
    if (!mountRef.current || !window.THREE) return;

    // SCENE
    const scene = new window.THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new window.THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5); // Posiciona a câmera para ver o logo
    cameraRef.current = camera;

    // RENDERER
    const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Fundo transparente
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LUZES
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.8); // Luz ambiente
    scene.add(ambientLight);

    const pointLight = new window.THREE.PointLight(0xffffff, 1.2); // Luz pontual forte
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Carregador de Textura
    const textureLoader = new window.THREE.TextureLoader();
    textureLoader.load(
      "/logo-motion.png", // << SEU ARQUIVO DE LOGO AQUI! >>
      (texture) => {
        // Obter as proporções da imagem para ajustar o plano
        const imageAspectRatio = texture.image.width / texture.image.height;
        const planeWidth = 3;
        const planeHeight = planeWidth / imageAspectRatio;

        const geometry = new window.THREE.PlaneGeometry(planeWidth, planeHeight); // Plano para a logo
        // Material com a textura da logo, mais reflexivo
        const material = new window.THREE.MeshPhysicalMaterial({
          map: texture,
          transparent: true,
          roughness: 0.2,   // Suaviza a superfície para um look mais polido
          metalness: 0.5,   // Adiciona um brilho metálico sutil
          clearcoat: 1.0,   // Camada extra para um aspecto de vidro ou plástico
          clearcoatRoughness: 0.1, // Suavidade da camada extra
          reflectivity: 0.5 // Refletividade
        });
        const logoMesh = new window.THREE.Mesh(geometry, material);
        logoMeshRef.current = logoMesh;
        scene.add(logoMesh);
      },
      undefined,
      (err) => {
        console.error('Erro ao carregar a textura da logo:', err);
      }
    );

    // Configuração de redimensionamento
    const onResize = () => {
      if (mountRef.current && cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    requestAnimationFrame(animate);

    if (logoMeshRef.current) {
      logoMeshRef.current.rotation.y += 0.01; // Animação de rotação no eixo Y
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  useEffect(() => {
    const currentMountElement = mountRef.current;
    let animationFrameId;

    if (currentMountElement) {
      initThree();
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (currentMountElement && rendererRef.current && rendererRef.current.domElement) {
        if (currentMountElement.contains(rendererRef.current.domElement)) {
          currentMountElement.removeChild(rendererRef.current.domElement);
        }
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      logoMeshRef.current = null;
    };
  }, [initThree, animate]);

  return (
    <div ref={mountRef} className="w-full h-[550px] flex items-center justify-center"></div>
  );
};


export default function HomeIntroMotion({
  // startSrc foi modificado para não ser usado diretamente pela tag img, mas sim para o componente 3D
  startSrc = "/logo-motion.png", // Seu arquivo de logo PNG para o 3D
  endMockSrc = "/reels/graph-reel.mp4",
  durationMs = 2200,
  allowSkip = true,
  children,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(!prefersReducedMotion);
  
  // Função para gerenciar o movimento do mouse no botão e atualizar as variáveis CSS
  const handleMouseMove = (e) => {
    const { currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    currentTarget.style.setProperty('--x', `${x}px`);
    currentTarget.style.setProperty('--y', `${y}px`);
  };

  // Preload do vídeo
  useEffect(() => {
    // Não precisamos pré-carregar a imagem startSrc aqui, pois o Three.js fará isso.
    // Apenas pré-carrega o vídeo para o endMockSrc.
    const endVideo = document.createElement('video');
    endVideo.src = endMockSrc;
    endVideo.preload = 'auto';
    return () => {};
  }, [endMockSrc]);

  // Auto-finish the intro
  useEffect(() => {
    if (!showIntro) return;
    if (prefersReducedMotion) {
      setShowIntro(false);
      return;
    }
    const t = setTimeout(() => setShowIntro(false), durationMs);
    return () => clearTimeout(t);
  }, [showIntro, durationMs, prefersReducedMotion]);

  return (
    <div className="relative min-h-[550px] w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-30"
      />

      {/* Intro Splash (Logo 3D) */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="absolute inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-[64vw] max-w-[560px] h-[64vw] max-h-[560px] flex items-center justify-center" // Ajuste de tamanho para o container do logo 3D
              initial={{ scale: 0.92, filter: "blur(8px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ThreeDLogoMotion /> {/* << SEU NOVO COMPONENTE 3D AQUI! >> */}
              {/* soft glow */}
              <div className="absolute -inset-10 rounded-3xl bg-gradient-to-tr from-blue-500/30 via-fuchsia-400/20 to-purple-500/20 blur-2xl" />
            </motion.div>

            {allowSkip && (
              <button
                onClick={() => setShowIntro(false)}
                className="absolute right-4 top-4 z-50 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur hover:bg-white/20"
              >
                Pular
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layer (Image 2 style) */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pt-24 md:grid-cols-2 md:pt-28 lg:gap-16">
        {/* Left: headline & CTA */}
        <motion.div
          initial={prefersReducedMotion ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: showIntro ? 0.4 : 0 }}
          className="flex flex-col items-start"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-blue-400 to-fuchsia-400" />
            V‑Airon 
          </div>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Inteligência especializada em: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">Otimização de SEO, documentos e insights</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Aqui seu perfil funciona como SEU SITE  totalmente otimizado por IA, melhore automaticamente o SEO e o desempenho de anúncios, publicando seus produtos e serviços. Otimize e analise com IA seus contratos, documentos e assinaturas digitais, conquiste visibilidade online de forma simples com IA.
          </p>

          {/* << NOVA DIV FOI INSERIDA AQUI >> */}
          <div className="mt-4 flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.1, 1], // Animação de pulso
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaGift className="text-fuchsia-400" />
            </motion.div>
            <p className="text-sm md:text-base text-white/80">Teste por 7 dias grátis e ganhe até 5 análises de bônus.</p>
          </div>
          
          <div className="mt-6 flex items-center gap-3">
            {/* O estilo `submit-gradient-btn` foi adicionado aqui, substituindo as classes do Tailwind */}
            {/* O manipulador `onMouseMove` também foi adicionado para o efeito de "spotlight" */}
            <a
              href="#comece"
              className="submit-gradient-btn"
              onMouseMove={handleMouseMove}
            >
              Otimize seu alcance com IA
            </a>
          </div>
          {children && <div className="mt-8 w-full">{children}</div>}
        </motion.div>

        {/* Right: mock canvas resembling Image 2 */}
        <motion.div
          initial={prefersReducedMotion ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: showIntro ? 0.55 : 0.1 }}
          className="relative"
        >
          {endMockSrc ? (
            <div className="relative isolate w-full h-[500px] flex items-center justify-center">
              {/* Vídeo como mock principal */}
              <video
                src={endMockSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                alt="Product mock video"
                className="w-full h-[500px] object-cover rounded-3xl border border-white/10 bg-white/5 shadow-2xl mb-8"
                draggable={false}
              >
                Seu navegador não suporta o elemento de vídeo.
              </video>

              {/* floating glass cards */}
              <FloatingCard className="absolute -left-6 -top-8" delay={0.1} title="Ad & SEO AI" subtitle="Creator Studio" />
              <FloatingCard className="absolute right-4 top-10" delay={0.2} title="Assinatura Digital" subtitle="Secure Suite" />
              <FloatingCard className="absolute -right-8 bottom-6" delay={0.3} title="Leads & Insights" subtitle="Analytics" />
            </div>
          ) : (
            <div className="grid h-[550px] w-full place-items-center rounded-3xl border border-white/10 bg-white/5 p-10 text-white/60">
              Adicione seu mock na prop <code>endMockSrc</code>.
            </div>
          )}
        </motion.div>
      </div>

      {/* Soft gradient accents */}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[48rem] w-[48rem] rounded-full bg-blue-500/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-32 h-[38rem] w-[38rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
    </div>
  );
}

function FloatingCard({ className = "", delay = 0, title = "Title", subtitle = "Subtitle" }) {
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className={
        "absolute rounded-2xl border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur " +
        className
      }
    >
      <div className="text-xs uppercase tracking-wide text-white/70">{title}</div>
      <div className="text-sm font-medium">{subtitle}</div>
      <div className="mt-2 h-10 w-56 rounded-lg border border-white/10 bg-white/5" />
    </motion.div>
  );
}
