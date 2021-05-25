import React, { useState } from "react";
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
    const [selectedLetter, setSelectedLetter] = useState("");
    return (
        <div className={styles.paginationWrapper}>
            {letters.map(letter => {
                return (
                    <span
                        onClick={() => {
                            props.onClick && props.onClick(letter);
                            setSelectedLetter(letter);
                        }}
                        key={letter}
                        className={letter === selectedLetter ? styles.selectedLetter : ""}
                    >
                        {letter}
                    </span>
                );
            })}
        </div>
    );
};

export default AlphabetPaginator;
