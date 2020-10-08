import React, { useState, useEffect } from "react";
import * as commonStyles from "../ProfilePage.module.css";
import { Button, DatePicker, Input, Select } from "antd";
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
        const response = await saveJobPreference(jobPreference, props.token);
        props.endLoad();
        if (response && response.data) {
            setJobPreference({ ...jobPreference, edit: false });
            props.updateProfile(response.data);
        } else {
            // TODO : show error
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
    };

    return (
        <div className={commonStyles.sectionWrapper}>
            <div className={commonStyles.header}>
                <span className={commonStyles.headerText}>Job Preference</span>
                {hasValues(jobPreference) && (
                    <span className={commonStyles.editorIcon}>
                        <FormOutlined />
                    </span>
                )}
            </div>
            {jobPreference.edit && (
                <div className={commonStyles.addNew}>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Industry" error={jobPreference.showError && !jobPreference.industry} />
                        <Input
                            value={jobPreference.industry}
                            onChange={e => {
                                onChange("industry", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Category" error={jobPreference.showError && !jobPreference.category} />
                        <Input
                            value={jobPreference.category}
                            onChange={e => {
                                onChange("category", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Job Type" error={jobPreference.showError && !jobPreference.jobType} />
                        <Input
                            value={jobPreference.jobType}
                            onChange={e => {
                                onChange("jobType", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Role" error={jobPreference.showError && !jobPreference.role} />
                        <Input
                            value={jobPreference.role}
                            onChange={e => {
                                onChange("role", e.target.value);
                            }}
                        />
                    </div>
                    <div className={commonStyles.addFormLabel}>
                        <FormLabel name="Preferred Location" />
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
                    <span className={styles.industry}>{jobPreference.industry}</span>
                    <span className={styles.category}>{jobPreference.category}</span>
                    <span className={styles.jobType}>{jobPreference.jobType}</span>
                    <span className={styles.role}>{jobPreference.role}</span>
                    <span className={styles.preferredLocation}>{jobPreference.jobPreference}</span>
                    <span className={styles.salary}>
                        {jobPreference.expectedSalary + " " + jobPreference.expectedSalaryCurrency}
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
