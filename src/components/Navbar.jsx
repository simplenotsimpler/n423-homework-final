import Link from "next/link.js";
import NavbarStyles from "../styles/Navbar.module.css";
import { useRouter } from "next/router.js";
import GoogleButton from "./GoogleBtn.jsx";
import { useAuth } from "@/contexts/AuthContext.js";
import { useNotification } from "@/contexts/NotificationContext.js";
import { MESSAGES } from "@/utils/messages.js";
import { useState } from "react";

const Navbar = ({ logoText }) => {
  const router = useRouter();

  const { currentUser, login, logout } = useAuth();
  const { addNotification } = useNotification();

  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleNavToggle = (e) => {
    // console.log(e.target);
    setIsNavExpanded(!isNavExpanded);
  };

  const handleLogout = async () => {
    await logout();

    addNotification(MESSAGES.SUCCESS_LOGOUT, "success");
  };

  const handleLogin = async () => {
    try {
      await login();
      addNotification(MESSAGES.SUCCESS_LOGIN, "success");
    } catch (error) {
      console.error(error);

      const errorCode = error.code;

      switch (errorCode) {
        case "auth/operation-not-allowed":
          addNotification(MESSAGES.GOOGLE_OP_NOT_ENABLED, "error");
          break;
        case "auth/operation-not-supported-in-this-environment":
          addNotification(MESSAGES.GOOGLE_OP_NOT_SUPPORTED, "error");
          break;
        case "auth/popup-blocked":
          addNotification(MESSAGES.GOOGLE_POPUP_BLOCKED, "error");
          break;
        case "auth/popup-closed-by-user":
          addNotification(MESSAGES.GOOGLE_POPUP_CLOSED, "error");
          break;
        default:
          addNotification(MESSAGES.GOOGLE_GENERIC_LOGIN, "error");
          break;
      }
    }
  };

  return (
    <nav className={NavbarStyles.navbar}>
      <div className={NavbarStyles.logo}>
        <img src="/images/tv-32.png" alt="" />
        <h1>{logoText}</h1>
      </div>

      <ul
        className={`${NavbarStyles.navmenu} ${
          isNavExpanded ? NavbarStyles.expanded : ""
        }`}
      >
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
              <Link
                href="/add"
                className={
                  router.pathname === "/add" ? NavbarStyles.activeLink : ""
                }
              >
                Add Fave Show
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
      <div
        className={`${NavbarStyles.hamburger} ${
          isNavExpanded ? NavbarStyles.expanded : ""
        }`}
        onClick={handleNavToggle}
      >
        <span className={NavbarStyles.bar}></span>
        <span className={NavbarStyles.bar}></span>
        <span className={NavbarStyles.bar}></span>
      </div>
    </nav>
  );
};

export default Navbar;
