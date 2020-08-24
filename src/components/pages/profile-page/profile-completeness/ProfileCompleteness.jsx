import React from "react";
import { Progress } from "antd";
import * as styles from "./ProfileCompleteness.module.css";

const ProfileCompleteness = props => {
    return (
        <div>
            <div className={styles.details}>
                <span>profile completeness</span>
                <span className={styles.percentage}>{props.completeness}%</span>
            </div>
            <div>
                <Progress
                    percent={props.completeness}
                    status={props.completeness === 100 ? "success" : "active"}
                    strokeColor="#52c41a"
                    showInfo={props.completeness === 100 ? true : false}
                />
            </div>
        </div>
    );
};

export default ProfileCompleteness;
