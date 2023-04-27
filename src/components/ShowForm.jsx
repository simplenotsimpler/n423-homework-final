/* 
  Resources: https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
*/

//TODO: fix styling

import ShowFormStyles from "../styles/ShowForm.module.css";
import { useState, useEffect } from "react";
import useFirebase from "@/hooks/useFirebaseDb.js";
import { useRouter } from "next/router.js";
import { useAuth } from "@/contexts/AuthContext.js";
import { useNotification } from "@/contexts/NotificationContext.js";
import { MESSAGES } from "@/utils/messages.js";

const ShowForm = ({ showId }) => {
  const { currentUser } = useAuth();
  const { getShowById, addShow, updateShow } = useFirebase();
  const { addNotification } = useNotification();

  const initialShowState = {
    title: "",
  };

  const [show, setShow] = useState(initialShowState);
  const router = useRouter();

  const getShow = async () => {
    try {
      const { fetchedShow } = await getShowById(showId);
      setShow(fetchedShow);
    } catch (error) {
      console.error(error);
      addNotification(MESSAGES.ERROR_FETCH_SHOW_BY_ID, "error");
    }
  };

  useEffect(() => {
    if (showId) {
      getShow();

      //clean up
      return () => {};
    } else {
      setShow(initialShowState);
    }
  }, [showId]);

  const handleChange = (e) =>
    setShow({ ...show, [e.target.name]: e.target.value });

  const createShow = async () => {
    //TODO: add fan to show
    // const newShow = { ...show, fan: currentUser };
    const newShow = { ...show };
    try {
      await addShow(newShow);
      addNotification(MESSAGES.SUCCESS_CREATE_SHOW, "success");
    } catch (error) {
      console.error(error);
      addNotification(MESSAGES.ERROR_CREATE_SHOW, "error");
    }
  };

  const editShow = async () => {
    try {
      await updateShow(showId, show);
      addNotification(MESSAGES.SUCCESS_UPDATE_SHOW, "sucess");
    } catch (error) {
      addNotification(MESSAGES.ERROR_UPDATE_SHOW, "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showId) {
      await editShow();
      router.push("/");
    } else {
      await createShow();

      //does not work with this set up b/c state has updated show
      // e.target.reset();
      //reset form by resetting the show state
      //https://stackoverflow.com/questions/63475521/how-to-clear-input-field-after-a-successful-submittion-in-react-using-useeffect
      setShow(initialShowState);
    }
  };
  return (
    <>
      <form className={ShowFormStyles.showForm} onSubmit={handleSubmit}>
        <h1>{showId ? "Edit" : "Create"} A Show</h1>
        <div className={ShowFormStyles.showInputGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            value={show.title}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="submit"
          value={showId ? "Update Show" : "Add Show"}
          aria-label="submit-show"
        />
      </form>
    </>
  );
};

export default ShowForm;
