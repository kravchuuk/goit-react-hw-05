import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTk0ODBiYmQ1MmE1OTM3YjE2OGM1Y2ZlNTI0OTkzOSIsInN1YiI6IjY1ZmRiNGJiOTBmY2EzMDE3ZGEwNjYzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5lDHemhiJqSBaEeGQPX8cW4NPUOxSgO5HC9vu-by4o8",
    Accept: "application/json",
  },
};

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

export const fetchMovie = async () => {
  const response = await axios
    .get(url, options)
    .catch((err) => console.log(err));

  return response.data.results;
};

export const searchMovie = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const movieDetails = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const movieCredits = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const movieReview = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data.results;
};
