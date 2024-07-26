import { SigninFormType } from "@/types";

const userLoginUrl = "https://skypro-music-api.skyeng.tech/user/login/";
const userTokenUrl = "https://skypro-music-api.skyeng.tech/user/token/";


export const fetchUser = async({email, password}: SigninFormType) => {
const response = await fetch(userLoginUrl, {
    method: "POST",
    body: JSON.stringify({
     email,
     password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 400) {
    throw new Error("Неверный логин или пароль");
  } else if (!response.ok) {
    throw new Error("Заполните поля: логин и пароль");
  }
const responseData = await response.json();
  return responseData;
}

export async function fetchTokens({email, password}: SigninFormType) {
    const response = await fetch(userTokenUrl, {
        method: "POST",
        body: JSON.stringify({
         email,
         password,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 400) {
        throw new Error("Неверный логин или пароль");
      } else if (!response.ok) {
        throw new Error("Заполните поля: логин и пароль");
      }
    const responseData = await response.json();
      return responseData;
    }

