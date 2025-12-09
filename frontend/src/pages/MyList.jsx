import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite, updateMovieStatus } from '../services/backend';
import { Trash2, Star, Eye, EyeOff } from 'lucide-react'; // Ícones novos: Olho aberto/fechado

const MyList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { carregarLista(); }, []);

  const carregarLista = async () => {
    const dados = await getFavorites();
    setMovies(dados);
    setLoading(false);
  };

  const handleRemove = async (id) => {
    if (confirm("Remover este filme?")) {
      await removeFavorite(id);
      carregarLista();
    }
  };

  const handleToggleWatched = async (id) => {
    await updateMovieStatus(id);
    carregarLista();
  };

  return (
    <div className="min-h-screen bg-film-black pt-24 px-6 md:px-12 pb-10">
      <h1 className="text-3xl font-heading font-bold text-white mb-8 border-l-4 border-film-red pl-4">
        Minha Lista
      </h1>

      {loading ? <p className="text-white">Carregando...</p> : movies.length === 0 ? (
        <p className="text-gray-400">Sua lista está vazia.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="relative group bg-film-gray rounded-lg overflow-hidden hover:scale-105 transition-transform border border-white/5 shadow-lg">
              
              {/* Imagem (Sempre colorida) */}
              <div className="relative">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} 
                  alt={movie.title}
                  className="w-full h-[250px] object-cover"
                />
                
                {/* ETIQUETA 'ASSISTIDO' VISÍVEL */}
                {movie.watched && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider">
                    Assistido
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-yellow-400 text-xs">
                    <Star size={12} fill="currentColor" />
                    {movie.voteAverage?.toFixed(1)}
                  </div>

                  {/* BOTÃO DE STATUS (Muito mais intuitivo) */}
                  <button 
                    onClick={() => handleToggleWatched(movie._id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold transition-colors
                      ${movie.watched 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {movie.watched ? <Eye size={14} /> : <EyeOff size={14} />}
                    {movie.watched ? "Visto" : "Não vi"}
                  </button>
                </div>
              </div>

              {/* Botão Remover (Discreto no topo) */}
              <button 
                onClick={() => handleRemove(movie._id)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white"
                title="Remover"
              >
                <Trash2 size={16} />
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;