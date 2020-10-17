import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./ProfileWorkExperience.module.css";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Divider, message } from "antd";
import moment from "moment";

import { saveExperience, deleteExperience } from "../../../../api/ProfileApi";
import NewWorkExperience from "./NewWorkExperience";
import { currencyFormatter } from "../../../../util/Util";

const ProfileWorkExperience = props => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const newExperiencesStateArray = [];
        for (const experience of props.experiences) {
            const experienceInCurrentExperiencesArray = experiences.find(item => {
                return item._id === experience._id;
            });

            if (experienceInCurrentExperiencesArray) {
                newExperiencesStateArray.push(experienceInCurrentExperiencesArray);
            } else {
                newExperiencesStateArray.push(experience);
            }
        }

        // sort based on order value
        newExperiencesStateArray.sort((a, b) => a.order - b.order);

        const newExperiencesArray = experiences.filter(item => {
            return item._id.includes("temp-");
        });

        setExperiences([...newExperiencesStateArray, ...newExperiencesArray]);
    }, [props.experiences]);

    const addNewExperience = () => {
        const newExperience = {
            _id: `temp-${new Date().getTime()}`,
            jobtitle: "",
            organization: "",
            location: "",
            details: "",
            monthlySalary: "",
            salaryCurrency: "LKR",
            startDate: "",
            endDate: "",
            order: experiences.length + 1,
            edit: true
        };

        setExperiences([...experiences, newExperience]);
    };

    const enableEdit = id => {
        console.log(props.metaCurrencies);
        updateAttributeOfExperienceObj(id, "edit", true);
    };

    const onChange = experience => {
        const currentIndex = getArrayIndexInExperiencesArray(experience._id);

        if (currentIndex > -1) {
            const newExperiencesArray = [...experiences];
            newExperiencesArray[currentIndex] = experience;
            setExperiences(newExperiencesArray);
        }
    };

    const onCancel = experience => {
        const currentIndex = getArrayIndexInExperiencesArray(experience._id);

        if (currentIndex > -1) {
            const newExperiencesArray = [...experiences];
            if (experience._id.includes("temp-")) {
                newExperiencesArray.splice(currentIndex, 1);
            } else {
                newExperiencesArray[currentIndex] = experience;
            }

            setExperiences([...newExperiencesArray]);
        }
    };

    const onDelete = async id => {
        props.startLoad();
        const response = await deleteExperience(id, props.token);
        props.endLoad();
        if (response && response.data) {
            const currentIndex = getArrayIndexInExperiencesArray(id);
            if (currentIndex > -1) {
                const newExperiencesArray = [...experiences];
                newExperiencesArray.splice(currentIndex, 1);
                setExperiences(newExperiencesArray);
            }
            message.success("Work experience deleted");
        } else {
            message.error("Error deleting work experience");
        }
    };

    const onSave = async id => {
        props.startLoad();
        const experienceObj = experiences.find(item => {
            return item._id === id;
        });

        if (!experienceObj) {
            return;
        }

        const experience = { ...experienceObj };

        const hasErrors = checkExperienceObject(experience);

        if (!hasErrors) {
            // Remove temp attributes
            delete experience.showError;
            delete experience.edit;

            if (id.includes("temp-")) {
                delete experience._id;
            }

            const response = await saveExperience([experience], props.token);

            props.endLoad();
            if (response && response.data) {
                updateAttributeOfExperienceObj(id, "edit", false);
                updateAttributeOfExperienceObj(id, "showError", false);

                if (id.includes("temp-")) {
                    const currentIndex = getArrayIndexInExperiencesArray(id);
                    if (currentIndex > -1) {
                        const newExperiencesArray = [...experiences];
                        newExperiencesArray.splice(currentIndex, 1);
                        setExperiences(newExperiencesArray);
                    }
                }

                props.updateProfile(response.data);
            } else {
                // Show error
            }
        } else {
            props.endLoad();
            updateAttributeOfExperienceObj(id, "showError", true);
        }
    };

    const updateAttributeOfExperienceObj = (id, key, value) => {
        const newExperiencesArray = [...experiences];
        const currentIndex = getArrayIndexInExperiencesArray(id);

        if (currentIndex > -1) {
            newExperiencesArray[currentIndex][key] = value;
            setExperiences(newExperiencesArray);
        }
    };

    const getArrayIndexInExperiencesArray = id => {
        return experiences.findIndex(item => {
            return item._id === id;
        });
    };

    const checkExperienceObject = experience => {
        const dateError = moment(experience.startDate, "YYYY/MM/DD").isAfter(moment(experiences.endDate, "YYYY/MM/DD"))
            ? true
            : false;

        if (!experience.endDate && experience.startDate) {
            dateError = false;
        }

        if (!experience.jobtitle || !experience.organization || dateError) {
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
                <span className={commonStyles.headerText}>Work Experience</span>
            </div>
            {experiences &&
                experiences.map((experience, i) => {
                    return (
                        <>
                            {!experience.edit ? (
                                <>
                                    <div className={commonStyles.detailBlock}>
                                        <div>
                                            <span className={styles.jobTitle}>{experience.jobtitle}</span>
                                            <span
                                                className={commonStyles.editorIcon}
                                                onClick={() => {
                                                    enableEdit(experience._id);
                                                }}
                                            >
                                                <FormOutlined />
                                            </span>
                                        </div>

                                        <span className={styles.company}>{experience.organization}</span>
                                        <span className={styles.location}>{experience.location}</span>
                                        {experience.monthlySalary && (
                                            <span className={styles.salary}>
                                                <span className={styles.currency}>{experience.salaryCurrency}</span>
                                                <span className={styles.amount}>
                                                    {currencyFormatter(
                                                        experience.monthlySalary,
                                                        experience.salaryCurrency
                                                    )}
                                                </span>
                                            </span>
                                        )}
                                        <span className={styles.period}>
                                            {`${getFormattedDate(experience.startDate)}${
                                                experience.endDate ? " to " : " to present"
                                            }
                                            ${getFormattedDate(experience.endDate)}`}
                                        </span>
                                        <span className={styles.descriptionHead}>Description</span>
                                        <div className={styles.description}>{experience.details}</div>
                                    </div>
                                    {props.experiences.length > i + 1 && <Divider />}
                                </>
                            ) : (
                                <>
                                    {props.experiences.length === i && i !== 0 && <Divider />}
                                    <NewWorkExperience
                                        experience={experience}
                                        onChange={onChange}
                                        onDelete={onDelete}
                                        onSave={onSave}
                                        onCancel={onCancel}
                                        currencies={props.metaCurrencies}
                                    />
                                    {props.experiences.length > i + 1 && <Divider />}
                                </>
                            )}
                        </>
                    );
                })}
            <div className={experiences && experiences.length ? commonStyles.addMore : commonStyles.addNewRecord}>
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
                    >{`Add ${experiences && experiences.length ? "More " : ""}Work Experience`}</Button>
                </span>
            </div>
        </div>
    );
};

export default ProfileWorkExperience;
