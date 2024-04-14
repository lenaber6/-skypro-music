import styles from "./Volume.module.css";
import classNames from "classnames";

export default function Volume() {
    return(
        <div className={classNames(styles.barVolumeBlock, styles.volume)}>
        <div className={styles.volumeContent}>
          <div className={styles.volumeImage}>
            <svg className={styles.volumeSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-volume" />
            </svg>
          </div>
          <div className={classNames(styles.volumeProgress, styles.btn)}>
            <input
              className={classNames(styles.volumeProgressLine, styles.btn)}
              type="range"
              name="range"
            />
          </div>
        </div>
      </div>
    )
}