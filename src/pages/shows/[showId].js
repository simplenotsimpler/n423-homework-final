import { useShows } from "@/contexts/ShowsContext.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import ShowDetail from "@/components/ShowDetail.jsx";

const ShowDetailPage = () => {
  const { shows } = useShows();
  const [currentShow, setCurrentShow] = useState();

  const router = useRouter();
  const { showId } = router.query;

  //check that router read
  //https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
  useEffect(() => {
    if (!router.isReady) return;
    setCurrentShow(shows.find((show) => show.id === showId));
  }, [router.isReady]);

  return <>{currentShow && <ShowDetail show={currentShow} />}</>;
};

export default ShowDetailPage;
