import React, { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * DASHBOARD FUTURISTA – ALCANCE ORGÂNICO
 * Stack: React + Tailwind + Recharts (Componentes Shadcn/ui recriados)
 *
 * Recursos:
 * - Tema escuro imersivo com glow sutil (neon)
 * - Gráfico funcional de Alcance Orgânico com animação (agora via Canvas)
 * - KPIs com contagens animadas e variação percentual
 * - Filtros de período e cliente
 */

// ------- Componentes Recriados (shadcn/ui) -------

// Card
const Card = ({ className, children }) => (
  <div className={`rounded-xl border border-white/10 bg-white/5 shadow-xl ${className}`}>
    {children}
  </div>
);

// CardHeader
const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

// CardTitle
const CardTitle = ({ className, children }) => (
  <h3 className={`font-semibold tracking-tight text-xl ${className}`}>
    {children}
  </h3>
);

// CardContent
const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Button
const Button = ({ className, children, onClick, variant = "default", size = "default" }) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Input
const Input = ({ className, type, value, readOnly }) => (
  <input
    type={type}
    value={value}
    readOnly={readOnly}
    className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

// Select
const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectRef]);

  return (
    <div className="relative" ref={selectRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {children[0]} {/* SelectTrigger */}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 border rounded-md bg-neutral-900 border-white/10"
          >
            {React.Children.map(children[1].props.children, (child) =>
              React.cloneElement(child, {
                onClick: () => {
                  onValueChange(child.props.value);
                  setIsOpen(false);
                },
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SelectTrigger = ({ className, children }) => (
  <div className={`flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ${className}`}>
    {children}
  </div>
);

const SelectValue = ({ placeholder }) => (
  <span className="text-white">{placeholder}</span>
);

const SelectContent = ({ children }) => <div>{children}</div>;

const SelectItem = ({ value, children, onClick }) => (
  <div
    onClick={onClick}
    className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-white/10"
  >
    {children}
  </div>
);

// Separator
const Separator = ({ className }) => <div className={`h-[1px] w-full ${className}`} />;

// ------- Ícones Inline (substituindo lucide-react) -------
const ArrowUpRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10M7 17L17 7" /></svg>
);

const ArrowDownRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 7L7 17M17 7v10M17 7h-10" /></svg>
);

const RefreshCcw = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4v6h-6"/><path d="M3 20v-6h6"/><path d="M11 15.5a8 8 0 1 0-3.5-3.5l-2.12 2.12"/><path d="M12 12V2.5l5.5 5.5"/></svg>
);

const Activity = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

const CalendarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>
);

// ------- LÓGICA E DASHBOARD PRINCIPAL -------

// Utilidades
const formatNumber = (n) =>
  Intl.NumberFormat("pt-BR", { notation: n > 9999 ? "compact" : "standard", maximumFractionDigits: 1 }).format(n);

const formatPercent = (n) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;

// Gera dados sintéticos e reprodutíveis
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function genSeries(days = 30, seed = 42, base = 2800, volatility = 0.25) {
  const out = [];
  let value = base;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const r = (seededRandom(seed + i) - 0.5) * 2; // -1..1
    value = Math.max(50, value * (1 + r * volatility * 0.1) + r * 25);
    out.push({
      date: d.toISOString().slice(0, 10),
      organic: Math.round(value),
      paid: Math.round(value * (0.35 + (seededRandom(seed * 2 + i) * 0.25))),
      engagement: Math.max(0.5, 2.5 + r * 0.6), // %
      ctr: Math.max(0.2, 1.4 + r * 0.4), // %
    });
  }
  return out;
}

// Animação de contagem simples
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = display;
    const to = value;
    const duration = 600;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{formatNumber(Math.round(display))}</span>;
};

// Tilt 3D leve (refeito sem framer-motion)
const Tilt = ({ children, className = "" }) => (
  <div className={`transition-transform duration-300 hover:rotate-x-[-2.5deg] hover:rotate-y-[2.5deg] ${className}`}>
    {children}
  </div>
);

// Badge Live
const LiveBadge = () => (
  <div className="flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
    </span>
    Live
  </div>
);

// Gráfico de Canvas
const CanvasChart = ({ data, mode }) => {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    ctx.clearRect(0, 0, rect.width, rect.height);

    const margin = 30;
    const innerWidth = rect.width - margin * 2;
    const innerHeight = rect.height - margin * 2;

    const values = data.map(d => mode === 'organic' ? d.organic : d.total);
    const maxValue = Math.max(...values, 10);
    const minValue = Math.min(...values, 0);

    const xScale = (i) => margin + (i / (data.length - 1)) * innerWidth;
    const yScale = (value) => margin + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;

    // Desenha linhas de grade
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const y = margin + innerHeight - (innerHeight / 4) * i;
        ctx.moveTo(margin, y);
        ctx.lineTo(margin + innerWidth, y);
    }
    ctx.stroke();

    // Desenha a linha/área
    ctx.beginPath();
    if (mode === 'organic') {
        const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
        gradient.addColorStop(0.05, "rgba(34, 211, 238, 0.35)");
        gradient.addColorStop(0.95, "rgba(34, 211, 238, 0.02)");
        ctx.fillStyle = gradient;
        
        ctx.moveTo(xScale(0), yScale(data[0].organic));
        data.forEach((d, i) => {
            ctx.lineTo(xScale(i), yScale(d.organic));
        });
        ctx.lineTo(xScale(data.length - 1), yScale(minValue));
        ctx.lineTo(xScale(0), yScale(minValue));
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#22d3ee";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(xScale(0), yScale(data[0].organic));
        data.forEach((d, i) => {
            ctx.lineTo(xScale(i), yScale(d.organic));
        });
        ctx.stroke();

    } else {
        ctx.strokeStyle = "#22d3ee";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(xScale(0), yScale(data[0].organic));
        data.forEach((d, i) => {
            ctx.lineTo(xScale(i), yScale(d.organic));
        });
        ctx.stroke();

        ctx.strokeStyle = "#818cf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xScale(0), yScale(data[0].paid));
        data.forEach((d, i) => {
            ctx.lineTo(xScale(i), yScale(d.paid));
        });
        ctx.stroke();
    }

    // Rótulos do Eixo Y
    ctx.fillStyle = "#9ca3af";
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i < 5; i++) {
        const y = margin + innerHeight - (innerHeight / 4) * i;
        const labelValue = minValue + (maxValue - minValue) * (i / 4);
        ctx.fillText(formatNumber(Math.round(labelValue)), margin - 5, y + 4);
    }
    
    // Rótulos do Eixo X
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const step = Math.ceil(data.length / 5);
    for (let i = 0; i < data.length; i += step) {
        ctx.fillText(data[i].date.slice(5), xScale(i), margin + innerHeight + 8);
    }

    const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const index = Math.round(((x - margin) / innerWidth) * (data.length - 1));
        
        if (index >= 0 && index < data.length) {
            const d = data[index];
            setTooltip({
                x: x,
                y: y,
                data: d,
                label: d.date
            });
        } else {
            setTooltip(null);
        }
    };

    const handleMouseOut = () => {
        setTooltip(null);
    };
    
    // Adiciona os event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);

    // Função de limpeza para remover os listeners
    return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseout', handleMouseOut);
    };

  }, [data, mode]);

  return (
    <div className="relative h-[360px]">
        <canvas ref={canvasRef} className="w-full h-full" />
        {tooltip && (
            <div 
                className="absolute rounded-xl border border-white/10 bg-black/80 text-white/90 backdrop-blur p-3 text-xs"
                style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
            >
                <div className="opacity-70">{tooltip.label}</div>
                <div className="mt-1">
                    <div>Orgânico: <b>{formatNumber(tooltip.data?.organic || 0)}</b></div>
                    {mode === "mix" && <div>Pago: <b>{formatNumber(tooltip.data?.paid || 0)}</b></div>}
                </div>
            </div>
        )}
    </div>
  );
};


export default function App() {
  const [period, setPeriod] = useState("7"); // 7, 30, 90
  const [client, setClient] = useState("Cliente Alpha");
  const [mode, setMode] = useState("organic"); // organic | mix
  const [seed, setSeed] = useState(42);

  // Estado para partículas
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Gerar partículas com posições e tamanhos aleatórios
    const generatedParticles = Array.from({ length: 50 }).map(() => ({
      id: Math.random(),
      size: Math.random() * 2 + 1, // Tamanho entre 1px e 3px
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 5, // Duração da animação ajustada para ser mais visível
    }));
    setParticles(generatedParticles);
  }, []); // Apenas uma vez no carregamento

  const raw = useMemo(() => genSeries(Number(period), seed, 3200, 0.8), [period, seed]);
  const data = useMemo(() => raw.map((d) => ({ ...d, total: d.organic + d.paid })), [raw]);

  const totals = useMemo(() => {
    const last = data[data.length - 1] || { organic: 0, paid: 0, engagement: 0, ctr: 0 };
    const prev = data[data.length - 2] || last;
    const alc = mode === "organic" ? last.organic : last.organic + last.paid;
    const alcPrev = mode === "organic" ? prev.organic : prev.organic + prev.paid;
    const growth = ((alc - alcPrev) / Math.max(1, alcPrev)) * 100;
    const eng = last.engagement;
    const ctr = last.ctr;
    return { alc, growth, eng, ctr };
  }, [data, mode]);

  useEffect(() => {
    const id = setInterval(() => setSeed((s) => s + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden text-white bg-gradient-to-b from-[#0c0a09] via-[#17131F] to-[#0c0a09] ">
      {/* Partículas de fundo */}
      <style>
        {`
          .dust-particle {
            position: absolute;
            background: rgba(200, 200, 200, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: floatDust linear infinite;
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
            z-index: 0;
            will-change: transform;
          }

          @keyframes floatDust {
            0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
            25% { transform: translate(8px, -10px) scale(1.05); opacity: 0.6; }
            50% { transform: translate(-6px, 10px) scale(0.95); opacity: 0.7; }
            75% { transform: translate(10px, 6px) scale(1); opacity: 0.5; }
            100% { transform: translate(-8px, -10px) scale(1); opacity: 0.8; }
          }
        `}
      </style>
      
      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Conteúdo principal do dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Dashboard de Alcance Orgânico</h1>
            <p className="text-sm md:text-base text-white/60">Métricas em tempo real dos anúncios – {client}</p>
          </div>
          <div className="flex items-center gap-3">
            <LiveBadge />
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
              <RefreshCcw className="h-4 w-4 mr-2" /> Atualizar
            </Button>
          </div>
        </div>

        {/* Controles */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={client} onValueChange={setClient}>
                <SelectTrigger className="bg-white/10 border-white/10">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-white/10">
                  <SelectItem value="Cliente Alpha">Cliente Alpha</SelectItem>
                  <SelectItem value="Cliente Beta">Cliente Beta</SelectItem>
                  <SelectItem value="Cliente Gamma">Cliente Gamma</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {["7", "30", "90"].map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    onClick={() => setPeriod(p)}
                    className={
                      "border-white/10 bg-white/5 hover:bg-white/10 " +
                      (period === p ? "ring-2 ring-cyan-400/60" : "")
                    }
                    variant="outline"
                  >
                    {p}d
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Modo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {[
                  { id: "organic", label: "Orgânico" },
                  { id: "mix", label: "Orgânico + Pago" },
                ].map((m) => (
                  <Button
                    key={m.id}
                    size="sm"
                    onClick={() => setMode(m.id)}
                    className={
                      "border-white/10 bg-white/5 hover:bg-white/10 " +
                      (mode === m.id ? "ring-2 ring-cyan-400/60" : "")
                    }
                    variant="outline"
                  >
                    {m.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white/60">Data inicial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Input className="bg-white/10 border-white/10" type="date" value={data[0]?.date} readOnly />
                <CalendarIcon className="h-4 w-4 text-white/40" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPIs */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Tilt>
            <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 shadow-xl">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm text-white/60">Alcance {mode === "organic" ? "Orgânico" : "Total"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold tracking-tight">
                    <AnimatedNumber value={totals.alc} />
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${totals.growth >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {totals.growth >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {formatPercent(totals.growth)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Tilt>

          <Tilt>
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm text-white/60">Engajamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-semibold">{totals.eng.toFixed(2)}%</div>
                  <Activity className="h-5 w-5 text-cyan-300" />
                </div>
              </CardContent>
            </Card>
          </Tilt>

          <Tilt>
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm text-white/60">CTR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-semibold">{totals.ctr.toFixed(2)}%</div>
                  <span className="text-xs text-white/50">cliques / impressões</span>
                </div>
              </CardContent>
            </Card>
          </Tilt>

          <Tilt>
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm text-white/60">Posts analisados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{formatNumber(Math.round(Number(period) * 1.2))}</div>
                <div className="text-xs text-white/50">últimos {period} dias</div>
              </CardContent>
            </Card>
          </Tilt>
        </div>

        {/* Gráfico principal (Canvas) */}
        {/* Gráfico principal (Canvas) */}
<div className="mt-6">
  <Card className="bg-white/5 border-white/10 overflow-hidden">
    <CardHeader className="pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Título */}
        <CardTitle className="text-[1.5rem] sm:text-base whitespace-normal sm:whitespace-nowrap">
          Analytics ({mode === "organic" ? "Orgânico" : "Orgânico + Pago"})
        </CardTitle>

        {/* Datas */}
        <div className="text-[0.8rem] sm:text-xs text-white/50 mt-1 sm:mt-0">
          {data[0]?.date} → {data[data.length - 1]?.date}
        </div>
      </div>
    </CardHeader>

    <CardContent className="pt-4">
      <CanvasChart data={data} mode={mode} />
    </CardContent>
  </Card>
</div>


        {/* Rodapé */}
        <div className="mt-8 text-xs text-white/40 flex items-center gap-2 whitespace-nowrap">
          <Separator className="bg-white/10" />
          <span>UI | UX • V-Airon </span>
        </div>
      </div>
    </div>
  );
}
