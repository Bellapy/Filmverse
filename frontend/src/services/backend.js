import axios from 'axios';

// Endereço do nosso servidor Backend
const API_URL = 'http://localhost:5000/api/movies';

// 1. ADICIONAR FILME
export const addFavorite = async (movie) => {
  try {
    // Formata os dados do TMDB para o nosso modelo do banco
    const payload = {
      tmdbId: movie.id.toString(),
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
      overview: movie.overview
    };

    const response = await axios.post(API_URL, payload);
    return { success: true, data: response.data };
  } catch (error) {
    // Se der erro (ex: filme já existe), retorna a mensagem
    return { 
      success: false, 
      message: error.response?.data?.message || "Erro ao salvar filme." 
    };
  }
};

// 2. LISTAR FAVORITOS
export const getFavorites = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return [];
  }
};
// 4. ATUALIZAR STATUS
export const updateMovieStatus = async (id) => {
  try {
    // Usa PATCH para atualizar só um pedaço do dado
    await axios.patch(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return false;
  }
};
// 3. REMOVER FAVORITO
export const removeFavorite = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return false;
  }

  
};