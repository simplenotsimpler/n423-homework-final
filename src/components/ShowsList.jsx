import { useEffect, useState } from "react";
import useFirebaseDb from "@/hooks/useFirebaseDb.js";
import Show from "./Show.jsx";
import ShowsListStyles from "../styles/ShowsList.module.css";

const ShowsList = () => {
  const { getShowsFromDb } = useFirebaseDb();
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    const showsList = await getShowsFromDb();
    // console.log("fetchShows > showsList", showsList);
    setShows(showsList);
  };

  //TODO: periodic refresh
  useEffect(() => {
    fetchShows();
  }, []);

  const showsListComponents = shows.map((show) => {
    return (
      <li key={show.id}>
        <Show show={show} />
      </li>
    );
  });
  return (
    <>
      <ul className={ShowsListStyles.showsList}>{showsListComponents}</ul>
    </>
  );
};

export default ShowsList;
