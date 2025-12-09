import { useEffect, useState } from 'react';
import { Info, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { addFavorite } from '../services/backend';
import { Link } from 'react-router-dom';

const HeroBanner = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. ROTAÇÃO AUTOMÁTICA (5 segundos)
  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval); // Limpa ao desmontar
  }, [currentIndex, movies]);

  // 2. FUNÇÕES DE NAVEGAÇÃO
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  // 3. SALVAR NA LISTA
  const handleAdd = async () => {
    const movie = movies[currentIndex];
    const result = await addFavorite(movie);
    if (result.success) alert(`✅ ${movie.title} salvo na lista!`);
    else alert(`⚠️ ${result.message}`);
  };

  if (movies.length === 0) return null;
  const movie = movies[currentIndex];

  return (
    <div className="relative h-[80vh] w-full group">
      
      {/* IMAGEM DE FUNDO COM TRANSIÇÃO */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-film-black via-film-black/50 to-transparent"></div>
      </div>

      {/* CONTEÚDO */}
      <div className="absolute bottom-0 left-0 w-full p-8 pb-20 md:p-16 z-10">
        <div className="max-w-3xl space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white drop-shadow-lg">
            {movie.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-lg line-clamp-2 max-w-2xl drop-shadow-md">
            {movie.overview}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button onClick={handleAdd} className="flex items-center gap-2 px-6 py-3 bg-film-red hover:bg-film-red-hover text-white rounded font-semibold transition-colors shadow-lg">
              <Plus size={24} /> Minha Lista
            </button>
            <Link to={`/movie/${movie.id}`} className="flex items-center gap-2 px-6 py-3 bg-gray-600/80 hover:bg-gray-600 text-white rounded font-semibold backdrop-blur-sm transition-colors">
              <Info size={24} /> Detalhes
            </Link>
          </div>
        </div>
      </div>

      {/* SETAS LATERAIS (Aparecem ao passar o mouse) */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-film-red text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-20">
        <ChevronLeft size={32} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-film-red text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-20">
        <ChevronRight size={32} />
      </button>

    </div>
  );
};

export default HeroBanner;