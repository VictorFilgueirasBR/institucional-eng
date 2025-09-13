import React, { useState, useEffect } from 'react';
import { FaGift } from 'react-icons/fa'; // Importa o ícone de presente
import './HeroSlides.scss';

const slides = [
  { image: '/images/enhanced_1.png' },
  { image: '/images/enhanced_2.png' },
  { image: '/images/enhanced_3.png' },
  { image: '/images/enhanced_4.png' },
  { image: '/images/enhanced_5.png' },
  { image: '/images/enhanced_6.png' },
  { image: '/images/enhanced_7.png' },
  { image: '/images/enhanced_8.png' },
  { image: '/images/enhanced_9.png' },
  { image: '/images/enhanced_10.png' },
  { image: '/images/enhanced_11.png' },
  { image: '/images/enhanced_12.png' },
];

const HeroSlides = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  };

  return (
    <section className="hero-slides">
      {/* Wrapper para as imagens de fundo que deslizam */}
      <div className="slides-background-wrapper" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="background-slide" key={index}>
            <img src={slide.image} alt={`Slide de fundo ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* << NOVO: hero-title fora do overlay >> */}
      <h1 className="hero-title">Plataforma completa para corretores de imóveis</h1>

      {/* << NOVO: Botão CADASTRE-SE fora do overlay >> */}
      <button 
        className="hero-main-cta-button submit-gradient-btn"
        onMouseMove={handleMouseMove}
        onClick={() => console.log('Navegar para a página de propriedades')}
      >
        INICIAR TESTE GRÁTIS →
      </button>

      {/* Conteúdo fixo sobre o slider, com estilo glassmorphism (agora apenas para o subtítulo) */}
      <div className="hero-content-overlay">
        {/* << REMOVIDO: h1 hero-title >> */}
        <p className="hero-subtitle">Descubra como podemos otimizar seus resultados, melhore contratos e otimize anúncios e alcance mais Leads com IA.</p>
        {/* << REMOVIDO: Botão CADASTRE-SE >> */}
      </div>

      {/* Arrows de navegação */}
      <button className="nav-button prev" aria-label="Anterior" onClick={handlePrev}>❮</button>
      <button className="nav-button next" aria-label="Próximo" onClick={handleNext}>❯</button>

      {/* Paginação (bullets) */}
      <div className="pagination">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`bullet ${index === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlides;
