import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/utils/firebaseInit.js";
import { useNotification } from "./NotificationContext.js";
import { MESSAGES } from "@/utils/messages.js";

export const ShowsContext = createContext();

export const ShowsProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [currentShow, setCurrentShow] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotification();

  //try catch here since we call it multiple times b/c of refresh
  //note does not error if shows collection not created yet (it's a NoSQL thing)
  const getShowsFromDb = async () => {
    try {
      setIsLoading(true);
      const showsSnapshot = await db.collection("shows").get();
      const newShows = [];

      for (let show of showsSnapshot.docs) {
        const showData = show.data();
        const newShow = { ...showData, id: show.id };
        newShows.push(newShow);
      }

      setShows(newShows);
    } catch (error) {
      console.error(error);
      addNotification(MESSAGES.ERROR_FETCH_SHOWS, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getShowById = (showId) => {
    const show = shows.find((show) => show.id === showId);
    setCurrentShow(show);
    // return show;
  };

  //update less often because we're on free plan
  //30 minutes * 60 seconds * 1000 millseconds
  const thirtyMinutesInMilliseconds = 30 * 60 * 1000;
  useEffect(() => {
    const intervalId = setInterval(() => {
      getShowsFromDb();
    }, thirtyMinutesInMilliseconds);

    getShowsFromDb();
    return () => clearInterval(intervalId);
  }, []);

  const value = {
    shows,
    isLoading,
    getShowsFromDb,
    getShowById,
    currentShow,
  };

  return (
    <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
  );
};

export function useShows() {
  const { shows, isLoading, getShowsFromDb, getShowById, currentShow } =
    useContext(ShowsContext);
  return { shows, isLoading, getShowsFromDb, getShowById, currentShow };
}
