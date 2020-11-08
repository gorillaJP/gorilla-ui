import React, { useState, useEffect, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Button, Select, AutoComplete } from "antd";
import shortId from "shortid";
import { useHistory, useLocation } from "react-router-dom";

import { searchJobs, updateSearchParam } from "../../../../actions/JobActions";
import HighLightedText from "../../highlighted-text/HighLightedText";
import { sectorAutoComplete } from "../../../../api/AutoCompleteApi";
import styles from "./SearchComp.module.css";
import { debounce, areEqualArrays } from "../../../../util/Util";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const SearchComp = props => {
    const history = useHistory();
    const location = useLocation();

    const { searchJobs } = props.actions;

    /** Keep temp typed values */
    const [tempData, setTempData] = useState({
        location: props.searchParams.location || [],
        category: props.searchParams.q || "",
        type: props.searchParams.type || []
    });

    /** Keep temp typed values */
    const [openedState, setOpenedState] = useState(props.expand || false);

    // Category contains the job titles, engineer, technician etc
    const [categorySuggestion, setCategorySuggestion] = useState([]);

    // update state in initial load
    useEffect(() => {
        setTempData({
            location: props.searchParams.location,
            category: props.searchParams.q || "",
            type: props.searchParams.type
        });
    }, [props.searchParams]);

    //The search API should be called only if the area is changed. (Not for fuzzy string. With fuzy string an Enter key press or, a search button click is needed)
    useEffect(() => {
        searchJobs(props.searchParams);
    }, [props.searchParams]); //search query should not be triggered auto for fuzzy search changers

    // OnChange handler to update states of the fields
    const onChangeSearchField = (field, value) => {
        const newSearchParam = { [field]: value };
        if (
            field === "q" ||
            (field === "type" && !areEqualArrays(value, tempData.type)) ||
            (field === "location" && !areEqualArrays(value, tempData.location))
        ) {
            props.actions.updateSearchParam(newSearchParam);
            if (field === "q") {
                field = "category";
            }

            setTempData({ ...tempData, [field]: value });
        }
    };

    const debounceSearchField = useCallback(debounce(onChangeSearchField, 400), []);

    /** enter button  triggers, search actions. This is for fuzzy search*/
    const onKeyPress = event => {
        if (event.key === "Enter") {
            searchJobs(props.searchParams);
        }
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

    const fromHomePage = props.from === "home" ? true : false;

    const searchBoxStyleObj = useCallback(
        componentNo => {
            if ((componentNo === 1 && fromHomePage) || (fromHomePage && openedState)) {
                return {
                    paddingTop: "2px",
                    paddingBottom: "2px",
                    width: "100%",
                    borderRadius: "0"
                };
            }

            if (componentNo !== 1 && !openedState) {
                return { padding: "2px", width: "0px", display: "none" };
            }

            if ((!fromHomePage && openedState) || (componentNo !== 1 && openedState)) {
                return { padding: "2px", width: "100%", borderRadius: "0" };
            }
        },
        [openedState, fromHomePage]
    );

    return (
        <div className={`${styles.searchSection} ${fromHomePage ? styles.fromHome : ""}`}>
            <div className={styles.searchBox}>
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
                    style={searchBoxStyleObj(1)}
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
                            if (props.searchParams.q !== tempData.category) {
                                searchJobs(props.searchParams);
                            }
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
            </div>
            <div className={`${styles.cityTransition} ${openedState ? styles.searchBox : ""}`}>
                <Select
                    mode="multiple"
                    defaultValue={props.searchParams.location}
                    placeholder={"City"}
                    allowClear={true}
                    onChange={val => {
                        onChangeSearchField("location", val);
                    }}
                    style={searchBoxStyleObj(2)}
                    size="large"
                    value={tempData.location}
                >
                    {[...metaCityOptions]}
                </Select>
            </div>
            <div className={`${styles.typeTransition} ${openedState ? styles.searchBox : ""}`}>
                <Select
                    mode="multiple"
                    defaultValue={props.searchParams.type ? [props.searchParams.type] : []}
                    placeholder={"Type"}
                    allowClear={true}
                    style={searchBoxStyleObj(2)}
                    onChange={val => {
                        onChangeSearchField("type", val);
                    }}
                    value={tempData.type}
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
            </div>
            <div style={{ ...searchBoxStyleObj(1), width: "auto" }} className={styles.actionBtns}>
                <Button
                    type="primary"
                    loading={false}
                    style={{ width: "100%" }}
                    onClick={() => {
                        searchJobs(props.searchParams);

                        // If the page is not job-details/search navigate to search page
                        if (location.pathname !== "/job-details/search") {
                            history.push("/job-details/search");
                        }
                    }}
                    size="large"
                    className={styles.searchBtn}
                >
                    Search
                </Button>
            </div>
        </div>
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
