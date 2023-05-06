import { ModalContext } from "@/contexts/ModalContext.js";
import Modal from "@/components/Modal.jsx";
import { useContext } from "react";
import Dialog from "@/components/Dialog.jsx";

const Test = () => {
  const { openModal, setOpenModal } = useContext(ModalContext);

  return (
    <div>
      {openModal && (
        <Modal>
          <Dialog
            onConfirm={() => console.log("Confirmed")}
            onCancel={() => setOpenModal(false)}
            title="This is the title"
            isDelete={true}
          >
            This is a dialog
          </Dialog>
        </Modal>
      )}
      <button onClick={() => setOpenModal(true)}>Open Modal</button>
    </div>
  );
};

export default Test;
