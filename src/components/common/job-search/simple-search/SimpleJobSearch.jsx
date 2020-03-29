import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import AddPromoCard from "../../cards/add-promo-card/AddPromoCard";
import styles from "./SimpleJobSearch.module.css";
import SearchComp from "../search-comp/SearchComp";

const SimpleJobSearch = props => {
    const [jobSearchOpened, setOpenedState] = useState(false);
    return (
        <div className={styles.simpleSeach}>
            <Row>
                <div className={styles.qouteSection}>
                    <span className={styles.qoute}>
                        "Opportunities don't often come along, So when they do, you have to grab them."
                    </span>
                    <span className={styles.qouteBy}>-Audery Hepburn</span>
                </div>
            </Row>
            <SearchComp setOpenedState={setOpenedState} />
            <Row>
                <div
                    className={styles.buttonSection}
                    style={!jobSearchOpened ? { visibility: "hidden" } : { visibility: "visible" }}
                >
                    <Row justify="end" type="flex" gutter={10}>
                        <Col xs={24} sm={12} md={6} lg={3} style={{ float: "right" }}>
                            <Link className={styles.textButton} to="/job-post">
                                Post a Job
                            </Link>
                        </Col>
                        <Col xs={24} sm={12} md={6} lg={3} style={{ float: "right" }}>
                            <button className={styles.textButton}>Advance Search</button>
                        </Col>
                    </Row>
                </div>
            </Row>
            <Row className={styles.addSection}>
                <Col xs={24} sm={24} md={12} lg={12} style={{ textAlign: "right", height: "100%" }}>
                    <AddPromoCard
                        linkPath="/resume"
                        linkText="Upload/Build Resume"
                        title="Make Your Search Easy"
                        messageOne="Upload your resume"
                        messageTwo="Don't have a resume? Build one in 3 steps"
                    />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} style={{ textAlign: "left", height: "100%" }}>
                    <AddPromoCard
                        linkText="Create Job Alert"
                        linkPath="/job-alert"
                        title="Free Job Alert"
                        messageOne="Get an Email matching your criteria"
                        messageTwo="No Registration Required"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default SimpleJobSearch;
