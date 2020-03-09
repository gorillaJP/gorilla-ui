import React from "react";
import { searchJobs, updateSearchParam } from "../../../../actions/JobActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row } from "antd";
import SearchComp from "../search-comp/SearchComp";
import { Dropdown } from "antd";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useEffect } from "react";
import ButtonGroup from "../../shared/ButtonGroup";
import CheckBoxGroup from "../../shared/CheckBoxGroup";

const subFilterStyle = { fontWeight: "bold", color: "white", fontSize: "15px" };

const AdvanceSearch = props => {
    // OnChange handler to update states of the fields

    const onChangeSearchField = (field, value) => {
        const newSearchParam = { [field]: value };
        props.actions.updateSearchParam(newSearchParam);
    };

    let experinaceOptions = useMemo(() => {
        return (
            <ButtonGroup
                data={(() => {
                    return [...props.metaExperiances, { name: "Any", value: "any", order: -1 }];
                })()}
                onChange={val => {
                    if (val !== undefined) {
                        onChangeSearchField("experience", val);
                    }
                }}
            />
        );
    }, [props.metaExperiances]);

    let salaryOptions = useMemo(() => {
        return (
            <ButtonGroup
                data={(() => {
                    return [...props.metaSalaries, { name: "Any", value: "any", order: -1 }];
                })()}
                onChange={val => {
                    if (val !== undefined) {
                        onChangeSearchField("salary", val);
                    }
                }}
            />
        );
    }, [props.metaSalaries]);

    let jobTypeOptions = useMemo(() => {
        return (
            <CheckBoxGroup
                data={props.metaJobTypes}
                onChange={val => {
                    if (val !== undefined) {
                        onChangeSearchField("jobType", val);
                    }
                }}
            />
        );
    }, [props.metaJobTypes]);

    let rolesOptions = useMemo(() => {
        return (
            <CheckBoxGroup
                data={props.metaRoles}
                onChange={val => {
                    if (val !== undefined) {
                        onChangeSearchField("roles", val);
                    }
                }}
            />
        );
    }, [props.metaRoles]);

    let postedDatesOptions = useMemo(() => {
        return (
            <ButtonGroup
                data={(() => {
                    return [...props.metaPostedDates, { name: "Any", value: "any", order: -1 }];
                })()}
                onChange={val => {
                    onChangeSearchField("postedDate", val);
                }}
            />
        );
    }, [props.metaPostedDates]);

    useEffect(() => {
        props.actions.searchJobs(props.searchParams);
    }, [props.searchParams.experience, props.searchParams.salary]);

    /** for below filters => if any value is selected => that should be the label */
    const expericeLable =
        props.searchParams.experience !== undefined && //explicit check with undefined => since when .experince is zero => return false
        props.searchParams.experience !== "" &&
        props.searchParams.experience !== "any"
            ? props.metaExperiances.filter(e => e.value === props.searchParams.experience)[0].name
            : "Experience";

    const salaryLable =
        props.searchParams.salary !== undefined &&
        props.searchParams.salary !== "" &&
        props.searchParams.salary !== "any"
            ? props.metaSalaries.filter(e => e.value === props.searchParams.salary)[0].name
            : "Salary";

    const datePostedLable =
        props.searchParams.postedDate !== undefined &&
        props.searchParams.postedDate !== "" &&
        props.searchParams.postedDate !== "any"
            ? props.metaPostedDates.filter(e => e.value === props.searchParams.postedDate)[0].name
            : "Date Posted";

    return (
        <div>
            <div>
                <Row>
                    <div style={{ background: "#2c5486", paddingTop: "20px", paddingBottom: "10px" }}>
                        <SearchComp />
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div style={{ display: "flex", flexBasis: "50%", justifyContent: "space-around" }}>
                                <Dropdown overlay={experinaceOptions}>
                                    <div style={subFilterStyle}>
                                        {expericeLable + "  "}
                                        <sub>
                                            {expericeLable === "Experience" ? (
                                                <DownOutlined />
                                            ) : (
                                                <FilterOutlined style={{ fontSize: "12px" }} />
                                            )}
                                        </sub>
                                    </div>
                                </Dropdown>
                                <Dropdown onChange={e => {}} overlay={salaryOptions}>
                                    <div style={subFilterStyle}>
                                        {salaryLable + " "}
                                        <sub>{salaryLable === "Salary" ? <DownOutlined /> : <FilterOutlined />}</sub>
                                    </div>
                                </Dropdown>
                                <Dropdown overlay={rolesOptions}>
                                    <div style={subFilterStyle}>
                                        {"Role "}
                                        <sub>
                                            <DownOutlined />
                                        </sub>
                                    </div>
                                </Dropdown>

                                <Dropdown overlay={postedDatesOptions}>
                                    <div style={subFilterStyle}>
                                        {datePostedLable + " "}
                                        <sub>
                                            {datePostedLable === "Date Posted" ? <DownOutlined /> : <FilterOutlined />}
                                        </sub>
                                    </div>
                                </Dropdown>
                                <Dropdown overlay={jobTypeOptions}>
                                    <div style={subFilterStyle}>
                                        {"Company "}
                                        <sub>
                                            <DownOutlined />
                                        </sub>
                                    </div>
                                </Dropdown>
                            </div>
                            <div style={{ flexBasis: "100%" }} />
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
