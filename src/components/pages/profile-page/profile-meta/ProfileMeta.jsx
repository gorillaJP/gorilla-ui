import React from "react";
import * as styles from "./ProfileMeta.module.css";

const ProfileMeta = props => {
    return (
        <div className={styles.profileMeta}>
            <img src={props.imageUrl} className={styles.profileImage} />
            <span className={styles.name}>{props.name}</span>
            <span className={styles.email}>{props.email}</span>
        </div>
    );
};

export default ProfileMeta;
