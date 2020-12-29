import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "antd";
import moment from "moment";
import { HeartFilled, HeartTwoTone, ShareAltOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SkillList from "../../skill-list/SkillList";
import MinMax from "../../min-max/MinMax";
import styles from "./JobAddCard.module.css";
import EasyApply from "../../../pages/candidate-apply/easy-apply/EasyApply";
import { saveJob, unSaveJob } from "../../../../actions/JobActions";

const JobAddCard = props => {
    const [showEasyApply, setShowEasyApply] = useState(false);

    const { skills, salaryMin, salaryMax, company, location, title, type, createdat, hasSaved, hasApplied } = props.job;
    const jobId = props.job._id;
    const createdAtDate = moment(createdat);
    const timeNow = moment();
    const totalHours = moment.duration(timeNow.diff(createdAtDate)).asHours();
    const days = Math.floor(totalHours / 24);
    const hours = Math.floor(totalHours % 24);

    const saveJob = jobId => {
        props.actions.saveJob(jobId, props.token);
    };

    const unSaveJob = jobId => {
        props.actions.unSaveJob(jobId, props.token);
    };

    return (
        <>
            <EasyApply
                onCancel={() => {
                    setShowEasyApply(false);
                }}
                onOk={() => {
                    setShowEasyApply(false);
                }}
                show={showEasyApply}
                job={props.job}
            />
            <div
                className={props.selected ? styles.selectedJobCard : styles.jobCard}
                onClick={() => {
                    props.onSelect && props.onSelect(jobId);
                }}
                id={jobId}
            >
                <div className={styles.cardBody}>
                    <div className={styles.companyImg}>
                        <img
                            alt={company}
                            src={`https://gorilla.lk:444//upload_f5d82ceccb7082f64a141805be2390941.png`}
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.createdOn}>
                            {days > 0 ? `${days} days ` : ""} {hours} hours ago
                        </div>
                        <div className={styles.jobTitle}>{title}</div>
                        <div className={styles.jobMeta}>
                            {company ? <span>{company}</span> : null}
                            {location ? <span>{location}</span> : null}
                            {type ? <span>{type}</span> : null}
                        </div>
                        <div className={styles.salary}>
                            <MinMax minVal={salaryMin} maxVal={salaryMax} unit="LKR" noText />
                        </div>
                        {/* <SkillList skills={skills} guideText={false}></SkillList> */}
                        <div className={styles.starIcon}>
                            <ShareAltOutlined style={{ fontSize: "25px", marginRight: "10px" }} />
                            {hasSaved ? (
                                <HeartFilled
                                    style={{ fontSize: "25px", color: "#3280B3" }}
                                    onClick={() => {
                                        unSaveJob(jobId);
                                    }}
                                />
                            ) : (
                                <HeartTwoTone
                                    twoToneColor="#3280B3"
                                    style={{ fontSize: "25px" }}
                                    onClick={() => {
                                        saveJob(jobId);
                                    }}
                                />
                            )}
                        </div>

                        <div className={styles.btnContainer}>
                            {hasApplied ? (
                                <span>Already Applied</span>
                            ) : !props.hideApply ? (
                                props.job.isPitchRequired ? (
                                    <a href={`/candidate/apply/${props.job._id}`} target="blank">
                                        <Button type="primary">Apply</Button>
                                    </a>
                                ) : (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setShowEasyApply(true);
                                        }}
                                        className={styles.easyApplyBtn}
                                    >
                                        Easy Apply
                                    </Button>
                                )
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

JobAddCard.defaultProps = {
    hideApply: false
};

JobAddCard.prototypes = {
    jobTitle: PropTypes.string.isRequired,
    jobDescription: PropTypes.string.isRequired,
    jobId: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    selected: PropTypes.bool,
    onEasyApply: PropTypes.func,
    hideApply: PropTypes.boolean
};

JobAddCard.defaultProps = {
    selected: false
};

const mapStateToProps = state => {
    return {
        token: state.authData.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            saveJob: bindActionCreators(saveJob, dispatch),
            unSaveJob: bindActionCreators(unSaveJob, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobAddCard);
