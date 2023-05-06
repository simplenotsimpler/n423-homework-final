import ShowDetailStyles from "../styles/ShowDetail.module.css";
import { dummyImgUrlBlue } from "@/utils/helpers.js";
import { useAuth } from "@/contexts/AuthContext.js";
import { getTextAfterCharacter } from "@/utils/helpers.js";
import { useNotification } from "@/contexts/NotificationContext.js";
import { MESSAGES } from "@/utils/messages.js";
import useFirebaseDb from "@/hooks/useFirebaseDb.js";
import { useRouter } from "next/router.js";

import Link from "next/link.js";
import { useShows } from "@/contexts/ShowsContext.js";
import { ModalContext } from "@/contexts/ModalContext.js";
import Modal from "@/components/Modal.jsx";
import { useContext, useState } from "react";
import Dialog from "@/components/Dialog.jsx";

const ShowDetail = ({ show }) => {
  const { currentUser } = useAuth();
  const { getShowsFromDb } = useShows();
  const { addNotification } = useNotification();
  const { deleteShow } = useFirebaseDb();
  const { openModal, setOpenModal } = useContext(ModalContext);
  const router = useRouter();
  const [showId, setShowId] = useState();

  const handleCancel = () => setOpenModal(false);

  const handleDelete = async () => {
    try {
      //extra check
      if (currentUser.email != show.fan) {
        throw { code: "ERROR_AUTH_SHOW", message: MESSAGES.ERROR_AUTH_SHOW };
      }

      console.log("Yes, delete showId", showId);

      await deleteShow(showId);
      getShowsFromDb();
      addNotification(`${MESSAGES.SUCCESS_DELETE_SHOW} ${showId}`, "success");
      router.push("/");
    } catch (error) {
      console.error(error);
      if (code === "ERROR_AUTH_SHOW") {
        addNotification(MESSAGES.ERROR_AUTH_SHOW, "error");
      } else {
        addNotification(MESSAGES.ERROR_DELETE_SHOW, "error");
      }
    }
    setOpenModal(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // https://www.youtube.com/watch?v=JesTjUcXh8o
  // https://github.com/Sanskarraj51/CRUD/blob/main/src/pages/Home.js
  const handleDeleteClick = (e) => {
    setOpenModal(true);
    setShowId(getTextAfterCharacter(e.target.id, "-"));
  };

  return (
    <>
      {openModal && (
        <Modal>
          <Dialog
            onConfirm={handleDelete}
            onCancel={handleCancel}
            title="Delete the show?"
            isDelete={true}
          >
            <p>Delete the show?</p>
            <p>It will be permanently deleted.</p>
          </Dialog>
        </Modal>
      )}
      <div className={ShowDetailStyles.showDetail}>
        <header className={ShowDetailStyles.showHeader}>
          <div className={ShowDetailStyles.imgHolder}>
            <img src={dummyImgUrlBlue} alt="" />
          </div>
          <div className={ShowDetailStyles.showHeaderText}>
            <h1 className={ShowDetailStyles.title}>{show.title}</h1>
            <p className={ShowDetailStyles.years}>
              {show.startYear} - {show.endYear ? `${show.endYear}` : `present`}
            </p>
          </div>
        </header>
        <div className={ShowDetailStyles.showBody}>
          <p className={ShowDetailStyles.charactersTitle}>
            Favorite Characters
          </p>
          <ul className={ShowDetailStyles.characters}>
            {show.characters?.length > 0 &&
              show.characters?.map((character, idx) => {
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
          {currentUser?.email === show.fan ? (
            <div className={ShowDetailStyles.showActions}>
              <Link href={`/shows/${show.id}/edit/`}>
                <span className="visually-hidden">Edit</span> &#128393;
              </Link>
              <button
                className={ShowDetailStyles.btnAction}
                id={`delete-${show.id}`}
                onClick={handleDeleteClick}
              >
                <span className="visually-hidden">Delete</span> &#128465;
              </button>
            </div>
          ) : (
            <></>
          )}
        </footer>
      </div>
    </>
  );
};

export default ShowDetail;
