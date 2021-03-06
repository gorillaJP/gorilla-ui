import React, { useEffect, useMemo } from "react";
import { searchJobs, updateSearchParam } from "../../../../actions/JobActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row } from "antd";
import SearchComp from "../search-comp/SearchComp";
import { Dropdown } from "antd";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import ButtonGroup from "../../shared/ButtonGroup";
import CheckBoxGroup from "../../shared/CheckBoxGroup";
import { Container } from "../../container/Container";

const subFilterStyle = { fontWeight: "bold", color: "white", fontSize: "15px" };

const AdvanceSearch = props => {
    let experinaceOptions = useMemo(() => {
        return (
            <ButtonGroup
                data={(() => {
                    return [...props.metaExperiences, { name: "Any", value: "any", order: -1 }];
                })()}
                onChange={val => {
                    if (val !== undefined) {
                        props.actions.updateSearchParam({ experiencemin: val });
                    }
                }}
            />
        );
    }, [props.actions, props.metaExperiences]);

    let salaryOptions = useMemo(() => {
        return (
            <ButtonGroup
                data={(() => {
                    return [...props.metaSalaries, { name: "Any", value: "any", order: -1 }];
                })()}
                onChange={val => {
                    if (val !== undefined) {
                        props.actions.updateSearchParam({ salarymax: val });
                    }
                }}
            />
        );
    }, [props.actions, props.metaSalaries]);

    let jobTypeOptions = useMemo(() => {
        return (
            <CheckBoxGroup
                data={(() => {
                    return [...props.metaJobTypes, { name: "Any", value: "any", order: -1 }];
                })()}
                onChange={val => {
                    if (val !== undefined) {
                        props.actions.updateSearchParam({ type: val });
                    }
                }}
            />
        );
    }, [props.actions, props.metaJobTypes]);

    /*
    let rolesOptions = useMemo(() => {
        return (
            <CheckBoxGroup
                data={props.metaRoles}
                onChange={val => {
                    if (val !== undefined) {
                        props.actions.updateSearchParam({ roles: val });
                    }
                }}
            />
        );
    }, [props.actions, props.metaRoles]);
*/
    let createdAtOptions = useMemo(() => {
        return (
            <ButtonGroup
                data={(() => {
                    return [...props.metaCreatedAtDates, { name: "Any", value: "any", order: -1 }];
                })()}
                onChange={val => {
                    props.actions.updateSearchParam({ createdat: val });
                }}
            />
        );
    }, [props.actions, props.metaCreatedAtDates]);

    // Commented due to search happening in search comp
    // useEffect(() => {
    //     console.log("searching in advance");
    //     props.actions.searchJobs(props.searchParams);
    // }, [
    //     props.searchParams.experiencemin,
    //     props.searchParams.salarymax,
    //     props.searchParams.type,
    //     props.searchParams.createdat,
    //     props.actions,
    //     props.searchParams
    // ]);

    /** for below filters => if any value is selected => that should be the label */

    const expericeLable =
        props.searchParams.experiencemin !== undefined && //explicit check with undefined => since when .experince is zero => return false
        props.searchParams.experiencemin !== "" &&
        props.searchParams.experiencemin !== "any"
            ? props.metaExperiences.filter(e => e.value == props.searchParams.experiencemin)[0].name // not ===,  but ==, becuase lalue can come as stirng or number
            : "Experience";

    const salaryLable =
        props.searchParams.salarymax !== undefined &&
        props.searchParams.salarymax !== "" &&
        props.searchParams.salarymax !== "any"
            ? props.metaSalaries.filter(e => e.value == props.searchParams.salarymax)[0].name // not ===,  but ==, becuase lalue can come as stirng or number
            : "Salary";

    const createdAtLable =
        props.searchParams.createdat !== undefined &&
        props.searchParams.createdat !== "" &&
        props.searchParams.createdat !== "any"
            ? props.metaCreatedAtDates.filter(e => e.value == props.searchParams.createdat)[0].name // not ===,  but ==, becuase lalue can come as stirng or number
            : "Date Posted";

    const isATypeSelected =
        props.searchParams.type !== undefined &&
        Array.isArray(props.searchParams.type) &&
        props.searchParams.type.filter(e => e === "any").length === 0 && //If any is selected then it is not considered as filtered
        props.searchParams.type.filter(e => e !== "any").length > 0; //should have selected at least one non 'any'

    return (
        <div>
            <div>
                <Row>
                    <div style={{ width: "100%", background: "#2c5486", paddingTop: "20px", paddingBottom: "10px" }}>
                        <Container>
                            <SearchComp expand={true} showSearchButton={true} />
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
                                            <sub>
                                                {salaryLable === "Salary" ? <DownOutlined /> : <FilterOutlined />}
                                            </sub>
                                        </div>
                                    </Dropdown>
                                    <Dropdown overlay={jobTypeOptions}>
                                        <div style={subFilterStyle}>
                                            {"Type "}
                                            <sub>{isATypeSelected ? <FilterOutlined /> : <DownOutlined />}</sub>
                                        </div>
                                    </Dropdown>
                                    <Dropdown overlay={createdAtOptions}>
                                        <div style={subFilterStyle}>
                                            {createdAtLable + " "}
                                            <sub>
                                                {createdAtLable === "Date Posted" ? (
                                                    <DownOutlined />
                                                ) : (
                                                    <FilterOutlined />
                                                )}
                                            </sub>
                                        </div>
                                    </Dropdown>
                                    {/*
                                <Dropdown overlay={jobTypeOptions}>
                                    <div style={subFilterStyle}>
                                        {"Company "}
                                        <sub>
                                            <DownOutlined />
                                        </sub>
                                    </div>
                                </Dropdown>
                                */}
                                </div>
                                <div style={{ flexBasis: "100%" }} />
                            </div>
                        </Container>
                    </div>
                </Row>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        metaExperiences: state.metaData.metaExperiences,
        metaSalaries: state.metaData.metaSalaries,
        metaJobTypes: state.metaData.metaJobTypes,
        metaRoles: state.metaData.metaRoles,
        metaCreatedAtDates: state.metaData.metaCreatedAtDates,
        searchParams: state.searchParams
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
