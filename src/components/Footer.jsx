import FooterStyles from "../styles/Footer.module.css";

const Footer = ({ companyText }) => {
  return (
    <footer className={FooterStyles.footer}>
      <div className="copyright">&copy; {companyText}</div>
    </footer>
  );
};

export default Footer;
