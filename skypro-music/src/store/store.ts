// В этом файле будет сконфигурировано хранилище Redux со слайсами.

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playlistReducer } from "./features/playlistSlice";
import { userReducer } from "./features/userSlice";

// Функция makeStore создает и возвращает хранилище Redux с помощью функции configureStore.
export const makeStore = () => {
  return configureStore({ // Здесь configureStore помогает нам настроить хранилище, указывая редьюсеры для каждой части состояния. 
    // Мы передаем объект настроек, в котором свойство reducer содержит корневой редюсер, объединяющий все редюсеры нашего приложения.
    reducer: combineReducers({
      playlist: playlistReducer, // мы добавляем authReducer под ключом auth в глобальное состояние.
      user: userReducer,
    }),
  });
};

// Тип AppStore представляет собой тип нашего хранилища Redux, который возвращает функция makeStore.
export type AppStore = ReturnType<typeof makeStore>;

// Тип RootState представляет собой тип состояния нашего приложения, который возвращает функция getState хранилища Redux.
export type RootState = ReturnType<AppStore["getState"]>;

// Тип AppDispatch представляет собой тип функции диспетчера, который возвращает функция dispatch хранилища Redux.
export type AppDispatch = AppStore["dispatch"];

