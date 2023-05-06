import Show from "./Show.jsx";
import ShowsListStyles from "../styles/ShowsList.module.css";
import { useShows } from "@/contexts/ShowsContext.js";
import { useAuth } from "@/contexts/AuthContext.js";

//TODO: check if shows.length === 0

const ShowsList = () => {
  const { shows, isLoading } = useShows();
  const { currentUser } = useAuth();
  const showsListComponents = shows.map((show) => {
    return (
      <li key={show.id}>
        <Show show={show} />
      </li>
    );
  });
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={ShowsListStyles.showsList}>{showsListComponents}</ul>
      )}
    </>
  );
};

export default ShowsList;

// {shows.length === 0 ? (
//   <div className={ShowsListStyles.noShows}>
//     <p className={ShowsListStyles.noShowsText}>Sorry, no shows yet.</p>
//     {!currentUser && (
//       <p className={ShowsListStyles.noShowsText}>
//         Sign in to add your fave TV show.
//       </p>
//     )}
//   </div>
