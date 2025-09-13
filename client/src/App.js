import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserSellerRegister from './pages/UserSellerRegister';
import UserSellerLogin from './pages/UserSellerLogin';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home'; // Importe o componente Home
import MainLayout from './components/MainLayout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* Rota inicial para o componente Home */}
          <Route path="register-seller" element={<UserSellerRegister />} />
          <Route path="login-seller" element={<UserSellerLogin />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          
          {/* Adicione outras rotas aqui */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
