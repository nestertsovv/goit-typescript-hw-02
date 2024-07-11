import s from "./ImageCard.module.css";

export const ImageCard = ({ src, alt, onOpenModal }) => {
  return (
    <div className={s.wrapper}>
      <img
        src={src.small}
        alt={alt}
        className={s.img}
        onClick={() => onOpenModal({ src: src.regular, alt })}
      />
    </div>
  );
};
