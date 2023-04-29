import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Notification from "./Notification.jsx";

const brandText = {
  logoText: "Fave TV Shows",
  companyText: "Fave TV Shows Limited",
};
const Layout = ({ children }) => {
  return (
    <>
      <Navbar logoText={brandText.logoText} />
      <main className="content">
        <Notification />
        {children}
      </main>
      <Footer companyText={brandText.companyText} />
    </>
  );
};

export default Layout;
