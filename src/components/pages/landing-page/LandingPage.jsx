import React, { useState } from "react";
import { Row, Col } from "antd";

import SimpleJobSearch from "../../common/job-search/SimpleJobSearch";
import LandingPageCoverImage from "../../../images/landingpage-cover.jpg";
import styles from "./LandingPage.module.css";

const LandingPage = props => {
    const [jobSearchOpened, setJobSearchOpen] = useState(false);
    return (
        <div>
            <div
                className={styles.searchBoxWrapper}
                style={{ backgroundImage: `url(${LandingPageCoverImage})` }}
            >
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <div className={styles.jobSearchWrapper}>
                            <SimpleJobSearch
                                setOpenedState={setJobSearchOpen}
                                opened={jobSearchOpened}
                            />
                        </div>
                    </Col>
                    {/*
                        <Col xs={24} sm={24} md={24} lg={16}>
                            <div> Show profile completion</div>
                        </Col>
                    */}
                </Row>
            </div>
        </div>
    );
};

export default LandingPage;
