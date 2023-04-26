import Link from "next/link.js";
import NavbarStyles from "../styles/Navbar.module.css";
import { useRouter } from "next/router.js";
import GoogleButton from "./GoogleBtn.jsx";
import { useAuth } from "@/contexts/AuthContext.js";

// TODO: check if user logged in

// currentUser.email

// for testing
// const currentUser = {
//   email: "r@r.com",
// };

// const currentUser = {
//   email: "",
// };

const Navbar = ({ logoText }) => {
  const router = useRouter();

  const { currentUser, login, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const handleLogin = async () => {
    await login();
  };

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

        {currentUser ? (
          <>
            <li>
              <p>{`Welcome, ${currentUser.displayName}`}</p>
            </li>
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
