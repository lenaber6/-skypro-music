import classNames from "classnames";
import styles from "./PlayList.module.css";
import Track from "./Track/Track";
import { ErrorType, trackType } from "@/types";
import { getTracks } from "@/api/tracks";

export default async function PlayList() {
    let tracksData: trackType[];
  try {
    tracksData = await getTracks();
  } catch (error: unknown) {
    throw new Error('Ошибка');
  } 
  // В реакт получали данные из апи ч-з юзЭффект и состояние, а здесь будет ч-з редакс 
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
          // eslint-disable-next-line react/jsx-key
          <Track 
             trackData={trackData}
             tracksData={tracksData}
             />))}
        </div>
      </div>
    )
}