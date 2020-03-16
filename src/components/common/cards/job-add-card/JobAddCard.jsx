import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Icon } from "antd";
import Meta from "antd/lib/card/Meta";

import SkillList from "../../skill-list/SkillList";
import MinMax from "../../min-max/MinMax";
import styles from "./JobAddCard.module.css";
const JobAddCard = props => {
    return (
        <Card
            className={props.selected ? styles.selectedJobCard : styles.jobCard}
            bodyStyle={{ margin: "5px", padding: "5px" }}
            onClick={() => {
                props.onSelect && props.onSelect(props.jobId);
            }}
        >
            <Meta title={props.jobTitle} className={styles.antCardMetaAvatar}></Meta>
            <div className={styles.location}>
                {props.company} / {props.location}
                <MinMax minVal={props.salaryMin} maxVal={props.salarymax} label="Salary" unit="LKR" />
            </div>
            <SkillList skills={props.skills} guideText={false}></SkillList>
            <div className={styles.starIcon}>
                <Icon type="star" style={{ fontSize: "16px" }} />
            </div>
            <div className={styles.btnContainer}>
                <Button type="primary">Easy Apply</Button>
            </div>
        </Card>
    );
};

JobAddCard.prototypes = {
    jobTitle: PropTypes.string.isRequired,
    jobDescription: PropTypes.string.isRequired,
    jobId: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    selected: PropTypes.bool
};

JobAddCard.defaultProps = {
    selected: false
};

export default JobAddCard;
