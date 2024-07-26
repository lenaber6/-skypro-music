import { getCategoryTracks } from "@/api/tracks"
import PlayList from "@/components/Centrerblock/PlayList/PlayList";
import styles from "./page.module.css"

type CategoryType = {
    params: {id: string}
}

export default async function CategoryPage({params}: CategoryType) {
    const tracksData = await getCategoryTracks(params.id);

    let title = "Треки";
    {
      switch (params.id) {
        case "1":
          title = "Плейлист дня";
          break;
  
        case "2":
          title = "100 танцевальных хитов";
          break;
  
        case "3":
          title = "Инди-заряд";
          break;
  
        default:
          title = "Треки";
          break;
      }
    }
    return(
        <>
        <h2 className={styles.centerblockH2}>{title}</h2>
        <PlayList tracks={tracksData}
        //  playlist={tracksData} 
         />
        </>

    )
}