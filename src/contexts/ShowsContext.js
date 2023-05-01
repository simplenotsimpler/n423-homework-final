import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/utils/firebaseInit.js";

export const ShowsContext = createContext();

export const ShowsProvider = ({ children }) => {
  const [shows, setShows] = useState([]);

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
    return show;
  };

  //TODO: may need to export so can call in useEffect for periodic refresh; if use setInterval here could cause whole app to re-render
  useEffect(() => {
    getShowsFromDb();
    return () => {};
  }, []);

  const value = {
    shows,
    getShowsFromDb,
    getShowById,
  };

  return (
    <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
  );
};

export function useShows() {
  const { shows, getShowsFromDb, getShowById } = useContext(ShowsContext);
  return { shows, getShowsFromDb, getShowById };
}
