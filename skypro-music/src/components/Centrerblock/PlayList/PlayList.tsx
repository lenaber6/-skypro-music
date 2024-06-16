/* eslint-disable @next/next/no-async-client-component */
"use client";

import classNames from "classnames";
import styles from "./PlayList.module.css";
import Track from "./Track/Track";
import { trackType } from "@/types";
import { getTracks } from "@/api/tracks";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";
import Search from "../Search/Search";
import Filters from "@/components/Filters/Filters";

export default function PlayList() {
  const dispatch = useAppDispatch();

  const[tracks, setTracks] = useState<trackType[]>([]);
  const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks);

    let tracksData: trackType[];

    useEffect(() => {
getTracks().then((tracksData) => {
  setTracks(tracksData);
  dispatch(setInitialTracks({initialTracks: tracksData}));
});
    }, [dispatch]);
 

  // В реакт получали данные из апи ч-з юзЭффект и состояние, а здесь будет ч-з редакс 
    return(
      <>
      <Search/>
      {/* <Filters tracksData={tracks}/> */}
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
         {filteredTracks?.map((trackData) => (
          <Track 
             trackData={trackData}
             tracksData={tracks}
             key={trackData.id}
             />))}
        </div>
      </div>
      </>
    )
}