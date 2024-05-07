// Здесь храниться логика и данные для управления аутентификацией пользователя в нашем приложении.
// В этом файле мы будем использовать функционал, предоставляемый Redux Toolkit, чтобы создать срез состояния.
// CreatSlice - встроенная функция, которая помогает создать слайс.
// PayloadAction - некий встроенный тип, который обозначает action
import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType =  { // Тип среза состояния
  currentTrack: null | trackType;       // Сохраним в состояние текущий трек в виде объекта
  playlist: trackType[],
  shuffledPlaylist: trackType[],
}

const initialState: PlaylistStateType = { // мы определяем начальное состояние initialState
  currentTrack: null,  // в котором authState указывает на статус аутентификации пользователя.
  playlist: [],
  shuffledPlaylist: [],
};

const playlistSlice = createSlice({ // С помощью функции createSlice мы создаем срез состояния (плэйлиста) с именем auth,
  name: "playlist",
  initialState,  // ключ и значение initialState совпадают (см. выше)
  // включающий в себя редьюсеры для обработки действий, таких как setAuthState,
  // позволяющий обновлять состояние аутентификации.
  reducers: {   // редьюсер- функция для обработки среза состояния. 
    // reducer принимает только один параметр или объект
    setCurrentTrack: (state, action: PayloadAction<{trackData:trackType, tracksData: trackType[]}>) => { // Устанавливаем текущий трек и выводим его в Прогрессбар
      // 1й параметр - state- актуальное состояние на текущий момент
      // 2й параметр - action - из него мы получаем данные (это в action.payload ниже),
      // которые будем передавать при вызове этой функции. 
      state.currentTrack = action.payload.trackData; // установка текущего трека в глобальное состояние
      state.playlist = action.payload.tracksData; // установка текущего плэйлиста в глобальное состояние
      state.shuffledPlaylist = [...action.payload.tracksData].sort(() => 0.5 - Math.random());
      // чтобы поменять состояние, н. написать state.новое состояние
    },
  },
});

export const { setCurrentTrack } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;