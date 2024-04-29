'use client';

import { ErrorType } from '@/types';
import classNames from 'classnames';
import { useEffect } from 'react';
import styles from "./error.module.css";
import Image from 'next/image';

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);
    
  return (
    <div className={classNames(styles.wrapper, styles.container)}>
       <h2 className={styles.scaryText}>Что-то пошло не так!</h2>
      <Image 
       className={styles.sidebarImg}
       src="/img/joker zombie face.png"
       alt="scary face"
       width={250}
       height={150}/>
     
      <button className={classNames(styles.errorButton, styles.btnText)} onClick={reset}>Попробовать снова</button>
    </div>
  );
}
// let something: unknown = "Привет"; 
// // Перед использованием нужно проверить тип 
// if (typeof something === "string") { 
//   console.log(something.toUpperCase()); // Теперь это безопасно 
// }