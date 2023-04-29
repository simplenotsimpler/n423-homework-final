import { useState } from "react";
import { db } from "@/utils/firebaseInit.js";

export default function useFirebaseDb() {
  //TODO get all shows - do we want to return this or add to a context? where else do we need all shows besides home page?

  const getShowsFromDb = async () => {
    const showsList = [];
    const showsSnapshot = await db.collection("shows").get();
    for (let show of showsSnapshot.docs) {
      const showData = show.data();
      showsList.push({
        ...showData,
        id: show.id,
      });
    }

    return showsList;
  };

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
