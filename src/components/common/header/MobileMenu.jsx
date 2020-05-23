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

const { SubMenu } = Menu;

const MobileMenu = props => {
    return (
        <Menu
            style={{ width: "100%" }}
            defaultSelectedKeys={["0"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={props.collapsed}
            className={`${props.opened ? styles.opened : ""}`}
        >
            {!props.userLoggeIn && (
                <Menu.Item key="login" className={`${styles.mobileMenuItemWithActionButtons}`}>
                    <div className={`${styles.actionButtons} ${styles.mobileMenu}`}>
                        <Link to="/signin">
                            <div className={styles.loginButton}>
                                <Button size="large">
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
                </Menu.Item>
            )}
            {props.userLoggeIn && (
                <SubMenu
                    key="user-details"
                    title={
                        <span>
                            <Avatar size={64} icon={<UserOutlined />} />
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

export default MobileMenu;
