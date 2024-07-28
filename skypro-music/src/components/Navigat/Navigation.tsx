"use client";

import Image from "next/image";
import styles from "./Navigation.module.css";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUser, logout } from "@/store/features/userSlice";

export default function Navigation() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // const {user} = useUser();
  const user = useAppSelector((state) => state.user.user);
  
  const dispatch = useAppDispatch();
  return (
    <nav className={classNames(styles.mainNav, styles.nav)}>
      <Link href={"/"}>
      <div className={classNames(styles.navLogo, styles.logo)}>
        <Image
          alt="Логотип:Скайпро.Музыка"
          width={113}
          height={17}
          className={styles.logoImage}
          src="/img/logo.png"
        />
      </div>
      </Link>
      <div
        onClick={() => setIsOpened((prev) => !prev)}
        className={classNames(styles.navBurger, styles.burger)}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpened ? (
        <div className={classNames(styles.navMenu, styles.menu)}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/tracks/favorite" className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>
            {!user?.email ? (
              <li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li>
            ) : (
              <li onClick={() => dispatch(logout())} className={styles.menuItem}>
              <Link  href="/" className={styles.menuLink}>
                Выйти
              </Link>
            </li>
            )}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
