import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import { Button, DatePicker, Input, Select, message } from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";
import * as styles from "./ProfileJobPreference.module.css";
import FormLabel from "../../../common/form-label/FormLabel";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { saveJobPreference } from "../../../../api/ProfileApi";

const InputGroup = Input.Group;
const { Option } = Select;
const dateFormat = "YYYY/MM/DD";

const ProfileJobPreference = props => {
    const [jobPreference, setJobPreference] = useState({
        industry: "",
        category: "",
        jobType: "",
        role: "",
        preferredLocation: "",
        expectedSalaryCurrency: "",
        expectedSalary: ""
    });

    const [previousJobPreference, setPreviousJobPreference] = useState({});

    useEffect(() => {
        if (!jobPreference.edit && props.jobPreference) {
            setJobPreference(props.jobPreference);
            setPreviousJobPreference(props.jobPreference);
        }
    }, [props.jobPreference]);

    const addJobPreference = () => {
        setJobPreference({ ...jobPreference, edit: true });
    };

    const onCancel = () => {
        setJobPreference({ ...previousJobPreference });
    };

    const onSave = async () => {
        props.startLoad();
        const hasErrors = checkJobPreference(jobPreference);
        if (!hasErrors) {
            const response = await saveJobPreference(jobPreference, props.token);
            props.endLoad();
            if (response && response.data) {
                setJobPreference({ ...jobPreference, edit: false, showError: false });
                props.updateProfile(response.data);
                message.success("Successfully updated job preferences");
            } else {
                message.error("Error updating job preferences");
            }
        } else {
            props.endLoad();
            setJobPreference({ ...jobPreference, showError: true });
        }
    };

    const checkJobPreference = jobPreference => {
        if (!jobPreference.industry || !jobPreference.preferredLocation) {
            return true;
        } else {
            return false;
        }
    };

    const onChange = (key, value) => {
        setJobPreference({ ...jobPreference, [key]: value });
    };

    const hasValues = jobPreference => {
        let hasValues = false;
        const values = Object.values(jobPreference);

        for (const value of values) {
            if (value) {
                hasValues = true;
                break;
            }
        }
        return hasValues;
    };

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Job Preference</span>
                {hasValues(jobPreference) && !jobPreference.edit && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined onClick={addJobPreference} />
                    </span>
                )}
            </div>
            {jobPreference.edit && (
                <div className={commonStyles.addNew}>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel
                            name="Industry"
                            required
                            error={jobPreference.showError && !jobPreference.industry}
                        />
                        <Input
                            value={jobPreference.industry}
                            onChange={e => {
                                onChange("industry", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Category" />
                        <Input
                            value={jobPreference.category}
                            onChange={e => {
                                onChange("category", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Job Type" />
                        <Input
                            value={jobPreference.jobType}
                            onChange={e => {
                                onChange("jobType", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Role" />
                        <Input
                            value={jobPreference.role}
                            onChange={e => {
                                onChange("role", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel
                            name="Preferred Location"
                            required
                            error={jobPreference.showError && !jobPreference.preferredLocation}
                        />
                        <Select
                            value={jobPreference.preferredLocation}
                            onChange={value => {
                                onChange("preferredLocation", value);
                            }}
                            style={{ width: "100%" }}
                        >
                            {props.metaCities.map(city => {
                                return (
                                    <Option key={city.name} value={city.name}>
                                        {city.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Expected Salary" />

                        <InputGroup compact>
                            <Select
                                defaultValue="LKR"
                                style={{ width: "25%" }}
                                value={jobPreference.expectedSalaryCurrency}
                                onChange={value => {
                                    onChange("expectedSalaryCurrency", value);
                                }}
                            >
                                {props.metaCurrencies.map(currency => {
                                    return (
                                        <Option key={currency.name} value={currency.name}>
                                            {currency.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                            <Input
                                value={jobPreference.expectedSalary}
                                onChange={e => {
                                    onChange("expectedSalary", e.target.value);
                                }}
                                type="number"
                                style={{ display: "inline", width: "75%" }}
                            />
                        </InputGroup>
                    </div>
                    <div className={commonStyles.buttonContainer}>
                        <Button size="large" onClick={() => onCancel()}>
                            Cancel
                        </Button>
                        <Button size="large" onClick={() => onSave(jobPreference._id)}>
                            Save
                        </Button>
                    </div>
                </div>
            )}
            {!jobPreference.edit && (
                <div className={commonStyles.detailBlock}>
                    <span className={styles.subHeader}>Industry</span>
                    <span className={styles.value}>{jobPreference.industry}</span>
                    <span className={styles.subHeader}>Category</span>
                    <span className={styles.value}>{jobPreference.category}</span>
                    <span className={styles.subHeader}>Job Type</span>
                    <span className={styles.value}>{jobPreference.jobType}</span>
                    <span className={styles.subHeader}>Role</span>
                    <span className={styles.value}>{jobPreference.role}</span>
                    <span className={styles.subHeader}>Preferred Location</span>
                    <span className={styles.value}>{jobPreference.jobPreference}</span>
                    <span className={styles.subHeader}>Salary</span>
                    <span className={styles.value}>
                        {`${jobPreference.expectedSalaryCurrency ? jobPreference.expectedSalaryCurrency + " " : ""}${
                            jobPreference.expectedSalary
                        }`}
                    </span>
                </div>
            )}
            {!jobPreference.edit && (
                <div className={hasValues(jobPreference) ? commonStyles.addMore : ""}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={addJobPreference}
                    />
                    <span className={commonStyles.textButton}>
                        <Button type="link" onClick={addJobPreference}>
                            Add Personal Details
                        </Button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProfileJobPreference;
