"use client";

import styles from "./Track.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { trackType } from "@/types";
import { useTrackLikes } from "@/hooks/likes";
import { formatDuration } from "@/utils";

type TrackType = {
  trackData: trackType;
  tracksData: trackType[];
};

export default function Track({ trackData, tracksData }: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const { name, author, album, duration_in_seconds, id } = trackData;
  const isPlayingIcon = currentTrack?.id === id ? isPlaying : false;

  const dispatch = useAppDispatch();
  const { isLiked, handleLike } = useTrackLikes(trackData);
  const user = useAppSelector((state) => state.user.user);

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ trackData, tracksData, isPlaying: true }));
  };

  return (
    <div onClick={handleTrackClick} className={styles.playlistTrack}>
      <div className={styles.trackTitle}>
        <div className={styles.trackTitleImage}>
          {currentTrack?.id === id ? (
            isPlayingIcon ? (
              <svg className={styles.playingDot}></svg>
            ) : (
              <svg className={styles.pauseDot}></svg>
            )
          ) : (
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note" />
            </svg>
          )}
        </div>

        <div className={styles.trackTitleText}>
          <span className={styles.trackTitleLink}>
            {name} <span className={styles.trackTitleSpan} />
          </span>
        </div>
      </div>
      <div className={styles.trackAuthor}>
        <span className={styles.trackAuthorLink}>{author}</span>
      </div>
      <div className={styles.trackAlbum}>
        <span className={styles.trackAlbumLink}>{album}</span>
      </div>
      {user?.email ? (
       <div className={styles.trackLook} onClick={handleLike} >
       <svg className={styles.trackTimeSvg}>
         <use
           xlinkHref={`/img/icon/sprite.svg#${isLiked ? "icon-like-active" : "icon-like"}`}
         />
       </svg>
     <span className={styles.trackTimeText}>{formatDuration(duration_in_seconds)}</span>
   </div> 
      ) : (
        <div onClick={handleLike} >
          <svg className={styles.trackTimeSvg}>
            <use
              xlinkHref="/img/icon/sprite.svg#icon-like"
            />
          </svg>
        <span className={styles.trackTimeText}>{formatDuration(duration_in_seconds)}</span>
      </div>
      )}
    </div>
  );
}
