import axios from 'axios';

// Configuração base da API
const apiKey = 'ad8bc863ebe88a73ca44e5595e8799f4'; 
const baseUrl = 'https://api.themoviedb.org/3';


const api = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: apiKey,
    language: 'pt-BR', 
  },
});

// Funções prontas para buscar os dados
export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes em alta:", error);
    return [];
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', { params: { page } });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', { params: { query, page } });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return [];
  }
};

// Busca filmes por gênero específico
export const getMoviesByGenre = async (genreId, limit = 20, page = 1) => {
  try {
    const response = await api.get('/discover/movie', { params: { with_genres: genreId, page } });
    return response.data.results.slice(0, limit);
  } catch (error) {
    console.error("Erro ao filtrar por gênero:", error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,recommendations',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    return null;
  }

  
};

export default api;