import { ImageCard } from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

export const ImageGallery = ({ photos, onOpenModal }) => {
  return (
    <ul className={s.list}>
      {photos.map((photo) => (
        <li key={photo.id} className={s.item}>
          <ImageCard
            src={photo.urls}
            alt={photo.alt_description}
            onOpenModal={onOpenModal}
          />
        </li>
      ))}
    </ul>
  );
};
