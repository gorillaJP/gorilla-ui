import React from "react";
import styles from "./JobDetailsCard.module.css";

const JobDetailsCard = props => {
    const { job } = props;
    return (
        <div className={styles.jobDetailsCardWrapper}>
            <span className={styles.title}>{job.title}</span>
            {job.company && <span className={styles.company}>{job.company}</span>}
            {job.experiance && (
                <span className={styles.experiance}>
          Required Experience - {job.experiance}
                </span>
            )}
            {job.location && <span className={styles.location}>{job.location}</span>}
            {job.description && (
                <div className={styles.description}>{job.description}</div>
            )}
            {job.skills && (
                <>
                    <span className={styles.skills}>Required Skills - </span>
                    {job.skills.map(skill => {
                        return <span className={styles.skill}>{skill}</span>;
                    })}
                </>
            )}
        </div>
    );
};

export default JobDetailsCard;
