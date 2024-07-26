// import { userType } from "@/types";

const signupUrl = "https://skypro-music-api.skyeng.tech/user/signup/";
const loginUrl = "https://skypro-music-api.skyeng.tech/user/login/";
const tokenUrl = "https://skypro-music-api.skyeng.tech/user/token/";
const updateTokenUrl =
  "https://skypro-music-api.skyeng.tech/user/token/refresh/";

  // Функция регистрации пользователя
export async function signupUser({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  console.log(email, password, username);
  const response = await fetch(signupUrl, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Такой пользователь уже существует");
  }

  return response.json();
}

// //Функция входа пользователя
// export async function loginUser({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) {
//   const response = await fetch(loginUrl, {
//     method: "POST",
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//     headers: {
//       "content-type": "application/json",
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Неправильный логин или пароль");
//   }

//   return response.json();
// }

//   // Функция получения токена

// export async function getToken({
//     email,
//     password,
//   }: {
//     email: string;
//     password: string;
//   }) {
//     const res = await fetch(tokenUrl, {
//       method: "POST",
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     if (!res.ok) {
//       throw new Error("Ошибка при получении данных");
//     }
  
//     return res.json();
//   };

  // Функция обновления токена

  export async function updateToken(token: string) {
    const res = await fetch(updateTokenUrl, {
      method: "POST",
      body: JSON.stringify({
        refresh: token,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Ошибка при получении данных");
    }
  
    return res.json();
  }