// https://javascript.plainenglish.io/how-to-handle-modals-in-a-large-scale-next-js-project-4565a29b86d1

import React, { useContext } from "react";
import { createPortal } from "react-dom";
import ModalStyles from "../styles/Modal.module.css";

import { ModalContext } from "@/contexts/ModalContext.js";

const Modal = ({ children }) => {
  const { setOpenModal } = useContext(ModalContext);

  //UI note: don't include a close button. close/ok/cancel will be handled by inner content
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setOpenModal(false);
    }
  };
  return createPortal(
    <div className={ModalStyles.modalBackground} onClick={closeModal}>
      {children}
    </div>,
    document.body
  );
};

export default Modal;
