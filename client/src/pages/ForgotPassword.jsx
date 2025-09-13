// client/src/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.scss'; // Importa o SCSS para estilização

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitMessage, setSubmitMessage] = useState({
    type: '',
    text: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: '', text: '' }); // Limpa mensagens anteriores
    setIsSubmitting(true);

    if (!email) {
      setSubmitMessage({ type: 'error', text: 'Por favor, insira seu e-mail.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Esta rota será criada no backend no próximo passo
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      setSubmitMessage({ type: 'success', text: response.data.message });
    } catch (error) {
      console.error('Erro na solicitação de redefinição de senha:', error.response ? error.response.data : error.message);
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao enviar e-mail de redefinição. Verifique o e-mail e tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para efeito de brilho no botão (igual às outras páginas)
  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container-wrapper">
        <div className="forgot-password-content">
          <div className="forgot-password-text">
            <h1>Esqueceu sua Senha?</h1>
            <p>Não se preocupe, isso acontece.</p>
            <p className="small-text">Insira seu e-mail para redefinir sua senha.</p>
          </div>
        </div>

        <div className="forgot-password-form-container">
          <div className="forgot-password-form-glass">
            <h2>Redefinir Senha</h2>
            <form onSubmit={handleSubmit} className="forgot-password-form">
              {submitMessage.text && (
                <div className={`message ${submitMessage.type}`}>
                  {submitMessage.text}
                </div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleMouseMove}
                className="submit-gradient-btn"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Link de Redefinição'}
              </button>
            </form>

            <p className="back-to-login-link">
              Lembrou? <a href="/login-seller">Voltar para o Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
