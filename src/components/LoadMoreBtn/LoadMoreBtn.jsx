import s from "./LoadMoreBtn.module.css";

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={s.btn}>
      Load More
    </button>
  );
};
