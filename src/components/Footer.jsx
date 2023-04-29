import FooterStyles from "../styles/Footer.module.css";
import { useAuth } from "@/contexts/AuthContext.js";

const Footer = ({ companyText }) => {
  const { currentUser } = useAuth();
  return (
    <footer className={FooterStyles.footer}>
      <div className="copyright">&copy; {companyText}</div>
      {currentUser && (
        <div className={FooterStyles.loggedIn}>
          Logged in as: <em>{currentUser.email}</em>
        </div>
      )}
    </footer>
  );
};

export default Footer;
