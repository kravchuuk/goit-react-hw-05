import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { searchMovie } from "../../movies-api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const onHandleSubmit = (query) => {
    setSearchParams({ search: query });
  };

  const query = searchParams.get("search");

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await searchMovie(query);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query]);

  return (
    <>
      <SearchForm onHandleSubmit={onHandleSubmit} />
      {isLoading && <Loader />}
      {error && <div>Something went wrong. Try reload</div>}
      <MovieList movies={movies} />
    </>
  );
}
