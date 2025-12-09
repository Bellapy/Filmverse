const Footer = () => {
  return (
    <footer className="w-full bg-film-gray border-t border-white/10 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
        <h3 className="text-xl font-heading font-bold text-film-red tracking-wide mb-2">FILMVERSE</h3>
        <p className="text-sm">&copy; {new Date().getFullYear()} FilmVerse. Todos os direitos reservados.</p>
        <p className="text-xs mt-2">Este é um projeto de portfólio. As imagens e dados são fornecidos pela API do TMDB.</p>
      </div>
    </footer>
  );
};

export default Footer;