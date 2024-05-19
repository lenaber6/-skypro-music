// Хуки лучше вынести отдельно, чтобы были подсказки по типам в дальнейшей работе.
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore } from "./store/store";
import { RootState } from "./store/store";

// Хуки useAppDispatch, useAppSelector и useAppStore позволяют использовать функции useDispatch, useSelector и useStore из библиотеки react-redux с типизацией.
export const useAppDispatch: () => AppDispatch = useDispatch;
// useAppSelector нужен, чтобы получать данные из хранилища.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;