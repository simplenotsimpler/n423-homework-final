/* 
  Resources: https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

  https://stackoverflow.com/questions/34676752/can-i-use-an-html-input-type-date-to-collect-only-a-year
  
  1927 is when term TV as a medium came into use - https://en.wikipedia.org/wiki/Television

  Use text not number input type for this use case. See https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/

  regex year pattern from https://stackoverflow.com/questions/49912774/javascript-regex-validate-input-year-between-1945-current-year
*/

//TODO: test that +/- icons work on diff. browsers & devices
//plus & minus sign forced to text per https://stackoverflow.com/questions/32915485/how-to-prevent-unicode-characters-from-rendering-as-emoji-in-html-from-javascrip
import ShowFormStyles from "../styles/ShowForm.module.css";
import { useState, useEffect } from "react";
import useFirebase from "@/hooks/useFirebaseDb.js";
import { useRouter } from "next/router.js";
import { useAuth } from "@/contexts/AuthContext.js";
import { useNotification } from "@/contexts/NotificationContext.js";
import { MESSAGES } from "@/utils/messages.js";

const ShowForm = ({ showId, currentShow }) => {
  const { currentUser } = useAuth();
  const { addShow, updateShow } = useFirebase();
  const { addNotification } = useNotification();

  //characters - array of objects not array of strings. when just use strings the item is undefined when try to map it

  //TODO: do I want start with empty characters?
  //TODO: check if character is empty when saving & don't save empty character
  const emptyCharacter = { name: "" };
  const initialCharacters = [];
  const initialShowState = {
    title: "",
    startYear: "",
    endYear: "",
    characters: initialCharacters,
  };

  const [formShow, setFormShow] = useState(initialShowState);

  const router = useRouter();

  useEffect(() => {
    if (showId || currentShow) {
      setFormShow(currentShow);
    } else {
      setFormShow(initialShowState);
    }

    //clean up
    return () => {
      setFormShow(initialShowState);
    };
  }, [showId, currentShow]);

  //TODO: maybe make fan whole current user object?
  const createShow = async () => {
    const newShow = { ...formShow, fan: currentUser.email };

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
      await updateShow(showId, formShow);
      addNotification(MESSAGES.SUCCESS_UPDATE_SHOW, "success");
    } catch (error) {
      addNotification(MESSAGES.ERROR_UPDATE_SHOW, "error");
    }
  };

  const handleAddCharacter = (e) => {
    e.preventDefault();

    if (!formShow.characters) {
      setFormShow({
        ...formShow,
        characters: [emptyCharacter],
      });
    } else {
      setFormShow({
        ...formShow,
        characters: [...formShow.characters, emptyCharacter],
      });
    }
  };

  const handleRemoveCharacter = (index) => {
    const values = [...formShow.characters];
    values.splice(index, 1);
    setFormShow({ ...formShow, characters: [...values] });
  };

  //NOTE: don't try to combine since the state change in characters affects renders
  const handleChange = (e) =>
    setFormShow({ ...formShow, [e.target.name]: e.target.value });

  const handleInputChangeCharacters = (e, index) => {
    const values = [...formShow.characters];
    values[index] = { name: e.target.value };
    setFormShow({ ...formShow, characters: [...values] });
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
      setFormShow(initialShowState);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  /* 
    NOTE: need character for the map even though value not read
    changed _character so don't get the warning per 1st answer in https://stackoverflow.com/questions/50011443/tslint-how-to-disable-error-somevariable-is-declared-but-its-value-is-never-rea
    */

  const characterInputs = formShow.characters?.map((_character, index) => {
    return (
      <div className={ShowFormStyles.showInputGroup}>
        <div className={ShowFormStyles.showInputCharacters} key={index}>
          <input
            type="text"
            name="characters"
            placeholder={`Character ${index + 1}`}
            value={formShow.characters[index].name}
            onChange={(e) => handleInputChangeCharacters(e, index)}
            required
            className={ShowFormStyles.showInput}
          />
          <button
            className={ShowFormStyles.btnRemove}
            onClick={handleRemoveCharacter}
          >
            &#10134;&#xFE0E;
          </button>
        </div>
      </div>
    );
  });
  return (
    <>
      <form className={ShowFormStyles.showForm} onSubmit={handleSubmit}>
        <h1 className={ShowFormStyles.showFormTitle}>
          {showId ? "Edit" : "Add"} Fave Show
        </h1>
        <div className={ShowFormStyles.showInputGroup}>
          <label htmlFor="title" className={ShowFormStyles.showInputLabel}>
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            value={formShow.title}
            onChange={handleChange}
            required
            className={ShowFormStyles.showInput}
          />
        </div>

        <div className={ShowFormStyles.showYears}>
          <div className={ShowFormStyles.showInputGroup}>
            <label
              htmlFor="startYear"
              className={ShowFormStyles.showInputLabel}
            >
              Start Year:
            </label>
            <input
              type="text"
              inputmode="numeric"
              minLength="4"
              maxlength="4"
              pattern="(192[7-9]|19[5-9][0-9]|20\d\d)"
              name="startYear"
              id="startYear"
              placeholder="Start Year..."
              value={formShow.startYear}
              onChange={handleChange}
              required
              className={ShowFormStyles.showInput}
            />
          </div>
          <div className={ShowFormStyles.showInputGroup}>
            <label htmlFor="endYear" className={ShowFormStyles.showInputLabel}>
              End Year:
            </label>
            <input
              type="text"
              inputmode="numeric"
              minLength="4"
              maxlength="4"
              pattern="(192[7-9]|19[5-9][0-9]|20\d\d)"
              name="endYear"
              id="endYear"
              placeholder="End Year..."
              value={formShow.endYear}
              onChange={handleChange}
              className={ShowFormStyles.showInput}
            />
          </div>
        </div>
        <fieldset>
          <div className={ShowFormStyles.showCharactersHeader}>
            <h2 className={ShowFormStyles.showCharactersTitle}>
              Fave Characters:
            </h2>
            <button
              className={ShowFormStyles.btnAdd}
              onClick={handleAddCharacter}
            >
              &#10133;&#xFE0E;
            </button>
          </div>

          {characterInputs}
        </fieldset>

        <input
          type="submit"
          value={showId ? "Update Show" : "Add Show"}
          aria-label="submit-show"
          className={ShowFormStyles.btnSubmit}
        />
      </form>
    </>
  );
};

export default ShowForm;
