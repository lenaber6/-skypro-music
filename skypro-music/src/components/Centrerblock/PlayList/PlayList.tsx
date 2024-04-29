import classNames from "classnames";
import styles from "./PlayList.module.css";
import Track from "./Track/Track";
import { trackType } from "@/types";
import { getTracks } from "@/api/tracks";
import { useEffect, useState } from "react";

type PlatlistType = {
  setTrack: (param:trackType) => void;
  }

export default function PlayList({setTrack}: PlatlistType) {
  //   let tracksData: trackType[];
  // try {
  //   tracksData = await getTracks();
  // } catch (error: any) {
  //   throw new Error(error.message);
  // } До следующей домашки, вернуть async c Redux
  const [tracksData, setTracksData] = useState<trackType[]>([]);
  useEffect(() => {
    getTracks().then((data:trackType[]) => setTracksData(data))
    .catch((error:any) => {
      throw new Error(error.message);
    });
  }, []); // Потом это всё убрать? В реакт получали данные из апи ч-з юзЭффект и состояние, а здесь будет ч-з редакс 
    return(
        <div className={classNames(styles.centerblockContent, styles.contentPlaylist)}>
        <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
          <div className={classNames(styles.playlistTitleCol, styles.col01)}>Трек</div>
          <div className={classNames(styles.playlistTitleCol, styles.col02)}>Исполнитель</div>
          <div className={classNames(styles.playlistTitleCol, styles.col03)}>Альбом</div>
          <div className={classNames(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <div className={classNames(styles.contentPlaylist, styles.playlist)}>
         {tracksData.map((trackData) => (
          <Track 
             onClick={() => setTrack(trackData)}
             key={trackData.id}
             name={trackData.name}
             author={trackData.author}
             album={trackData.album}
             duration_in_seconds={trackData.duration_in_seconds} 
            //  onClick={function (): void {
            //    throw new Error("Function not implemented.");
            //  } }   
             />))}
        </div>
      </div>
    )
}