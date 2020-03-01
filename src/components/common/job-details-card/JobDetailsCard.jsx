import React from "react";
import styles from "./JobDetailsCard.module.css";
import { Button } from "antd";

import { createMarkUp } from "../../../util";

const MinMax = props => {
    let { minVal, maxVal, label, unit } = props;
    if (minVal && maxVal) {
        return (
            <div className={styles.otherDetails}>
                {label}: {minVal}
                {unit} - {maxVal}
                {unit}
            </div>
        );
    } else if (minVal && !maxVal) {
        return (
            <div className={styles.otherDetails}>
                {label}: Minimum {minVal}
                {unit}
            </div>
        );
    } else if (!minVal && maxVal) {
        return (
            <div className={styles.otherDetails}>
                {label}: Maximum {maxVal}
                {unit}
            </div>
        );
    } else {
        return <div />;
    }
};

const JobDetailsCard = props => {
    const { job } = props;

    return (
        <div className={styles.jobDetailsCardWrapper}>
            <div className={styles.meta}>
                {job.title && (
                    <div className={styles.title}>
                        {job.title} {job.type ? ` - (${job.type})` : ""}
                    </div>
                )}
                {job.company && <div className={styles.company}>{job.company}</div>}
                {job.experiance && <div className={styles.experiance}>Required Experience - {job.experiance}</div>}
                {job.location && <div className={styles.location}>{job.location}</div>}
            </div>
            {job.overview && <div className={styles.overview}>{job.overview}</div>}
            {job.description && (
                <div className={styles.description}>
                    <div dangerouslySetInnerHTML={createMarkUp(job.description)} />
                </div>
            )}
            {job.skills && (
                <>
                    <div className={styles.skills}>Required Skills - </div>
                    {job.skills.map((skill, i) => {
                        return (
                            <div className={styles.skill} key={i}>
                                {skill}
                            </div>
                        );
                    })}
                </>
            )}
            <MinMax minVal={job.salaryMin} maxVal={job.salaryMax} label="Salary" unit="LKR" />
            {job.bonus && (
                <div className={styles.otherDetails}>
                    {job.bonus} {job.bonusType ? `per ${job.bonusType}` : ""}
                </div>
            )}
            <MinMax minVal={job.experianceMin} maxVal={job.experianceMin} label="Experience" unit="years" />
            {job.level && <div className={styles.otherDetails}>Level - {job.level}</div>}
            {job.industry && <div className={styles.otherDetails}>Industry - {job.industry}</div>}
            <div className={styles.buttonContainer}>
                {job.notifyEmail && (
                    <div className={styles.actionButtons}>
                        <Button type="primary">Easy Apply</Button>
                    </div>
                )}
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
