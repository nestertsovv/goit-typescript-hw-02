import { MouseEvent } from "react";

import { ImageCard } from "../ImageCard/ImageCard";

import { Photos } from "../../App";
import s from "./ImageGallery.module.css";

type Props = {
  photos: Photos;
  onOpenModal: (
    obj: { src: string; alt: string },
    e: MouseEvent<HTMLImageElement>
  ) => void;
};

export const ImageGallery = ({ photos, onOpenModal }: Props) => {
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
