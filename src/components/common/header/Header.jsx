import React from "react";
import { Button, Row, Col } from "antd";
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
                        <Col sm={24} xs={24} md={4} lg={3} push={1}>
                            <a href="/">Gorilla</a>
                        </Col>
                        <Col sm={24} xs={24} md={14} lg={14}>
                            <Row>
                                <Col sm={12} xs={12} md={4}>
                                    <Dropdown overlay={LinkDropDownContent(this.state.items)}>
                                        <span className={styles.submenu}>Job Search</span>
                                    </Dropdown>
                                </Col>
                                <Col sm={12} xs={16} md={4}>
                                    <span className={styles.submenu}>Job Post</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={24} xs={24} md={6} lg={6}>
                            {!this.state.userLoggeIn && (
                                <>
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
                                </>
                            )}

                            {this.state.userLoggeIn && (
                                <div className={styles.logoutButton}>
                                    <Button type="primary" icon="logout" size="large">
                                        <span>Logout</span>
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Row>
                </nav>
            </header>
        );
    }
}

export default Header;
