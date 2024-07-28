import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { SigninFormType } from "@/types";
const API_URL = "https://skypro-music-api.skyeng.tech";
const userLoginUrl = "https://skypro-music-api.skyeng.tech/user/login/";
const userTokenUrl = "https://skypro-music-api.skyeng.tech/user/token/";

export const fetchUser = async ({ email, password }: SigninFormType) => {
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
};

export async function fetchTokens({ email, password }: SigninFormType) {
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
export async function likeTrack({
  trackId,
  access,
  refresh,
}: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    API_URL + `/catalog/track/${trackId}/favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );
  return res.json();
};

export async function disLikeTrack({
  trackId,
  access,
  refresh,
}: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    API_URL + `/catalog/track/${trackId}/favorite/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );
  return res.json();
}

//Функция получения лайков (новая)

export async function fetchFavouriteTracks({access, refresh}: {access:string; refresh: string}) {
  const res = await fetchWithAuth(API_URL + `/catalog/track/favorite/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  },
  refresh
);
  if (!res.ok) {
    throw new Error(JSON.stringify(res.status));
  }

  const data = await res.json();
  return data;
};

