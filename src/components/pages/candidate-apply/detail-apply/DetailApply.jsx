import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { getQuestionnaire } from "../../../../api/JobApi";
import JobAddCard from "../../../common/cards/job-add-card/JobAddCard";
import { Container } from "../../../common/container/Container";
import RedirectTo from "../../../common/redirect-to/RedirectTo";
import ApplyJob from "../ApplyJob";
import styles from "./DetailApply.module.css";

const DetailApply = props => {
    const { job } = props;
    const [questionnaire, setQuestionnaire] = useState({});
    const [isPitchRequired, setIsPitchRequired] = useState(false);
    const [hasQuestionnaire, setHasQuestionnaire] = useState(false);

    useEffect(() => {
        const fetchQuestionnaire = async () => {
            if (props.token) {
                const questionnaireData = await getQuestionnaire(job.questionnaireId, props.token);
                setQuestionnaire(questionnaireData);
            }
        };
        if (!job.hasApplied) {
            setIsPitchRequired(job.isPitchRequired);
            const hasQuestionnaire = job.questionnaireId ? true : false;
            setHasQuestionnaire(hasQuestionnaire);
            if (hasQuestionnaire) {
                fetchQuestionnaire();
            }
        }
    }, [props.job, props.token]);
    return (
        <>
            {job.hasApplied ? (
                <RedirectTo />
            ) : (
                <Container>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={8}>
                            <JobAddCard job={job} hideApply={true}></JobAddCard>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16}>
                            <div className={styles.applyWithPitchContainer}>
                                <ApplyJob
                                    withPitch={isPitchRequired}
                                    job={job}
                                    withQuestions={hasQuestionnaire}
                                    questionnaire={questionnaire}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default DetailApply;
