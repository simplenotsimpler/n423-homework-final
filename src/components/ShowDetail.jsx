import ShowDetailStyles from "../styles/ShowDetail.module.css";
import { dummyImgUrlLg } from "@/utils/helpers.js";
import { useAuth } from "@/contexts/AuthContext.js";
import Link from "next/link.js";
import { getTextAfterCharacter } from "@/utils/helpers.js";
import { useNotification } from "@/contexts/NotificationContext.js";
import { MESSAGES } from "@/utils/messages.js";
import useFirebaseDb from "@/hooks/useFirebaseDb.js";
import { useRouter } from "next/router.js";

const ShowDetail = ({ show }) => {
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();
  const { deleteShow } = useFirebaseDb();
  const router = useRouter();
  //TODO: maybe modal for the edit form?? otherwise have to redo the shows folder
  const handleDeleteClick = async (e) => {
    const showId = getTextAfterCharacter(e.target.id, "-");

    //TODO: replace with pretty confirm w/ default on cancel
    const confirmResult = confirm("Are you sure you want to delete this show?");

    //TODO: try catch, check that owner as extra precaution
    if (confirmResult) {
      try {
        // if(!currentUser || currentUser.email != show.fan){
        //   throw
        // }
        console.log("Yes, delete showId", showId);
        // const result = await deleteShow(showId);
        await deleteShow(showId);
        addNotification(`${MESSAGES.SUCCESS_DELETE_SHOW} ${showId}`, "success");
        router.push("/");
      } catch (error) {
        console.error(error);
        addNotification(MESSAGES.ERROR_DELETE_SHOW, "error");
      }
    } else {
      console.log("Delete cancelled");
      addNotification(MESSAGES.INFO_CANCEL_DELETE_SHOW, "info");
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

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
