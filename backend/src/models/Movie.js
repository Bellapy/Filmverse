const mongoose = require('mongoose');

// Define como o filme será salvo no banco
const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: String,
    required: true,
    unique: true, // Não deixa salvar o mesmo filme duas vezes
  },
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
  },
  voteAverage: {
    type: Number,
  },
  overview: {
    type: String,
  },
  // Campo extra para suas anotações pessoais (Item 3.2 do PDF)
  personalRating: {
    type: Number,
    default: 0
  },
  watched: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Movie', movieSchema);