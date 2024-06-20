import classNames from "classnames";
import styles from "./FilterItem.module.css";
import { trackType } from "@/types";
import { order } from "../filtersdata";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setFilters } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
  // tracksData: trackType[];
  optionList: string[] | string;
};

export default function FilterItem({
  handleFilterClick,
  title,
  value,
  isOpened,
  // tracksData,
  optionList,
}: FilterItemType) {
  const tracksData = useAppSelector((state) => state.playlist.initialTracks);
  const [filterNumber, setFilterNumber] = useState<number>(0);
  // const authorsList = useAppSelector(
  //   (state) => state.playlist.filterOptions.author
  // );
  // const genresList = useAppSelector(
  //   (state) => state.playlist.filterOptions.genre
  // );

  const dispatch = useAppDispatch();

  const getFilterList = () => {
    if (value !== "order") {
      const array = new Set(
        tracksData?.map((trackData: trackType) => trackData[value]) || []
      );
      return Array.from(array);
    }
    return order;
  };

  const toggleFilter = (item: string) => {
    if(value !== "order" && optionList && optionList instanceof Array) {
    dispatch(
      setFilters({
        [value]: optionList.includes(item)
        ? optionList.filter((el) => el !== item)
        : [...optionList, item],

        // author: authorsList.includes(item)
        //   ? authorsList.filter((el) => el !== item)
        //   : [...authorsList, item],
        // genre: genresList.includes(item)
        //   ? genresList.filter((el) => el !== item)
        //   : [...genresList, item],
      })
    );
    } else {
      dispatch(setFilters({order:item}));
    }
  };

  useEffect(() => {
    if (value !== "order" && optionList)
  setFilterNumber(optionList.length);
  }, [optionList, value]);

  // useEffect(() => {
  //   setFilterNumber(authorsList.length);
  // }, [authorsList.length]);

  getFilterList();

  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => handleFilterClick(title)}
        className={classNames(styles.filterButton, styles.btnText, {
          [styles.active]: isOpened,
        })}
      >
        {title}
      </div>

      {filterNumber > 0 && (
        <div className={styles.filterNumber}>{filterNumber}</div>
      )}

      {isOpened && (
        // <div className={styles.activeFilterContainer}>
        <ul className={classNames(styles.activeFilter, styles.filterList)}>
          <div className={styles.filterListDiv}>
            {getFilterList().map((item) => (
              <li
                onClick={() => toggleFilter(item)}
                // className={classNames(styles.filterItem, styles.SelectedFilter)}

                      className={classNames({
                        [styles.SelectedFilter]:
                      value === "order"
                    ? item === optionList
                  : optionList.includes(item),
                })}

                key={item}
              >
                {item}
              </li>
            ))}
          </div>
        </ul>
        // {/* </div> */}
      )}
    </div>
  );
}
