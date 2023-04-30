import ShowDetailStyles from "../styles/ShowDetail.module.css";
import { dummyImgUrlLg } from "@/utils/helpers.js";

const ShowDetail = ({ show }) => {
  return (
    <div className={ShowDetailStyles.showDetail}>
      <header className={ShowDetailStyles.showHeader}>
        <div className={ShowDetailStyles.imgHolder}>
          <img src={dummyImgUrlLg} alt="" />
        </div>
        <div className={ShowDetailStyles.showHeaderText}>
          <h1>{show.title}</h1>
          <p>{show.year}</p>
        </div>
      </header>
      <div className={ShowDetailStyles.showBody}>
        <p className={ShowDetailStyles.charactersTitle}>Favorite Characters</p>
        <ul className={ShowDetailStyles.characters}>
          {show.characters.length > 0 &&
            show.characters.map((character) => {
              return (
                <li className={ShowDetailStyles.character}>{character.name}</li>
              );
            })}
        </ul>
      </div>
      <footer>
        <p>Favorite fan: {show.fan}</p>
      </footer>
    </div>
  );
};

export default ShowDetail;
