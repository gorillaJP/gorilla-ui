import React from "react";
import styles from "./Container.module.css";

export const Container = props => {
    return <div className={styles.container}>{props.children}</div>;
};
