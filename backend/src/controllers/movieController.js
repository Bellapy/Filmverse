const Movie = require('../models/Movie');

// 1. LISTAR
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. ADICIONAR
exports.addMovie = async (req, res) => {
  const { tmdbId, title, posterPath, voteAverage, overview } = req.body;

  try {
    const movieExists = await Movie.findOne({ tmdbId });
    if (movieExists) {
      return res.status(400).json({ message: 'Filme já está na lista!' });
    }

    const movie = new Movie({
      tmdbId,
      title,
      posterPath,
      voteAverage,
      overview
    });

    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. REMOVER
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Filme não encontrado' });

    await movie.deleteOne();
    res.json({ message: 'Filme removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. ATUALIZAR (O NOVO)
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Filme não encontrado' });

    // Inverte o status (se era true vira false, se false vira true)
    movie.watched = !movie.watched;
    
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};