"use client";

import Image from "next/image";
import classNames from "classnames";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/store/features/userSlice";
import { useInitializeLikedTracks } from "@/hooks/initilize";

export default function Sidebar() {
  const user = useAppSelector((state) => state.user.user);
  useInitializeLikedTracks();
  const dispatch = useAppDispatch();

  return (
    <div className={classNames(styles.mainSidebar, styles.sidebar)}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>{user?.username}</p>
        <div onClick={() => dispatch(logout())} className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/1">
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
            <Link className={styles.sidebarLink} href="/tracks/category/2">
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
            <Link className={styles.sidebarLink} href="/tracks/category/3">
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
  );
}
