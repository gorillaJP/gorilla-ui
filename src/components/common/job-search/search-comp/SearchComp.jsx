import React, { useState, useEffect, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Input, Button, Select, AutoComplete } from "antd";
import shortId from "shortid";
import { useHistory, useLocation } from "react-router-dom";

import { searchJobs, updateSearchParam } from "../../../../actions/JobActions";
import HighLightedText from "../../highlighted-text/HighLightedText";
import { sectorAutoComplete } from "../../../../api/AutoCompleteApi";
import styles from "./SearchComp.module.css";
import { debounce } from "../../../../util/Util";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const searchBoxStyles = {
    width: "100%",
    marginBottom: "10px"
};

const SearchComp = props => {
    const history = useHistory();
    const location = useLocation();

    const { searchJobs } = props.actions;

    /** Keep temp typed values */
    const [tempData, setTempData] = useState({
        location: "",
        category: props.searchParams.q,
        type: props.searchParams.type
    });

    // OnChange handler to update states of the fields
    const onChangeSearchField = (field, value) => {
        const newSearchParam = { [field]: value };
        props.actions.updateSearchParam(newSearchParam);
    };

    const debounceSearchField = useCallback(debounce(onChangeSearchField, 400), []);

    /** Keep temp typed values */
    const [openedState, setOpenedState] = useState(props.expand || false);

    /** enter button  triggers, search actions. This is for fuzzy search*/
    const onKeyPress = event => {
        if (event.key === "Enter") {
            searchJobs(props.searchParams);
        }
    };

    //The search API sohuld be called only if the area is changed. (Not for fuzzy string. With fuzy string an Enter key press or, a search button click is needed)

    useEffect(() => {
        searchJobs(props.searchParams);
    }, [props.searchParams, searchJobs]); //search query should not be triggered auto for fuzzy search changers

    // Category contains the job titles, engineer, technician etc
    const [categorySuggestion, setCategorySuggestion] = useState([]);

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
                {/**  Job results should refresh for both manually entered values and selected values from dropdown*/}
                <AutoComplete
                    id={shortId.generate()}
                    onSearch={value => {
                        setTempData({ ...tempData, category: value });

                        debounceSearchField("q", value);
                        sectorAutoComplete(value).then(res => {
                            setCategorySuggestion(res.data.payload.data);
                        });
                    }}
                    //this is called when a value is selected from the drop down
                    // DUPLICATE CALL HERE. WHEN A VLAUE IS SELECED FROM LIST. SAGA CAN BE USED TO AVOID THIS
                    //CALLED AFTER onDropdownVisibleChange, when a vlaue is selcted from list ( call goes with latest selected value)
                    onSelect={value => {
                        onChangeSearchField("q", value); //here to set the seleted value in redux
                        setTempData({ ...tempData, category: value });

                        //  searchJobs({ ...props.searchParams, ...{ q: value } }); //here calling DB. do not wait till the props update as a result of above line. ( Since it is async)
                    }}
                    onFocus={() => {
                        // Expanding the remaining fields
                        if (!openedState) {
                            setOpenedState(true);
                        }
                        props.setOpenedState && props.setOpenedState(true);
                    }}
                    defaultActiveFirstOption={false}
                    style={searchBoxStyles}
                    dataSource={categorySuggestion.map(e => {
                        return (
                            <AutoCompleteOption style={{ fontWeight: 600 }} value={e.name}>
                                {/* <HighLightedText text={e.name} highlightText={tempData.category}></HighLightedText> */}
                                {e.name}
                            </AutoCompleteOption>
                        );
                    })}
                    className="certain-category-search"
                    dropdownClassName="certain-category-search-dropdown"
                    size="large"
                    value={tempData.category}
                    //This is closed when a value is typed manually, without selecting from drop down and close the dropdown then
                    //both this and onSelect is called when a value is selected from drop down. Redux saga is needed to avoid the dupliate call here
                    //DUPLICATE CALL HERE. WHEN A VLAUE IS SELECED FROM LIST. SAGA CAN BE USED TO AVOID THIS ( but here call goes with the typed value. Not the selected vlaue)
                    onDropdownVisibleChange={isClosed => {
                        if (isClosed === false) {
                            searchJobs(props.searchParams);
                            //debounceSearchField("q", tempData.category, true);
                        }
                    }}
                >
                    <Input
                        placeholder="Job Title, Keyword Or Company"
                        prefix={<SearchOutlined className="certainCateOgoryIcon" />}
                        onKeyPress={onKeyPress}
                        allowClear={true}
                        size="large"
                    />
                </AutoComplete>
            </Col>
            <Col
                xs={24}
                sm={24}
                md={24}
                lg={7}
                style={!openedState ? { padding: "2px", width: "0px", display: "none" } : { padding: "2px" }}
                className={styles.cityTransition}
            >
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    defaultValue={props.searchParams.location}
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
            <Col
                xs={24}
                sm={24}
                md={24}
                lg={7}
                style={!openedState ? { padding: "2px", width: "0px", display: "none" } : { padding: "2px" }}
                className={styles.typeTransition}
            >
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    defaultValue={props.searchParams.type ? [props.searchParams.type] : []}
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

                        // If the page is not job-details/search navigate to search page
                        if (location.pathname !== "/job-details") {
                            history.push("/job-details");
                        }
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
        searchParams: state.searchParams
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchComp);
