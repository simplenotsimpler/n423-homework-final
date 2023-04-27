/* 
  Resources: https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

  https://stackoverflow.com/questions/34676752/can-i-use-an-html-input-type-date-to-collect-only-a-year
  
  1927 is when term TV as a medium came into use - https://en.wikipedia.org/wiki/Television
*/

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

  //characters - array of objects not array of strings. when just use strings the item is undefined when try to map it

  const emptyCharacter = { name: "" };
  const initialCharacters = [emptyCharacter, emptyCharacter];
  const initialShowState = {
    title: "",
    year: "",
    characters: initialCharacters,
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

  const createShow = async () => {
    const newShow = { ...show, fan: currentUser.email };

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

  const handleAddCharacter = (e) => {
    e.preventDefault();
    // const values = [...show.characters];
    setShow({ ...show, characters: [...show.characters, emptyCharacter] });
  };

  const handleRemoveCharacter = (index) => {
    const values = [...show.characters];
    values.splice(index, 1);
    setShow({ ...show, characters: [...values] });
  };

  //NOTE: don't try to combine since the state change in characters affects renders
  const handleChange = (e) =>
    setShow({ ...show, [e.target.name]: e.target.value });

  const handleInputChangeCharacters = (e, index) => {
    const values = [...show.characters];
    values[index] = { name: e.target.value };
    setShow({ ...show, characters: [...values] });
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

  /* 
    NOTE: need character for the map even though value not read
    changed _character so don't get the warning per 1st answer in https://stackoverflow.com/questions/50011443/tslint-how-to-disable-error-somevariable-is-declared-but-its-value-is-never-rea
    */

  //TODO: when add edit function, check if characters length >0

  const characterInputs = show.characters.map((_character, index) => {
    return (
      <div className={ShowFormStyles.showInputCharacters} key={index}>
        <input
          type="text"
          name="characters"
          placeholder={`Character ${index + 1}`}
          value={show.characters[index].name}
          onChange={(e) => handleInputChangeCharacters(e, index)}
        />
        <button
          className={ShowFormStyles.btnRemove}
          onClick={handleRemoveCharacter}
        >
          -
        </button>
      </div>
    );
  });
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

        <div className={ShowFormStyles.showInputGroup}>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            name="year"
            id="year"
            placeholder="Year..."
            min="1927"
            max="2099"
            step="1"
            value={show.year}
            onChange={handleChange}
            required
          />
        </div>
        <fieldset>
          <div className={ShowFormStyles.showCharactersHeader}>
            <h2>Fave Characters</h2>
            <button
              className={ShowFormStyles.btnAdd}
              onClick={handleAddCharacter}
            >
              +
            </button>
          </div>

          {characterInputs}
        </fieldset>

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
