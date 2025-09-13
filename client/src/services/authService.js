// src/services/authService.js

/**
 * Define o token JWT no armazenamento local (localStorage).
 * Este token é usado para manter o usuário autenticado.
 *
 * @param {string} token - O token JWT retornado pela API após o login ou cadastro.
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('jwtToken', token);
  } else {
    localStorage.removeItem('jwtToken');
  }
};

/**
 * Obtém o token JWT do armazenamento local (localStorage).
 *
 * @returns {string | null} O token JWT se existir, ou null caso contrário.
 */
export const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

/**
 * Remove o token JWT do armazenamento local, efetivamente deslogando o usuário.
 */
export const clearAuthToken = () => {
  localStorage.removeItem('jwtToken');
};

/**
 * Verifica se o usuário está autenticado.
 *
 * @returns {boolean} Retorna true se um token válido for encontrado, false caso contrário.
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  // Você pode adicionar uma lógica de validação de token aqui,
  // como verificar a expiração do token (se a sua API retornar essa info).
  return !!token;
};