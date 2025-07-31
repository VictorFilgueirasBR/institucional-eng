// src/components/HeroSlides.js
import React, { useState } from 'react';
import './HeroSlides.scss';

const slides = [
  {
    image: '/images/slide1.jpg',
    title: 'Projetos Estruturais',
    subtitle: 'Alta performance e segurança',
  },
  {
    image: '/images/slide2.jpg',
    title: 'Consultoria Técnica',
    subtitle: 'Soluções sob medida',
  },
  {
    image: '/images/slide3.jpg',
    title: 'Execução de Obras',
    subtitle: 'Excelência do início ao fim',
  },
];

const HeroSlides = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="hero-slides">
      <div className="slides-wrapper" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide.image} alt={slide.title} />
            <h1>{slide.title}</h1>
            <h2>{slide.subtitle}</h2>
          </div>
        ))}
      </div>

      {/* Arrows de navegação */}
      <button className="nav-button prev" onClick={handlePrev}>❮</button>
      <button className="nav-button next" onClick={handleNext}>❯</button>

      {/* Paginação opcional (bullets) */}
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
