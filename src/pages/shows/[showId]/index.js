import { useShows } from "@/contexts/ShowsContext.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import ShowDetail from "@/components/ShowDetail.jsx";

const ShowDetailPage = () => {
  const { getShowById, currentShow } = useShows();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { showId } = router.query;

  //check that router read
  //https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !showId) return;
    try {
      getShowById(showId);
    } catch (error) {
      console.log(error);
      //TODO: notification of issue
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
        <ShowDetail show={currentShow} />
      )}
    </>
  );
};

export default ShowDetailPage;
