import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Certifique-se de que o caminho está correto

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;