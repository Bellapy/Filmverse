import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MyList from './pages/MyList';
import MovieDetails from './pages/MovieDetails'; // <--- 1. Importar

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-film-black text-film-white font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Movies />} />
          <Route path="/minha-lista" element={<MyList />} />
          
          {/* 2. Adicionar Rota Dinâmica (o :id é uma variável) */}
          <Route path="/movie/:id" element={<MovieDetails />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;