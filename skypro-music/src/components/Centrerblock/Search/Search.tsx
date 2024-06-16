import { ChangeEvent, useState } from "react";
import styles from "./Search.module.css";
import classNames from "classnames";
import { useAppDispatch } from "@/hooks";
import { setFilters } from "@/store/features/playlistSlice";

export default  function Search() {
const [searchValue, setSearchValue] = useState("");
const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
setSearchValue(e.target.value);
dispatch(setFilters({searchValue: e.target.value}));
  }

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
                value={searchValue}
                onChange={handleChange}
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