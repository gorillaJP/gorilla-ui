import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import { Button, DatePicker, Input, Select, message } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import * as styles from "./ProfilePersonalDetails.module.css";
import FormLabel from "../../../common/form-label/FormLabel";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { savePersonalDetails } from "../../../../api/ProfileApi";

const { Option } = Select;
const dateFormat = "YYYY/MM/DD";

const ProfilePersonalDetails = props => {
    const [personalDetails, setPersonalDetails] = useState({
        homeTown: "",
        address: "",
        mobilePhoneNumber: "",
        homePhoneNumber: "",
        dateOfBirth: "",
        gender: "",
        martialStatus: "",
        introduction: ""
    });

    const [previousPersonalDetails, setPreviousPersonalDetails] = useState({});

    useEffect(() => {
        if (!personalDetails.edit && props.personalDetails) {
            setPersonalDetails(props.personalDetails);
            setPreviousPersonalDetails(props.personalDetails);
        }
    }, [props.personalDetails]);

    const addPersonalDetails = () => {
        setPersonalDetails({ ...personalDetails, edit: true });
    };

    const onCancel = () => {
        setPersonalDetails({ ...previousPersonalDetails });
    };

    const onSave = async () => {
        props.startLoad();
        const response = await savePersonalDetails(personalDetails, props.token);
        props.endLoad();
        if (response && response.data) {
            setPersonalDetails({ ...personalDetails, edit: false });
            props.updateProfile(response.data);
            message.success("Personal details updated");
        } else {
            message.error("Error updating personal details");
        }
    };
    const onChange = (key, value) => {
        setPersonalDetails({ ...personalDetails, [key]: value });
    };

    const hasValues = personalDetails => {
        let hasValues = false;
        const values = Object.values(personalDetails);

        for (const value of values) {
            if (value) {
                hasValues = true;
                break;
            }
        }
        return hasValues;
    };

    const enableEdit = () => {
        setPersonalDetails({ ...personalDetails, edit: true });
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
                <span className={commonStyles.headerText}>Personal Details</span>
                {hasValues(personalDetails) && !personalDetails.edit ? (
                    <span className={`${commonStyles.editorIcon} ${commonStyles.aligned}`}>
                        <FormOutlined onClick={enableEdit} />
                    </span>
                ) : null}
            </div>
            {personalDetails.edit && (
                <div className={commonStyles.addNew}>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Hometown" error={personalDetails.showError && !personalDetails.homeTown} />
                        <Input
                            value={personalDetails.homeTown}
                            onChange={e => {
                                onChange("homeTown", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Address" error={personalDetails.showError && !personalDetails.address} />
                        <Input
                            value={personalDetails.address}
                            onChange={e => {
                                onChange("address", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel
                            name="Mobile Number"
                            error={personalDetails.showError && !personalDetails.mobilePhoneNumber}
                        />
                        <Input
                            value={personalDetails.mobilePhoneNumber}
                            onChange={e => {
                                onChange("mobilePhoneNumber", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel
                            name="Telephone Number"
                            error={personalDetails.showError && !personalDetails.homePhoneNumber}
                        />
                        <Input
                            value={personalDetails.homePhoneNumber}
                            onChange={e => {
                                onChange("homePhoneNumber", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Date of Birth" />
                        <div className={styles.datePicker}>
                            <DatePicker
                                value={
                                    personalDetails.dateOfBirth ? moment(personalDetails.dateOfBirth, dateFormat) : ""
                                }
                                format={dateFormat}
                                onChange={(date, dateString) => {
                                    onChange("dateOfBirth", dateString);
                                }}
                                placeholder="Select Date"
                                style={{ width: "280px" }}
                            />
                        </div>
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Gender" error={personalDetails.showError && !personalDetails.gender} />
                        <Input
                            value={personalDetails.gender}
                            onChange={e => {
                                onChange("gender", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Martial State" />
                        <Select
                            value={personalDetails.martialStatus}
                            onChange={value => {
                                onChange("martialStatus", value);
                            }}
                            style={{ width: "100%" }}
                        >
                            <Option value="married">Married</Option>
                            <Option value="single">Single</Option>
                        </Select>
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Introduce Yourself" />
                        <TextArea
                            rows={5}
                            value={personalDetails.introduction}
                            onChange={e => {
                                onChange("introduction", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.buttonContainer}>
                        <Button size="large" onClick={() => onCancel()}>
                            Cancel
                        </Button>
                        <Button size="large" onClick={() => onSave(personalDetails._id)}>
                            Save
                        </Button>
                    </div>
                </div>
            )}
            {!personalDetails.edit && (
                <div className={commonStyles.detailBlock}>
                    <span className={styles.subHeader}>Home Town</span>
                    <span className={styles.value}>{personalDetails.homeTown}</span>
                    <span className={styles.subHeader}>Address</span>
                    <span className={styles.value}>{personalDetails.address}</span>
                    <span className={styles.subHeader}>Mobile Number</span>
                    <span className={styles.value}>{personalDetails.mobilePhoneNumber}</span>
                    <span className={styles.subHeader}>Telephone Number</span>
                    <span className={styles.value}>{personalDetails.homePhoneNumber}</span>
                    <span className={styles.subHeader}>Date Of Birth</span>
                    <span className={styles.value}>{getFormattedDate(personalDetails.dateOfBirth)}</span>
                    <span className={styles.subHeader}>Gender</span>
                    <span className={styles.value}>{personalDetails.gender}</span>
                    <span className={styles.subHeader}>Martial Status</span>
                    <span className={styles.value}>{personalDetails.martialStatus}</span>
                    <span className={styles.subHeader}>Introduce Yourself</span>
                    <div className={styles.value}>{personalDetails.introduction}</div>
                </div>
            )}
            {!personalDetails.edit && (
                <div className={hasValues(personalDetails) ? commonStyles.addMore : commonStyles.addNewRecord}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={addPersonalDetails}
                    />
                    <span className={commonStyles.textButton}>
                        <Button type="link" onClick={addPersonalDetails}>
                            Add Personal Details
                        </Button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProfilePersonalDetails;
