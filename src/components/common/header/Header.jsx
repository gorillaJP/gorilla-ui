import React, { useState } from "react";
import { Button, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Menu, Dropdown } from "antd";
// import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

// import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";
import { useEffect } from "react";
import { Container } from "../container/Container";
import MobileMenu from "./MobileMenu";
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

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

const moreJobs = [
    {
        linkName: "Contract Jobs",
        linkPath: "/contract-jobs"
    },
    {
        linkName: "Part Time Jobs",
        linkPath: "/part-time-jobs"
    },
    {
        linkName: "Fresher Jobs",
        linkPath: "/fresher-jobs"
    },
    {
        linkName: "Foreign Jobs",
        linkPath: "/foreign-jobs"
    },
    {
        linkName: "Free Job Alerts",
        linkPath: "/free-job-alerts"
    },
    {
        linkName: "Search Tips",
        linkPath: "/search-tips"
    },
    {
        linkName: "Testimonials",
        linkPath: "/testimonials"
    },
    {
        linkName: "Contact Us",
        linkPath: "/contact-us"
    }
];

const profileLinks = [
    {
        linkName: "My Profile",
        linkPath: "/profile"
    },
    {
        linkName: "Manage Job Alerts",
        linkPath: "/job-alerts"
    },
    {
        linkName: "Settings",
        linkPath: "/settings"
    },
    {
        linkName: "Change Password",
        linkPath: "/change-password"
    },
    {
        linkName: "Log Out",
        linkPath: "/logout"
    }
];

const HeaderComp = props => {
    let location = useLocation();
    const [previousPathName, setPreviousPathName] = useState("/");

    useEffect(() => {
        if (previousPathName !== location.pathname) {
            setPreviousPathName(location.pathname);

            if (props.mobileMenuOpen) {
                props.toggleMenu(false);
            }
        }
    }, [location, previousPathName, props]);

    return (
        <header>
            <div className={styles.headerComp}>
                <Container>
                    <div className={styles.headerWrapper}>
                        <Link to="/" className={styles.brand}>
                            Gorilla
                        </Link>
                        <div className={styles.header}>
                            <span className={styles.submenu}>Search Jobs</span>
                            <span className={styles.submenu}>Industries</span>
                            <span className={styles.submenu}>Locations</span>
                            <span className={styles.submenu}>Companies</span>
                            <Dropdown overlay={LinkDropDownContent(moreJobs)}>
                                <span className={styles.submenu}>More</span>
                            </Dropdown>
                        </div>
                        {!props.userLoggeIn && (
                            <div className={styles.actionButtons}>
                                <Link to="/signin">
                                    <div className={styles.loginButton}>
                                        <Button icon="user" size="large">
                                            <span>Login / Sign Up</span>
                                        </Button>
                                    </div>
                                </Link>

                                <Link to="/signup">
                                    <div className={styles.employersButton}>
                                        <Button type="primary" size="large">
                                            <span>For Employers</span>
                                        </Button>
                                    </div>
                                </Link>
                            </div>
                        )}
                        {props.userLoggeIn && (
                            <div className={styles.actionButtons}>
                                <SettingOutlined className={styles.settingsIcon} />
                                <Avatar size={60} icon={<UserOutlined />} />
                                <Dropdown overlay={LinkDropDownContent(profileLinks)} className={styles.userMenu}>
                                    <span className={styles.submenu}>{props.userProfile.firstname}</span>
                                </Dropdown>
                            </div>
                        )}
                        <div className={styles.menuBtn}>
                            {props.mobileMenuOpen && (
                                <Button
                                    ghost
                                    onClick={() => props.toggleMenu(!props.mobileMenuOpen)}
                                    style={{ border: "none", fontSize: "20px", padding: 0 }}
                                >
                                    <MenuUnfoldOutlined />
                                </Button>
                            )}
                            {!props.mobileMenuOpen && (
                                <Button
                                    ghost
                                    onClick={() => props.toggleMenu(!props.mobileMenuOpen)}
                                    style={{ border: "none", fontSize: "20px", padding: 0 }}
                                >
                                    <MenuFoldOutlined />
                                </Button>
                            )}
                        </div>
                    </div>
                </Container>
                <div className={styles.menuContainer}>
                    <div className={`${styles.rightMenu} ${props.mobileMenuOpen ? styles.opened : ""}`}>
                        <MobileMenu
                            userLoggeIn={props.userLoggeIn}
                            moreJobs={moreJobs}
                            profileLinks={profileLinks}
                            userName={props.userProfile.firstname}
                            opened={props.mobileMenuOpen}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComp;
