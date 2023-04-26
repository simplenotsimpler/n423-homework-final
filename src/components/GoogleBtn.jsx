import GoogleBtnStyles from "../styles/GoogleBtn.module.css";

const GoogleButton = ({ children, onClick }) => {
  return (
    <button className={GoogleBtnStyles.googleButton} onClick={onClick}>
      <span className={GoogleBtnStyles.googleIcon}></span>
      <span className={GoogleBtnStyles.googleText}>{children}</span>
    </button>
  );
};

export default GoogleButton;
