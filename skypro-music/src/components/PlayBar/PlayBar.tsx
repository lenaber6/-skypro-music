import PlayerControls from "../PlayerControls/PlayerControls";
import styles from "./PlayBar.module.css";
import classNames from "classnames";
import TrackPlay from "../TrackPlay/TrackPlay";
import Volume from "../Volume/Volume";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { trackType } from "@/types";

type PlayBarType = {
  track: trackType;
};

export default function PlayBar({ track }: PlayBarType) {
  // const audioRef = useRef<null | HTMLAudioElement>(null);

  // const [currentTime, setCurrentTime] = useState<number>(0);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // const audioRef = useRef(null);

  // const duration = audioRef.current?.duration;

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

  // useEffect(() => {
  //   audioRef.current?.addEventListener("timeupdate", () => setCurrentTime(audioRef.current!.currentTime))
  // }, [])


  // const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (audioRef.current)
  //   audioRef.current.currentTime = Number( event.target.value);
  // };
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        {/* <audio ref={audioRef} src={track.track_file}></audio> */}
        <div className={styles.barPlayerProgress} />
        <div className={styles.barPlayerBlock}>
          <div className={classNames(styles.barPlayer, styles.player)}>
            <PlayerControls />
            <TrackPlay />
          </div>
          <Volume />
        </div>
      </div>
    </div>
  );
}
