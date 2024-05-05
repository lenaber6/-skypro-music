// В этом файле мы создаём компонент ReduxProvider, который будет использоваться для 
// интеграции нашего хранилища Redux с приложением Next.js. Компонент ReduxProvider
 // оборачивает дочерние компоненты в провайдер Redux, делая состояние доступным для всего приложения.
"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";

type ReduxProviderType = {
  children: React.ReactNode;
}
export default function ReduxProvider({children}: ReduxProviderType)

// export default function ReduxProvider({
//   children,
// }: {
//   children: React.ReactNode;
// })
 {
  const storeRef = useRef<AppStore>(); // Мы используем хук useRef для создания ссылки на 
  if (!storeRef.current) {       // наше хранилище, чтобы избежать его повторной инициализации 
    storeRef.current = makeStore(); // при каждом рендере компонента. Это позволяет сохранить 
  }                                 // состояние хранилища при переходах между страницами или компонентами.
// Для подключения хранилища, используем компонент Provider из пакета react-redux, 
//передавая ему текущее хранилище как проп. Такой подход обеспечивает доступность 
//состояния и функции диспетчера (dispatch) во всем приложении через хуки useSelector
// и useDispatch.
  return <Provider store={storeRef.current}>{children}</Provider>;
}