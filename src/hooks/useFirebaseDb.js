import { useState } from "react";
import { db } from "@/utils/firebaseInit.js";

export default function useFirebaseDb() {
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
    getShowById,
    addShow,
    updateShow,
  };
}
