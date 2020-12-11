import React, { useState } from "react";
import { StarOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Card, Button } from "antd";
import Meta from "antd/lib/card/Meta";

import SkillList from "../../skill-list/SkillList";
import MinMax from "../../min-max/MinMax";
import styles from "./JobAddCard.module.css";
import EasyApply from "../../../pages/candidate-apply/easy-apply/EasyApply";

const JobAddCard = props => {
    const [showEasyApply, setShowEasyApply] = useState(false);

    const { skills, salaryMin, salaryMax, title, company, location } = props.job;
    const jobId = props.job._id;

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
            <Card
                className={props.selected ? styles.selectedJobCard : styles.jobCard}
                bodyStyle={{ margin: "5px", padding: "5px" }}
                onClick={() => {
                    props.onSelect && props.onSelect(jobId);
                }}
                id={jobId}
            >
                <Meta title={props.jobTitle} className={styles.antCardMetaAvatar}></Meta>
                <div className={styles.location}>
                    {company} / {location}
                    <MinMax minVal={salaryMin} maxVal={salaryMax} label="Salary" unit="LKR" />
                </div>
                <SkillList skills={skills} guideText={false}></SkillList>
                <div className={styles.starIcon}>
                    <StarOutlined style={{ fontSize: "16px" }} />
                </div>

                <div className={styles.btnContainer}>
                    {props.job.hasApplied ? (
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
                            >
                                Easy Apply
                            </Button>
                        )
                    ) : null}
                </div>
            </Card>
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

export default JobAddCard;
