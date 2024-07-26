"use client";

import { ChangeEvent, useState } from "react";
import styles from "./Search.module.css";
import classNames from "classnames";
import { useAppDispatch } from "@/hooks";
import { setFilters } from "@/store/features/playlistSlice";
import Filters from "@/components/Filters/Filters";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    dispatch(setFilters({ searchValue: e.target.value }));
  };

  return (
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
    </>
  );
}
