import React, { useState } from "react";
import { Button, Avatar, Divider } from "antd";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import { Menu, Dropdown } from "antd";
// import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

// import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";
import { useEffect } from "react";
import { Container } from "../container/Container";
import MobileMenu from "./MobileMenu";
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { EMPLOYER, EMPLOYEE } from "../../../constants/AppConstants";
import { bindActionCreators } from "redux";
import { setUserDomain } from "../../../actions/MetaActions";
import { connect } from "react-redux";
import { logOut } from "../../../actions/UserAction";

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
    }
];

const UserProfileDropDownContent = props => {
    const { logOut } = props;
    return (
        <Menu>
            {profileLinks.map((item, i) => {
                return (
                    <Menu.Item key={i}>
                        <Link to={item.linkPath} className={styles.linkDropDown}>
                            {item.linkName}
                        </Link>
                    </Menu.Item>
                );
            })}
            <Menu.Item key="logout">
                <Link
                    className={styles.linkDropDown}
                    onClick={() => {
                        logOut();
                    }}
                >
                    Log Out
                </Link>
            </Menu.Item>
        </Menu>
    );
};

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

const HeaderComp = props => {
    let location = useLocation();
    const history = useHistory();

    const [previousPathName, setPreviousPathName] = useState("/");
    const { domain, userProfile, token } = props;

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
                        <div
                            className={`${styles.forEmployers} ${
                                domain === EMPLOYER ? styles.showText : styles.hideText
                            }`}
                        >
                            <Divider type="vertical" className={styles.divider} />
                            <div className={styles.forEmployersText}>
                                <span className={styles.forEmployersText}>For Employers</span>
                            </div>
                        </div>
                        <div className={styles.header}>
                            <div className={styles.subMenuWrapper}>
                                <span className={styles.submenu}>Search Jobs</span>
                                <span className={styles.submenu}>Industries</span>
                                <span className={styles.submenu}>Locations</span>
                                <span className={styles.submenu}>Companies</span>
                                <Dropdown overlay={LinkDropDownContent(moreJobs, this)}>
                                    <span className={styles.submenu}>More</span>
                                </Dropdown>
                            </div>
                        </div>
                        {!props.userLoggeIn && (
                            <div className={styles.actionButtons}>
                                <Link to={`/signin`}>
                                    <div className={styles.loginButton}>
                                        <Button icon={<UserOutlined />} size="large">
                                            <span>Login / Sign Up</span>
                                        </Button>
                                    </div>
                                </Link>

                                <div
                                    className={`${
                                        domain === EMPLOYEE ? styles.employersButton : styles.employeeButton
                                    }`}
                                >
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={() => {
                                            props.actions.setUserDomain(domain === EMPLOYEE ? EMPLOYER : EMPLOYEE);
                                            history.push("/signin");
                                        }}
                                    >
                                        <span>{domain === EMPLOYEE ? "For Employers" : "For Candidates"}</span>
                                    </Button>
                                </div>
                            </div>
                        )}
                        {props.userLoggeIn && (
                            <div className={styles.actionButtons}>
                                <SettingOutlined className={styles.settingsIcon} />
                                <Avatar size={50} icon={<UserOutlined />} />
                                <Dropdown
                                    overlay={UserProfileDropDownContent({ logOut: props.actions.logOut(token) })}
                                    className={styles.userMenu}
                                >
                                    <span className={styles.submenu}>{userProfile.firstname}</span>
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
                            userLogout={props.actions.logOut}
                            token={token}
                            moreJobs={moreJobs}
                            profileLinks={profileLinks}
                            userName={userProfile.firstname}
                            opened={props.mobileMenuOpen}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            setUserDomain: bindActionCreators(setUserDomain, dispatch),
            logOut: bindActionCreators(logOut, dispatch)
        }
    };
};

const mapStateToProps = state => {
    return {
        domain: state.metaData.domain,
        token: state.authData.token
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);
