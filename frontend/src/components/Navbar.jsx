import { Link } from 'react-router-dom';
import { Home, Film, List, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-film-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-heading font-bold text-film-red tracking-wide hover:text-film-red-hover transition-colors">
          FILMVERSE
        </Link>

        {/* LINKS DE NAVEGAÇÃO */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium">
            <Home size={20} />
            Home
          </Link>

          <Link to="/filmes" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium">
            <Film size={20} />
            Filmes
          </Link>

          <Link to="/minha-lista" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium">
            <List size={20} />
            Minha Lista
          </Link>
        </div>

        {/* ÍCONE DE PERFIL (Decorativo) */}
        <div className="w-10 h-10 rounded-full bg-film-gray flex items-center justify-center border border-white/10">
            <User size={20} className="text-white" />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;