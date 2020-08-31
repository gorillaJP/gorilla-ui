import React, { useState } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileEducation.module.css";
import { Button, Divider, Input } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import FormLabel from "../../../common/form-label/FormLabel";

const NewEducation = props => {
    return (
        <div className={commonStyles.addNew}>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Highest Qualification" required={true} />
                <Input />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Institute" required={true} />
                <Input />
            </div>
            <div className={commonStyles.addFormLabel}>
                <div>
                    <FormLabel name="Start Date" />
                    <Input />
                </div>
                <div>
                    <FormLabel name="End Date" />
                    <Input />
                </div>
            </div>
            <div className={commonStyles.buttonContainer}>
                <Button size="large">Delete</Button>
                <Button size="large">Save</Button>
            </div>
        </div>
    );
};

const ProfileEducation = props => {
    const [newEducations, addNewEducations] = useState([]);

    const addNewEducation = () => {
        const newEducation = {
            qualification: "",
            institute: "",
            marks: "",
            description: ""
        };

        addNewEducations([...newEducations, newEducation]);
    };

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

            {newEducations &&
                newEducations.map((education, i) => {
                    return (
                        <>
                            {(props.educations && props.educations.length > 0) || i > 0 ? <Divider /> : ""}
                            <NewEducation education={education} />
                        </>
                    );
                })}
            <div className={props.educations && props.educations.length ? commonStyles.addMore : ""}>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => {
                        addNewEducation();
                    }}
                />
                <span className={commonStyles.textButton}>
                    <Button
                        type="link"
                        onClick={() => {
                            addNewEducation();
                        }}
                    >{`Add ${props.educations && props.educations.length ? "More " : ""}Education Details`}</Button>
                </span>
            </div>
        </div>
    );
};

export default ProfileEducation;
