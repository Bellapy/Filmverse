const express = require('express');
const cors = require('cors'); // <--- Importante
const mongoose = require('mongoose');
require('dotenv').config();

// Importa as rotas
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORREÇÃO DO CORS AQUI ---
// Libera o acesso para qualquer origem (Frontend)
app.use(cors()); 
app.use(express.json()); // Permite receber JSON

// Conecta ao Banco
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Conectado com Sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error.message);
  }
};
connectDB();

// Configura as Rotas
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
  res.send('API FilmVerse rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});