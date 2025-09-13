// src/pages/UserSellerLogin.jsx

import React, { useState, useEffect, useRef } from 'react'; // Importar useEffect e useRef
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importa os ícones de olho
import './UserSellerLogin.scss';

const UserSellerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({
    type: '',
    text: '',
  });
  const [showPassword, setShowPassword] = useState(false); // Novo estado para visibilidade da senha

  // Ref para o elemento DOM onde o botão do Google será renderizado
  const googleSignInButtonRef = useRef(null); 

  const validate = () => {
    const errors = {};
    const { email, password } = formData;

    if (!email) {
      errors.email = 'Email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email inválido.';
    }

    if (!password) {
      errors.password = 'Senha é obrigatória.';
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
      const response = await axios.post('http://localhost:5000/api/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setSubmitMessage({ type: 'success', text: 'Login realizado com sucesso! Redirecionando...' });
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Erro ao fazer login. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro de login:', error.response ? error.response.data : error.message);
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Email ou senha inválidos. Tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --- Nova Função para Credenciais do Google ---
  const handleGoogleCredentialResponse = async (response) => {
    // response.credential contém o ID token JWT do Google
    // console.log("Encoded JWT ID token: " + response.credential); // Para debug, se precisar ver o token
    setSubmitMessage({ type: '', text: '' }); // Limpa mensagens anteriores
    setIsSubmitting(true); // Indica que um processo de submissão está ocorrendo

    try {
      // Enviar o id_token para o seu backend para verificação e login/registro
      const backendResponse = await axios.post('http://localhost:5000/api/google-login', {
        id_token: response.credential,
      });

      if (backendResponse.data.token) {
        localStorage.setItem('token', backendResponse.data.token);
        setSubmitMessage({ type: 'success', text: 'Login com Google realizado com sucesso! Redirecionando...' });
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Erro ao fazer login com Google. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro no login com Google:', error.response ? error.response.data : error.message);
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Ocorreu um erro no servidor ao fazer login com Google. Tente novamente.',
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
          text: "signin_with", 
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
    <div className="login-page">
      <div className="login-container-wrapper">
        <div className="login-content">
          <div className="login-text">
            <h1 className="login-title">LOGIN</h1>
            <p>Crie seus anúncios de forma fácil e intuitiva.</p>
            <p className="small-text">Explore como as IAs podem Otimizar seus resultados.</p>
          </div>
        </div>

        <div className="login-form-container">
          <div className="login-form-glass">
            <h2 className="text-login">Acesse sua conta</h2>
            <form onSubmit={handleSubmit} className="login-form">
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

              <div className="form-group password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} color="#888" />
                  ) : (
                    <AiOutlineEyeInvisible size={20} color="#888" />
                  )}
                </button>
                <p className="forgot-password">
                  <a href="/forgot-password">Esqueceu sua senha?</a>
                </p>
                {formErrors.password && <span className="error">{formErrors.password}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleMouseMove}
                className="submit-gradient-btn"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="social-login">
              <span className="or-divider">OU</span>
              {/* Div para o botão do Google que será renderizado pelo GSI */}
              <div ref={googleSignInButtonRef} className="google-sign-in-button-wrapper"></div>
            </div>

            <p className="login-link">
              Não tem uma conta? <a href="/register-seller">Crie uma conta</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSellerLogin;
