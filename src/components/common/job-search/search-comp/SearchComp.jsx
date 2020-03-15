import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { searchJobs, updateSearchParam } from "../../../../actions/JobActions";
import { connect } from "react-redux";
import { Row, Col, Input, Icon, Button, Select, AutoComplete } from "antd";

import HighLightedText from "../../highlighted-text/HighLightedText";
import { metaAPI } from "../../../../api/AutoCompleteApi";
import styles from "./SearchComp.module.css";
import { useEffect } from "react";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const searchBoxStyles = {
    width: "100%",
    marginBottom: "10px"
};

const SearchComp = props => {
    const searchJobs = props.actions.searchJobs;

    /** Keep temp typed values */
    const [tempData, setTempData] = useState({
        location: "",
        category: "",
        type: ""
    });

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
    }, [props.searchParams, props.searchParams.q, searchJobs]);

    //The search API sohuld be called only if the area is changed. (Not for fuzzy string. With fuzy string an Enter key press or, a searh button click is needed)

    useEffect(() => {
        searchJobs(props.searchParams);
    }, [props.searchParams, props.searchParams.location, props.searchParams.type, searchJobs]); //search query should not be triggered auto for fuzzy search changers

    // Category contains the job titles, engineer, technician etc
    const [categorySuggestion, setCategorySuggestion] = useState([]);

    // OnChange handler to update states of the fields
    const onChangeSearchField = (field, value) => {
        const newSearchParam = { [field]: value };
        props.actions.updateSearchParam(newSearchParam);
    };

    const metaCityOptions = [{ name: "All Cities" }, ...props.metaCities]
        .filter(e => e && e.name)
        .map(city => {
            return (
                <Option key={city.name}>
                    <HighLightedText text={city.name} highlightText={tempData.location}></HighLightedText>
                </Option>
            );
        });

    return (
        <Row className={styles.searchSection} gutter={20}>
            <Col xs={24} sm={24} md={24} lg={7} style={{ padding: "2px" }}>
                <AutoComplete
                    onSearch={value => {
                        setTempData({ ...tempData, category: value });

                        onChangeSearchField("q", value);

                        metaAPI("metasectors", value).then(res => {
                            setCategorySuggestion(res.data.payload);
                        });
                    }}
                    onSelect={value => {
                        setTempData({ ...tempData, category: value });
                    }}
                    onFocus={() => {
                        props.setOpenedState && props.setOpenedState(true);
                    }}
                    onBlur={() => {
                        props.setOpenedState && props.setOpenedState(false);
                    }}
                    defaultActiveFirstOption={false}
                    style={searchBoxStyles}
                    dataSource={categorySuggestion.map(e => {
                        return (
                            <AutoCompleteOption key={e.name} value={e.name}>
                                {/* <HighLightedText text={e.name} highlightText={tempData.category}></HighLightedText> */}
                                {e.name}
                            </AutoCompleteOption>
                        );
                    })}
                    className="certain-category-search"
                    dropdownClassName="certain-category-search-dropdown"
                    size="large"
                    value={tempData.category}
                >
                    <Input
                        placeholder="Job Title, Keyword Or Company"
                        prefix={<Icon type="search" className="certainCateOgoryIcon" />}
                        onKeyPress={onKeyPress}
                        allowClear={true}
                        size="large"
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
                    size="large"
                    onSearch={value => {
                        setTempData({ ...tempData, location: value });
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
                    onSearch={value => {
                        setTempData({ ...tempData, type: value });
                    }}
                    size="large"
                >
                    <Option value="All Types">
                        <HighLightedText text="All Types" highlightText={tempData.type}></HighLightedText>
                    </Option>
                    <Option value="Permanent">
                        <HighLightedText text="Permanent" highlightText={tempData.type}></HighLightedText>
                    </Option>
                    <Option value="Contract">
                        <HighLightedText text="Contract" highlightText={tempData.type}></HighLightedText>
                    </Option>
                    <Option value="Part time">
                        <HighLightedText text="Part time" highlightText={tempData.type}></HighLightedText>
                    </Option>
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
                    size="large"
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
