import React from "react";
import * as styles from "./ProfileResumeSection.module.css";
import * as commonStyles from "../ProfilePage.module.css";
import { Divider, Button } from "antd";
import { FormOutlined } from "@ant-design/icons";

const ProfileResumeSection = props => {
    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Resume</span>
                {props.resumes && props.resumes.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            <span>Upload your resume</span>
            <Button type="primary" block>
                Upload Resume
            </Button>
            <Divider>Text</Divider>
            <div className={styles.buildResume}>
                Don't have a resume ? We are here to help you. Build one in 3 steps
            </div>
            <Button type="primary" block>
                Build my resume
            </Button>
        </div>
    );
};

export default ProfileResumeSection;
