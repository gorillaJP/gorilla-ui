import React from "react";
import { connect } from "react-redux";
import { Row } from "antd";
import SearchComp from "../search-comp/SearchComp";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useMemo } from "react";

const AdvanceSearch = props => {
    let experinaceOptions = useMemo(() => {
        return (
            <Menu>
                {props.metaExperiances
                    .sort((a, b) => {
                        return a.order > b.order ? 1 : -1;
                    })
                    .map(entry => {
                        return (
                            <Menu.Item>
                                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                                    {entry}
                                </a>
                            </Menu.Item>
                        );
                    })}
            </Menu>
        );
    }, [props.metaExperiances]);

    let salaryOptions = useMemo(() => {
        return (
            <Menu>
                {props.metaSalaries.map(entry => {
                    return (
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                                {entry}
                            </a>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }, [props.metaSalaries]);

    let jobTypeOptions = useMemo(() => {
        return (
            <Menu>
                {props.metaJobTypes.map(entry => {
                    return (
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                                {entry}
                            </a>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }, [props.metaJobTypes]);

    let rolesOptions = useMemo(() => {
        return (
            <Menu>
                {props.metaRoles.map(entry => {
                    return (
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                                {entry}
                            </a>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }, [props.metaRoles]);

    let postedDatesOptions = useMemo(() => {
        return (
            <Menu>
                {props.metaPostedDates.map(entry => {
                    return (
                        <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                                {entry}
                            </a>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }, [props.metaPostedDates]);
    return (
        <div>
            <div>
                <Row>
                    <div style={{ background: "#3280b3", paddingTop: "20px", paddingBottom: "10px" }}>
                        <SearchComp />
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Dropdown overlay={salaryOptions}>
                                <a
                                    href={"http://google.com"}
                                    style={{ color: "white", fontSize: "20px" }}
                                    onClick={e => e.preventDefault()}
                                >
                                    Salary
                                    <DownOutlined />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={rolesOptions}>
                                <a
                                    href={"http://google.com"}
                                    style={{ color: "white", fontSize: "20px" }}
                                    onClick={e => e.preventDefault()}
                                >
                                    Role
                                    <DownOutlined />
                                </a>
                            </Dropdown>

                            <Dropdown overlay={experinaceOptions}>
                                <a
                                    href={"http://google.com"}
                                    style={{ color: "white", fontSize: "20px" }}
                                    onClick={e => e.preventDefault()}
                                >
                                    Experiance <DownOutlined />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={jobTypeOptions}>
                                <a
                                    href={"http://google.com"}
                                    style={{ color: "white", fontSize: "20px" }}
                                    onClick={e => e.preventDefault()}
                                >
                                    Job Type
                                    <DownOutlined />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={jobTypeOptions}>
                                <a
                                    href={"http://google.com"}
                                    style={{ color: "white", fontSize: "20px" }}
                                    onClick={e => e.preventDefault()}
                                >
                                    Company
                                    <DownOutlined />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={postedDatesOptions}>
                                <a
                                    href={"http://google.com"}
                                    style={{ color: "white", fontSize: "20px" }}
                                    onClick={e => e.preventDefault()}
                                >
                                    Date Posted
                                    <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </Row>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        metaExperiances: state.metaData.metaExperiances,
        metaSalaries: state.metaData.metaSalaries,
        metaJobTypes: state.metaData.metaJobTypes,
        metaRoles: state.metaData.metaRoles,
        metaPostedDates: state.metaData.metaPostedDates
    };
};

export default connect(mapStateToProps, undefined)(AdvanceSearch);
