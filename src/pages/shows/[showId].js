import { useShows } from "@/contexts/ShowsContext.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";

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

  return (
    <>
      <h1>{currentShow && currentShow.title}</h1>
    </>
  );
};

export default ShowDetailPage;
