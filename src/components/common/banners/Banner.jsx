import React from "react";
import styles from "./Banner.module.css";
import { Button } from "antd";

const Banner = props => {
    return (
        <div className={`${styles.banner} ${props.type === "success" ? styles.success : ""}`}>
            <span className={styles.header}>{props.header}</span>
            <div className={styles.message}>{props.msg}</div>
            <div className={styles.btnPannel}>
                <Button onClick={() => props.btnAction()} className={styles.btn}>
                    {props.btnText}
                </Button>
            </div>
        </div>
    );
};

export default Banner;
