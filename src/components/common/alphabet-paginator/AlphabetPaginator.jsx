import React from "react";
import * as styles from "./AlphabetPaginator.module.css";

const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];

const AlphabetPaginator = props => {
    return (
        <div className={styles.paginationWrapper}>
            {letters.map(letter => {
                return (
                    <span
                        onClick={() => {
                            props.onClick && props.onClick(letter);
                        }}
                        key={letter}
                    >
                        {letter}
                    </span>
                );
            })}
        </div>
    );
};

export default AlphabetPaginator;
