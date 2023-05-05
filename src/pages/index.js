import HomePageStyles from "@/styles/Home.module.css";
import ShowsList from "@/components/ShowsList.jsx";

export default function Home() {
  return (
    <>
      <h1 className={HomePageStyles.homePageTitle}>Our Lineup:</h1>
      <ShowsList />
    </>
  );
}
