import React from "react";
import * as commonStyles from "../ProfilePage.module.css";
import { Button } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";

const ProfilePersonalDetails = props => {
    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Personal Details</span>
                {props.details && props.details.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
            <span className={commonStyles.textButton}>
                <Button type="link"> Add Personal Details</Button>
            </span>
        </div>
    );
};

export default ProfilePersonalDetails;
