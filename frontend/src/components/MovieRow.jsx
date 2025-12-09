import { Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addFavorite } from '../services/backend';
import toast from 'react-hot-toast'; // Importação nova

const MovieRow = ({ title, movies, size = 'md' }) => {
  const sizeClasses = {
    sm: 'min-w-[140px] md:min-w-[160px]',
    md: 'min-w-[160px] md:min-w-[200px]'
  };
  const imgSizeClasses = {
    sm: 'h-[210px] md:h-[240px]',
    md: 'h-[240px] md:h-[300px]'
  };

  const handleAdd = async (e, movie) => {
    e.preventDefault();
    const result = await addFavorite(movie);
    // Substituição do alert() por toast()
    if (result.success) {
      toast.success(`${movie.title} adicionado!`);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="mb-8 px-6 md:px-12">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 border-l-4 border-film-red pl-4">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className={`${sizeClasses[size]} bg-film-gray rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 relative group`}>
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem'}
              alt={movie.title}
              className={`${imgSizeClasses[size]} w-full object-cover`}
            />
            <div className="p-3">
              <h3 className="text-white text-sm font-semibold truncate hover:text-film-red transition-colors">{movie.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-center text-yellow-400 text-xs font-bold gap-1">
                  <Star size={12} fill="currentColor" /> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </span>
                <button 
                  onClick={(e) => handleAdd(e, movie)}
                  className="p-1 bg-film-red rounded-full hover:bg-film-red-hover text-white transition-colors z-20"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;