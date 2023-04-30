import ShowStyles from "../styles/Show.module.css";
import { dummyImgUrl } from "@/utils/helpers.js";
import Link from "next/link.js";
//TODO: link - routes to detail page

const Show = ({ show }) => {
  return (
    <div className={ShowStyles.card}>
      <img src={dummyImgUrl} alt="" />
      <div className={ShowStyles.content}>
        <p className={ShowStyles.title}>{show.title}</p>
        <p className={ShowStyles.year}>{show.year}</p>
        <Link href={`/shows/${show.id}`} className={ShowStyles.btnLink}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Show;
