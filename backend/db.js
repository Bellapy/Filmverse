const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Tenta conectar usando o link que agora o Node consegue ler
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erro ao conectar: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;