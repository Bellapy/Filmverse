import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <-- Importa o Toaster

// Componentes e Páginas
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MyList from './pages/MyList';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      
      {/* COMPONENTE DE NOTIFICAÇÃO (GLOBAL) */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000, // Notificação some em 3 segundos
          style: {
            background: '#13171F', // Cor Grafite Cine (do PDF)
            color: '#F5F7FA',     // Cor Branco Suave (do PDF)
            border: '1px solid #2A3140',
          },
        }}
      />

      <div className="min-h-screen bg-film-black text-film-white font-sans">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Movies />} />
          <Route path="/minha-lista" element={<MyList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;