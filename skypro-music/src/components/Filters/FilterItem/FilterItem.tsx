import classNames from "classnames";
import styles from "./FilterItem.module.css";

type FilterItemType = {
    title: string,
    list: string[],
    handleFilterClick: (newFilter: string) => void;
    isOpened: boolean;
}

export default function FilterItem({title, list, isOpened}: FilterItemType) {
    function handleFilterClick(title: string): void {
        throw new Error("Function not implemented.");
    }

    return(
        <>
        <div onClick={() => handleFilterClick(title)} className={classNames(styles.filterButton, styles.BtnText)}> 
        {title}
            </div>
            <ul>{list.map((item) => (
                <li key={item}>{item}</li>
            ))}
            </ul>
            </>
    );
}