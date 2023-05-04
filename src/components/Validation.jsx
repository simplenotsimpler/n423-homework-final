import ValidationStyles from "../styles/Validation.module.css";

const Validation = ({ children }) => {
  return <div className={ValidationStyles.validation}>{children}</div>;
};

export default Validation;
