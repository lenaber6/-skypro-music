
import PlayList from "@/components/Centrerblock/PlayList/PlayList";
import { getTracks } from "@/api/tracks";
import Filters from "@/components/Filters/Filters";
import styles from "./page.module.css";

export default async function MainTracksPage() {
  const tracksData = await getTracks();

   
    return (
    <>
     <h2 className={styles.centerblockH2}>Треки</h2>
     <Filters />
    <PlayList tracks={tracksData}/>
   </>
   )
}