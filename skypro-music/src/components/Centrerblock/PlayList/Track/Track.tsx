"use client";

import { useRef, useState } from "react";
import styles from "./Track.module.css";
import { useAppDispatch } from "@/hooks";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { trackType } from "@/types";

type TrackType = {
  trackData: trackType,
  tracksData: trackType [],
};

export default function Track({trackData, tracksData}: TrackType) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const toggleActiveTrack = () => {
    if (audioRef.current) {
      if (isPlaying) {
        return;
      }
    }
    setIsPlaying((prev) => !prev);
  };
  const {name, author, album, duration_in_seconds} = trackData;
  const dispatch = useAppDispatch(); 
  return(
        <div   onClick={() => dispatch(setCurrentTrack(trackData))} className={styles.playlistItem}>

        <div onClick={toggleActiveTrack} className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
               {isPlaying
                ? <svg className={styles.playingDot}></svg> :  
                <svg className={styles.trackTitleSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-note" />
              </svg>
               } 
            </div>
            <div className={styles.trackTitleText}>
              <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
              </span>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <span className={styles.trackAuthorLink} >
            {author}
            </span>
          </div>
          <div className={styles.trackAlbum}>
            <span className={styles.trackAlbumLink} >
            {album}
            </span>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-like" />
            </svg>
            <span className={styles.trackTimeText}>{duration_in_seconds}</span>
          </div>
        </div>
      </div>
    )
}