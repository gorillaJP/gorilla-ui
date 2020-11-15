import React, { useState } from "react";
import * as styles from "./ProfileResumeSection.module.css";
import * as commonStyles from "../ProfilePage.module.css";
import { Divider, Button, Upload, message } from "antd";
import { FormOutlined } from "@ant-design/icons";
import config from "../../../../util/config";
import { saveResume } from "../../../../api/ProfileApi";

const ProfileResumeSection = props => {
    const [tempFileLabel, setTempFileLabel] = useState("");
    const fileUploadProps = {
        name: "file",
        action: config.remote + "api/file/resume",
        method: "POST",
        showUploadList: false,
        headers: {
            authorization: "authorization-text",
            contentType: "multipart/form-data"
        },
        onChange(info) {
            if (info.file.status === "done") {
                const { response } = info.file;
                updateProfileCV(response.payload.file, tempFileLabel);
            } else if (info.file.status === "error") {
                message.error("Error uploading the resume");
                props.endLoad();
            }
        },
        beforeUpload(file) {
            setTempFileLabel(file.name);
            const isValidFileType = file.type.includes("document") || file.type === "application/pdf";
            if (!isValidFileType) {
                message.error("You can only upload docx/pdf file!");
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error("File must smaller than 2MB!");
            }

            if (isValidFileType && isLt2M) {
                props.startLoad();
                return true;
            } else {
                return false;
            }
        }
    };

    const updateProfileCV = async (resumeURL, fileLabel) => {
        const response = await saveResume({ file: resumeURL, label: fileLabel }, props.token);
        props.endLoad();
        if (response && response.data) {
            props.updateProfile(response.data);
            message.success("Resume updated");
        } else {
            message.error("Error updating resume");
        }
    };

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Resume</span>
                {props.resumes && props.resumes.length ? (
                    <span className={`${commonStyles.editorIcon} ${commonStyles.aligned}`}>
                        <FormOutlined />
                    </span>
                ) : null}
            </div>
            <span className={styles.subHeader}>Upload your resume</span>
            <div className={styles.button}>
                <Upload {...fileUploadProps} className={styles.uploadButton}>
                    <Button type="primary" block>
                        Upload Resume
                    </Button>
                </Upload>
            </div>

            <Divider>Text</Divider>
            <div className={styles.subHeader}>Don't have a resume ? We are here to help you. Build one in 3 steps</div>
            <div className={styles.button}>
                <Button type="primary" block>
                    Build my resume
                </Button>
            </div>
        </div>
    );
};

export default ProfileResumeSection;
