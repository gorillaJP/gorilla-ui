import React from "react";
import * as styles from "./ProfileMeta.module.css";
import * as commonStyles from "../ProfilePage.module.css";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";

const ProfileMeta = props => {
    return (
        <div className={styles.profileMeta}>
            <img src={props.imageUrl} className={styles.profileImage} />
            <div>
                <span className={styles.name}>{props.name} &nbsp; </span>
                <span className={commonStyles.editorIconSmall}>
                    <FormOutlined />
                </span>
            </div>
            <span className={styles.email}>{props.email}</span>
        </div>
    );
};

export default ProfileMeta;
