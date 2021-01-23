import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { loadingFinished, loadingStarted } from "../../../../actions/CommonActions";
import Banner from "../../../common/banners/Banner";
import JobAddCard from "../../../common/cards/job-add-card/JobAddCard";
import { Container } from "../../../common/container/Container";
import JobDetailsCard from "../../../common/job-details-card/JobDetailsCard";
import * as styles from "./ContactedYou.module.css";

const ContactedYou = props => {
    let { jobId } = useParams();
    const [companyName, setCompanyName] = useState("");
    const [message, setMessage] = useState("");
    const [job, setJob] = useState({});

    useEffect(() => {}, [jobId]);

    return (
        <Container>
            {companyName && message && job._id ? (
                <>
                    <Banner
                        header={`You received a message from ${props.companyName}`}
                        closable
                        msg={props.message}
                        type="info"
                    />
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={8}>
                            <div className={styles.jobAdd}>
                                <JobAddCard job={props.job} hideApply={true}></JobAddCard>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16}>
                            <div className={styles.jobDetails}>
                                <JobDetailsCard job={props.job} />
                            </div>
                        </Col>
                    </Row>
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            startLoad: bindActionCreators(loadingStarted, dispatch),
            endLoad: bindActionCreators(loadingFinished, dispatch)
        }
    };
};

export default connect(undefined, mapDispatchToProps)(ContactedYou);
