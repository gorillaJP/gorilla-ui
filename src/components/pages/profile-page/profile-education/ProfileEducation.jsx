import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileEducation.module.css";
import { Button, Divider, Input } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import FormLabel from "../../../common/form-label/FormLabel";
import { saveEducations } from "../../../../api/ProfileApi";
import TextArea from "antd/lib/input/TextArea";

const NewEducation = props => {
    const updateEducation = education => {
        props.onChange(education);
    };
    return (
        <div className={commonStyles.addNew}>
            <div className={commonStyles.addFormLabel}>
                <FormLabel
                    name="Highest Qualification"
                    required={true}
                    error={props.showError && !props.educations.qualification}
                />
                <Input
                    value={props.education.qualification}
                    onChange={e => {
                        updateEducation({ ...props.education, qualification: e.target.value });
                    }}
                />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Institute" required={true} error={props.showError && !props.educations.institute} />
                <Input value={props.education.institute} />
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
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Description" />
                <TextArea rows={5} value={props.education.details} />
            </div>
            <div className={commonStyles.buttonContainer}>
                <Button size="large" onClick={() => props.onDelete(props.education)}>
                    Delete
                </Button>
                <Button size="large">Save</Button>
            </div>
        </div>
    );
};

const ProfileEducation = props => {
    const [editMode, setEditMode] = useState(false); // Keep flag of edit mode
    const [edited, setEdited] = useState(false); // Used for checking unsaved changes
    const [hasValidationErrors, setValidationErrors] = useState(false); // Used for showing validation errors
    const [newEducations, addNewEducations] = useState([]);
    const [allEducations, setAllEducations] = useState([]);

    useEffect(() => {
        const educationArray = [];
        if (props.educations && props.educations.length) {
            educationArray.push(...props.educations);
        }

        educationArray.push(...newEducations);
        setAllEducations(educationArray);
    }, [props.educations]);

    const addNewEducation = () => {
        const newEducation = {
            order: props.educations.length + newEducations.length,
            qualification: "",
            institute: "",
            marks: "",
            details: "",
            id: new Date().getTime(),
            new: true,
            deleted: false
        };

        addNewEducations([...newEducations, newEducation]);
        setAllEducations([...allEducations, newEducation]);
    };

    const onChangeNewEducation = changedEducation => {
        const updatedNewEducations = [...newEducations];
        const educationIndexInNew = updatedNewEducations.findIndex(newEducation => {
            return newEducation.id === changedEducation.id;
        });

        updatedNewEducations.splice(educationIndexInNew, 1, changedEducation);
        addNewEducations([...updatedNewEducations]);
        onChangeAllEducation(changedEducation);
    };

    const onChangeAllEducation = changedEducation => {
        const updatedAllEducations = [...allEducations];
        const educationIndexInAll = updatedAllEducations.findIndex(newEducation => {
            return newEducation.id === changedEducation.id;
        });

        updatedAllEducations.splice(educationIndexInAll, 1, changedEducation);
        setAllEducations([...updatedAllEducations]);
        setEdited(true);
    };

    const deleteEducation = deletedEducation => {
        const updatedNewEducations = [...newEducations];
        const educationIndexInNew = updatedNewEducations.findIndex(newEducation => {
            return newEducation.id === deletedEducation.id;
        });

        updatedNewEducations.splice(educationIndexInNew, 1);
        addNewEducations([...updatedNewEducations]);

        const updatedAllEducations = [...allEducations];
        const educationIndexInAll = updatedAllEducations.findIndex(newEducation => {
            return newEducation.id === deletedEducation.id;
        });

        updatedAllEducations.splice(educationIndexInAll, 1);
        setAllEducations([...updatedAllEducations]);
        setEdited(true);

        // TODO: If all educations are deleted prompt and save after confirmation
    };

    const triggerApiCall = async () => {
        props.startLoad();
        // Validate input
        let hasErrors = false;
        for (const education of allEducations) {
            hasErrors = checkEducationObject(education) ? true : hasErrors;
            if (hasErrors) {
                break;
            }
        }

        if (!hasErrors) {
            const response = await saveEducations([], props.token);
            props.endLoad();
            if (response && response.data) {
                props.updateProfile(response.data);
                setEditMode(false);
            } else {
                // TODO : show error
            }
        } else {
            setValidationErrors(true);
        }
    };

    const checkEducationObject = education => {
        if (!education.qualification || !education.institute) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Education</span>
                {props.educations && props.educations.length && (
                    <span
                        className={commonStyles.editorIcon}
                        onClick={() => {
                            if (!edited || !editMode) {
                                setEditMode(!editMode);
                            } else {
                                console.log("have unsaved changes");
                            }
                        }}
                    >
                        <FormOutlined />
                    </span>
                )}
            </div>
            {!editMode &&
                props.educations &&
                props.educations.map((education, i) => {
                    return (
                        <>
                            <div className={commonStyles.detailBlock} key={education.order}>
                                <span className={styles.qualification}>{education.qualification}</span>
                                <span className={styles.institute}>{education.institite}</span>
                                <span className={styles.marks}>{education.marks}</span>
                                <span className={styles.description}>{education.details}</span>
                            </div>
                            {props.educations.length > i + 1 && <Divider />}
                        </>
                    );
                })}

            {!editMode &&
                newEducations &&
                newEducations.map((education, i) => {
                    return (
                        <>
                            {(props.educations && props.educations.length > 0) || i > 0 ? <Divider /> : ""}
                            <NewEducation
                                education={education}
                                onSave={() => triggerApiCall()}
                                onChange={changedEducation => onChangeNewEducation(changedEducation)}
                                onDelete={deletedEducation => deleteEducation(deletedEducation)}
                                showError={hasValidationErrors}
                                key={education.order}
                            />
                        </>
                    );
                })}

            {editMode &&
                allEducations &&
                allEducations.map((education, i) => {
                    return (
                        <>
                            {i > 0 ? <Divider /> : ""}
                            <NewEducation
                                education={education}
                                onSave={() => triggerApiCall()}
                                onChange={changedEducation => onChangeAllEducation(changedEducation)}
                                onDelete={deletedEducation => deleteEducation(deletedEducation)}
                                showError={hasValidationErrors}
                                key={education.order}
                            />
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
