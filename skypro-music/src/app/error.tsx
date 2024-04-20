'use client';

import { ErrorType } from '@/types';
import { useEffect } from 'react';

export default function Error({ error, reset }: ErrorType) {
    // if (error instanceof Error) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);
    // }
  return (
    <div>
      <h2>Что-то пошло не так!</h2>
      <button onClick={reset}>Попробовать снова</button>
    </div>
  );
}
// let something: unknown = "Привет"; 
// // Перед использованием нужно проверить тип 
// if (typeof something === "string") { 
//   console.log(something.toUpperCase()); // Теперь это безопасно 
// }