'use client';

import styles from "./PlayBar.module.css";
import classNames from "classnames";
import TrackPlay from "./TrackPlay/TrackPlay";
import Volume from "./VolumeBar/VolumeBar";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { trackType } from "@/types";
import ProgressBar from "./ProgressBar/ProgressBar";

type PlayBarType = {
  track: trackType;
};

export default function PlayBar({ track }: PlayBarType) {
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const duration = audioRef.current?.duration;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
audioRef.current.loop = true;
    } 
  };
  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () => setCurrentTime(audioRef.current!.currentTime))
  }, [])


  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number( event.target.value))
    audioRef.current.currentTime = Number( event.target.value); // Преобразовали строку в число
  }
};
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio ref={audioRef} src={track.track_file}></audio>
        <ProgressBar 
        max={duration}
        value={currentTime}
        step={0.01}
        onChange={handleSeek}
        />
        <div className={styles.barPlayerBlock}>
          <div className={classNames(styles.barPlayer, styles.player)}>
          <div className={styles.playerControls}>
      <div className={styles.playerBtnPrev}>
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-prev" width={15} height={14}/>
        </svg>
      </div>
      <div onClick={togglePlay}  className={classNames(styles.playerBtnPlay, styles.btn)}>
        <svg className={styles.playerBtnPlaySvg}>
          <use xlinkHref={`img/icon/sprite.svg#${isPlaying ? "icon-pause" : "icon-play"}`} width={22} height={20}/>
        </svg>
      </div>
      <div className={styles.playerBtnNext}>
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-next" />
        </svg>
      </div>
      <div onClick={toggleLoop} className={classNames(styles.playerBtnRepeat, styles.btnIcon)}>
        <svg className={styles.playerBtnRepeatSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
        </svg>
      </div>
      <div className={classNames(styles.playerBtnShuffle, styles.btnIcon)}>
        <svg className={styles.playerBtnShuffleSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
        </svg>
      </div>
    </div>
            <TrackPlay />
          </div>
          <Volume track={{
            id: 0,
            name: "",
            author: "",
            release_date: "",
            genre: "",
            duration_in_seconds: 0,
            album: "",
            logo: null,
            track_file: "",
            stared_user: []
          }} />
        </div>
      </div>
    </div>
  );
}
