"use client";

import classNames from "classnames";
import styles from "./PlayList.module.css";
import Track from "./Track/Track";
import { trackType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { setInitialTracks } from "@/store/features/playlistSlice";

  export default function PlayList({ tracks, isFavourite }: { tracks: trackType[], isFavourite?: boolean }) {
    console.log(tracks);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );
console.log(filteredTracks);


  useEffect(() => {
    dispatch(setInitialTracks({ initialTracks: tracks }));
    setIsLoading(false);
  }, [dispatch, tracks]);
  return (
    <>
      <div
        className={classNames(
          styles.centerblockContent,
          styles.contentPlaylist
        )}
      >
        {isLoading ? (
          "Идёт загрузка треков..."
        ) : (
          <><div className={classNames(styles.contentTitle, styles.playlistTitle)}>
              <div className={classNames(styles.playlistTitleCol, styles.col01)}>
                Трек
              </div>
              <div className={classNames(styles.playlistTitleCol, styles.col02)}>
                Исполнитель
              </div>
              <div className={classNames(styles.playlistTitleCol, styles.col03)}>
                Альбом
              </div>
              <div className={classNames(styles.playlistTitleCol, styles.col04)}>
                <svg className={styles.playlistTitleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-watch" />
                </svg>
              </div>
            </div><div className={classNames(styles.contentPlaylist, styles.playlist)}>
                {filteredTracks?.length === 0
                  ? "Нет треков, соответствующих параметрам поиска"
                  : ""}

                {filteredTracks?.map((trackData) => (
                  <Track
                    trackData={trackData}
                    tracksData={tracks}
                    key={trackData.id}
                    isFavourite={isFavourite} />
                ))}
              </div></>
        )}
       
      </div>
    </>
  );
}
