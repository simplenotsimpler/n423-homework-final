import DialogStyles from "../styles/Dialog.module.css";

const Dialog = ({ children, title, onConfirm, onCancel, isDelete }) => {
  //pass onclick & cancel from parent
  return (
    <div className={DialogStyles.dialogContainer}>
      <header className={DialogStyles.dialogHeader}>
        <h1 className={DialogStyles.dialogTitle}>{title}</h1>
      </header>
      <div className={DialogStyles.dialogBody}>{children}</div>
      <div className={DialogStyles.actionBtns}>
        <button className={DialogStyles.btnCancel} onClick={onCancel}>
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
