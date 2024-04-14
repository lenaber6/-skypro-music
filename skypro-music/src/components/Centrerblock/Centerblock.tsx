import Track from "@/components/Track/Track";
import styles from "./Centerblock.module.css";
import classNames from "classnames";
import { trackType } from "@/types";
import { getTracks } from "@/api/tracks";

export default function Centerblock() {
  // let tracksData: trackType[];
  // try {
  //   tracksData = await getTracks();
  // } catch (error: any) {
  //   throw new Error(error.message);
  // }
  
    return(
        <div className={classNames(styles.mainCenterblock, styles.centerblock)}>
            <div className={classNames(styles.centerblockSearch, styles.search)}>
              <svg className={styles.searchSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-search" />
              </svg>
              <input
                className={styles.searchText}
                type="search"
                placeholder="Поиск"
                name="search"
              />
            </div>
            <h2 className={styles.centerblockH2}>Треки</h2>
            <div className={classNames(styles.centerblockFilter, styles.filter)}>
              <div className={styles.filterTitle}>Искать по:</div>
              <div className={classNames(styles.filterButton, styles.buttonAuthor, styles._btnText)}>
                исполнителю
              </div>
              <div className={classNames(styles.filterButton, styles.buttonYear, styles._btnText)}>
                году выпуска
              </div>
              <div className={classNames(styles.filterButton, styles.buttonGenre, styles._btnText)}>жанру</div>
            </div>
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
               <Track  />
              </div>
            </div>
          </div>
    )
}