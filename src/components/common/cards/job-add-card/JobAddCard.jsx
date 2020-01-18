import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Icon } from "antd";
import Meta from "antd/lib/card/Meta";

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
            <Meta
                title={props.jobTitle}
                description={props.jobDescription}
                className={styles.antCardMetaAvatar}
            />
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
