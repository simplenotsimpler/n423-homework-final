// https://stackoverflow.com/questions/68104551/react-firebase-authentication-and-usecontext
// https://lo-victoria.com/introduction-to-react-context-api-with-firebase-authentication

import { createContext, useContext, useEffect, useState } from "react";

import { auth, googleProvider } from "@/utils/firebaseInit.js";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  //TODO: implement loading. see next js documentation for their specifics
  // const [loading, setLoading] = useState(true);

  function login() {
    return auth.signInWithPopup(googleProvider);
  }

  function logout() {
    return auth.signOut();
  }

  function getUser() {
    return auth.currentUser;
  }

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        // setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error(error);
      // setLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    getUser,
    login,
    logout,
  };

  //wait on loading part
  // return (
  //   <AuthContext.Provider value={value}>
  //     { !loading && children }
  //   </AuthContext.Provider>
  // )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
