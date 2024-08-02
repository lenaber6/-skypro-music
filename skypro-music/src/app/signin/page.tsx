"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./signin.module.css"
import classNames from "classnames";
import { ChangeEvent, SetStateAction, useState } from "react";
// import { loginUser } from "@/api/users";
// import { useUser } from "@/hooks/useUser";
import { getTokens, getUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/hooks";
import { useRouter } from "next/navigation";

type SigninPageType = {
  params: {
    email: string;
    password: string | number;
  };
};

export default function SigninPage({params}: SigninPageType) {
const [formData, setFormData] = useState({ email: "", password: "" });
const dispatch = useAppDispatch();
const router = useRouter();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [emailDirty, setEmailDirty] = useState(false);
const [passwordDirty, setPasswordDirty] = useState(false);
const [emailError, setEmailError] = useState("Email не может быть пустым");
const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");

const blurHandler = (e: { target: { name: any; }; }) => {
  switch (e.target.name) {
    case 'email':
      setEmailDirty(true);
      break;
      case 'password':
        setPasswordDirty(true);
      break;
  }
}
// Функция изменения данных при введении неких данных в разные поля ввода инпутов
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  // name - это атрибут полей инпутов: email или password, value - это то, что в этом поле хранилось.
  // e- объект события, target- цель события
  const {name, value} = e.target;
  // setFormData - функция для установки в состояние данных наших полей ввода
  setFormData((prevFormData) => {
    return {
      // возвращаем новое состояние, которое будет установлено в formData
      // старые поля не меняем, их сохраняем, 
      ...prevFormData,
      // в [] - так как мы хотим указать свойство через переменную
      // изменения данных того поля, где пользователь ввел свои данные
      [name]: value,
    };
  });
  setEmail(e.target.value);
  const re = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/
  if (!re.test(String(e.target.value).toLowerCase())) {
    setEmailError('Некорректный email')
  } else {
    setEmailError("");
  }
}

function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
  const {name, value} = e.target;
  setFormData((prevFormData) => {
    return {
      ...prevFormData,
      [name]: value,
    };
  });
  setPassword(e.target.value)
  if (e.target.value.length < 8) {
    setPasswordError("Пароль не должен быть меньше 8")
    if(!e.target.value) {
    setPasswordError("Пароль не может быть пустым")
    }
  } else {
    setPasswordError("");
  }
}
// Функция отправки данных в приложение, срабатывает при нажатии на кнопку
async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  try {
    await Promise.all([
      // мы вызываем здесь юзера и токены
      // метод unwrap возвращает результат или выбрасывает ошибку
      dispatch(getTokens(formData)).unwrap(),
      dispatch(getUser(formData)).unwrap(),
    ]);
    //убрать Link, навигация идет через встроенный хук useRouter(при импорте обязательно из next/navigate!!!!!)
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};


  // const [loginData, setLoginData] = useState({ email: "", password: "" });
  // const { login } = useUser();

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setLoginData({
  //     ...loginData,
  //     [name]: value,
  //   });
  // };

  // const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   loginUser(loginData).then((data) => {
  //     login(data, loginData);
  //   });
  // };
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
          {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
          <input
            className={classNames(styles.modalInput, styles.login)}
            type="text"
            name="email"
            placeholder="Почта"
            onBlur={e => blurHandler(e)}
            onChange={handleChange}
            value={formData.email}
          />
          {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
          <input
            className={classNames(styles.modalInput, styles.passward)}
            type="password"
            name="password"
            placeholder="Пароль"
            onBlur={e => blurHandler(e)}
            onChange={handlePasswordChange}
            value={formData.password}
          />
          <button onClick={handleSubmit} className={styles.modalBtnEnter}>
            Войти
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

