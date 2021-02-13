import React, { useState, useEffect } from "react";
import * as styles from "./ProfileMeta.module.css";
import * as commonStyles from "../ProfilePage.module.css";
import { PlusOutlined, FormOutlined, CameraFilled } from "@ant-design/icons";
import { Upload, message, Button, Input } from "antd";
import config from "../../../../util/config";
import { saveProfileImage, saveProfileName, saveProfileVisibilityToEmployer } from "../../../../api/ProfileApi";
import VisibleToEmployerCard from "../../../common/cards/visible-to-employer-card/VisibleToEmployerCard";
import { check } from "prettier";

const ProfileMeta = props => {
    const [edit, setEditMode] = useState(false);
    const [name, setName] = useState(props.name);
    const [showNameError, setShowNameError] = useState(false);

    useEffect(() => {
        if (!edit) {
            setName(props.name);
        }
    }, [props.name]);

    const updateProfileImageUrl = async imageUrl => {
        const response = await saveProfileImage({ profileImage: imageUrl }, props.token);
        props.endLoad();
        if (response && response.data) {
            props.updateProfile(response.data);
            message.success("Profile image updated");
        } else {
            message.error("Error updating profile image");
        }
    };

    const updateProfileName = async () => {
        if (name) {
            setShowNameError(false);
            props.startLoad();
            const response = await saveProfileName({ name }, props.token);
            props.endLoad();
            if (response && response.data) {
                props.updateProfile(response.data);
                message.success("Name updated");
            } else {
                message.error("Error updating name");
            }
        } else {
            setShowNameError(true);
        }
    };

    const updateVisibleToEmployer = async checked => {
        const response = await saveProfileVisibilityToEmployer({ visibleToEmployers: checked }, props.token);
        props.endLoad();
        if (response && response.data) {
            props.updateProfile(response.data);
            message.success("Profile visibility updated");
        } else {
            message.error("Error updating profile visibility");
        }
    };

    const fileUploadProps = {
        name: "file",
        action: config.remote + "api/file/image",
        method: "POST",
        showUploadList: false,
        headers: {
            authorization: `Bearer ${props.token}`,
            contentType: "multipart/form-data"
        },
        onChange(info) {
            if (info.file.status === "done") {
                const { response } = info.file;
                updateProfileImageUrl(response.payload.file);
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
            <div className={styles.name}>
                {!edit ? (
                    <>
                        <span
                            onDoubleClick={() => {
                                setEditMode(true);
                            }}
                            className={styles.nameVal}
                        >
                            {props.name}
                        </span>
                        <span className={`${commonStyles.editorIconSmall} ${styles.editName}`}>
                            <FormOutlined
                                onClick={() => {
                                    setEditMode(true);
                                }}
                            />
                        </span>
                    </>
                ) : (
                    <Input
                        value={name}
                        onBlur={() => {
                            setEditMode(false);
                            updateProfileName();
                        }}
                        onKeyUp={event => {
                            if (event.keyCode === 13 || event.keycode === 13) {
                                event.preventDefault();
                                updateProfileName();
                                setEditMode(false);
                            }
                        }}
                        onChange={event => {
                            setName(event.target.value);
                            if (event.target.value) {
                                setShowNameError(false);
                            } else {
                                setShowNameError(true);
                            }
                        }}
                        style={showNameError ? { border: "1px solid red" } : {}}
                    ></Input>
                )}
            </div>
            <span className={styles.email}>{props.email}</span>
            <div className={styles.profileVisibilityContainer}>
                <VisibleToEmployerCard
                    onChange={checked => updateVisibleToEmployer(checked)}
                    checked={props.visibleToEmployers}
                />
            </div>
        </div>
    );
};

export default ProfileMeta;
