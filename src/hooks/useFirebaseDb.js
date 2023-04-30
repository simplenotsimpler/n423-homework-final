import { useState } from "react";
import { db } from "@/utils/firebaseInit.js";

//TODO: move the rest to context?
export default function useFirebaseDb() {
  //TODO fix so async
  const getShowById = (showId) => {
    const docSnap = db.collection("shows").doc(showId).get();
    return { ...docSnap.data() };
  };
  const addShow = (show) => {
    return db.collection("shows").add(show);
  };

  const updateShow = (showId, show) => {
    return db
      .collection("shows")
      .doc(showId)
      .update({ ...show });
  };

  return {
    getShowsFromDb,
    getShowById,
    addShow,
    updateShow,
  };
}
