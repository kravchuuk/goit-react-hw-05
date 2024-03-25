import Loader from "../../components/Loader/Loader";
import { movieCredits } from "../../movies-api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const defaultPoster =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  const defaultWidth = 180;
  const defaultHeight = 270;

  useEffect(() => {
    async function getInfo() {
      try {
        setIsLoading(true);
        const data = await movieCredits(movieId);
        setInfo(data);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getInfo();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>Something went wrong. Try reload</div>}
      {info && info.length > 0 ? (
        <ul className={css.list}>
          {info.map(({ cast_id, character, name, profile_path }) => (
            <li className={css.item} key={cast_id}>
              <img
                className={css.img}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : defaultPoster
                }
                width={profile_path ? 300 : defaultWidth}
                height={profile_path ? 450 : defaultHeight}
                alt={name}
              />
              <p className={css.title}>{name}</p>
              <p className={css.title}>Character: {character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No cast information available.</div>
      )}
    </>
  );
}
