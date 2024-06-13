import classNames from "classnames";
import styles from "./FilterItem.module.css";

type FilterItemType = {
  title: string;
  list: string[];
  handleFilterClick: (newFilter: string) => void;
  isOpened: boolean;
};

export default function FilterItem({ handleFilterClick, title, list, isOpened }: FilterItemType) {

  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => handleFilterClick(title)}
        className={classNames(styles.filterButton, styles.btnText, {[styles.active]: isOpened})}
      >
        {title}
        
      </div>
     
     {isOpened &&( 
      
        <ul className={styles.filterList}>
          <div className={styles.filterListDiv}>
        {list.map((item) => (
          <li className={styles.filterItem}
          key={item}>{item}</li>
        ))}
        </div>
      </ul>)}
    </div>
  );
}
