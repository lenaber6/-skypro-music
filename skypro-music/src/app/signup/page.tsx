import Image from "next/image";
import Link from "next/link";
import styles from "./signup.module.css";
import classNames from "classnames";

export default function SignupPage() {
    return(
       
  <div className={styles.wrapper}>
    <div className={styles.containerSignup}>
      <div className={styles.modalBlock}>
        <form className={classNames(styles.modalFormLogin, styles.input)}>
          <Link href="../">
            <div className={classNames(styles.modalLogo, styles.img)}>
              <Image src="/./img/logo_modal.png" width={366} height={439} alt="logo" />
            </div>
          </Link>
          <input
            className={classNames(styles.modalInput, styles.login)}
            type="text"
            name="login"
            placeholder="Почта"
          />
          <input
            className={classNames(styles.modalInput, styles.passwardFirst)}
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <input
            className={classNames(styles.modalInput, styles.passwardDouble)}
            type="password"
            name="password"
            placeholder="Повторите пароль"
          />
          <button className={styles.modalBtnSignupEnt}>
            <Link href="/">Зарегистрироваться</Link>
          </button>
        </form>
      </div>
    </div>
  </div>

    )
}