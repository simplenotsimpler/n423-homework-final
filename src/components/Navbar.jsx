import Link from "next/link.js";
import NavbarStyles from "../styles/Navbar.module.css";
import { useRouter } from "next/router.js";
import GoogleButton from "./GoogleBtn.jsx";

// TODO: check if user logged in

// for testing
const currentUser = {
  email: "r@r.com",
};

// const currentUser = {
//   email: "",
// };

const handleLogout = (e) => {
  console.log(e);
};

const handleLogin = (e) => {
  console.log(e);
};
const Navbar = ({logoText}) => {
  const router = useRouter();

  return (
    <nav className={NavbarStyles.navbar}>
      <h1>{logoText}</h1>
      <ul className={NavbarStyles.navmenu}>
        <li>
          <Link
            href="/"
            className={router.pathname === "/" ? NavbarStyles.activeLink : ""}
          >
            Home
          </Link>
        </li>

        {currentUser.email ? (
          <>
            <li>
              <Link
                href="/profile"
                className={
                  router.pathname === "/profile" ? NavbarStyles.activeLink : ""
                }
              >
                My Profile
              </Link>
            </li>
            <li>
              <GoogleButton onClick={handleLogout}>Logout</GoogleButton>
            </li>
          </>
        ) : (
          <li>
            <GoogleButton onClick={handleLogin}>
              Sign in with Google
            </GoogleButton>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
