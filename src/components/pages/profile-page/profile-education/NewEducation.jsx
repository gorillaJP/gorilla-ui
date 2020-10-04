import React, { useState } from "react";
import { Button, Input, Select, DatePicker } from "antd";
import moment from "moment";

import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./NewEducation.module.css";
import FormLabel from "../../../common/form-label/FormLabel";
import TextArea from "antd/lib/input/TextArea";

const dateFormat = "YYYY/MM/DD";

const NewEducation = props => {
    const [previouslySaved, setPreviouslySaved] = useState(props.education);
    const [education, setEducation] = useState(props.education);
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

    const onCancel = () => {
        props.onCancel({ ...previouslySaved, edit: false });
    };

    const onChange = (key, value) => {
        const updatedEducation = { ...education };
        updatedEducation[key] = value;
        updatedEducation.updated = true;
        setEducation(updatedEducation);
        props.onChange(updatedEducation);
    };

    const onDateChange = (key, dateString) => {
        if (
            key === "startDate" &&
            (!education.endDate || moment(dateString, "YYYY/MM/DD").isBefore(moment(education.endDate, "YYYY/MM/DD")))
        ) {
            setStartDateError(false);
        } else if (key === "startDate") {
            setStartDateError(true);
        }

        if (key === "endDate" && moment(education.startDate, "YYYY/MM/DD").isBefore(moment(dateString, "YYYY/MM/DD"))) {
            setEndDateError(false);
        } else if (key === "endDate") {
            setEndDateError(true);
        }

        onChange(key, dateString);
    };

    return (
        <div className={commonStyles.addNew}>
            <div className={commonStyles.addFormLabel}>
                <FormLabel
                    name="Highest Qualification"
                    required={true}
                    error={props.education.showError && !props.education.qualification}
                />
                <Input
                    value={props.education.qualification}
                    onChange={e => {
                        onChange("qualification", e.target.value);
                    }}
                />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel
                    name="Institute"
                    required={true}
                    error={props.education.showError && !props.education.institute}
                />
                <Input
                    value={props.education.institute}
                    onChange={e => {
                        onChange("institute", e.target.value);
                    }}
                />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel
                    name="Results/GPA"
                    required={true}
                    error={props.education.showError && !props.education.marks}
                />
                <Input
                    value={props.education.marks}
                    onChange={e => {
                        onChange("marks", e.target.value);
                    }}
                />
            </div>

            <div className={commonStyles.addFormLabel}>
                <div className={styles.datePickerContainer}>
                    <div>
                        <FormLabel name="Start Date" error={startDateError} />
                        <div className={styles.datePicker}>
                            <DatePicker
                                value={props.education.startDate ? moment(props.education.startDate, dateFormat) : ""}
                                format={dateFormat}
                                onChange={(date, dateString) => {
                                    onDateChange("startDate", dateString);
                                }}
                                placeholder="Select Date"
                                style={{ width: "280px" }}
                            />
                        </div>
                    </div>
                    <div>
                        <FormLabel name="End Date" error={endDateError} />
                        <div className={styles.datePicker}>
                            <DatePicker
                                value={props.education.endDate ? moment(props.education.endDate, dateFormat) : ""}
                                format={dateFormat}
                                onChange={(date, dateString) => {
                                    onDateChange("endDate", dateString);
                                }}
                                placeholder="Select Date"
                                style={{ width: "280px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Description" />
                <TextArea
                    rows={5}
                    value={props.education.details}
                    onChange={e => {
                        onChange("details", e.target.value);
                    }}
                />
            </div>
            <div className={commonStyles.buttonContainer}>
                <Button
                    size="large"
                    type="ghost"
                    className={commonStyles.deleteBtn}
                    onClick={() => props.onDelete(education._id)}
                >
                    Delete
                </Button>
                <Button size="large" onClick={() => onCancel()}>
                    Cancel
                </Button>
                <Button size="large" onClick={() => props.onSave(education._id)}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default NewEducation;
