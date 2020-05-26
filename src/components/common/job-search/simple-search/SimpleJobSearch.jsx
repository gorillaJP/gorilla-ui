import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Divider } from "antd";

import AddPromoCard from "../../cards/add-promo-card/AddPromoCard";
import styles from "./SimpleJobSearch.module.css";
import SearchComp from "../search-comp/SearchComp";
import AdvancedSerachModal from "../advance-search/AdvancedJobSearchModal";

const SimpleJobSearch = props => {
    const [jobSearchOpened, setOpenedState] = useState(false);
    const [showAdvnaceSearch, setShowAdvanceSearch] = useState(false);
    return (
        <div className={styles.simpleSeach}>
            <div className={`${styles.searchBox} ${jobSearchOpened ? styles.searchOpened : ""}`}>
                <span className={styles.searchHeader}>Find jobs with Gorilla...</span>
                <SearchComp showSearchButton={true} setOpenedState={setOpenedState} from="home" />
                <Button
                    type="link"
                    className={styles.addvanceSearchBtn}
                    onClick={() => {
                        setShowAdvanceSearch(true);
                    }}
                >
                    Advanced Search
                </Button>
            </div>
            <div className={`${styles.actionsBox} ${jobSearchOpened ? styles.searchOpened : ""}`}>
                <span>Make Your Search Easy</span>
                <span>Upload your resume</span>
                <span>Don't have a resume? Build one in 3 steps</span>
                <div className={styles.uploadResume}>
                    <Button size="large">Upload/Build Resume</Button>
                </div>
                <Divider plain style={{ marginTop: "10px", marginBottom: "10px" }}></Divider>
                <span>Free Job Alert</span>
                <span>Get an Email matching your criteria</span>
                <span>No Regirstration Required</span>
                <div className={styles.createJobAlert}>
                    <Button size="large">Create Job Alert</Button>
                </div>
            </div>
            {/* <Row>
                <div
                    className={styles.buttonSection}
                    style={!jobSearchOpened ? { display: "none" } : { visibility: "visible", width: "100%" }}
                >
                    <Row justify="end" style={{ width: "100%" }}>
                        <Col xs={24} sm={12} md={6} lg={3} style={{ float: "right" }}>
                            <Link className={styles.textButton} to="/job-post">
                                Post a Job
                            </Link>
                        </Col>
                        <Col xs={24} sm={12} md={6} lg={3} style={{ float: "right" }}>
                            <button
                                className={styles.textButton}
                                onClick={() => {
                                    setShowAdvanceSearch(true);
                                }}
                            >
                                Advance Search
                            </button>
                        </Col>
                    </Row>
                </div>
            </Row> */}
            {/* <Row className={styles.addSection}>
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
             */}
            {showAdvnaceSearch ? <AdvancedSerachModal setShow={setShowAdvanceSearch} /> : null}
        </div>
    );
};

export default SimpleJobSearch;
