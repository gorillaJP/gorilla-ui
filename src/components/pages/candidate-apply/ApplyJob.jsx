import { FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Radio, Button, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setUserProfile } from "../../../actions/UserAction";
import CurrencyAmount from "../../common/curreny-amount/CurrencyAmount";
import { saveJobPreference, savePersonalDetails, saveResume } from "../../../api/ProfileApi";

import * as commonStyles from "./CandidateApply.module.css";
import config from "../../../util/config";
import { bindActionCreators } from "redux";
import { loadingFinished, loadingStarted } from "../../../actions/CommonActions";
import { easyApply } from "../../../api/JobApi";
import { jobApplySuccess } from "../../../actions/JobActions";
import Editor from "../../common/editor/Editor";
import Questionnaire from "../../common/questionnaire/Questionnaire";
import EditablePhoneNumber from "./EditablePhoneNumber";
import EditableExpectedSalary from "./EditableExpectedSalary";
import { QUESTIONNAIRE_TITLE } from "../../../constants/AppConstants";

const ApplyJob = props => {
    const [selectedResume, setSelectedResume] = useState("");
    const [userProfile, setUserProfile] = useState({ personalInfo: {}, jobPreference: {}, resumes: [] });
    const [pitch, setPitch] = useState("");
    const [questionnaireAnswers, setQuestionnaireAnswers] = useState({});

    const [editPhoneNumber, setEditPhoneNumber] = useState(false);
    const [editExpectedSalary, setEditExpectedSalary] = useState(false);
    const [tempFileLabel, setTempFileLabel] = useState("");

    useEffect(() => {
        if (!editPhoneNumber && !editExpectedSalary && Object.values(props.profile).length) {
            setUserProfile(props.profile);
        }
    }, [props.profile]);

    const applyJob = async () => {
        props.actions.startLoad();
        let hasError = false;
        const requestObj = {
            jobId: props.job._id,
            name: userProfile.name,
            resume: selectedResume,
            expectedSalary: userProfile.jobPreference.expectedSalary,
            salaryCurrency: userProfile.jobPreference.expectedSalaryCurrency,
            pitch: pitch,
            phoneNumber: userProfile.personalInfo.mobilePhoneNumber,
            questionnaireAnswer: questionnaireAnswers
        };

        if (!selectedResume) {
            hasError = true;
            message.error("Please select resume");
        } else if (props.withPitch && !pitch) {
            hasError = true;
            message.error("Pitch required");
        }

        if (!hasError) {
            const response = await easyApply(requestObj, props.token);
            props.actions.endLoad();
            if (response) {
                message.success("Applied successfully");
                props.actions.jobApplySuccess(props.job._id);
                props.onComplete();
            } else {
                message.error("Failed to apply");
            }
        } else {
            props.actions.endLoad();
        }
    };

    const fileUploadProps = {
        name: "file",
        action: config.remote + "api/file/resume",
        method: "POST",
        showUploadList: false,
        headers: {
            authorization: `Bearer ${props.token}`,
            contentType: "multipart/form-data"
        },
        onChange(info) {
            if (info.file.status === "done") {
                const { response } = info.file;
                updateProfileCV(response.payload.file, tempFileLabel);
            } else if (info.file.status === "error") {
                message.error("Error uploading the resume");
                props.actions.endLoad();
            }
        },
        beforeUpload(file) {
            setTempFileLabel(file.name);
            const isValidFileType = file.type.includes("document") || file.type === "application/pdf";
            if (!isValidFileType) {
                message.error("You can only upload docx/pdf file!");
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error("File must smaller than 2MB!");
            }

            if (isValidFileType && isLt2M) {
                props.actions.startLoad();
                return true;
            } else {
                return false;
            }
        }
    };

    const updateProfileCV = async (resumeURL, fileLabel) => {
        const response = await saveResume({ file: resumeURL, label: fileLabel }, props.token);
        props.actions.endLoad();
        if (response && response.data) {
            props.actions.updateProfile(response.data);
            message.success("Resume updated");
        } else {
            message.error("Error updating resume");
        }
    };

    return (
        <div>
            <span className={commonStyles.name}>{userProfile.name}</span>
            <div className={commonStyles.userDetails}>
                <div>{userProfile.email}</div>
                <div>
                    <EditablePhoneNumber
                        value={userProfile.personalInfo ? userProfile.personalInfo.mobilePhoneNumber : ""}
                        onBlur={async value => {
                            const personalInfo = { ...userProfile.personalInfo };
                            personalInfo.mobilePhoneNumber = value;
                            setUserProfile({ ...userProfile, personalInfo: { ...personalInfo } });

                            props.actions.startLoad();
                            const response = await savePersonalDetails(personalInfo, props.token);
                            props.actions.endLoad();
                            if (response && response.data) {
                                setEditPhoneNumber(false);
                                props.actions.updateProfile(response.data);
                                message.success("Personal details updated");
                            } else {
                                message.error("Error updating personal details");
                            }
                        }}
                        setEdit={value => {
                            setEditPhoneNumber(value);
                        }}
                    />
                </div>
                <div>
                    <EditableExpectedSalary
                        amount={userProfile.jobPreference ? userProfile.jobPreference.expectedSalary : ""}
                        currency={userProfile.jobPreference ? userProfile.jobPreference.expectedSalaryCurrency : ""}
                        onBlur={async (amount, currency) => {
                            const jobPreference = { ...userProfile.jobPreference };
                            jobPreference.expectedSalary = amount;
                            jobPreference.expectedSalaryCurrency = currency;
                            setUserProfile({ ...userProfile, jobPreference: { ...jobPreference } });

                            props.actions.startLoad();
                            const response = await saveJobPreference(jobPreference, props.token);
                            props.actions.endLoad();
                            if (response && response.data) {
                                setEditPhoneNumber(false);
                                props.actions.updateProfile(response.data);
                                message.success("JSuccessfully updated job preferences");
                            } else {
                                message.error("Error updating job preferences");
                            }
                            setEditExpectedSalary(false);
                        }}
                        setEdit={value => {
                            setEditExpectedSalary(value);
                        }}
                    />
                </div>
            </div>
            <div className={commonStyles.resumes}>
                {userProfile.resumes.length ? (
                    <>
                        Please select your resume
                        <Radio.Group
                            onChange={e => {
                                setSelectedResume(e.target.value);
                            }}
                            value={selectedResume}
                            size="middle"
                        >
                            {userProfile.resumes.map(resume => {
                                return (
                                    <Radio key={resume._id} value={resume._id}>
                                        <span className={commonStyles.resumeRadioLabel}>{resume.label}</span>
                                    </Radio>
                                );
                            })}
                        </Radio.Group>
                    </>
                ) : null}
                <Upload {...fileUploadProps} className={`${commonStyles.uploadNew} ${commonStyles.resumeUpload}`}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined style={{ fontSize: "14px" }} />}
                        size="small"
                    />
                    <Button type="link">
                        {userProfile.resumes.length ? "Or Upload New Resume" : "Please upload your resume"}
                    </Button>
                </Upload>
            </div>
            {props.withQuestions && (
                <div className={commonStyles.questionnaire}>
                    <Questionnaire
                        title={QUESTIONNAIRE_TITLE}
                        questionnaire={props.questionnaire}
                        onChange={questionnaireData => {
                            setQuestionnaireAnswers(questionnaireData);
                        }}
                    />
                </div>
            )}
            {props.withPitch && (
                <div className={commonStyles.withPitch}>
                    <span>Make your pitch / Cover letter</span>
                    <Editor
                        placeholder=""
                        value={pitch}
                        onChange={html => {
                            setPitch(html);
                        }}
                    />
                </div>
            )}
            <div className={commonStyles.sendToEmployerBtn}>
                <Button
                    onClick={() => {
                        applyJob();
                    }}
                >
                    Send to Employer
                </Button>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            updateProfile: bindActionCreators(setUserProfile, dispatch),
            startLoad: bindActionCreators(loadingStarted, dispatch),
            endLoad: bindActionCreators(loadingFinished, dispatch),
            jobApplySuccess: bindActionCreators(jobApplySuccess, dispatch)
        }
    };
};

const mapStateToProps = state => {
    return {
        token: state.authData.token,
        profile: state.authData.profile
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyJob);
