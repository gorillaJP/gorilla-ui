import React from "react";
import { Row, Col } from "antd";

import SimpleJobSearch from "../../common/job-search/SimpleJobSearch";
import LandingPageCoverImage from "../../../images/landingpage-cover.jpg";
import styles from "./LandingPage.module.css";

class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <div
                    className={styles.searchBoxWrapper}
                    style={{ backgroundImage: `url(${LandingPageCoverImage})` }}
                >
                    <Row>
                        <Col xs="24" sm="24 " md="">
                            <div className={styles.jobSearchWrapper}>
                                <SimpleJobSearch />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default LandingPage;
