import { MouseEvent } from "react";

import s from "./ImageCard.module.css";

type Props = {
  src: {
    small: string;
    regular: string;
  };
  alt: string;
  onOpenModal: (
    obj: { src: string; alt: string },
    e: MouseEvent<HTMLImageElement>
  ) => void;
};

export const ImageCard = ({ src, alt, onOpenModal }: Props) => {
  return (
    <div className={s.wrapper}>
      <img
        src={src.small}
        alt={alt}
        className={s.img}
        onClick={(e) => onOpenModal({ src: src.regular, alt }, e)}
      />
    </div>
  );
};
