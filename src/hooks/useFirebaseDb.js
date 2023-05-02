import { db } from "@/utils/firebaseInit.js";

export default function useFirebaseDb() {
  const addShow = (show) => {
    return db.collection("shows").add(show);
  };

  const updateShow = (showId, show) => {
    return db
      .collection("shows")
      .doc(showId)
      .update({ ...show });
  };

  const deleteShow = (showId)=> {
    return db.collection("shows").doc(showId).delete();
  }

  return {
    addShow,
    updateShow,
    deleteShow
  };
}
