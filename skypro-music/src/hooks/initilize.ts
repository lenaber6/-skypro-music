import { useAppDispatch, useAppSelector } from "@/hooks";
import { getFavouriteTracks } from "@/store/features/playlistSlice";
import { access } from "fs";
import { useEffect } from "react";

// Хук для инициализации лайкнутых треков, с пом. кот. мы "бегаем" в state и
// и спрашиваем: есть токены? - есть!-делаем запрос на данные
// Хук, который вызывает получение избранных треков
// Эта ф-я запросит избранные треки и сохранит их в state
export function useInitializeLikedTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);
  useEffect(() => {
    if (tokens.access && tokens.refresh) {
      dispatch(
        getFavouriteTracks({ access: tokens.access, refresh: tokens.refresh })
      );
    }
  }, [tokens, dispatch]);
}
