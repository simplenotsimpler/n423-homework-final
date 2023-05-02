import { useRouter } from "next/router.js";
import ShowForm from "@/components/ShowForm.jsx";

const EditShowPage = () => {
  const router = useRouter();
  const { showId } = router.query;
  console.log(showId);

  return <ShowForm showId={showId} />;
};

export default EditShowPage;
