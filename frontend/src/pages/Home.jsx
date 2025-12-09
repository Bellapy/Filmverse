import { useEffect, useState } from 'react';
import { getTrendingMovies, getMoviesByGenre } from '../services/api'; 
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genreImages, setGenreImages] = useState({}); 
  const [loading, setLoading] = useState(true);

  const genresToDisplay = [
    { id: 28, name: 'Ação' },
    { id: 878, name: 'Ficção Científica' },
    { id: 27, name: 'Terror' },
    { id: 35, name: 'Comédia' },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Busca os filmes dos carrosséis
        const trendingData = await getTrendingMovies();
        setTrendingMovies(trendingData);
        // Usamos uma cópia invertida para a segunda lista
        setPopularMovies([...trendingData].reverse());

        // Busca a imagem de capa para cada gênero
        const images = {};
        for (const genre of genresToDisplay) {
          const movies = await getMoviesByGenre(genre.id, 1); 
          if (movies.length > 0) {
            images[genre.id] = `https://image.tmdb.org/t/p/w500${movies[0].backdrop_path}`;
          }
        }
        setGenreImages(images);

      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) {
    return <div className="h-screen bg-film-black flex items-center justify-center text-white">Carregando...</div>;
  }

  return (
    <div className="bg-film-black min-h-screen">
      <HeroBanner movies={trendingMovies} />
      <div className="relative z-10 mt-4 pb-10">
        <MovieRow title="Filmes do Momento" movies={trendingMovies} />
        
       
        <div className="px-6 md:px-12 mt-12 mb-12"> 
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 border-l-4 border-film-red pl-4">
            Explore por Gênero
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {genresToDisplay.map(genre => (
              <Link to={`/filmes`} state={{ genreId: genre.id }} key={genre.id} className="relative rounded-lg overflow-hidden group h-32">
                <img 
                  src={genreImages[genre.id] || 'https://via.placeholder.com/500x281?text=Carregando...'} 
                  alt={genre.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold font-heading">{genre.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <MovieRow title="Populares no FilmVerse" movies={popularMovies} />
      </div>
    </div>
  );
};

export default Home;