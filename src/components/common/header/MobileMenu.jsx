import React from "react";
import { Menu, Button, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
    SearchOutlined,
    UserOutlined,
    DownloadOutlined,
    EnvironmentOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";

import styles from "./Header.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserDomain } from "../../../actions/MetaActions";
import { EMPLOYEE, EMPLOYER } from "../../../constants/AppConstants";
import config from "../../../util/config";
import { getInitials } from "../../../util/Util";

const { SubMenu } = Menu;

const MobileMenu = props => {
    const { domain } = props;
    return (
        <Menu
            style={{ width: "100%" }}
            defaultSelectedKeys={["0"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={props.collapsed}
            className={`${props.opened ? styles.opened : ""}`}
            theme="light"
        >
            {!props.userLoggeIn && (
                <Menu.Item
                    key="login"
                    className={` ${styles.mobileMenuItem} ${styles.mobileMenuItemWithActionButtons}`}
                >
                    <div className={`${styles.actionButtons} ${styles.mobileMenu}`}>
                        <Link to="/signin">
                            <div className={styles.loginButton}>
                                <Button size="large">
                                    <span>Login / Sign Up</span>
                                </Button>
                            </div>
                        </Link>
                        <div className={`${domain === EMPLOYEE ? styles.employersButton : styles.employeeButton}`}>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => props.actions.setUserDomain(domain === EMPLOYEE ? EMPLOYER : EMPLOYEE)}
                            >
                                <span>{domain === EMPLOYEE ? "For Employers" : "For Candidates"}</span>
                            </Button>
                        </div>
                    </div>
                </Menu.Item>
            )}
            {props.userLoggeIn && (
                <SubMenu
                    key="user-details"
                    title={
                        <span>
                            {props.profile.profileImage ? (
                                <Avatar size={50} src={config.remote + props.profile.profileImage} />
                            ) : (
                                <Avatar size={50}>{getInitials(props.profile.name)}</Avatar>
                            )}
                            <span className={styles.userName}>{props.userName}</span>
                        </span>
                    }
                    className={`${styles.mobileMenuItem} ${styles.userDetails}`}
                >
                    {props.profileLinks.map((item, i) => {
                        return (
                            <Menu.Item key={i} className={styles.subMenuItem}>
                                <Link to={item.linkPath}>{item.linkName}</Link>
                            </Menu.Item>
                        );
                    })}

                    <Menu.Item key="logout" className={styles.subMenuItem}>
                        <Link
                            onClick={e => {
                                e.preventDefault();
                                props.userLogout(props.token);
                            }}
                        >
                            Log Out
                        </Link>
                    </Menu.Item>
                </SubMenu>
            )}
            <Menu.Item key="job-search" className={styles.mobileMenuItem}>
                <span>
                    <SearchOutlined />
                    <Link to={"/job-search"}>Job Search</Link>
                </span>
            </Menu.Item>
            <Menu.Item key="job-industries" className={styles.mobileMenuItem}>
                <span>
                    <DownloadOutlined />
                    <Link to={"/job-search"}>Industries</Link>
                </span>
            </Menu.Item>
            <Menu.Item key="job-locations" className={styles.mobileMenuItem}>
                <span>
                    <EnvironmentOutlined />
                    <Link to={"/job-search"}>Locations</Link>
                </span>
            </Menu.Item>
            <Menu.Item key="job-companies" className={styles.mobileMenuItem}>
                <span>
                    <CheckCircleOutlined />
                    <Link to={"/job-search"}>Companies</Link>
                </span>
            </Menu.Item>
            <SubMenu
                key="more"
                title={
                    <span>
                        <SearchOutlined />
                        <span>More</span>
                    </span>
                }
                className={styles.mobileMenuItem}
            >
                {props.moreJobs.map((item, i) => {
                    return (
                        <Menu.Item key={i} className={styles.subMenuItem}>
                            <Link to={item.linkPath}>{item.linkName}</Link>
                        </Menu.Item>
                    );
                })}
            </SubMenu>
        </Menu>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            setUserDomain: bindActionCreators(setUserDomain, dispatch)
        }
    };
};

const mapStateToProps = state => {
    return {
        domain: state.metaData.domain
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
