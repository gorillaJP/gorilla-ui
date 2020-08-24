import React from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileEducation.module.css";
import { Button, Divider } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";

const ProfileEducation = props => {
    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Education</span>
                {props.educations && props.educations.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            {props.educations &&
                props.educations.map((education, i) => {
                    return (
                        <>
                            <div className={commonStyles.detailBlock}>
                                <span className={styles.qualification}>{education.qualification}</span>
                                <span className={styles.institute}>{education.institite}</span>
                                <span className={styles.marks}>{education.marks}</span>
                                <span className={styles.description}>{education.details}</span>
                            </div>
                            {props.educations.length > i + 1 && <Divider />}
                        </>
                    );
                })}
            <div className={props.educations && props.educations.length ? commonStyles.addMore : ""}>
                <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
                <span className={commonStyles.textButton}>
                    <Button type="link">{`Add ${
                        props.educations && props.educations.length ? "More " : ""
                    }Education Details`}</Button>
                </span>
            </div>
        </div>
    );
};

export default ProfileEducation;
