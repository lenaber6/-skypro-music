"use client";

import styles from "./Track.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { trackType } from "@/types";

type TrackType = {
  trackData: trackType,
  tracksData: trackType [],
};

export default function Track({trackData, tracksData}: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
 
  const {name, author, album, duration_in_seconds, id} = trackData;
  const isPlaying = currentTrack ? currentTrack.id === id: false;
  const dispatch = useAppDispatch(); 

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({trackData, tracksData}));
  }

  return(
    
        <div    className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div onClick={handleTrackClick} className={styles.trackTitleImage}>
            {isPlaying ? 
                <svg className={styles.playingDot}></svg>
                 :  
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