'use client';

import styles from "./VolumeBar.module.css";
import classNames from "classnames";
import VolumePlayer from "./VolumePlayer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { trackType } from "@/types";

type VolumeType = {
  track: trackType;
};

export default function Volume({ track }: VolumeType) {
  const audioRef = useRef<null | HTMLAudioElement>(null);
    const [volume, setVolume] = useState<number>(0.5); // Начальная громкость установлена на 50%
  
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
      }
    }, [volume]);

    const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            setVolume(Number( event.target.value))
        audioRef.current.volume = Number( event.target.value); // Преобразовали строку в число
      }
    };
  return (
    <div className={classNames(styles.barVolumeBlock, styles.volume)}>
       <audio
            ref={audioRef}
            src={track.track_file}
            controls
            className={styles.controls}
          ></audio>
      <VolumePlayer
      max={1}
      value={volume}
      step={0.01}
      onChange={handleVolume} />
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles.btn)}>
        </div>
      </div>
    </div>
  );
}
