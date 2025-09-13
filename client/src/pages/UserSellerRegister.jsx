// src/pages/UserSellerRegister.jsx

import React, { useState, useEffect, useRef } from 'react'; // Importar useEffect e useRef
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import './UserSellerRegister.scss';

const UserSellerRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({
    type: '',
    text: '',
  });

  // Ref para o elemento DOM onde o botão do Google será renderizado
  const googleSignInButtonRef = useRef(null);

  const validate = () => {
    const errors = {};
    const { email, password, confirmPassword } = formData;

    if (!email) {
      errors.email = 'Email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email inválido.';
    }

    if (!password) {
      errors.password = 'Senha é obrigatória.';
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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: '', text: '' });
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setSubmitMessage({ type: 'success', text: 'Cadastro realizado com sucesso! Redirecionando...' });
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Erro ao cadastrar. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro de cadastro:', error.response ? error.response.data : error.message);
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Ocorreu um erro no servidor. Tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para efeito de brilho no botão
  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  };

  // --- Nova Função para Credenciais do Google (adaptada para o registro) ---
  const handleGoogleCredentialResponse = async (response) => {
    setSubmitMessage({ type: '', text: '' }); // Limpa mensagens anteriores
    setIsSubmitting(true); // Indica que um processo de submissão está ocorrendo

    try {
      // Enviar o id_token para o seu backend para verificação e login/registro
      const backendResponse = await axios.post('http://localhost:5000/api/google-login', {
        id_token: response.credential,
      });

      if (backendResponse.data.token) {
        localStorage.setItem('token', backendResponse.data.token);
        setSubmitMessage({ type: 'success', text: 'Cadastro/Login com Google realizado com sucesso! Redirecionando...' });
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Erro ao fazer cadastro/login com Google. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro no cadastro/login com Google:', error.response ? error.response.data : error.message);
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Ocorreu um erro no servidor ao fazer cadastro/login com Google. Tente novamente.',
      });
    } finally {
      setIsSubmitting(false); // Finaliza o processo de submissão
    }
  };

  // --- useEffect para inicializar o Google Identity Services ---
  useEffect(() => {
    // Verifica se o objeto 'google' está disponível no window
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "794844647070-rktv6iq0ttci27c2u33kolvek75tr71o.apps.googleusercontent.com", // SEU CLIENT_ID REAL AQUI!
        callback: handleGoogleCredentialResponse, // Sua função de callback para o token
      });

      // Renderiza o botão do Google no elemento referenciado
      window.google.accounts.id.renderButton(
        googleSignInButtonRef.current, // O elemento DOM onde o botão será renderizado
        { 
          theme: "outline", 
          size: "large", 
          text: "signup_with", // Texto para indicar "Cadastre-se com"
          width: "100%", 
          shape: "pill", 
          locale: "pt-BR" 
        } // Customizações visuais do botão
      );
      // Opcional: Para mostrar o "One Tap" prompt (comentar se não quiser)
      // window.google.accounts.id.prompt(); 
    }
  }, []); // Executa apenas uma vez no carregamento do componente

  return (
    <div className="register-page">
      <div className="register-container-wrapper">
        <div className="register-content">
          <div className="register-text">
            <h1>CADASTRE-SE</h1>
            <p>Anuncie, impressione e converta.</p>
            <p className="small-text">A venda acontece no primeiro contato com o imóvel.</p>
          </div>
        </div>

        <div className="register-form-container">
          <div className="register-form-glass">
            <h2>Cadastro para Anunciantes</h2>
            <form onSubmit={handleSubmit} className="register-form">
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seuemail@exemplo.com"
                  required
                />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                />
                <p className="password-requirements">
                  Pelo menos 12 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.
                </p>
                {formErrors.password && <span className="error">{formErrors.password}</span>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  required
                />
                {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
              </div>

              {/* Botão premium com efeito de brilho */}
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleMouseMove}
                className="submit-gradient-btn"
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>

            <div className="social-login">
              <span className="or-divider">OU</span>
              {/* Div para o botão do Google que será renderizado pelo GSI */}
              <div ref={googleSignInButtonRef} className="google-sign-in-button-wrapper"></div>
            </div>

            <p className="login-link">
              Já tem uma conta? <a href="/login-seller">Faça Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSellerRegister;
