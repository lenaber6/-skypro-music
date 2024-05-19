import styles from "./Search.module.css";
import classNames from "classnames";

export default  function Search() {

    return(
      <>
            <div className={classNames(styles.centerblockSearch, styles.search)}>
              <svg className={styles.searchSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-search" />
              </svg>
              <input
                className={styles.searchText}
                type="search"
                placeholder="Поиск"
                name="search"
              />
            </div>
            <h2 className={styles.centerblockH2}>Треки</h2>
            </>
    )
}
 // Обратите внимание, что функция компонента также является асинхронной
//   export default async function HomePage() {
//     const data = await getData();
  
//     return <main>/* Некий контент */</main>;
//   }