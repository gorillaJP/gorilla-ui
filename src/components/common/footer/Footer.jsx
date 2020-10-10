import React, { useState } from "react";
import { Row, Col } from "antd";
import styles from "./Footer.module.css";
import Icon, {
    DownOutlined,
    UpOutlined,
    FacebookFilled,
    TwitterSquareFilled,
    LinkedinFilled,
    YoutubeFilled
} from "@ant-design/icons";
import { Container } from "../container/Container";
import { Link } from "react-router-dom";

const Footer = props => {
    return (
        <footer>
            <div className={styles.footer}>
                <Container>
                    <Row>
                        <Col
                            xs={{ order: 4, span: 24 }}
                            sm={{ order: 4, span: 24 }}
                            md={{ order: 1, span: 9 }}
                            lg={{ order: 1, span: 9 }}
                        >
                            <Link className={styles.companyName} to="/">
                                GorillaJobs
                            </Link>
                            <span className={styles.address}>Address</span>
                            <span className={styles.copyRight}>
                                © 2020 Gorilla (Private) Limited. All rights reserved.
                            </span>
                            <div className={styles.socialMedia}>
                                <span className={styles.header}>Stay Connected</span>
                                <span className={styles.icons}>
                                    <FacebookFilled
                                        style={{ fontSize: "25px", color: "#1877f2", marginRight: "5px" }}
                                    />
                                    <TwitterSquareFilled
                                        style={{ fontSize: "25px", color: "#1da1f2", marginRight: "5px" }}
                                    />
                                    <LinkedinFilled
                                        style={{ fontSize: "25px", color: "rgb(0, 119, 181)", marginRight: "5px" }}
                                    />
                                    <YoutubeFilled style={{ fontSize: "25px", color: "#c00", marginRight: "5px" }} />
                                </span>
                            </div>
                        </Col>
                        <Col
                            xs={{ order: 1, span: 24 }}
                            sm={{ order: 1, span: 24 }}
                            md={{ order: 2, span: 5 }}
                            lg={{ order: 2, span: 5 }}
                        >
                            <div>
                                <span className={styles.menuHeader}>Job Seekers</span>
                            </div>
                            <ul className={styles.menu}>
                                <li>Search Jobs</li>
                                <li>Job seekers login</li>
                                <li>Upload/Build Resume</li>
                                <li>Free Job Alerts</li>
                                <li>Search Tips</li>
                                <li>Help</li>
                            </ul>
                        </Col>
                        <Col
                            xs={{ order: 2, span: 24 }}
                            sm={{ order: 2, span: 24 }}
                            md={{ order: 3, span: 5 }}
                            lg={{ order: 3, span: 5 }}
                        >
                            <div>
                                <span className={styles.menuHeader}>EMPLOYERS</span>
                            </div>
                            <ul className={styles.menu}>
                                <li>Post Job</li>
                                <li>Employer Login</li>
                                <li>Price Packages</li>
                            </ul>
                        </Col>
                        <Col
                            xs={{ order: 3, span: 24 }}
                            sm={{ order: 3, span: 24 }}
                            md={{ order: 4, span: 5 }}
                            lg={{ order: 4, span: 5 }}
                        >
                            <div>
                                <span className={styles.menuHeader}>GORILLA</span>
                            </div>
                            <ul className={styles.menu}>
                                <li>About Us</li>
                                <li>Testimonials</li>
                                <li>Feedback</li>
                                <li>Terms and Privacy</li>
                                <li>Contact Us</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
