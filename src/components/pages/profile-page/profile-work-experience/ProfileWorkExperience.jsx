import React from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileWorkExperience.module.css";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";

const ProfileWorkExperience = props => {
    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Work Experience</span>
                {props.experiences && props.experiences.length && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            {props.experiences &&
                props.experiences.map((experience, i) => {
                    return (
                        <>
                            <div className={commonStyles.detailBlock}>
                                <span className={styles.jobTitle}>{experience.jobtitle}</span>
                                <span className={styles.company}>{experience.organization}</span>
                                <span className={styles.location}>{experience.location}</span>
                                <span className={styles.descriptionHead}>Description</span>
                                <div className={styles.description}>{experience.details}</div>
                            </div>
                            {props.experiences.length > i + 1 && <Divider />}
                        </>
                    );
                })}
            <div className={props.experiences && props.experiences.length ? commonStyles.addMore : ""}>
                <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
                <span className={commonStyles.textButton}>
                    <Button type="link">{`Add ${
                        props.experiences && props.experiences.length ? "More " : ""
                    }Work Experience`}</Button>
                </span>
            </div>
        </div>
    );
};

export default ProfileWorkExperience;
