import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { addFavorite } from '../services/backend';
import { Star, Calendar, Clock, Play, Plus, X } from 'lucide-react';
import MovieRow from '../components/MovieRow'; // Reutilizamos o carrossel!
import CastMember from '../components/CastMember'; // Nosso componente novo

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false); // Estado para controlar o modal

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
      window.scrollTo(0, 0); // Rola a página para o topo
    };
    fetchData();
  }, [id]);

  const handleAdd = async () => {
    if (!movie) return;
    const result = await addFavorite(movie);
    alert(result.success ? `✅ ${movie.title} salvo!` : `⚠️ ${result.message}`);
  };

  if (loading) return <div className="h-screen bg-film-black flex items-center justify-center text-white">Carregando...</div>;
  if (!movie) return <div className="h-screen bg-film-black flex items-center justify-center">Filme não encontrado.</div>;

  const trailer = movie.videos?.results?.find(vid => vid.type === 'Trailer');
  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const cast = movie.credits?.cast?.slice(0, 10); // Pega os 10 primeiros do elenco
  const similarMovies = movie.recommendations?.results;

  return (
    <div className="bg-film-black min-h-screen text-white animate-fade-in">
      
      {/* 1. BACKDROP COM BOTÃO DE PLAY */}
      <div className="h-[60vh] w-full bg-cover bg-center relative group" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-film-black via-black/50 to-transparent"></div>
        {trailer && (
          <button onClick={() => setShowTrailer(true)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-film-red/80 rounded-full hover:bg-film-red hover:scale-110 transition-all duration-300">
            <Play size={48} className="text-white ml-1" />
          </button>
        )}
      </div>

      {/* 2. CONTEÚDO PRINCIPAL (ABAIXO DO BACKDROP) */}
      <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Coluna Esquerda: Poster e Ações */}
          <div className="w-full md:w-1/4 flex-shrink-0">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-lg shadow-2xl border-4 border-film-gray w-full" />
            <button onClick={handleAdd} className="w-full mt-4 flex items-center justify-center gap-2 px-8 py-3 bg-film-red hover:bg-film-red-hover rounded font-bold transition-transform hover:scale-105">
              <Plus size={20} /> Adicionar à Lista
            </button>
          </div>

          {/* Coluna Direita: Detalhes Ricos */}
          <div className="w-full md:w-3/4 md:pt-16 space-y-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300">
              <span className="flex items-center gap-1 text-yellow-400 font-bold"><Star size={16} fill="currentColor" /> {movie.vote_average.toFixed(1)}</span>
              <span className="flex items-center gap-1"><Calendar size={16} /> {movie.release_date?.split('-')[0]}</span>
              <span className="flex items-center gap-1"><Clock size={16} /> {movie.runtime} min</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map(g => <span key={g.id} className="px-3 py-1 bg-film-gray border border-white/10 rounded-full text-xs">{g.name}</span>)}
            </div>

            <div>
              <h3 className="text-2xl font-bold font-heading mb-2">História</h3>
              <p className="text-gray-300 leading-relaxed max-w-3xl">{movie.overview}</p>
            </div>

            {director && (
              <div>
                <h4 className="font-bold text-gray-200">Direção</h4>
                <p className="text-film-red">{director.name}</p>
              </div>
            )}

            {/* SEÇÃO DE ELENCO */}
            {cast && cast.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold font-heading mb-4">Elenco Principal</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {cast.map(person => <CastMember key={person.cast_id} person={person} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* SEÇÃO DE FILMES SIMILARES */}
      {similarMovies && similarMovies.length > 0 && (
        <div className="-mt-10">
          <MovieRow title="Títulos Semelhantes" movies={similarMovies} />
        </div>
      )}

      {/* MODAL DO TRAILER (Fica escondido até ser ativado) */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowTrailer(false)}>
          <div className="relative w-full max-w-4xl animate-fade-in">
            <button onClick={() => setShowTrailer(false)} className="absolute -top-10 right-0 p-2 bg-film-red rounded-full text-white">
              <X size={24} />
            </button>
            <div className="aspect-video">
              <iframe 
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={movie.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;