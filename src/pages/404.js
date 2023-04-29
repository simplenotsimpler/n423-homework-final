import Link from "next/link";
import NotFoundStyles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={NotFoundStyles.notFound}>
      <h1>Ooops...</h1>
      <h2>That page cannot be found :(</h2>
      <p>
        Go back to the <Link href="/">Homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
