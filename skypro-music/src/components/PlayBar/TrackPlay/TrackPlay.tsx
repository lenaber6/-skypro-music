import Link from "next/link";
import styles from "./TrackPlay.module.css";
import classNames from "classnames";

export default function TrackPlay() {
    return(
        <div className={classNames(styles.playerTrackPlay, styles.trackPlay)}>
                <div className={styles.trackPlayContain}>
                  <div className={styles.trackPlayImage}>
                    <svg className={styles.trackPlaySvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-note" />
                    </svg>
                  </div>
                  <div className={styles.trackPlayAuthor}>
                    <Link className={styles.trackPlayAuthorLink} href="//">
                      Ты та...
                    </Link>
                  </div>
                  <div className={styles.trackPlayAlbum}>
                    <Link className={styles.trackPlayAlbumLink} href="//">
                      Баста
                    </Link>
                  </div>
                </div>
                <div className={styles.trackPlayLikeDis}>
                  <div className={classNames(styles.trackPlayLike, styles.btnIcon)}>
                    <svg className={styles.trackPlayLikeSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-like" />
                    </svg>
                  </div>
                  <div className={classNames(styles.trackPlayDislike, styles.btnIcon)}>
                    <svg className={styles.trackPlayDislikeSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                    </svg>
                  </div>
                </div>
              </div>
    )
}