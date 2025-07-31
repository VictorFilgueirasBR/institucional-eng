// src/pages/Home.jsx
import React from 'react';
import './Home.scss';
import Header from '../components/Header';
import HeroSlides from '../components/HeroSlides'; // 🔹 Importa o novo componente
import WallStyle from '../components/WallStyle';
import ContactForm from '../components/ContactForm';



const Home = () => {
  return (
    <div className="home" id="home">
      <Header />

      {/* 🔷 Slides dos serviços */}
      <HeroSlides />

      {/* 🔷 Destaques e inovações */}
      <section className="highlights" id="solutions">
        <h2>Destaques e Inovações</h2>
        <div className="cards">
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="card" key={item}>
              <h3>Inovação {item}</h3>
              <p>Descrição breve da inovação ou destaque na área de engenharia civil.</p>
            </div>
          ))}
        </div>
      </section>

      <WallStyle />

      <ContactForm />


    </div>
  );
};

export default Home;
