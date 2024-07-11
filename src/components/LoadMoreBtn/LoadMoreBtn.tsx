import { MouseEvent } from "react";

import s from "./LoadMoreBtn.module.css";

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const LoadMoreBtn = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className={s.btn}>
      Load More
    </button>
  );
};
