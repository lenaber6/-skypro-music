import Image from "next/image";
import styles from "./Navigation.module.css";
import classNames from "classnames";
import Link from "next/link";

export default function Navigation() {
    return(
        <nav className={classNames(styles.mainNav, styles.nav)}>
        <div className={classNames(styles.navLogo, styles.logo)}>
          <Image alt="Логотип:Скайпро.Музыка" width={113} height={17} className={styles.logoImage} src="/img/logo.png" />
        </div>
        <div className={classNames(styles.navBurger, styles.burger)}>
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </div>
        <div className={classNames(styles.navMenu , styles.menu)}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="#" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="#" className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}