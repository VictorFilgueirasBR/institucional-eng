// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:3000', // <-- Mude esta URL para o endereço real da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;