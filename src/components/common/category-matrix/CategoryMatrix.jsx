import React from "react";
import PropTypes from "prop-types";
import * as styles from "./CategoryMatrix.module.css";

const CategoryMatrix = props => {
    return (
        <div className={styles.categories}>
            {props.categories.map((category, i) => {
                return (
                    <div
                        className={styles.category}
                        onClick={() => {
                            props.onClick(category);
                        }}
                        key={i}
                    >
                        <span>{category.displayText}</span>
                        <span>{category.count}</span>
                    </div>
                );
            })}
        </div>
    );
};

CategoryMatrix.propTypes = {
    categories: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
};

export default CategoryMatrix;
