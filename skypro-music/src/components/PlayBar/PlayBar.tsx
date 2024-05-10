"use client";

import styles from "./PlayBar.module.css";
import classNames from "classnames";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import { formatCurrentTimeDuration, formatDuration } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setNextTrack, setPrevTrack } from "@/store/features/playlistSlice";
import { trackType } from "@/types";

// export default function PlayBar(playlist: trackType[]) {
export default function PlayBar() {

  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5); // Начальная громкость установлена на 50%
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const duration = audioRef.current?.duration || 0;

  const dispatch = useAppDispatch();
  
  const handleNextTrackClick = () => {
    dispatch(setNextTrack());
  };
  const handlePrevTrackClick = () => {
    dispatch(setPrevTrack());
  };

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const handleEnded = () => {
//     // Проверяем, не является ли текущий трек последним в плейлисте
//     if (currentTrackIndex < playlist.length - 1) {
//         // Переход к следующему треку
//         setCurrentTrackIndex(currentTrackIndex + 1);
//     } else {
//         // Или начинаем плейлист с начала
//         setCurrentTrackIndex(0);
//     }
// };
  // const togglePlay = () => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.pause();
  //     } else {
  //       audioRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);

  //   }
  // };

  const togglePlay = () => {
    if (audioRef.current) {
      dispatch(setIsPlaying(!isPlaying));
    }
  };
  const toggleLoop = () => {
    if (audioRef.current) {
      if (isLooping) {
        audioRef.current.loop = false;
      } else {
        audioRef.current.loop = true;
      }
    }
    setIsLooping((repeat) => !repeat);
  };

//   // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
// useEffect(() => {
//   const audio = audioRef.current!;
//   audio.src = playlist[currentTrackIndex].track_file;
//   audio.addEventListener('ended', handleEnded);
//   // Воспроизводим новый трек
//   audio.play();
//   return () => {
//       audio.removeEventListener('ended', handleEnded);
//   };
// },[currentTrackIndex, handleEnded, playlist]);

useEffect(() => {
  if(isPlaying) {
    audioRef.current?.play();
  } else {
    audioRef.current?.pause();
  }
}, [isPlaying]);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () =>
      setCurrentTime(audioRef.current!.currentTime)
    );
  }, [audioRef.current]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value); // Преобразовали строку в число
    }
  };
  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newVolume = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // тут меняешь громость. audioRef это реф на тег audio твоего трека
      setVolume(newVolume); // если нужно в стейт положить
    }
  };

  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio
              ref={audioRef}
              src={currentTrack.track_file}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              loop={isLooping}
            ></audio>
            <div className={styles.trackTimeBlock}>
              <div>{formatCurrentTimeDuration(currentTime)}</div>
              <div> / </div>
              <div>{formatDuration(duration)}</div>
            </div>
            <ProgressBar
              max={duration}
              value={currentTime}
              step={0.01}
              onChange={handleSeek}
            />
            <div className={styles.barPlayerBlock}>
              <div className={classNames(styles.barPlayer, styles.player)}>
                <div className={styles.playerControls}>
                  <div onClick={handlePrevTrackClick} className={styles.playerBtnPrev}>
                    <svg className={styles.playerBtnPrevSvg}>
                      <use
                        xlinkHref="/img/icon/sprite.svg#icon-prev"
                        width={15}
                        height={14}
                      />
                    </svg>
                  </div>
                  <div
                    onClick={togglePlay}
                    className={classNames(styles.playerBtnPlay, styles.btn)}
                  >
                    <svg className={styles.playerBtnPlaySvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isPlaying ? "icon-pause" : "icon-play"
                        }`}
                        width={22}
                        height={20}
                      />
                    </svg>
                  </div>
                  <div onClick={handleNextTrackClick} className={styles.playerBtnNext}>
                    <svg className={styles.playerBtnNextSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-next" />
                    </svg>
                  </div>
                  <div
                    onClick={toggleLoop}
                    className={classNames(
                      styles.playerBtnRepeat,
                      styles.btnIcon
                    )}
                  >
                    <svg className={styles.playerBtnRepeatSvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isLooping ? "icon-repeat-active" : "icon-repeat"
                        }`}
                      />
                    </svg>
                  </div>
                  <div
                    className={classNames(
                      styles.playerBtnShuffle,
                      styles.btnIcon
                    )}
                  >
                    <svg className={styles.playerBtnShuffleSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
                    </svg>
                  </div>
                </div>
                <div className={classNames(styles.playerTrackPlay, styles.trackPlay)}>
                <div className={styles.trackPlayContain}>
                  <div className={styles.trackPlayImage}>
                    <svg className={styles.trackPlaySvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                    </svg>
                  </div>
                  <div className={styles.trackPlayAuthor}>
                    <span className={styles.trackPlayAuthorLink}>
                     {currentTrack.name}
                    </span>
                  </div>
                  <div className={styles.trackPlayAlbum}>
                    <span className={styles.trackPlayAlbumLink}>
                    {currentTrack.author}
                    </span>
                  </div>
                </div>
                <div className={styles.trackPlayLikeDislike}>
                  <div className={classNames(styles.trackPlayLike, styles.btnIcon)}>
                    <svg className={styles.trackPlayLikeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                    </svg>
                  </div>
                  <div className={classNames(styles.trackPlayDislike, styles.btnIcon)}>
                    <svg className={styles.trackPlayDislikeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
                    </svg>
                  </div>
                </div>
              </div>
              </div>
              <div className={classNames(styles.barVolumeBlock, styles.volume)}>
                <audio
                  ref={audioRef}
                  src={currentTrack.track_file}
                  controls
                  className={styles.controls}
                ></audio>
                <input
                  className={styles.styledProgressInput}
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                />
                <div className={styles.volumeContent}>
                  <div className={styles.volumeImage}>
                    <svg className={styles.volumeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
                    </svg>
                  </div>
                  <div
                    className={classNames(styles.volumeProgress, styles.btn)}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
