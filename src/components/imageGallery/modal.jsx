import Modal from "react-modal";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1200,
  },
  content: {
    maxWidth: "calc(100vw - 48px)",
    maxHeight: "calc(100vh - 24px)",
    padding: 10,
    border: "none",
    position: "static",
    borderRadius: 0,
    overflow: "hidden",
  },
};

export const Modale = ({ image, closeModal, openModal }) => {
  const { tags, largeImageURL } = image;
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
      shouldCloseOnOverlayClick={true}
      onAfterOpen={() => disableBodyScroll(document)}
      onAfterClose={() => enableBodyScroll(document)}>
      <div>
        <img src={largeImageURL} alt={tags} loading="lazy" />
      </div>
    </Modal>
  );
};
