import Image from "next/image";
import classNames from "classnames";
import styles from "./Sidebar.module.css";
import Link from "next/link";

export default function Sidebar() {
    return(
        <div className={classNames(styles.mainSidebar, styles.sidebar)}>
        <div className={styles.sidebarPersonal}>
          <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
          <div className={styles.sidebarIcon}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout" />
            </svg>
          </div>
        </div>
        <div className={styles.sidebarBlock}>
          <div className={styles.sidebarList}>
            <div className={styles.sidebarItem}>
              <Link className={styles.sidebarLink} href="#">
                <Image
                  className={styles.sidebarImg}
                  src="/img/playlist01.png"
                  alt="day's playlist"
                  width={250}
                  height={150}
                />
              </Link>
            </div>
            <div className={styles.sidebarItem}>
              <Link className={styles.sidebarLink} href="#">
                <Image
                  className={styles.sidebarImg}
                  src="/img/playlist02.png"
                  alt="day's playlist"
                  width={250}
                  height={150}
                />
              </Link>
            </div>
            <div className={styles.sidebarItem}>
              <Link className={styles.sidebarLink} href="#">
                <Image
                  className={styles.sidebarImg}
                  src="/img/playlist03.png"
                  alt="day's playlist"
                  width={250}
                  height={150}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}