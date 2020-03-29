import React from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";

import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";
import { CloseOutlined, LoginOutlined, UserAddOutlined, MenuOutlined } from "@ant-design/icons";

const LinkDropDownContent = items => {
    return (
        <Menu>
            {items.map((item, i) => {
                return (
                    <Menu.Item key={i}>
                        <Link to={item.linkPath} className={styles.linkDropDown}>
                            {item.linkName}
                        </Link>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

const jobsByFunctionItems = [
    {
        linkName: "Jobs By Skill",
        linkPath: "/jobs-by-skill"
    },
    {
        linkName: "Jobs By Company",
        linkPath: "/jobs-by-company"
    },
    {
        linkName: "Jobs By Function",
        linkPath: "/jobs-by-function"
    }
];

const Header = props => {
    return (
        <header>
            <nav className={styles.header}>
                <Row gutter={[8, 8]}>
                    <Col xs={4} sm={4} md={1} lg={1} xl={1} push={1} className={styles.mobileMenu}>
                        {!props.mobileMenuOpen ? (
                            <MenuOutlined
                                onClick={() => {
                                    props.toggleMenu(true);
                                }}
                                className={styles.dropDownButton}
                            />
                        ) : (
                            <CloseOutlined
                                onClick={() => {
                                    props.toggleMenu(false);
                                }}
                                className={styles.dropDownButton}
                            />
                        )}
                    </Col>
                    <Col xs={14} sm={14} md={4} lg={3} className={styles.headerIcon} push={1}>
                        <Link to="/">Gorilla</Link>
                    </Col>
                    <Col sm={24} xs={24} md={11} lg={13} className={styles.desktopMenu} push={1}>
                        <Row justify="start" type="flex">
                            <div>
                                <Dropdown overlay={LinkDropDownContent(jobsByFunctionItems)}>
                                    <span className={styles.submenu}>Job Search</span>
                                </Dropdown>
                            </div>
                            <div>
                                <Link to="/job-post">
                                    <span className={styles.submenu}>Job Post</span>
                                </Link>
                            </div>
                        </Row>
                    </Col>
                    <Col sm={24} xs={24} md={8} lg={6} className={styles.desktopMenu} push={1}>
                        {!props.userLoggeIn && (
                            <Row justify="end" type="flex">
                                <div className={styles.loginButton}>
                                    <Button type="primary" icon="login" size="large">
                                        <span>Login</span>
                                    </Button>
                                </div>
                                <div className={styles.signupButton}>
                                    <Button type="primary" icon="user-add" size="large">
                                        <span>Signup</span>
                                    </Button>
                                </div>
                            </Row>
                        )}

                        {props.userLoggeIn && (
                            <div className={styles.logoutButton}>
                                <Button type="primary" icon="logout" size="large">
                                    <span>Logout</span>
                                </Button>
                            </div>
                        )}
                    </Col>
                    <Col xs={6} sm={6} className={styles.mobileMenu}>
                        <Row justify="end" type="flex">
                            <LoginOutlined className={styles.loginIcon} />
                            <UserAddOutlined className={styles.registerIcon} />
                        </Row>
                    </Col>
                </Row>
                {props.mobileMenuOpen && (
                    <Row>
                        <div className={styles.leftMenu}>
                            <MobileMenu />
                        </div>
                    </Row>
                )}
            </nav>
        </header>
    );
};

export default Header;
