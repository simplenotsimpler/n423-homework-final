import { useRouter } from "next/router.js";
import ShowForm from "@/components/ShowForm.jsx";
import { useShows } from "@/contexts/ShowsContext.js";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext.js";
import { useNotification } from "@/contexts/NotificationContext.js";
import { MESSAGES } from "@/utils/messages.js";

const EditShowPage = () => {
  const { getShowById, currentShow } = useShows();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();

  const router = useRouter();
  const { showId } = router.query;

  //make sure user logged in
  useEffect(() => {
    if (!currentUser) {
      router.push("/protected");
    }
  }, []);

  //grab the show here. this ensures gets show fresh in case user comes directly to link rather than from index.
  //also allows to manage the loading state better
  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !showId) return;
    try {
      getShowById(showId);
    } catch (error) {
      console.log(error);      
      addNotification(MESSAGES.ERROR_FETCH_SHOW_BY_ID, "error");
    } finally {
      setIsLoading(false);
    }

    //clean up
    return () => {
      setIsLoading(false);
    };
  }, [router.isReady, showId, currentShow]);

  return (
    <>
      {isLoading || !currentShow ? (
        <p>Loading...</p>
      ) : (
        <ShowForm showId={showId} currentShow={currentShow} />
      )}
    </>
  );
};

export default EditShowPage;
