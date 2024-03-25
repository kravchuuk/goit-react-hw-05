import { useEffect, useState } from "react";
import { fetchMovie } from "../../movies-api";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovie();

        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <Loader />}
      {error && <div>Something went wrong. Try reload</div>}
      {<MovieList movies={movies} />}
    </>
  );
}
