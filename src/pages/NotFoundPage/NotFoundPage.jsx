import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <b>Oops! Page not found!</b>
      <Link to="/">Back to home page</Link>
    </>
  );
}
