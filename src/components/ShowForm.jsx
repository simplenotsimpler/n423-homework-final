/* 
  Resources: https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

  https://stackoverflow.com/questions/34676752/can-i-use-an-html-input-type-date-to-collect-only-a-year
  
  1927 is when term TV as a medium came into use - https://en.wikipedia.org/wiki/Television

  Use text not number input type for this use case. See https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/

  regex year pattern from https://stackoverflow.com/questions/49912774/javascript-regex-handleValidation-input-year-between-1945-current-year
*/

//plus & minus sign forced to text per https://stackoverflow.com/questions/32915485/how-to-prevent-unicode-characters-from-rendering-as-emoji-in-html-from-javascrip
import ShowFormStyles from "../styles/ShowForm.module.css";
import { useState, useEffect } from "react";
import useFirebase from "@/hooks/useFirebaseDb.js";
import { useRouter } from "next/router.js";
import { useAuth } from "@/contexts/AuthContext.js";
import { useNotification } from "@/contexts/NotificationContext.js";
import { MESSAGES } from "@/utils/messages.js";
import Validation from "./Validation.jsx";
import { VALIDATION_MESSAGES } from "@/utils/messages.js";
import { useShows } from "@/contexts/ShowsContext.js";

const ShowForm = ({ showId, currentShow }) => {
  const { currentUser } = useAuth();
  const { addShow, updateShow } = useFirebase();
  const { addNotification } = useNotification();
  const { getShowsFromDb } = useShows();

  //characters - array of objects not array of strings. when just use strings the item is undefined when try to map it

  //TODO: fix - getting key error again on 39:11, maybe need to use uuid?
  const emptyCharacter = { name: "" };
  const initialCharacters = [];
  const initialShowState = {
    title: "",
    startYear: "",
    endYear: "",
    characters: initialCharacters,
  };

  const [formShow, setFormShow] = useState(initialShowState);
  const [formErrors, setFormErrors] = useState({});

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

  //FUTURE: maybe make fan whole current user object?
  const createShow = async () => {
    const newShow = { ...formShow, fan: currentUser.email };

    try {
      await addShow(newShow);
      addNotification(MESSAGES.SUCCESS_CREATE_SHOW, "success");
      getShowsFromDb();
    } catch (error) {
      console.error(error);
      addNotification(MESSAGES.ERROR_CREATE_SHOW, "error");
    }
  };

  const editShow = async () => {
    try {
      await updateShow(showId, formShow);
      addNotification(MESSAGES.SUCCESS_UPDATE_SHOW, "success");
      getShowsFromDb();
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
  const handleChange = (e) => {
    setFormShow({ ...formShow, [e.target.name]: e.target.value });
  };

  const handleInputChangeCharacters = (e, index) => {
    const values = [...formShow.characters];
    values[index] = { name: e.target.value };
    setFormShow({ ...formShow, characters: [...values] });
  };

  /* FUTURE ENHANCMENT: remove error after user leaves input. not implemented since we're not using onBlur & validating after submit */
  // https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component
  const handleValidation = (values) => {
    let errors = {};
    let formIsValid = true;

    //TV invented in 1927 so YYYY after 1927
    const regex = /^(192[7-9]|19[5-9][0-9]|20\d\d)$/i;

    if (!values.title) {
      errors.title = VALIDATION_MESSAGES.valueMissing.title;
    } else {
      delete errors.title;
    }

    const characterErrors = [];
    values.characters.forEach((character) => {
      if (character.name === "") {
        characterErrors.push(VALIDATION_MESSAGES.valueMissing.character);
      }
    });

    if (characterErrors.length > 0) {
      errors.characters = characterErrors;
    } else {
      delete errors.characters;
    }

    if (!values.startYear) {
      errors.startYear = VALIDATION_MESSAGES.valueMissing.startYear;
    } else if (!regex.test(values.startYear)) {
      errors.startYear = VALIDATION_MESSAGES.patternMismatch.startYear;
    } else {
      delete errors.startYear;
    }

    //only test if not blank
    if (values.endYear) {
      if (!regex.test(values.endYear)) {
        errors.endYear = VALIDATION_MESSAGES.patternMismatch.endYear;
      } else if (values.endYear < values.startYear) {
        errors.endYear = VALIDATION_MESSAGES.rangeUnderflow.endYear;
      } else {
        delete errors.endYear;
      }
    }

    if (Object.keys(errors).length > 0) {
      formIsValid = false;
    }
    setFormErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation(formShow)) {
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
    } else {
      addNotification(MESSAGES.ERROR_VALIDATION_FAILED, "error");
      return false;
    }
  };

  /* 
    NOTE: need character for the map even though value not read
    changed _character so don't get the warning per 1st answer in https://stackoverflow.com/questions/50011443/tslint-how-to-disable-error-somevariable-is-declared-but-its-value-is-never-rea
    */

  //from Font Awesome
  //https://fontawesome.com/icons/upload?f=classic&s=solid
  //set color with fill attribute per https://stackoverflow.com/questions/22252472/how-can-i-change-the-color-of-an-svg-element
  const uploadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        fill="#ff3f8a"
        d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
      />
    </svg>
  );
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
            className={ShowFormStyles.showInput}
          />
          <button
            className={ShowFormStyles.btnRemove}
            onClick={handleRemoveCharacter}
          >
            &#10134;&#xFE0E;
          </button>
        </div>
        {formErrors.characters?.[index] && (
          <Validation>{formErrors?.characters?.[index]}</Validation>
        )}
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
          <label htmlFor="showImage" className={ShowFormStyles.showInputLabel}>
            Show Image:
          </label>
          <div className={ShowFormStyles.fileInput}>
            <input
              type="file"
              name="showImage"
              id="showImage"
              aria-label="showImage"
              class="form-element"
              accept="image/jpeg, image/png, image/jpg"
              className={ShowFormStyles.showInput}
            />
            <div className={ShowFormStyles.uploadIcon}>{uploadIcon}</div>
          </div>
        </div>
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
            className={ShowFormStyles.showInput}
          />
          {formErrors.title && <Validation>{formErrors.title}</Validation>}
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
              inputMode="numeric"
              name="startYear"
              id="startYear"
              placeholder="yyyy"
              value={formShow.startYear}
              onChange={handleChange}
              className={ShowFormStyles.showInput}
            />
            {formErrors.startYear && (
              <Validation>{formErrors.startYear}</Validation>
            )}
          </div>
          <div className={ShowFormStyles.showInputGroup}>
            <label htmlFor="endYear" className={ShowFormStyles.showInputLabel}>
              End Year:
            </label>
            <input
              type="text"
              inputMode="numeric"
              name="endYear"
              id="endYear"
              placeholder="yyyy"
              value={formShow.endYear}
              onChange={handleChange}
              className={ShowFormStyles.showInput}
            />
            {formErrors.endYear && (
              <Validation>{formErrors.endYear}</Validation>
            )}
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
