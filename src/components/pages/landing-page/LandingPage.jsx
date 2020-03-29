import React from "react";
import { Row, Col } from "antd";

import SimpleJobSearch from "../../common/job-search/simple-search/SimpleJobSearch";
import LandingPageCoverImage from "../../../images/landingpage-cover.jpg";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    return (
        <div>
            <div className={styles.searchBoxWrapper} style={{ backgroundImage: `url(${LandingPageCoverImage})` }}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <div className={styles.jobSearchWrapper}>
                            <SimpleJobSearch />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default LandingPage;
