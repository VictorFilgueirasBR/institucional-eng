import React from 'react';
import './Home.scss';
import Header from '../components/Header';
import HeroSlides from '../components/HeroSlides';
import AnimatedCounters from '../components/AnimatedCounters'; // << NOVO: Importe o componente AnimatedCounters >>
import WallStyle from '../components/WallStyle';
import PropertiesGrid from '../components/PropertiesGrid';
import HomeHeroMotion from '../components/HomeHeroMotion';
import HomeIntroMotion from "../components/HomeIntroMotion";
import FuturisticDashboard from '../components/FuturisticDashboard';
import FooterMin from '../components/FooterMin';

import DashboardCard from '../components/DashboardCard';
import Dashboard from '../components/Dashboard';


const Home = () => {
  return (
    <div className="home" id="home">
      <Header />
      <HeroSlides />

      {/* << NOVO: Componente de Contadores Animados >> */}
      <AnimatedCounters />


      <HomeIntroMotion
      startSrc="/images/logo-motion.png"
      durationMs={3500}
      allowSkip={true}
    >
      <HomeHeroMotion />
    </HomeIntroMotion>
    
      

      {/* << NOVO: Componente de Grid de Imóveis >> */}
      <PropertiesGrid />

      <DashboardCard />


      <FuturisticDashboard />

      
      
      
      

      

      <FooterMin />
      
    </div>
  );
};

export default Home;
