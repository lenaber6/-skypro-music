import { trackType } from "@/types";

const apiUrl = 'https://skypro-music-api.skyeng.tech/catalog/track/all/';
const apiCategoryUrl = 'https://skypro-music-api.skyeng.tech/catalog/selection/';
const apiUrlFavoriteTracks =
  "https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/";
  const apiUrlTrack = "https://skypro-music-api.skyeng.tech/catalog/track/";

//Функция для получения всех треков основного плэйлиста

export async function getTracks() {
    const res = await fetch(apiUrl, {
      method: "GET",
      cache: "no-cache",
    });
  
    if (!res.ok) {
      throw new Error('Ошибка при получении данных');
    }
    const data = await res.json();
    return data;
  };

// Функция для получения списков треков по категориям

  export async function getCategoryTracks(id: string) {
    const res = await fetch(apiCategoryUrl + id, {
      method: "GET",
      cache: "no-cache",
    });
  
    if (!res.ok) {
      throw new Error('Ошибка при получении данных');
    }
  const data = await res.json();
    return data.items;
  };

  //Функция постановки лайков

  export async function postFavouriteTracks(id: number, token: string) {
    const res = await fetch(apiUrlTrack + id + "/favorite/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(JSON.stringify(res.status));
    }
  
    return res.json();
  };

  //Функция получения лайков

  export async function getFavouriteTracks(token: string) {
    const res = await fetch(apiUrlFavoriteTracks, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(JSON.stringify(res.status));
    }
  
    const data = await res.json();
    return data;
  };

  //Функция удаления лайков
  
  export async function deleteFavouriteTracks(id: number, token: string) {
    const res = await fetch(apiUrlTrack + id + "/favorite/", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(JSON.stringify(res.status));
    }
  
    return res.json();
  }
  
  
  
  
