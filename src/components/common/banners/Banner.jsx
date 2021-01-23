import React, { useState } from "react";
import styles from "./Banner.module.css";
import { Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const Banner = props => {
    const [showBanner, setShowBanner] = useState(true);
    return (
        <div
            className={`${styles.banner} ${
                props.type === "success" ? styles.success : props.type === "info" ? "info" : ""
            }`}
        >
            <span className={styles.header}>
                {props.header}
                {props.closable ? (
                    <span className={styles.closeButton}>
                        <CloseCircleFilled />
                    </span>
                ) : (
                    ""
                )}
            </span>
            <div className={styles.message}>{props.msg}</div>
            {props.btnText && (
                <div className={styles.btnPannel}>
                    <Button onClick={() => props.btnAction()} className={styles.btn}>
                        {props.btnText}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Banner;
