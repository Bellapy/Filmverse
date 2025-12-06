// backend/src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configurações básicas
app.use(cors()); // Permite acesso externo (do React)
app.use(express.json()); // Permite receber dados em formato JSON

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do FilmVerse está rodando! 🚀');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});