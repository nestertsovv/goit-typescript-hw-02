import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "0",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(40, 40, 40, 0.9)",
  },
};

export const ImageModal = ({ selectImg, modalIsOpen, onCloseModal }) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={selectImg?.src} alt={selectImg?.alt} className={s.img} />
      </Modal>
    </>
  );
};
