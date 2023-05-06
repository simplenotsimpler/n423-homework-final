import { ModalContext } from "@/contexts/ModalContext.js";
import Modal from "@/components/Modal.jsx";
import { useContext } from "react";

const Test = () => {
  const { openModal, setOpenModal } = useContext(ModalContext);

  return (
    <div>
      {openModal && (
        <Modal>
          {/*Custom Modal Component*/}
          <div
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
            }}
          >
            This is Modal
          </div>
        </Modal>
      )}
      <button onClick={() => setOpenModal(true)}>Open Modal</button>
    </div>
  );
};

export default Test;
