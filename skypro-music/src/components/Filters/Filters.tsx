import { useState } from "react";
import FilterItem from "./FilterItem/FilterItem";
import styles from "./Track.module.css";
import classNames from "classnames";

// const filters = [
//     title: "Исполнитель",
//     list: ["Ivan", "Dasha", "Liza", "Lena"], 
// ]

export default function Filters(){
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    function handleFilterClick(newFilter:string) {
setActiveFilter((prev) => prev === newFilter ? null : newFilter)
    }
    return(
        <><div className={classNames(styles.centerblockSearch, styles.search)}>
            <svg className={styles.searchSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-search" />
            </svg>
            <input
                className={styles.searchText}
                type="search"
                placeholder="Поиск"
                name="search" />
        </div><h2 className={styles.centerblockH2}>Треки</h2><div className={classNames(styles.centerblockFilter, styles.filter)}>
                <div className={styles.filterTitle}>Искать по:</div>
                {/* {filters.map((filter) => (
 <FilterItem
 key={filter.title} 
 isOpened={activeFilter === filter.title} 
 handleFilterClick={handleFilterClick} 
 title={"Исполнитель"} 
 list={["Ivan", "Dasha", "Liza", "Lena"]} />
                ))} */}
               
                <FilterItem isOpened={activeFilter === "Году выпуска"} handleFilterClick={handleFilterClick} title={"Год выпуска"} list={["2020", "2021", "2022", "2023"]} />
                <FilterItem isOpened={activeFilter === "Жанру"} handleFilterClick={handleFilterClick} title={"Жанр"} list={["Рок", "Поп", "Классика", "Джаз"]} />

                <div className={classNames(styles.filterButton, styles.buttonAuthor, styles._btnText)}>
                    исполнителю
                </div>
                <div className={classNames(styles.filterButton, styles.buttonYear, styles._btnText)}>
                    году выпуска
                </div>
                <div className={classNames(styles.filterButton, styles.buttonGenre, styles._btnText)}>жанру</div>
            </div></>
    )
}