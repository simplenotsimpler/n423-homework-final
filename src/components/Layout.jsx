import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

const brandText = {
  logoText: "TV Fans",
  companyText: "TV Fans Limited",
};
const Layout = ({ children }) => {
  return (
    <>
      <Navbar logoText={brandText.logoText} />
      <main className="content">{children}</main>
      <Footer companyText={brandText.companyText}/>
    </>
  );
};

export default Layout;
