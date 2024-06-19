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

type TrackType = {
  trackData: trackType;
  tracksData: trackType[];
  isFavourite?: boolean;
};

export default function Track({
  trackData,
  tracksData,
  isFavourite,
}: TrackType) {
  console.log(trackData);
  // const {currentTrack, isPlaying} = useAppSelector((state) => state.playlist);
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const { name, author, album, duration_in_seconds, id } = trackData;
  const isPlayingIcon = currentTrack?.id === id ? isPlaying : false;

  const isCurrentTrack = currentTrack ? currentTrack.id === id : false;

  const dispatch = useAppDispatch();

  const { user, token } = useUser();

  const isLikedByUser =
    isFavourite || !!trackData.stared_user.find((arg) => arg.id === user?.id);

  const [isLiked, setIsLiked] = useState(isLikedByUser);

  useEffect(() => {
    const isLikedByUser =
      isFavourite || !!trackData.stared_user.find((arg) => arg.id === user?.id);
    setIsLiked(isLikedByUser);
  }, [isFavourite, trackData, user?.id]);

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ trackData, tracksData, isPlaying: true }));
  };

  const handleLikeTrack = (e: React.MouseEvent<SVGUseElement>) => {
    e.stopPropagation();
    if (user?.email) {
      if (!isLiked) {
        postFavouriteTracks(trackData.id, token?.access!)
          .then((data) => {
            if (data.detail === "An error has occurred") {
              throw new Error("Лайк уже поставлен");
            }
            setIsLiked((prev) => !prev);
            if (currentTrack) {
              dispatch(
                setCurrentTrack({
                  trackData: { ...currentTrack, isLiked: !isLiked },
                  tracksData,
                  isPlaying: false,
                })
              );
            }
          })
          .catch((error) => {
            if (error.message === "401" && user) {
              updateToken(token?.refresh!).then((data) => {
                postFavouriteTracks(trackData.id, data.access).then((data) => {
                  if (data.detail === "An error has occurred") {
                    throw new Error("Лайк уже поставлен");
                  }
                  setIsLiked((prev) => !prev);
                  if (currentTrack) {
                    dispatch(
                      setCurrentTrack({
                        trackData: { ...currentTrack, isLiked: !isLiked },
                        tracksData,
                        isPlaying: false,
                      })
                    );
                  }
                });
              });
            } else {
              console.log(error);
            }
          });
      } else {
        deleteFavouriteTracks(trackData.id, token?.access!)
          .then((data) => {
            if (data.detail === "An error has occurred") {
              throw new Error("Лайк уже убран");
            }
            setIsLiked((prev) => !prev);
            if (currentTrack) {
              dispatch(
                setCurrentTrack({
                  trackData: { ...currentTrack, isLiked: !isLiked },
                  tracksData,
                  isPlaying: false,
                })
              );
            }
          })
          .catch((error) => {
            if (error.message === "401" && user) {
              updateToken(token?.refresh!).then((data) => {
                deleteFavouriteTracks(trackData.id, data.access).then(
                  (data) => {
                    if (data.detail === "An error has occurred") {
                      throw new Error("Лайк уже убран");
                    }
                    setIsLiked((prev) => !prev);
                    if (currentTrack) {
                      dispatch(
                        setCurrentTrack({
                          trackData: { ...currentTrack, isLiked: !isLiked },
                          tracksData,
                          isPlaying: false,
                        })
                      );
                    }
                  }
                );
              });
            } else {
              console.log(error);
            }
          });
      }
    } else {
      alert("Для добавления трека, пожалуйста, авторизуйтесь");
    }
  };

  return (
    <div onClick={handleTrackClick} className={styles.playlistTrack}>
      <div className={styles.trackTitle}>
        <div className={styles.trackTitleImage}>
          {/* { isCurrentTrack ? ( */}
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
      <div className={styles.trackTime}>
        <svg className={styles.trackTimeSvg}>
          <use
            onClick={handleLikeTrack}
            className={classNames(
              styles.likeButton,
              isLiked && styles.activeLike
            )}
            xlinkHref="/img/icon/sprite.svg#icon-like"
          />
        </svg>
        <span className={styles.trackTimeText}>{duration_in_seconds}</span>
      </div>
    </div>
  );
}
