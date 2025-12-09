import { useEffect, useState } from 'react';
import { Search, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getPopularMovies, searchMovies, getGenres, getMoviesByGenre } from '../services/api';
import toast from 'react-hot-toast';

const Movies = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const genresData = await getGenres();
      setGenres(genresData);

      if (location.state?.genreId) {
        handleGenreClick(location.state.genreId);
      } else {
        const moviesData = await getPopularMovies();
        setMovies(moviesData);
      }
      setLoading(false);
    };
    loadInitialData();
  }, [location.state]); // Re-executa se o estado da rota mudar

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    setSelectedGenre(null);
    const toastId = toast.loading('Buscando filmes...');
    const results = await searchMovies(searchTerm);
    setMovies(results);
    toast.dismiss(toastId);
    setLoading(false);
  };

  const handleGenreClick = async (genreId) => {
    setLoading(true);
    setSearchTerm('');
    
    if (selectedGenre === genreId) {
      setSelectedGenre(null);
      const popular = await getPopularMovies();
      setMovies(popular);
    } else {
      setSelectedGenre(genreId);
      const results = await getMoviesByGenre(genreId);
      setMovies(results);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-film-black pt-24 px-6 md:px-12 pb-10">
      <div className="max-w-4xl mx-auto mb-10">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input 
            type="text"
            placeholder="Pesquise por filmes (ex: Avatar, Marvel...)"
            className="w-full bg-film-gray text-white p-4 pl-12 rounded-full border border-white/10 focus:border-film-red focus:outline-none transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 text-gray-400" size={20} />
          <button type="submit" className="absolute right-2 bg-film-red text-white px-6 py-2 rounded-full font-bold hover:bg-film-red-hover transition-colors">
            Buscar
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/10 ${selectedGenre === genre.id ? 'bg-film-red text-white border-film-red' : 'bg-film-gray text-gray-300 hover:bg-white/10'}`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-white">Carregando catálogo...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? movies.map((movie) => (
            <div key={movie.id} className="group bg-film-gray rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <Link to={`/movie/${movie.id}`}>
                <div className="relative">
                  <img 
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem'} 
                    alt={movie.title}
                    className="w-full h-[280px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm truncate group-hover:text-film-red transition-colors">{movie.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs mt-2">
                    <Star size={12} fill="currentColor" />
                    <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                  </div>
                </div>
              </Link>
            </div>
          )) : (
            <p className="text-white text-center col-span-full">Nenhum filme encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;