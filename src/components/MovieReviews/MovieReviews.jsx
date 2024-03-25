import { useEffect, useState } from "react";
import { movieReview } from "../../movies-api";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReview() {
      try {
        setIsLoading(true);
        const data = await movieReview(movieId);
        setReviews(data);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReview();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>Something went wrong. Try reload</div>}
      {reviews && reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map(({ id, author, content }) => (
            <li className={css.item} key={id}>
              <h3 className={css.title}>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No reviews available.</div>
      )}
    </>
  );
}
