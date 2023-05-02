import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/utils/firebaseInit.js";

export const ShowsContext = createContext();

export const ShowsProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [currentShow, setCurrentShow] = useState();

  const getShowsFromDb = async () => {
    const showsSnapshot = await db.collection("shows").get();
    const newShows = [];

    for (let show of showsSnapshot.docs) {
      const showData = show.data();
      const newShow = { ...showData, id: show.id };
      newShows.push(newShow);
    }

    setShows(newShows);
  };

  const getShowById = (showId) => {
    const show = shows.find((show) => show.id === showId);
    setCurrentShow(show);
    // return show;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getShowsFromDb();
    }, 5000);

    getShowsFromDb();
    return () => clearInterval(intervalId);
  }, []);

  const value = {
    shows,
    getShowsFromDb,
    getShowById,
    currentShow,
  };

  return (
    <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
  );
};

export function useShows() {
  const { shows, getShowsFromDb, getShowById, currentShow } =
    useContext(ShowsContext);
  return { shows, getShowsFromDb, getShowById, currentShow };
}
