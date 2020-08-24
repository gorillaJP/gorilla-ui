import React from "react";
import { Button } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import * as commonStyles from "../ProfilePage.module.css";

const ProfileAwards = props => {
    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Awards And Achievements</span>
                {props.awards && props.awards.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
            <span className={commonStyles.textButton}>
                <Button type="link">Add Awards And Achievements</Button>
            </span>
        </div>
    );
};

export default ProfileAwards;
