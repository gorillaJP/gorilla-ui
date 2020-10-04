import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import { Button, DatePicker, Input, Select } from "antd";
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
        console.log(props.personalDetails);
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
        } else {
            // TODO : show error
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
                {hasValues(personalDetails) && !personalDetails.edit && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined onClick={enableEdit} />
                    </span>
                )}
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
                    <span className={styles.homeTown}>{personalDetails.homeTown}</span>
                    <span className={styles.address}>{personalDetails.address}</span>
                    <span className={styles.mobilePhoneNumber}>{personalDetails.mobilePhoneNumber}</span>
                    <span className={styles.homePhoneNumber}>{personalDetails.homePhoneNumber}</span>
                    <span className={styles.gender}>{personalDetails.gender}</span>
                    <span className={styles.martialStatus}>{personalDetails.martialStatus}</span>
                    <span className={styles.period}>{getFormattedDate(personalDetails.dateOfBirth)}</span>
                    <div className={styles.introduction}>{personalDetails.introduction}</div>
                </div>
            )}
            {!personalDetails.edit && (
                <div className={hasValues(personalDetails) ? commonStyles.addMore : ""}>
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
