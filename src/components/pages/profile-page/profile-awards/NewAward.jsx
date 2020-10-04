import React, { useState } from "react";
import { Button, Input, Select, DatePicker } from "antd";
import moment from "moment";

import * as commonStyles from "../ProfilePage.module.css";
import * as styles from "./NewAward.module.css";
import FormLabel from "../../../common/form-label/FormLabel";
import TextArea from "antd/lib/input/TextArea";

const dateFormat = "YYYY/MM/DD";

const NewAward = props => {
    const [previouslySaved, setPreviouslySaved] = useState(props.award);
    const [award, setAward] = useState(props.award);
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

    const onCancel = () => {
        props.onCancel({ ...previouslySaved, edit: false });
    };

    const onChange = (key, value) => {
        const updatedAward = { ...award };
        updatedAward[key] = value;
        updatedAward.updated = true;
        setAward(updatedAward);
        props.onChange(updatedAward);
    };

    const onDateChange = (key, dateString) => {
        if (
            key === "startDate" &&
            (!award.endDate || moment(dateString, "YYYY/MM/DD").isBefore(moment(award.endDate, "YYYY/MM/DD")))
        ) {
            setStartDateError(false);
        } else if (key === "startDate") {
            setStartDateError(true);
        }

        if (key === "endDate" && moment(award.startDate, "YYYY/MM/DD").isBefore(moment(dateString, "YYYY/MM/DD"))) {
            setEndDateError(false);
        } else if (key === "endDate") {
            setEndDateError(true);
        }

        onChange(key, dateString);
    };

    return (
        <div className={commonStyles.addNew}>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Name" required={true} error={props.award.showError && !props.award.name} />
                <Input
                    value={props.award.name}
                    onChange={e => {
                        onChange("name", e.target.value);
                    }}
                />
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel
                    name="Date"
                    error={startDateError}
                    required={true}
                    error={props.award.showError && !props.award.date}
                />
                <div className={styles.datePicker}>
                    <DatePicker
                        value={props.award.date ? moment(props.award.date, dateFormat) : ""}
                        format={dateFormat}
                        onChange={(date, dateString) => {
                            onDateChange("date", dateString);
                        }}
                        placeholder="Select Date"
                        style={{ width: "280px" }}
                    />
                </div>
            </div>
            <div className={commonStyles.addFormLabel}>
                <FormLabel name="Description" />
                <TextArea
                    rows={5}
                    value={props.award.details}
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
                    onClick={() => props.onDelete(award._id)}
                >
                    Delete
                </Button>
                <Button size="large" onClick={() => onCancel()}>
                    Cancel
                </Button>
                <Button size="large" onClick={() => props.onSave(award._id)}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default NewAward;
