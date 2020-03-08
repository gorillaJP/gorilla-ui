import React from "react";
import { searchJobs, updateSearchParam } from "../../../../actions/JobActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row } from "antd";
import SearchComp from "../search-comp/SearchComp";
import { Menu, Dropdown, Checkbox, Radio } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

const AdvanceSearch = props => {
    // OnChange handler to update states of the fields
    const onChangeSearchField = (field, value) => {
        props.searchParams[field] = value;
        props.actions.updateSearchParam(props.searchParams);
    };

    let experinaceOptions = useMemo(() => {
        return (
            <ButtonGroup
                data={props.metaExperiances}
                onChange={val => {
                    onChangeSearchField("experience", val);
                }}
            />
        );
    }, [props.metaExperiances]);

    let salaryOptions = useMemo(() => {
        return (
            <ButtonGroup
                data={props.metaSalaries}
                onChange={val => {
                    onChangeSearchField("salary", val);
                }}
            />
        );
    }, [props.metaSalaries]);

    let jobTypeOptions = useMemo(() => {
        return (
            <CheckBoxGroup
                data={props.metaJobTypes}
                onChange={val => {
                    onChangeSearchField("jobType", val);
                }}
            />
        );
    }, [props.metaJobTypes]);

    let rolesOptions = useMemo(() => {
        return (
            <CheckBoxGroup
                data={props.metaRoles}
                onChange={val => {
                    onChangeSearchField("roles", val);
                }}
            />
        );
    }, [props.metaRoles]);

    let postedDatesOptions = useMemo(() => {
        return (
            <ButtonGroup
                data={props.metaPostedDates}
                onChange={val => {
                    onChangeSearchField("postedDate", val);
                }}
            />
        );
    }, [props.metaPostedDates]);

    return (
        <div>
            <div>
                <Row>
                    <div style={{ background: "#2c5486", paddingTop: "20px", paddingBottom: "10px" }}>
                        <SearchComp />
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Dropdown overlay={experinaceOptions}>
                                <div style={{ color: "white", fontSize: "20px" }}>
                                    Experiance <DownOutlined />
                                </div>
                            </Dropdown>
                            <Dropdown onChange={e => {}} overlay={salaryOptions}>
                                <div style={{ color: "white", fontSize: "20px" }}>
                                    Salary
                                    <DownOutlined />
                                </div>
                            </Dropdown>
                            <Dropdown overlay={rolesOptions}>
                                <div style={{ color: "white", fontSize: "20px" }}>
                                    Role
                                    <DownOutlined />
                                </div>
                            </Dropdown>

                            <Dropdown overlay={postedDatesOptions}>
                                <div style={{ color: "white", fontSize: "20px" }}>
                                    Date Posted
                                    <DownOutlined />
                                </div>
                            </Dropdown>
                            <Dropdown overlay={jobTypeOptions}>
                                <div style={{ color: "white", fontSize: "20px" }}>
                                    Company
                                    <DownOutlined />
                                </div>
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

    useEffect(() => {
        if (props.onChange) {
            props.onChange(selectedList);
        }
    }, [selectedList]);

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

    useEffect(() => {
        if (props.onChange) {
            props.onChange(selected);
        }
    }, [selected]);

    return (
        <Menu>
            {props.data
                .sort((a, b) => {
                    if (a.order && b.order) {
                        return parseInt(a.order) > parseInt(b.order) ? 1 : -1;
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
                                <Radio style={radioStyle} value={entry.value ? entry.value : entry.name}>
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
        metaPostedDates: state.metaData.metaPostedDates,
        searchParams: state.searchParamData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            searchJobs: bindActionCreators(searchJobs, dispatch),
            updateSearchParam: bindActionCreators(updateSearchParam, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearch);
