import DialogStyles from "../styles/Dialog.module.css";
import { useRef, useEffect } from "react";

const Dialog = ({ children, title, onConfirm, onCancel, isDelete }) => {
  const cancelRef = useRef();

  useEffect(() => {
    cancelRef.current.focus();
  }, []);

  //pass onclick & cancel from parent
  return (
    <div className={DialogStyles.dialogContainer}>
      <header className={DialogStyles.dialogHeader}>
        <h1 className={DialogStyles.dialogTitle}>{title}</h1>
      </header>
      <div className={DialogStyles.dialogBody}>{children}</div>
      <div className={DialogStyles.actionBtns}>
        <button
          className={DialogStyles.btnCancel}
          onClick={onCancel}
          ref={cancelRef}
        >
          Cancel
        </button>
        <button
          className={isDelete ? DialogStyles.btnDelete : DialogStyles.btnOkay}
          onClick={onConfirm}
        >
          {isDelete ? `Delete` : `OK`}
        </button>
      </div>
    </div>
  );
};

export default Dialog;
