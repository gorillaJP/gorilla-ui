import React from "react";
import { connect } from "react-redux";
import { Row } from "antd";
import SearchComp from "../search-comp/SearchComp";
import { Menu, Dropdown, Checkbox, Radio } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useState } from "react";

const AdvanceSearch = props => {
    let experinaceOptions = useMemo(() => {
        return <ButtonGroup data={props.metaExperiances} />;
    }, [props.metaExperiances]);

    let salaryOptions = useMemo(() => {
        return <ButtonGroup data={props.metaSalaries} />;
    }, [props.metaSalaries]);

    let jobTypeOptions = useMemo(() => {
        return <CheckBoxGroup data={props.metaJobTypes} />;
    }, [props.metaJobTypes]);

    let rolesOptions = useMemo(() => {
        return <CheckBoxGroup data={props.metaRoles} />;
    }, [props.metaRoles]);

    let postedDatesOptions = useMemo(() => {
        return <ButtonGroup data={props.metaPostedDates} />;
    }, [props.metaPostedDates]);

    return (
        <div>
            <div>
                <Row>
                    <div style={{ background: "#2c5486", paddingTop: "20px", paddingBottom: "10px" }}>
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

//Popualtes dropdown options
const CheckBoxGroup = props => {
    const [selectedList, setSelected] = useState([]);

    return (
        <Menu>
            {props.data
                .sort((a, b) => {
                    if (a.order && b.order) {
                        return a.order > b.order ? 1 : -1;
                    } else {
                        return a.name > b.name ? 1 : -1;
                    }
                })
                .map(entry => {
                    return (
                        <Menu.Item>
                            <Checkbox.Group value={selectedList}>
                                <Checkbox
                                    onChange={e => {
                                        if (e.target.checked) {
                                            let newArr = [...selectedList, e.target.value];
                                            setSelected(newArr);
                                        } else {
                                            let newArr = selectedList.filter(en => en && en !== e.target.value);
                                            setSelected(newArr);
                                        }
                                    }}
                                    value={entry.name}
                                >
                                    {entry.name}
                                </Checkbox>
                            </Checkbox.Group>
                        </Menu.Item>
                    );
                })}
        </Menu>
    );
};
//Popualtes dropdown options
const ButtonGroup = props => {
    const radioStyle = {
        display: "block",
        height: "40px",
        lineHeight: "40px"
    };

    const [selected, setSelected] = useState();

    return (
        <Menu>
            {props.data
                .sort((a, b) => {
                    if (a.order && b.order) {
                        return a.order > b.order ? 1 : -1;
                    } else {
                        return a.name > b.name ? 1 : -1;
                    }
                })
                .map(entry => {
                    return (
                        <Menu.Item>
                            <Radio.Group
                                value={selected}
                                onChange={e => {
                                    setSelected(e.target.value);
                                }}
                            >
                                <Radio style={radioStyle} value={entry.name}>
                                    {entry.name}
                                </Radio>
                            </Radio.Group>
                        </Menu.Item>
                    );
                })}
        </Menu>
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
