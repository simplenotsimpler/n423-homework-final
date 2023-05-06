import ModalStyles from "../styles/Modal.module.css";

//don't use p tag to contain children since could pass another component such as form
//need container style separate for dialog/alert vs container
/* 
 <div className={ModalStyles.modalContainer}>
        {style != "container" && (
          <h1 className={ModalStyles.modalTitle}>TBD</h1>
        )}
        </div>
*/
const Modalv0 = ({ isOpen, onClose, children, style = "container" }) => {
  if (!isOpen) return null;
  return (
    <div className={ModalStyles.modalBackground} onClick={onClose}>
      <div className={ModalStyles.modalContainer}>
        <button className={ModalStyles.btnModal} onClick={onClose}>
          X
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modalv0;
