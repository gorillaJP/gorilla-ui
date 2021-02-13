import React, { useState } from "react";
import styles from "./JobDetailsCard.module.css";
import { Button } from "antd";

import SkillList from "../skill-list/SkillList";
import MinMax from "../min-max/MinMax";
import { createMarkUp } from "../../../util/Util";
import EasyApply from "../../pages/candidate-apply/easy-apply/EasyApply";

const JobDetailsCard = props => {
    const { job } = props;
    console.log(job);
    const [showEasyApply, setShowEasyApply] = useState(false);

    return (
        <div className={styles.jobDetailsCardWrapper}>
            <EasyApply
                onCancel={() => {
                    setShowEasyApply(false);
                }}
                onOk={() => {
                    setShowEasyApply(false);
                }}
                job={job}
                show={showEasyApply}
            />
            <div className={styles.meta}>
                {job.title && (
                    <div className={styles.title}>
                        {job.title} {job.type ? ` - (${job.type})` : ""}
                    </div>
                )}
                {job.company && <div className={styles.company}>{job.company}</div>}
                {job.experience && <div className={styles.experience}>Required Experience - {job.experience}</div>}
                {job.location && <div className={styles.location}>{job.location}</div>}
            </div>
            {job.overview && <div className={styles.overview}>{job.overview}</div>}
            {job.description && (
                <div className={styles.description}>
                    <div dangerouslySetInnerHTML={createMarkUp(job.description)} />
                </div>
            )}
            <SkillList skills={job.skills} guideText={true}></SkillList>
            <MinMax minVal={job.salaryMin} maxVal={job.salaryMax} label="Salary" unit="LKR" />
            {job.bonus && (
                <div className={styles.otherDetails}>
                    {job.bonus} {job.bonusType ? `per ${job.bonusType}` : ""}
                </div>
            )}
            <MinMax minVal={job.experiencemin} maxVal={job.experiencemin} label="Experience" unit="years" />
            {job.level && <div className={styles.otherDetails}>Level - {job.level}</div>}
            {job.industry && <div className={styles.otherDetails}>Industry - {job.industry}</div>}
            <div className={styles.buttonContainer}>
                {
                    <div className={styles.actionButtons}>
                        {!props.job.hasApplied ? (
                            props.job.isPitchRequired ? (
                                <a href={`/candidate/apply/${job._id}`} target="blank">
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
                        ) : (
                            <span>Already Applied</span>
                        )}
                    </div>
                }
                {job.redirectURL && (
                    <div className={styles.actionButtons}>
                        <Button type="primary" className={styles.actionButtons}>
                            Company URL
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDetailsCard;
