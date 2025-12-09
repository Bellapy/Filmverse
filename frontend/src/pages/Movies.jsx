import { useEffect, useState } from 'react';
import { Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPopularMovies, searchMovies, getGenres, getMoviesByGenre } from '../services/api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null); // Qual gênero está ativo
  const [searchTerm, setSearchTerm] = useState(''); // O que foi digitado
  const [loading, setLoading] = useState(true);

  // 1. Carregar Gêneros e Filmes Populares ao iniciar
  useEffect(() => {
    const loadInitialData = async () => {
      const genresData = await getGenres();
      setGenres(genresData);
      
      const moviesData = await getPopularMovies();
      setMovies(moviesData);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  // 2. Função de Pesquisa (Ao dar Enter ou clicar na lupa)
  const handleSearch = async (e) => {
    e.preventDefault(); // Não recarrega a página
    if (!searchTerm) return;

    setLoading(true);
    setSelectedGenre(null); // Limpa o filtro de gênero se pesquisar nome
    const results = await searchMovies(searchTerm);
    setMovies(results);
    setLoading(false);
  };

  // 3. Função de Filtrar por Gênero
  const handleGenreClick = async (genreId) => {
    setLoading(true);
    setSearchTerm(''); // Limpa a pesquisa se clicar em gênero
    
    // Se clicar no mesmo gênero, desmarca e volta para populares
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
      
      {/* SEÇÃO 1: BARRA DE PESQUISA */}
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

      {/* SEÇÃO 2: FILTROS DE GÊNERO */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/10
              ${selectedGenre === genre.id 
                ? 'bg-film-red text-white border-film-red' // Ativo
                : 'bg-film-gray text-gray-300 hover:bg-white/10' // Inativo
              }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* SEÇÃO 3: GRID DE FILMES */}
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
                  {/* Overlay escuro ao passar o mouse */}
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