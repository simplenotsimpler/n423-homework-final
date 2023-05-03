import ShowStyles from "../styles/Show.module.css";
import { dummyImgUrl } from "@/utils/helpers.js";
import Link from "next/link.js";

const Show = ({ show }) => {
  return (
    <div className={ShowStyles.card}>
      <img src={dummyImgUrl} alt="" />
      <div className={ShowStyles.content}>
        <p className={ShowStyles.title}>{show.title}</p>
        <p className={ShowStyles.year}>
          {show.startYear} - {show.endYear ? `${show.endYear}` : `present`}
        </p>
        <Link href={`/shows/${show.id}`} className={ShowStyles.btnLink}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Show;
