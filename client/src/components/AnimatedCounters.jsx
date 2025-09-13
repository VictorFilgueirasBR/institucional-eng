// client/src/components/AnimatedCounters.jsx

import React, { useState, useEffect, useRef } from 'react';
import './AnimatedCounters.scss';

// Componente individual de contador para reutilização
const Counter = ({ prefix, value, suffix, label, duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null); // Ref para observar a entrada na tela

  // Hook para animação do número
  useEffect(() => {
    // Função para iniciar a animação
    const startAnimation = () => {
      let start = 0;
      // Ajuste para lidar com números decimais (ex: 3.5k, 1.5M)
      const isDecimal = String(value).includes('.');
      const factor = isDecimal ? 10 : 1;
      const targetValue = value * factor;

      const increment = targetValue / (duration / 16); // ~60fps
      
      const animate = () => {
        start += increment;
        if (start < targetValue) {
          setCurrentValue(isDecimal ? (start / factor).toFixed(1) : Math.floor(start));
          requestAnimationFrame(animate);
        } else {
          setCurrentValue(value); // Garante que o valor final seja exato
        }
      };
      animate();
    };

    // Intersection Observer para detectar quando o componente está visível
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.unobserve(entry.target); // Para de observar depois de animar
          }
        });
      },
      {
        threshold: 0.5, // 50% do componente visível
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value, duration]); // Dependências para re-executar se os valores mudarem

  return (
    <div className="counter-item" ref={ref}>
      <div className="counter-number-wrapper">
        <span className="counter-number-prefix">{prefix}</span>
        <span className="counter-number">{currentValue}</span>
        <span className="counter-number-suffix">{suffix}</span>
      </div>
      <div className="counter-title">{label}</div>
    </div>
  );
};


const AnimatedCounters = () => {
  const countersData = [
    { id: 1, value: 1.473, suffix: 'k', label: 'Leads Qualificados' },
    { id: 2, prefix: 'R$', value: 1.1, suffix: 'M', label: 'Custo Reduzido' },
    { id: 3, value: 26, suffix: 'k', label: 'Alcance Orgânico' },
    { id: 4, prefix: '+',value: 78, suffix: '%', label: 'Taxa de Conversão' },
  ];

  return (
    <section className="animated-counters-section">
      <div className="animated-counters-wrapper">
        {countersData.map((counter) => (
          <Counter
            key={counter.id}
            prefix={counter.prefix}
            value={counter.value}
            suffix={counter.suffix}
            label={counter.label}
          />
        ))}
      </div>
    </section>
  );
};

export default AnimatedCounters;
