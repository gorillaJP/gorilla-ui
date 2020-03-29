import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

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

const MobileMenu = () => {
    return (
        <Menu style={{ width: "100%" }} defaultSelectedKeys={["0"]} defaultOpenKeys={["sub1"]} mode="inline">
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <SearchOutlined />
                        <span>Job Search</span>
                    </span>
                }
            >
                {jobsByFunctionItems.map((item, i) => {
                    return (
                        <Menu.Item key={i}>
                            <Link to={item.linkPath}>{item.linkName}</Link>
                        </Menu.Item>
                    );
                })}
            </SubMenu>
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <UserOutlined />
                        <Link to={"/job-post"}>Job Post</Link>
                    </span>
                }
            ></SubMenu>
        </Menu>
    );
};

export default MobileMenu;
