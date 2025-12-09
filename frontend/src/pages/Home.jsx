import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/api';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow'; // <--- Importamos aqui

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="h-screen bg-film-black flex items-center justify-center text-white">Carregando...</div>;
  }

  return (
    <div className="bg-film-black min-h-screen pb-10">
      
      {/* Destaque Gigante */}
      <HeroBanner movies={movies} />

      {/* Conteúdo Principal (sobe um pouco pra cima do banner com margin negativa) */}
      {/* Conteúdo Principal (fica logo abaixo do banner, organizado) */}
        <div className="relative z-10 mt-4 pb-10">
        <MovieRow title="Filmes do Momento" movies={movies} />
        
        {/* Podemos repetir a linha se tivermos mais categorias depois */}
        <MovieRow title="Populares no FilmVerse" movies={[...movies].reverse()} />
      </div>

    </div>
  );
};

export default Home;