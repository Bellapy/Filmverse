import { Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addFavorite } from '../services/backend'; // Importei a função

const MovieRow = ({ title, movies }) => {
  
  const handleAdd = async (e, movie) => {
    e.preventDefault(); // IMPEDE de abrir a página de detalhes ao clicar no botão
    const result = await addFavorite(movie);
    if (result.success) alert(`✅ Salvo: ${movie.title}`);
    else alert(`⚠️ ${result.message}`);
  };

  return (
    <div className="mb-8 px-6 md:px-12">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 border-l-4 border-film-red pl-4">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[160px] md:min-w-[200px] bg-film-gray rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 relative group">
            
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-[240px] md:h-[300px] object-cover" />
              
              <div className="p-3">
                <h3 className="text-white text-sm font-semibold truncate hover:text-film-red transition-colors">{movie.title}</h3>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="flex items-center text-yellow-400 text-xs font-bold gap-1">
                    <Star size={12} fill="currentColor" /> {movie.vote_average.toFixed(1)}
                  </span>

                  {/* BOTÃO AGORA FUNCIONA */}
                  <button 
                    onClick={(e) => handleAdd(e, movie)}
                    className="p-1 bg-film-red rounded-full hover:bg-film-red-hover text-white transition-colors z-20"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;