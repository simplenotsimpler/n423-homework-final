import { useShows } from "@/contexts/ShowsContext.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import ShowDetail from "@/components/ShowDetail.jsx";

const ShowDetailPage = () => {
  const { shows } = useShows();
  const [currentShow, setCurrentShow] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { showId } = router.query;

  //check that router read
  //https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
  useEffect(() => {
    setIsLoading(true);
    if (!router.isReady || !showId) return;
    try {
      setCurrentShow(shows.find((show) => show.id === showId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    //clean up
    return () => {
      setCurrentShow(null);
      setIsLoading(false);
    };
  }, [router.isReady, showId, shows]);

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
