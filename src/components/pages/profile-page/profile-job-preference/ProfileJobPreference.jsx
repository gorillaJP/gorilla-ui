import React from "react";
import * as styles from "./ProfileJobPreference.module.css";
import * as commonStyles from "../ProfilePage.module.css";
import { Button } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";

const ProfileJobPreference = props => {
    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Job Preference</span>
                {props.jobPreferences && props.jobPreferences.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
            <span className={commonStyles.textButton}>
                <Button type="link"> Add Job Preference</Button>
            </span>
        </div>
    );
};

export default ProfileJobPreference;
