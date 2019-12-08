import React from "react";
import { Button, Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";

import { Menu, Dropdown } from "antd";
import styles from "./Header.module.css";

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

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoggeIn: false,
            openSideMenu: false,
            items: [
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
            ]
        };
    }

    render() {
        return (
            <header>
                <nav className={styles.header}>
                    <Row gutter={[8, 8]}>
                        <Col
                            xs={4}
                            sm={4}
                            md={1}
                            lg={1}
                            xl={1}
                            push={1}
                            className={styles.mobileMenu}
                        >
                            <Icon
                                type="menu"
                                onClick={() => {
                                    this.setState({ openSideMenu: !this.state.openSideMenu });
                                }}
                            />
                        </Col>
                        <Col
                            xs={14}
                            sm={14}
                            md={4}
                            lg={3}
                            className={styles.headerIcon}
                            push={1}
                        >
                            <a href="/">Gorilla</a>
                        </Col>
                        <Col
                            sm={24}
                            xs={24}
                            md={11}
                            lg={13}
                            className={styles.desktopMenu}
                            push={1}
                        >
                            <Row justify="start" type="flex">
                                <div>
                                    <Dropdown overlay={LinkDropDownContent(this.state.items)}>
                                        <span className={styles.submenu}>Job Search</span>
                                    </Dropdown>
                                </div>
                                <div>
                                    <span className={styles.submenu}>Job Post</span>
                                </div>
                            </Row>
                        </Col>
                        <Col
                            sm={24}
                            xs={24}
                            md={8}
                            lg={6}
                            className={styles.desktopMenu}
                            push={1}
                        >
                            {!this.state.userLoggeIn && (
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

                            {this.state.userLoggeIn && (
                                <div className={styles.logoutButton}>
                                    <Button type="primary" icon="logout" size="large">
                                        <span>Logout</span>
                                    </Button>
                                </div>
                            )}
                        </Col>
                        <Col xs={6} sm={6} className={styles.mobileMenu}>
                            <Row justify="end" type="flex">
                                <Icon type="login" />
                                <Icon type="user-add" />
                            </Row>
                        </Col>
                    </Row>
                </nav>
            </header>
        );
    }
}

export default Header;
