import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { getPhotos } from "./services/getPhotosApi";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./components/LoadMoreBtn/LoadMoreBtn";
import { Loader } from "./components/Loader/Loader";
import "./styles/reset.css";
import toast, { Toaster } from "react-hot-toast";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";
import { ImageModal } from "./components/ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectImg, setSelectImg] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        const per_page = 12;

        const {
          data: { results, total },
        } = await getPhotos(query, page);

        if (!total) {
          setIsEmpty(true);
          return;
        }

        setPhotos((prev) => [...prev, ...results]);
        setShowLoadMore(page < Math.ceil(total / per_page));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const onSubmit = (query) => {
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

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const onOpenModal = (img) => {
    setIsOpenModal(true);
    setSelectImg(img);
  };
  const onCloseModal = () => {
    setIsOpenModal(false);
    setSelectImg(null);
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
