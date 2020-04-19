import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import MobileMenu from "./MobileMenu";
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
            <nav>
                <div className={styles.header}>
                    <Link to="/" className={styles.brand}>
                        Gorilla
                    </Link>
                    <div class={styles.headerLinks}>
                        <div className={styles.headerLink}>
                            <Dropdown overlay={LinkDropDownContent(jobsByFunctionItems)}>
                                <span className={styles.submenu}>Job Search</span>
                            </Dropdown>
                        </div>
                        <div className={styles.headerLink}>
                            <Link to="/job-post">
                                <span className={styles.submenu}>Job Post</span>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.userActions}>
                        {!props.userLoggeIn && (
                            <div className={styles.loginButton}>
                                <Button type="primary" icon="login" size="large">
                                    <span>Login</span>
                                </Button>
                            </div>
                        )}
                        {!props.userLoggeIn && (
                            <Link to="/signup">
                                <div className={styles.signupButton}>
                                    <Button type="primary" icon="user-add" size="large">
                                        <span>Signup</span>
                                    </Button>
                                </div>
                            </Link>
                        )}
                        {props.userLoggeIn && (
                            <div className={styles.logoutButton}>
                                <Button type="primary" icon="logout" size="large">
                                    <span>Logout</span>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className={styles.menuBtn}>
                        {props.mobileMenuOpen && (
                            <Button
                                ghost
                                onClick={() => props.toggleMenu()}
                                style={{ border: "none", fontSize: "20px", padding: 0 }}
                            >
                                <MenuUnfoldOutlined />
                            </Button>
                        )}
                        {!props.mobileMenuOpen && (
                            <Button
                                ghost
                                onClick={() => props.toggleMenu()}
                                style={{ border: "none", fontSize: "20px", padding: 0 }}
                            >
                                <MenuFoldOutlined />
                            </Button>
                        )}
                    </div>
                </div>

                <div className={`${styles.leftMenu} ${props.mobileMenuOpen ? styles.visible : ""}`}>
                    <MobileMenu />
                </div>
            </nav>
        </header>
    );
};

export default Header;
