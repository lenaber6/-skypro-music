'use client';

import Track from "@/components/Track/Track";
import styles from "./Centerblock.module.css";
import classNames from "classnames";
import { trackType } from "@/types";
import { getTracks } from "@/api/tracks";
import Filters from "../Filters/Filters";
import { useEffect, useState } from "react";

type CenterblockType = {
 setTrack: (param: trackType) => void;
};

// export default async function Centerblock({setTrack}:CenterblockType) {
export default  function Centerblock() {

  // let tracksData: trackType[];
  // try {
  //   tracksData = await getTracks();
  // } catch (error: any) {
  //   throw new Error(error.message);
  // }

  const [tracksData, setTracksData] = useState<trackType[]>([]);
  useEffect(() => {
    getTracks().then((data: trackType[]) => setTracksData(data))
    .catch((error:any) => {
      throw new Error(error.message);
    });
  }, []);

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
           <Filters />
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
          </div>
    )
}
 // Обратите внимание, что функция компонента также является асинхронной
//   export default async function HomePage() {
//     const data = await getData();
  
//     return <main>/* Некий контент */</main>;
//   }