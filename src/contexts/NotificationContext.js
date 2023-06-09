import { createContext, useContext, useEffect, useState } from "react";

export const NotificationContext = createContext();

//can we send this destructured ahead of time like in https://www.yld.io/blog/global-notifications-with-reacts-context-api/? Might need to move this to end??
export function useNotification() {
  const { notification, addNotification, removeNotification } =
    useContext(NotificationContext);
  return { notification, addNotification, removeNotification };
}

//TODO: set a timeout/interval so disappears on own
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const removeNotification = () => setNotification(null);

  const addNotification = (message, type) => {
    setNotification({ message, type });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const value = {
    notification,
    removeNotification,
    addNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
