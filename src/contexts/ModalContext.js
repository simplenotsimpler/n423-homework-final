// https://javascript.plainenglish.io/how-to-handle-modals-in-a-large-scale-next-js-project-4565a29b86d1

import { createContext } from "react";
import { useState, useEffect } from "react";

export const ModalContext = createContext(undefined);

//Context Wrapper
export function ModalProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.code === "Escape") {
        setOpenModal(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
