import axios from 'axios';


const API_URL = 'http://localhost:5000/api/movies';


export const addFavorite = async (movie) => {
  try {
    
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
  
    return { 
      success: false, 
      message: error.response?.data?.message || "Erro ao salvar filme." 
    };
  }
};


export const getFavorites = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return [];
  }
};

export const updateMovieStatus = async (id) => {
  try {

    await axios.patch(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return false;
  }
};

export const removeFavorite = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return false;
  }

  
};