import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { addFavorite } from '../services/backend'; // <--- IMPORTANTE: Conexão com o Backend
import { Star, Calendar, Clock, Play, Plus } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams(); // Pega o ID da URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega os dados do filme ao entrar na tela
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // --- FUNÇÃO DE SALVAR NA LISTA (NOVA) ---
  const handleAdd = async () => {
    if (!movie) return;
    
    // Chama o backend para salvar
    const result = await addFavorite(movie);
    
    // Mostra o resultado para o usuário
    if (result.success) {
      alert(`✅ Filme "${movie.title}" adicionado com sucesso!`);
    } else {
      alert(`⚠️ ${result.message}`);
    }
  };

  if (loading) return <div className="h-screen bg-film-black text-white flex items-center justify-center">Carregando...</div>;
  if (!movie) return <div className="h-screen bg-film-black text-white flex items-center justify-center">Filme não encontrado.</div>;

  // Busca o trailer no YouTube
  const trailer = movie.videos?.results?.find(vid => vid.type === "Trailer");

  return (
    <div className="min-h-screen bg-film-black text-white pb-20">
      
      {/* 1. BACKDROP GIGANTE */}
      <div 
        className="h-[50vh] md:h-[70vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-film-black via-film-black/60 to-transparent"></div>
      </div>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Coluna da Esquerda: Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="w-64 md:w-80 rounded-lg shadow-2xl border-4 border-film-gray"
            />
          </div>

          {/* Coluna da Direita: Informações */}
          <div className="flex-1 pt-4 md:pt-16 space-y-6">
            
            {/* Título */}
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">{movie.title}</h1>
              {movie.tagline && <p className="text-gray-400 italic text-lg">{movie.tagline}</p>}
            </div>

            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-300">
              <span className="flex items-center gap-1 text-yellow-400 font-bold">
                <Star size={18} fill="currentColor" />
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={18} />
                {movie.release_date?.split('-')[0]}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={18} />
                {movie.runtime} min
              </span>
            </div>

            {/* Gêneros */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(genre => (
                <span key={genre.id} className="px-3 py-1 bg-film-gray border border-white/10 rounded-full text-xs hover:bg-film-red transition-colors cursor-default">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Sinopse */}
            <div>
              <h3 className="text-xl font-bold mb-2">Sinopse</h3>
              <p className="text-gray-300 leading-relaxed max-w-3xl">
                {movie.overview || "Sinopse indisponível em português."}
              </p>
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="flex items-center gap-4">
              
              {/* BOTÃO ADICIONAR (Agora funciona!) */}
              <button 
                onClick={handleAdd}
                className="flex items-center gap-2 px-8 py-3 bg-film-red hover:bg-film-red-hover rounded font-bold transition-transform hover:scale-105"
              >
                <Plus size={20} />
                Adicionar à Lista
              </button>
              
              {/* BOTÃO TRAILER */}
              {trailer && (
                <a 
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded font-bold backdrop-blur-sm transition-colors"
                >
                  <Play size={20} />
                  Ver Trailer
                </a>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default MovieDetails;