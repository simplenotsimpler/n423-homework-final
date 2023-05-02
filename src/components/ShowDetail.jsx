import ShowDetailStyles from "../styles/ShowDetail.module.css";
import { dummyImgUrlLg } from "@/utils/helpers.js";
import { useAuth } from "@/contexts/AuthContext.js";
import Link from "next/link.js";
import { getTextAfterCharacter } from "@/utils/helpers.js";

//TODO: maybe modal for the edit form?? otherwise have to redo the shows folder
const handleDeleteClick = async (e) => {
  const showId = getTextAfterCharacter(e.target.id, "-");

  //TODO: replace with pretty confirm w/ default on cancel
  const confirmResult = confirm("Are you sure you want to delete this show?");

  if (confirmResult) {
    console.log("Yes, delete showId", showId);
    // const result = await deleteShow(showId);
    //TODO: pretty this up
    // alert(result.message);

    alert(`coming soon - delete show id: ${showId}`);
  } else {
    console.log("Delete cancelled");
  }
};

const ShowDetail = ({ show }) => {
  const { currentUser } = useAuth();
  return (
    <div className={ShowDetailStyles.showDetail}>
      <header className={ShowDetailStyles.showHeader}>
        <div className={ShowDetailStyles.imgHolder}>
          <img src={dummyImgUrlLg} alt="" />
        </div>
        <div className={ShowDetailStyles.showHeaderText}>
          <h1>{show.title}</h1>
          <p>{show.year}</p>
        </div>
      </header>
      <div className={ShowDetailStyles.showBody}>
        <p className={ShowDetailStyles.charactersTitle}>Favorite Characters</p>
        <ul className={ShowDetailStyles.characters}>
          {show.characters.length > 0 &&
            show.characters.map((character, idx) => {
              return (
                <li key={idx} className={ShowDetailStyles.character}>
                  {character.name}
                </li>
              );
            })}
        </ul>
      </div>
      <footer>
        <p>Biggest fan: {show.fan}</p>
        {currentUser.email === show.fan ? (
          <div className={ShowDetailStyles.showActions}>
            {/* <Link href={`/shows/edit/${show.id}`}> */}
            <span className="visually-hidden">Edit</span> &#128393;
            {/* </Link> */}
            <button id={`delete-${show.id}`} onClick={handleDeleteClick}>
              <span className="visually-hidden">Delete</span> &#128465;
            </button>
          </div>
        ) : (
          <></>
        )}
      </footer>
    </div>
  );
};

export default ShowDetail;
