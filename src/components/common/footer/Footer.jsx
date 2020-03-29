import React, { useState } from "react";
import { Row, Col } from "antd";
import styles from "./Footer.module.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const SubMenuArrow = props => {
    return (
        <span className={styles.menuArrowHead}>
            {!props.keyVal ? (
                <DownOutlined onClick={() => props.onClickFunc(props.keyName)} />
            ) : (
                <UpOutlined type="up" onClick={() => props.onClickFunc(props.keyName)} />
            )}
        </span>
    );
};

const Footer = props => {
    const [menuState, setMenuState] = useState({
        jobSeekerMenu: false,
        employerMenu: false,
        stayConnectedMenu: false,
        contactUsMenu: false
    });

    const setMenuStateFunc = menuName => {
        let newState = { ...menuState };
        newState[menuName] = !newState[menuName];
        setMenuState(newState);
    };

    return (
        <footer>
            <div className={styles.footer}>
                <Row>
                    <Col xs={23} sm={23} md={5} lg={5} push={1}>
                        <div className={styles.menuHeader}>
                            <span>Job Seekers</span>
                            <SubMenuArrow
                                keyName="jobSeekerMenu"
                                keyVal={menuState.jobSeekerMenu}
                                onClickFunc={setMenuStateFunc}
                            />
                        </div>
                        <ul className={menuState.jobSeekerMenu ? styles.showMenu : styles.menuItems}>
                            <li>Job By Skill</li>
                            <li>Job By Function</li>
                            <li>Job By Company</li>
                        </ul>
                    </Col>
                    <Col xs={23} sm={23} md={6} lg={6} push={1}>
                        <div className={styles.menuHeader}>
                            <span>Employers</span>
                            <SubMenuArrow
                                keyName="employerMenu"
                                keyVal={menuState.employerMenu}
                                onClickFunc={setMenuStateFunc}
                            />
                        </div>
                        <ul className={menuState.employerMenu ? styles.showMenu : styles.menuItems}>
                            <li>Job By Skill</li>
                            <li>Job By Function</li>
                            <li>Job By Company</li>
                        </ul>
                    </Col>
                    <Col xs={23} sm={23} md={6} lg={6} push={1}>
                        <div className={styles.menuHeader}>
                            <span>Stay Connected</span>
                            <SubMenuArrow
                                keyName="stayConnectedMenu"
                                keyVal={menuState.stayConnectedMenu}
                                onClickFunc={setMenuStateFunc}
                            />
                        </div>
                        <ul className={menuState.stayConnectedMenu ? styles.showMenu : styles.menuItems}>
                            <li>Gmail</li>
                            <li>Facebook</li>
                            <li>Twitter</li>
                        </ul>
                    </Col>
                    <Col xs={23} sm={23} md={5} lg={5} push={1}>
                        <div className={styles.menuHeader}>
                            <span>Terms and Conditions</span>
                            <SubMenuArrow
                                keyName="contactUsMenu"
                                keyVal={menuState.contactUsMenu}
                                onClickFunc={setMenuStateFunc}
                            />
                        </div>
                        <ul className={menuState.contactUsMenu ? styles.showMenu : styles.menuItems}>
                            <li>Terms</li>
                            <li>Conditions</li>
                            <li>FAQ</li>
                            <li>Contact Us</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
