import React, { useState } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileWorkExperience.module.css";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Divider, Input } from "antd";
import FormLabel from "../../../common/form-label/FormLabel";
import TextArea from "antd/lib/input/TextArea";

const NewWorkExperience = props => {
    return (
        <div className={commonStyles.addNew}>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Designation" required={true} />
                <Input />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Company Name" required={true} />
                <Input />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Monthly Salary" />
                <Input />
            </div>
            <div className={commonStyles.addFormLabel}>
                <div>
                    <FormLabel name="Work From" />
                    <Input />
                </div>
                <div>
                    <FormLabel name="Work End" />
                    <Input />
                </div>
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Description" />
                <TextArea rows={5} />
            </div>
            <div className={commonStyles.buttonContainer}>
                <Button size="large">Delete</Button>
                <Button size="large">Save</Button>
            </div>
        </div>
    );
};

const ProfileWorkExperience = props => {
    const [newExperiences, addNewExperiences] = useState([]);

    const addNewExperience = () => {
        const newExperience = {
            jobTitle: "",
            organization: "",
            location: "",
            detail: ""
        };

        addNewExperiences([...newExperiences, newExperience]);
    };

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
            {newExperiences &&
                newExperiences.map((experience, i) => {
                    return (
                        <>
                            {(props.experiences && props.experiences.length > 0) || i > 0 ? <Divider /> : ""}
                            <NewWorkExperience experience={experience} />
                        </>
                    );
                })}
            <div className={props.experiences && props.experiences.length ? commonStyles.addMore : ""}>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => {
                        addNewExperience();
                    }}
                />
                <span className={commonStyles.textButton}>
                    <Button
                        type="link"
                        onClick={() => {
                            addNewExperience();
                        }}
                    >{`Add ${props.experiences && props.experiences.length ? "More " : ""}Work Experience`}</Button>
                </span>
            </div>
        </div>
    );
};

export default ProfileWorkExperience;
