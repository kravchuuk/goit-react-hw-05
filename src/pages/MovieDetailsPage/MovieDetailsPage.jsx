import Loader from "../../components/Loader/Loader";
import { movieDetails } from "../../movies-api";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function MovieDetails() {
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/");
  const { movieId } = useParams();
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovieById() {
      try {
        setIsLoading(true);
        const data = await movieDetails(movieId);
        setInfo(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieById();
  }, [movieId]);

  return (
    <>
      <Link className={css.goBackBtn} to={backLink.current}>
        <FaArrowLeftLong />
        Go back bro
      </Link>
      {isLoading && <Loader />}
      {error && <div>Something went wrong. Try reload</div>}
      {info && (
        <div className={css.wraper}>
          <div className={css.div}>
            <div className={css.imgWrap}>
              <img
                src={
                  info.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${info.poster_path}`
                    : defaultImg
                }
                width={250}
                alt="poster"
              />
            </div>
            <div className={css.wrap}>
              <h3 className={css.title}>{info.title}</h3>
              <p className={css.itemText}>
                User score: {Math.round(info.vote_average * 10)}%
              </p>
              <h4 className={css.itemTitle}>Overview</h4>
              <p className={css.itemText}>{info.overview}</p>
              <h4 className={css.itemTitle}>Genres</h4>
              <p className={css.itemText}>
                {info.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>

          <div className={css.infoWrap}>
            <h4 className={css.infoTitle}>Additional information</h4>
            <ul className={css.infoList}>
              <li className={css.infoItem}>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li className={css.infoItem}>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Suspense fallback={<div>Loading info... Pls w8</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
