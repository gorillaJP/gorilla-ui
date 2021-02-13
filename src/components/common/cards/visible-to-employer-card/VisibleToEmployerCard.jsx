import React from "react";
import { VISIBLE_TO_EMPLOYER_HEADER, VISIBLE_TO_EMPLOYER_MESSAGE } from "../../../../constants/MessageConstants";
import { Switch } from "antd";

import * as styles from "./VisibleToEmployerCard.module.css";

const VisibleToEmployerCard = props => {
    return (
        <div className={styles.cardWrapper}>
            <div>
                <span className={styles.header}>{VISIBLE_TO_EMPLOYER_HEADER}</span>
                <span className={styles.message}>{VISIBLE_TO_EMPLOYER_MESSAGE}</span>
            </div>
            <div className={`${styles.switch} ${props.checked ? styles.checked : ""}`}>
                <Switch
                    checked={props.checked}
                    onChange={checked => {
                        props.onChange && props.onChange(checked);
                    }}
                />
            </div>
        </div>
    );
};

export default VisibleToEmployerCard;
