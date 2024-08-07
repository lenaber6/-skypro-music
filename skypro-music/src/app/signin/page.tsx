"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./signin.module.css"
import classNames from "classnames";
import { ChangeEvent, useState } from "react";
import { loginUser } from "@/api/users";
import { useUser } from "@/hooks/useUser";

export default function SigninPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { login } = useUser();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginUser(loginData).then((data) => {
      login(data, loginData);
    });
  };
    return(
  <div className={styles.wrapper}>
    <div className={styles.containerEnter}>
      <div className={styles.modalBlock}>
        <form className={classNames(styles.modalFormLogin, styles.input)} action="#">
          <Link href="../">
            <div className={classNames(styles.modalLogo, styles.img)}>
              <Image src="/./img/logo_modal.png " width={366} height={439} alt="logo" />
            </div>
          </Link>
          <input
            className={classNames(styles.modalInput, styles.login)}
            type="text"
            name="email"
            placeholder="Почта"
            onChange={handleInputChange}
          />
          <input
            className={classNames(styles.modalInput, styles.passward)}
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={handleInputChange}
          />
          <button onClick={handleLogin} className={styles.modalBtnEnter}>
            <Link href="/">Войти</Link>
          </button>
          <button className={styles.modalBtnSignup}>
            <Link href="/signup">Зарегистрироваться</Link>
          </button>
        </form>
      </div>
    </div>
  </div>
    );
}

