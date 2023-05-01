import { useEffect, useState } from "react";
import useFirebaseDb from "@/hooks/useFirebaseDb.js";
import Show from "./Show.jsx";
import ShowsListStyles from "../styles/ShowsList.module.css";
import { useShows } from "@/contexts/ShowsContext.js";

const ShowsList = () => {
  const { shows } = useShows();

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
