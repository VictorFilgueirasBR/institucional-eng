// client/src/pages/ResetPassword.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Para obter o token da URL e navegar
import './ResetPassword.scss'; // Cria este SCSS para estilização

const ResetPassword = () => {
  const { token } = useParams(); // Obtém o token da URL
  const navigate = useNavigate(); // Para redirecionar após o sucesso

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitMessage, setSubmitMessage] = useState({
    type: '',
    text: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validação básica da senha (igual à de registro)
  const validate = () => {
    const errors = {};

    if (!password) {
      errors.password = 'A nova senha é obrigatória.';
    } else if (password.length < 12) {
      errors.password = 'A senha deve ter pelo menos 12 caracteres.';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'A senha deve conter pelo menos uma letra maiúscula.';
    } else if (!/\d/.test(password)) {
      errors.password = 'A senha deve conter pelo menos um número.';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = 'A senha deve conter pelo menos um caractere especial.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: '', text: '' }); // Limpa mensagens anteriores
    setIsSubmitting(true);

    const validationErrors = validate();
    if (validationErrors) {
      // Como não temos um estado para formErrors aqui, vamos apenas mostrar a primeira mensagem de erro
      const firstError = Object.values(validationErrors)[0];
      setSubmitMessage({ type: 'error', text: firstError });
      setIsSubmitting(false);
      return;
    }

    try {
      // Esta rota será criada no backend no próximo passo
      const response = await axios.post(`http://localhost:5000/api/reset-password/${token}`, { password });
      setSubmitMessage({ type: 'success', text: response.data.message });
      
      // Redireciona para a página de login após alguns segundos
      setTimeout(() => {
        navigate('/login-seller'); 
      }, 3000);

    } catch (error) {
      console.error('Erro ao redefinir senha:', error.response ? error.response.data : error.message);
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao redefinir sua senha. O link pode ser inválido ou expirado.',
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
    <div className="reset-password-page">
      <div className="reset-password-container-wrapper">
        <div className="reset-password-content">
          <div className="reset-password-text">
            <h1>Redefinir sua Senha</h1>
            <p>Digite sua nova senha abaixo.</p>
            <p className="small-text">Certifique-se de que é uma senha forte e segura.</p>
          </div>
        </div>

        <div className="reset-password-form-container">
          <div className="reset-password-form-glass">
            <h2>Nova Senha</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
              {submitMessage.text && (
                <div className={`message ${submitMessage.type}`}>
                  {submitMessage.text}
                </div>
              )}

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Nova Senha"
                  required
                />
                <p className="password-requirements">
                  Pelo menos 12 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.
                </p>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme a Nova Senha"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleMouseMove}
                className="submit-gradient-btn"
              >
                {isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
