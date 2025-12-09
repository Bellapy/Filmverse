import { useEffect, useState, useMemo } from 'react';
import { getFavorites, removeFavorite, updateMovieStatus } from '../services/backend';
import { Trash2, Star, Eye, EyeOff, LayoutGrid, List } from 'lucide-react';
import toast from 'react-hot-toast';

const MyList = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Novos estados para controlar a UI
  const [filter, setFilter] = useState('all'); // 'all', 'watched', 'unwatched'
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    setLoading(true);
    const data = await getFavorites();
    setAllMovies(data);
    setLoading(false);
  };

  // --- LÓGICA DE FILTRAGEM ---
  // useMemo evita que a lista seja recalculada a cada renderização
  const filteredMovies = useMemo(() => {
    if (filter === 'watched') {
      return allMovies.filter(movie => movie.watched);
    }
    if (filter === 'unwatched') {
      return allMovies.filter(movie => !movie.watched);
    }
    return allMovies; // 'all'
  }, [allMovies, filter]);


  const handleRemove = (id, title) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <span className="font-bold">Remover "{title}"?</span>
        <div className="flex gap-2">
          <button onClick={() => { executeRemoval(id); toast.dismiss(t.id); }} className="w-full bg-film-red text-white px-3 py-1 rounded text-sm font-semibold">Confirmar</button>
          <button onClick={() => toast.dismiss(t.id)} className="w-full bg-gray-500 text-white px-3 py-1 rounded text-sm font-semibold">Cancelar</button>
        </div>
      </div>
    ));
  };

  const executeRemoval = async (id) => {
    const success = await removeFavorite(id);
    if (success) {
      toast.success("Filme removido!");
      loadList();
    } else {
      toast.error("Erro ao remover.");
    }
  };

  const handleToggleWatched = async (id) => {
    const movie = allMovies.find(m => m._id === id);
    const success = await updateMovieStatus(id);
    if (success) {
      toast.success(movie.watched ? 'Marcado como "Não Visto"' : 'Marcado como "Visto"!');
      loadList();
    }
  };

  return (
    <div className="min-h-screen bg-film-black pt-24 px-6 md:px-12 pb-10 animate-fade-in">
      
      {/* --- CABEÇALHO COM FILTROS E MODO DE VISUALIZAÇÃO --- */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-heading font-bold text-white border-l-4 border-film-red pl-4">Minha Lista</h1>
        
        <div className="flex items-center gap-2 md:gap-4 p-1 bg-film-gray rounded-full border border-white/10">
          {/* Filtros */}
          <button onClick={() => setFilter('all')} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${filter === 'all' ? 'bg-film-red text-white' : 'text-gray-400 hover:text-white'}`}>Todos</button>
          <button onClick={() => setFilter('watched')} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${filter === 'watched' ? 'bg-film-red text-white' : 'text-gray-400 hover:text-white'}`}>Assistidos</button>
          <button onClick={() => setFilter('unwatched')} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${filter === 'unwatched' ? 'bg-film-red text-white' : 'text-gray-400 hover:text-white'}`}>Não Vistos</button>
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>

          {/* Modo de Visualização */}
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-film-red text-white' : 'text-gray-400 hover:text-white'}`}><LayoutGrid size={18} /></button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-film-red text-white' : 'text-gray-400 hover:text-white'}`}><List size={18} /></button>
        </div>
      </div>

      {loading ? <p className="text-white text-center">Carregando sua lista...</p> : (
        <>
          {filteredMovies.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">Nenhum filme encontrado para este filtro.</p>
          ) : (
            <>
              {/* --- VISUALIZAÇÃO EM GRID --- */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {filteredMovies.map((movie) => (
                    // O Card de Grid que já tínhamos (com pequenas melhorias)
                    <div key={movie._id} className="relative group bg-film-gray rounded-lg overflow-hidden hover:scale-105 transition-transform border border-white/5 shadow-lg">
                      <div className="relative">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} className="w-full h-[250px] object-cover" />
                        {movie.watched && <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider">Assistido</div>}
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1 text-yellow-400 text-xs"><Star size={12} fill="currentColor" />{movie.voteAverage?.toFixed(1)}</div>
                          <button onClick={() => handleToggleWatched(movie._id)} className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold transition-colors ${movie.watched ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'}`}>{movie.watched ? <Eye size={14} /> : <EyeOff size={14} />}{movie.watched ? "Visto" : "Não vi"}</button>
                        </div>
                      </div>
                      <button onClick={() => handleRemove(movie._id, movie.title)} className="absolute top-2 right-2 p-1.5 bg-black/60 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white" title="Remover"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              )}

              {/* --- VISUALIZAÇÃO EM LISTA --- */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {filteredMovies.map((movie) => (
                    // O novo Card de Lista
                    <div key={movie._id} className="flex gap-4 bg-film-gray p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                      <img src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`} alt={movie.title} className="w-20 md:w-24 rounded object-cover" />
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{movie.overview}</p>
                        <div className="flex items-center gap-1 text-yellow-400 text-xs mt-2"><Star size={14} fill="currentColor" />{movie.voteAverage?.toFixed(1)}</div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <button onClick={() => handleToggleWatched(movie._id)} className={`flex items-center justify-center w-full md:w-auto gap-2 px-4 py-2 rounded text-sm font-bold transition-colors ${movie.watched ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'}`}>{movie.watched ? <Eye size={16} /> : <EyeOff size={16} />}{movie.watched ? "Assistido" : "Não Visto"}</button>
                        <button onClick={() => handleRemove(movie._id, movie.title)} className="p-2 bg-red-600/20 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyList;