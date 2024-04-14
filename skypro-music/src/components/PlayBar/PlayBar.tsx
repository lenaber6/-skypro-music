import PlayerControls from "../PlayerControls/PlayerControls";
import styles from "./PlayBar.module.css";
import classNames from "classnames";
import TrackPlay from "../TrackPlay/TrackPlay";
import Volume from "../Volume/Volume";

export default function PlayBar() {
    return(
        <div className={styles.bar}>
        <div className={styles.barContent}>
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
    )
}