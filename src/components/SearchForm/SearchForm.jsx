import css from "./SearchForm.module.css";
import { FcSearch } from "react-icons/fc";

export const SearchForm = ({ onHandleSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.currentTarget;
    onHandleSubmit(input.elements.text.value);
    input.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input className={css.input} type="text" name="text" />
      <button className={css.btn} type="submit">
        <FcSearch size={20} />
      </button>
    </form>
  );
};
