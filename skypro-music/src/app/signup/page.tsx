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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [usernameDirty, setUsernameDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
  const [usernameError, setUsernameError] = useState(
    "Имя пользователя не может быть пустым"
  );

  const blurHandler = (e: { target: { name: any } }) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
        case "username":
        setUsernameDirty(true);
        break;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    setEmail(e.target.value);
    const re =
      /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  };
  const handleInputPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Пароль не должен быть меньше 8");
      if (!e.target.value) {
        setPasswordError("Пароль не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };
  const handleInputUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    setUsername(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setUsernameError("Имя пользователя не должно быть меньше 3 и больше 8");
      if (!e.target.value) {
        setUsernameError("Поле не может быть пустым");
      }
    } else {
      setUsernameError("");
    }
  };

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signupUser(loginData).then((data) => {
      login(data, loginData);
    });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={classNames(styles.modalFormLogin, styles.input)}>
            <Link href="../">
              <div className={classNames(styles.modalLogo, styles.img)}>
                <Image
                  src="/./img/logo_modal.png"
                  width={366}
                  height={439}
                  alt="logo"
                />
              </div>
            </Link>
            {emailDirty && emailError && (
              <div style={{ color: "red" }}>{emailError}</div>
            )}
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
              onBlur={(e) => blurHandler(e)}
              onChange={handleInputChange}
              value={email}
            />
            {passwordDirty && passwordError && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
            <input
              className={classNames(styles.modalInput, styles.passwardFirst)}
              type="text"
              name="password"
              placeholder="Пароль"
              onBlur={(e) => blurHandler(e)}
              onChange={handleInputPasswordChange}
              value={password}
            />
            {usernameDirty && usernameError && (
              <div style={{ color: "red" }}>{usernameError}</div>
            )}
            <input
              className={classNames(styles.modalInput, styles.passwardDouble)}
              type="text"
              name="username"
              placeholder="Введите имя пользователя"
              onBlur={(e) => blurHandler(e)}
              onChange={handleInputUsernameChange}
              value={username}
            />
            <button onClick={handleSignup} className={styles.modalBtnSignupEnt}>
              <Link href="/">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
