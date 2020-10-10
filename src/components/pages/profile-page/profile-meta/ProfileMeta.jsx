import React, { useState } from "react";
import * as styles from "./ProfileMeta.module.css";
import * as commonStyles from "../ProfilePage.module.css";
import { PlusOutlined, FormOutlined, CameraFilled } from "@ant-design/icons";
import { Upload, message, Button } from "antd";
import config from "../../../../util/config";
import { saveProfileImage } from "../../../../api/ProfileApi";

const ProfileMeta = props => {
    const updateProfile = imageUrl => {
        saveProfileImage({ profileImage: imageUrl }, props.token);
        props.endLoad();
        message.success("Profile image updated");
    };

    const fileUploadProps = {
        name: "file",
        action: config.remote + "api/file",
        method: "POST",
        showUploadList: false,
        headers: {
            authorization: "authorization-text",
            contentType: "multipart/form-data"
        },
        onChange(info) {
            if (info.file.status === "done") {
                const { response } = info.file;
                updateProfile(response.payload.file);
            } else if (info.file.status === "error") {
                message.error("Error uploading the file");
                props.endLoad();
            }
        },
        beforeUpload(file) {
            const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPng) {
                message.error("You can only upload JPG/PNG file!");
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            const isGT20K = file.size / 1024 > 20;
            if (!isLt2M) {
                message.error("Image must smaller than 2MB!");
            }
            if (!isGT20K) {
                message.error("Image must larger than 20KB!");
            }

            if (isJpgOrPng && isLt2M && isGT20K) {
                props.startLoad();
                return true;
            } else {
                return false;
            }
        }
    };

    return (
        <div className={styles.profileMeta}>
            <div className={styles.profileImageContainer}>
                <img src={props.imageUrl} className={styles.profileImage} />
                <div className={styles.uploadBtn}>
                    <Upload {...fileUploadProps}>
                        <Button icon={<CameraFilled style={{ fontSize: "30px" }} />}></Button>
                    </Upload>
                </div>
            </div>
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
