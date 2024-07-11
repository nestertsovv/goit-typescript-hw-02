import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  SearchBar,
  ImageGallery,
  LoadMoreBtn,
  Loader,
  ErrorMessage,
  ImageModal,
} from "./components";

import { getPhotos } from "./services/getPhotosApi";
import "./styles/reset.css";

type Photo = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
};

export type Photos = Photo[];

export type Image = {
  src: string;
  alt: string;
};

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<Photos>([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectImg, setSelectImg] = useState<Image>({
    src: "",
    alt: "",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    const getData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const per_page = 12;

        const {
          data: { total, results },
        } = await getPhotos(query, page);

        if (!total) {
          setIsEmpty(true);
          return;
        }

        setPhotos((prev) => [...prev, ...results]);
        setShowLoadMore(page < Math.ceil(total / per_page));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [query, page]);

  const onSubmit = (query: string): void => {
    if (!query.trim()) {
      toast.error("Enter your search query", {
        position: "top-right",
        duration: 2500,
      });
      return;
    }

    setQuery(query.trim());
    setPhotos([]);
    setPage(1);
    setShowLoadMore(false);
    setIsEmpty(false);
  };

  const onLoadMore = (e: MouseEvent<HTMLButtonElement>): void => {
    setPage((prev) => prev + 1);
  };

  const onOpenModal = (
    img: { src: string; alt: string },
    e: MouseEvent<HTMLImageElement>
  ): void => {
    setIsOpenModal(true);
    setSelectImg({ src: img.src, alt: img.alt });
  };

  const onCloseModal = (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent
  ): void => {
    setIsOpenModal(false);
    setSelectImg({ src: "", alt: "" });
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} onOpenModal={onOpenModal} />
      )}
      {showLoadMore && !isLoading && <LoadMoreBtn onClick={onLoadMore} />}
      {isEmpty && (
        <ErrorMessage
          error={`We did not found photos with the word ${query}`}
        />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <ImageModal
        selectImg={selectImg}
        modalIsOpen={isOpenModal}
        onCloseModal={onCloseModal}
      />
      <Toaster />
    </>
  );
}

export default App;
