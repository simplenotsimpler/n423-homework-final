import ShowStyles from "../styles/Show.module.css";
import { dummyImgUrl } from "@/utils/helpers.js";
//TODO: link - routes to detail page

const Show = ({ show }) => {
  return (
    <div className={ShowStyles.card}>
      <img src={dummyImgUrl} alt="" />
      <div className={ShowStyles.content}>
        <p className={ShowStyles.title}>{show.title}</p>
        <p className={ShowStyles.year}>{show.year}</p>
        <p className={ShowStyles.more}>More...</p>
      </div>
    </div>
  );
};

export default Show;
