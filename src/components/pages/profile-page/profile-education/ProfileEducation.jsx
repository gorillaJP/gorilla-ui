import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileEducation.module.css";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Divider, message } from "antd";
import moment from "moment";

import { saveEducation, deleteEducation } from "../../../../api/ProfileApi";
import NewEducation from "./NewEducation";

const ProfileEducation = props => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        const newEducationsStateArray = [];
        for (const education of props.educations) {
            const educationInCurrentEducationsArray = educations.find(item => {
                return item._id === education._id;
            });

            if (educationInCurrentEducationsArray) {
                newEducationsStateArray.push(educationInCurrentEducationsArray);
            } else {
                newEducationsStateArray.push(education);
            }
        }

        // sort based on order value
        newEducationsStateArray.sort((a, b) => a.order - b.order);

        const newEducationsArray = educations.filter(item => {
            return item._id.includes("temp-");
        });

        setEducations([...newEducationsStateArray, ...newEducationsArray]);
    }, [props.educations]);

    const addNewEducation = () => {
        const newEducation = {
            _id: `temp-${new Date().getTime()}`,
            qualification: "",
            institute: "",
            marks: "",
            details: "",
            startDate: "",
            endDate: "",
            order: educations.length + 1,
            edit: true
        };

        setEducations([...educations, newEducation]);
    };

    const enableEdit = id => {
        updateAttributeOfEducationObj(id, "edit", true);
    };

    const onChange = education => {
        const currentIndex = getArrayIndexInEducationsArray(education._id);

        if (currentIndex > -1) {
            const newEducationsArray = [...educations];
            newEducationsArray[currentIndex] = education;
            setEducations(newEducationsArray);
        }
    };

    const onCancel = education => {
        const currentIndex = getArrayIndexInEducationsArray(education._id);

        if (currentIndex > -1) {
            const newEducationsArray = [...educations];
            if (education._id.includes("temp-")) {
                newEducationsArray.splice(currentIndex, 1);
            } else {
                newEducationsArray[currentIndex] = education;
            }

            setEducations([...newEducationsArray]);
        }
    };

    const onDelete = async id => {
        props.startLoad();
        const response = await deleteEducation(id, props.token);
        props.endLoad();
        if (response && response.data) {
            const currentIndex = getArrayIndexInEducationsArray(id);
            if (currentIndex > -1) {
                const newEducationsArray = [...educations];
                newEducationsArray.splice(currentIndex, 1);
                setEducations(newEducationsArray);
            }
            message.success("Education deletion success");
        } else {
            message.error("Error deleting education");
        }
    };

    const onSave = async id => {
        props.startLoad();
        const educationObj = educations.find(item => {
            return item._id === id;
        });

        if (!educationObj) {
            return;
        }

        const education = { ...educationObj };

        const hasErrors = checkEducationObject(education);

        if (!hasErrors) {
            // Remove temp attributes
            delete education.showError;
            delete education.edit;

            if (id.includes("temp-")) {
                delete education._id;
            }

            const response = await saveEducation([education], props.token);

            props.endLoad();
            if (response && response.data) {
                updateAttributeOfEducationObj(id, "edit", false);
                updateAttributeOfEducationObj(id, "showError", false);

                if (id.includes("temp-")) {
                    const currentIndex = getArrayIndexInEducationsArray(id);
                    if (currentIndex > -1) {
                        const newEducationsArray = [...educations];
                        newEducationsArray.splice(currentIndex, 1);
                        setEducations(newEducationsArray);
                    }
                }

                props.updateProfile(response.data);
                message.success("Successfully updated education");
            } else {
                message.error("Error updating education");
            }
        } else {
            props.endLoad();
            updateAttributeOfEducationObj(id, "showError", true);
        }
    };

    const updateAttributeOfEducationObj = (id, key, value) => {
        const newEducationsArray = [...educations];
        const currentIndex = getArrayIndexInEducationsArray(id);

        if (currentIndex > -1) {
            newEducationsArray[currentIndex][key] = value;
            setEducations(newEducationsArray);
        }
    };

    const getArrayIndexInEducationsArray = id => {
        return educations.findIndex(item => {
            return item._id === id;
        });
    };

    const checkEducationObject = education => {
        const dateError = moment(education.startDate, "YYYY/MM/DD").isAfter(moment(education.endDate, "YYYY/MM/DD"))
            ? true
            : false;

        if (!education.endDate && education.startDate) {
            dateError = false;
        }

        if (!education.qualification || !education.institute || dateError) {
            return true;
        } else {
            return false;
        }
    };

    const getFormattedDate = date => {
        if (date) {
            return moment(date).format("DD MMM, YYYY");
        }

        return "";
    };

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Work Education</span>
            </div>
            {educations &&
                educations.map((education, i) => {
                    return (
                        <>
                            {!education.edit ? (
                                <>
                                    <div className={commonStyles.detailBlock}>
                                        <div>
                                            <span className={styles.qualification}>{education.qualification}</span>
                                            <span
                                                className={commonStyles.editorIcon}
                                                onClick={() => {
                                                    enableEdit(education._id);
                                                }}
                                            >
                                                <FormOutlined />
                                            </span>
                                        </div>

                                        <span className={styles.institute}>{education.institute}</span>
                                        <span className={styles.marks}>{education.marks}</span>
                                        <span className={styles.period}>
                                            {`${getFormattedDate(education.startDate)}${
                                                education.endDate ? " to " : " to present"
                                            }
                                            ${getFormattedDate(education.endDate)}`}
                                        </span>
                                        <div className={styles.description}>{education.details}</div>
                                    </div>
                                    {props.educations.length > i + 1 && <Divider />}
                                </>
                            ) : (
                                <>
                                    {props.educations.length === i && i !== 0 && <Divider />}
                                    <NewEducation
                                        education={education}
                                        onChange={onChange}
                                        onDelete={onDelete}
                                        onSave={onSave}
                                        onCancel={onCancel}
                                    />
                                    {props.educations.length > i + 1 && <Divider />}
                                </>
                            )}
                        </>
                    );
                })}
            <div className={educations && educations.length ? commonStyles.addMore : commonStyles.addNewRecord}>
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
                    >{`Add ${educations && educations.length ? "More " : ""} Education`}</Button>
                </span>
            </div>
        </div>
    );
};

export default ProfileEducation;
