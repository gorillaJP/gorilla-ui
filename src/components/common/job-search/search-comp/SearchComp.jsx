import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { searchJobs, updateSearchParam } from "../../../../actions/JobActions";
import { connect } from "react-redux";
import { Row, Col, Input, Icon, Button, Select, AutoComplete } from "antd";

import { metaAPI } from "../../../../api/AutoCompleteApi";
import styles from "./SearchComp.module.css";
import { useEffect } from "react";

const { Option } = Select;

const searchBoxStyles = {
    width: "100%",
    marginBottom: "10px"
};

const SearchComp = props => {
    const searchJobs = props.actions.searchJobs;

    /** enter button  triggers, search actions. This is for fuzzy search*/
    const onKeyPress = event => {
        if (event.key === "Enter") {
            searchJobs(props.searchParams);
        }
    };

    //read jobs when => the fuzzy search box goes to emtpy
    useEffect(() => {
        if (props.searchParams.q === "") {
            searchJobs(props.searchParams);
        }
    }, [props.searchParams.q]);

    //The search API sohuld be called only if the area is changed. (Not for fuzzy string. With fuzy string an Enter key press or, a searh button click is needed)
    useEffect(() => {
        searchJobs(props.searchParams);
    }, [props.searchParams.location, props.searchParams.type]); //search query should not be triggered auto for fuzzy search changers

    // Category contains the job titles, engineer, technician etc
    const [categorySuggestion, setCategorySuggestion] = useState([]);

    // OnChange handler to update states of the fields
    const onChangeSearchField = (field, value) => {
        props.searchParams[field] = value;
        props.actions.updateSearchParam(props.searchParams);
    };

    const metaCityOptions = [{ name: "All Cities" }, ...props.metaCities]
        .filter(e => e && e.name)
        .map(city => {
            return <Option key={city.name}>{city.name}</Option>;
        });

    return (
        <Row className={styles.searchSection} gutter={20}>
            <Col xs={24} sm={24} md={24} lg={7} style={{ padding: "2px" }}>
                <AutoComplete
                    onSearch={value => {
                        onChangeSearchField("q", value);

                        metaAPI("metasectors", value).then(res => {
                            setCategorySuggestion(res.data.payload);
                        });
                    }}
                    onFocus={() => {
                        props.setOpenedState && props.setOpenedState(true);
                    }}
                    onBlur={() => {
                        props.setOpenedState && props.setOpenedState(false);
                    }}
                    defaultActiveFirstOption={false}
                    style={searchBoxStyles}
                    dataSource={categorySuggestion.map(e => e.name)}
                    className="certain-category-search"
                    dropdownClassName="certain-category-search-dropdown"
                >
                    <Input
                        placeholder="Job Title, Keyword Or Company"
                        prefix={<Icon type="search" className="certainCateOgoryIcon" />}
                        onKeyPress={onKeyPress}
                        allowClear={true}
                    />
                </AutoComplete>
            </Col>
            <Col xs={24} sm={24} md={24} lg={7} style={{ padding: "2px" }}>
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    defaultValue={[]}
                    placeholder={"City"}
                    allowClear={true}
                    onChange={val => {
                        onChangeSearchField("location", val);
                    }}
                >
                    {[...metaCityOptions]}
                </Select>
            </Col>
            <Col xs={24} sm={24} md={24} lg={7} style={{ padding: "2px" }}>
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    defaultValue={[]}
                    placeholder={"Type"}
                    allowClear={true}
                    onChange={val => {
                        onChangeSearchField("type", val);
                    }}
                >
                    <Option value="All Types">All Types</Option>
                    <Option value="Permanent">Permanent</Option>
                    <Option value="Contract">Contract</Option>
                    <Option value="Part time">Part time</Option>
                </Select>
            </Col>
            <Col xs={24} sm={24} md={24} lg={3} style={{ padding: "2px" }}>
                <Button
                    type="primary"
                    loading={false}
                    style={{ width: "100%" }}
                    onClick={() => {
                        searchJobs(props.searchParams);
                    }}
                >
                    Search
                </Button>
            </Col>
        </Row>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            searchJobs: bindActionCreators(searchJobs, dispatch),
            updateSearchParam: bindActionCreators(updateSearchParam, dispatch)
        }
    };
};

const mapStateToProps = state => {
    return {
        jobAdds: state.jobData.jobList,
        metaCities: state.metaData.metaCities,
        jobData: state.jobData,
        searchParams: state.searchParamData
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchComp);
