"use client";

import { deleteFavouriteTracks, postFavouriteTracks } from "@/api/tracks";
import styles from "./Track.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useUser } from "@/hooks/useUser";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { trackType } from "@/types";
import { useEffect, useState } from "react";
import { updateToken } from "@/api/users";
import classNames from "classnames";
import { useTrackLikes } from "@/hooks/likes";

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
  // const { user, token } = useUser();

  // const isLikedByUser =
  //   isFavourite || !!trackData.stared_user?.find((arg) => arg.id === user?.id);

  // const [isLiked, setIsLiked] = useState(isLikedByUser);

  // useEffect(() => {
  //   if (user) {
  //     const isLikedByUser =
  //     isFavourite || !!trackData.stared_user.find((arg) => arg.id === user.id);
  //   setIsLiked(isLikedByUser);
  //   }}, [isFavourite, trackData, user]);

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ trackData, tracksData, isPlaying: true }));
  };

  // const handleLikeTrack = (e: React.MouseEvent<SVGUseElement>) => {
  //   e.stopPropagation();
  //   if (user?.email) {
  //     if (!isLiked) {
  //       postFavouriteTracks(trackData.id, token?.access!)
  //         .then((data) => {
  //           if (data.detail === "An error has occurred") {
  //             throw new Error("Лайк уже поставлен");
  //           }
  //           setIsLiked((prev) => !prev);
  //           if (currentTrack) {
  //             dispatch(
  //               setCurrentTrack({
  //                 trackData: { ...currentTrack, isLiked: !isLiked },
  //                 tracksData,
  //                 isPlaying: false,
  //               })
  //             );
  //           }
  //         })
  //         .catch((error) => {
  //           if (error.message === "401" && user) {
  //             updateToken(token?.refresh!).then((data) => {
  //               postFavouriteTracks(trackData.id, data.access).then((data) => {
  //                 if (data.detail === "An error has occurred") {
  //                   throw new Error("Лайк уже поставлен");
  //                 }
  //                 setIsLiked((prev) => !prev);
  //                 if (currentTrack) {
  //                   dispatch(
  //                     setCurrentTrack({
  //                       trackData: { ...currentTrack, isLiked: !isLiked },
  //                       tracksData,
  //                       isPlaying: false,
  //                     })
  //                   );
  //                 }
  //               });
  //             });
  //           } else {
  //             console.log(error);
  //           }
  //         });
  //     } else {
  //       deleteFavouriteTracks(trackData.id, token?.access!)
  //         .then((data) => {
  //           if (data.detail === "An error has occurred") {
  //             throw new Error("Лайк уже убран");
  //           }
  //           setIsLiked((prev) => !prev);
  //           if (currentTrack) {
  //             dispatch(
  //               setCurrentTrack({
  //                 trackData: { ...currentTrack, isLiked: !isLiked },
  //                 tracksData,
  //                 isPlaying: false,
  //               })
  //             );
  //           }
  //         })
  //         .catch((error) => {
  //           if (error.message === "401" && user) {
  //             updateToken(token?.refresh!).then((data) => {
  //               deleteFavouriteTracks(trackData.id, data.access).then(
  //                 (data) => {
  //                   if (data.detail === "An error has occurred") {
  //                     throw new Error("Лайк уже убран");
  //                   }
  //                   setIsLiked((prev) => !prev);
  //                   if (currentTrack) {
  //                     dispatch(
  //                       setCurrentTrack({
  //                         trackData: { ...currentTrack, isLiked: !isLiked },
  //                         tracksData,
  //                         isPlaying: false,
  //                       })
  //                     );
  //                   }
  //                 }
  //               );
  //             });
  //           } else {
  //             console.log(error);
  //           }
  //         });
  //     }
  //   } else {
  //     alert("Для добавления трека, пожалуйста, авторизуйтесь");
  //   }
  // };

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
      <div onClick={handleLike} >
          <svg className={styles.trackTimeSvg}>
            <use
              // className={classNames(
              //   styles.likeButton,
              //   // isLiked && styles.activeLike
              // )}
              xlinkHref={`/img/icon/sprite.svg#${isLiked ? "icon-like-active" : "icon-like"}`}
            />
          </svg>
        <span className={styles.trackTimeText}>{duration_in_seconds}</span>
      </div>
    </div>
  );
}
