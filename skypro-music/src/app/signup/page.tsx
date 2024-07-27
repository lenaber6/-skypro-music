"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./signup.module.css";
import classNames from "classnames";
import { ChangeEvent, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { signupUser } from "@/api/users";

export default function SignupPage() {
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { login } = useUser(); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signupUser(loginData).then((data) => {
      login(data, loginData);
    });
  };
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
            name="email"
            placeholder="Почта"
            onChange={handleInputChange}
          />
          <input
            className={classNames(styles.modalInput, styles.passwardFirst)}
            type="text"
            name="password"
            placeholder="Пароль"
            onChange={handleInputChange}
          />
          <input
            className={classNames(styles.modalInput, styles.passwardDouble)}
            type="text"
            name="username"
            placeholder="Введите имя пользователя"
            onChange={handleInputChange}
          />
          <button onClick={handleSignup} className={styles.modalBtnSignupEnt}>
            <Link href="/">Зарегистрироваться</Link>
          </button>
        </form>
      </div>
    </div>
  </div>

    )
}