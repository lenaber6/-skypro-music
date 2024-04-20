import classNames from "classnames";
import styles from "./FilterItem.module.css";

type FilterItemType = {
  title: string;
  list: string[];
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
};

export default function FilterItem({ handleFilterClick,title, list, isOpened }: FilterItemType) {

  return (
    <>
      <div
        onClick={() => handleFilterClick(title)}
        className={classNames(styles.filterButton, styles.btnText, {[styles.active]: isOpened})}
      >
        {title}
        
      </div>
     
     {isOpened &&( <ul>
        {list.map((item) => (
          <li 
          key={item}>{item}</li>
        ))}
      </ul>)}
    </>
  );
}
