import React from "react";

import { FOOTER_MESSAGE_SECTION_TITLE, FOOTER_MESSAGE_SECTION_MESSAGE } from "../../../../constants/MessageConstants";
import { Container } from "../../container/Container";
import styles from "./JobPostMessageCard.module.css";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const JobPostMessageCard = () => {
    const history = useHistory();
    return (
        <div className={styles.jobPostSection}>
            <Container>
                <h2>Employers</h2>
                <h3>{FOOTER_MESSAGE_SECTION_TITLE}</h3>
                <p>{FOOTER_MESSAGE_SECTION_MESSAGE}</p>
                <Button
                    size="large"
                    onClick={() => {
                        history.push("/job-post");
                    }}
                >
                    Post a Job
                </Button>
            </Container>
        </div>
    );
};

export default JobPostMessageCard;
