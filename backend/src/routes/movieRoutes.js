const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Define os caminhos
router.get('/', movieController.getMovies);       // GET /api/movies
router.post('/', movieController.addMovie);       // POST /api/movies
router.delete('/:id', movieController.deleteMovie); // DELETE /api/movies/ID
router.patch('/:id', movieController.updateMovie); 

module.exports = router;