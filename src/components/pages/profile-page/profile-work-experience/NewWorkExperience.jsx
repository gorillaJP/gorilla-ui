import React, { useState } from "react";
import { Button, Input, Select, DatePicker } from "antd";
import moment from "moment";

import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./NewWorkExperience.module.css";
import FormLabel from "../../../common/form-label/FormLabel";
import TextArea from "antd/lib/input/TextArea";

const InputGroup = Input.Group;
const { Option } = Select;
const dateFormat = "YYYY/MM/DD";

const NewWorkExperience = props => {
    const [previouslySaved, setPreviouslySaved] = useState(props.experience);
    const [experience, setExperience] = useState(props.experience);
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

    const onCancel = () => {
        props.onCancel({ ...previouslySaved, edit: false });
    };

    const onChange = (key, value) => {
        const updatedExperience = { ...experience };
        updatedExperience[key] = value;
        updatedExperience.updated = true;
        setExperience(updatedExperience);
        props.onChange(updatedExperience);
    };

    const onDateChange = (key, dateString) => {
        if (
            key === "startDate" &&
            (!experience.endDate || moment(dateString, "YYYY/MM/DD").isBefore(moment(experience.endDate, "YYYY/MM/DD")))
        ) {
            setStartDateError(false);
        } else if (key === "startDate") {
            setStartDateError(true);
        }

        if (
            key === "endDate" &&
            moment(experience.startDate, "YYYY/MM/DD").isBefore(moment(dateString, "YYYY/MM/DD"))
        ) {
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
                    name="Designation"
                    required={true}
                    error={props.experience.showError && !props.experience.jobtitle}
                />
                <Input
                    value={props.experience.jobtitle}
                    onChange={e => {
                        onChange("jobtitle", e.target.value);
                    }}
                />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel
                    name="Company Name"
                    required={true}
                    error={props.experience.showError && !props.experience.organization}
                />
                <Input
                    value={props.experience.organization}
                    onChange={e => {
                        onChange("organization", e.target.value);
                    }}
                />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Monthly Salary" />

                <InputGroup compact>
                    <Select
                        defaultValue="LKR"
                        style={{ width: "25%" }}
                        value={props.experience.salaryCurrency}
                        onChange={value => {
                            onChange("salaryCurrency", value);
                        }}
                    >
                        {props.currencies.map(currency => {
                            return (
                                <Option key={currency.name} value={currency.name}>
                                    {currency.name}
                                </Option>
                            );
                        })}
                    </Select>
                    <Input
                        value={props.experience.monthlySalary}
                        onChange={e => {
                            onChange("monthlySalary", e.target.value);
                        }}
                        type="number"
                        style={{ display: "inline", width: "75%" }}
                    />
                </InputGroup>
            </div>
            <div className={commonStyles.addFormLabel}>
                <div className={styles.datePickerContainer}>
                    <div>
                        <FormLabel name="Work From" error={startDateError} />
                        <div className={styles.datePicker}>
                            <DatePicker
                                value={props.experience.startDate ? moment(props.experience.startDate, dateFormat) : ""}
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
                        <FormLabel name="Work End" error={endDateError} />
                        <div className={styles.datePicker}>
                            <DatePicker
                                value={props.experience.endDate ? moment(props.experience.endDate, dateFormat) : ""}
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
                    value={props.experience.details}
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
                    onClick={() => props.onDelete(experience._id)}
                >
                    Delete
                </Button>
                <Button size="large" onClick={() => onCancel()}>
                    Cancel
                </Button>
                <Button size="large" onClick={() => props.onSave(experience._id)}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default NewWorkExperience;
