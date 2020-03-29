import React, { Fragment, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { sectorAutoComplete } from "../../../../api/AutoCompleteApi";
import { debounce } from "../../../../util/Util";
import { useState, useEffect, useCallback } from "react";
import styles from "../search-comp/SearchComp.module.css";
import shortId from "shortid";
import { connect } from "react-redux";
import { DownOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons";

import { searchJobs, updateSearchParam } from "../../../../actions/JobActions";
import { bindActionCreators } from "redux";
import { Modal, AutoComplete, Input, Select, Button, Dropdown, Menu, Form } from "antd";
import HighLightedText from "../../highlighted-text/HighLightedText";
import ButtonGroup from "../../shared/ButtonGroup";
import CheckBoxGroup from "../../shared/CheckBoxGroup";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const searchBoxStyles = {
    width: "100%",
    marginBottom: "10px"
};

const FormItemLable = props => {
    return <div style={{ fontWeight: "600", display: "inline-block" }}>{props.text}</div>;
};

const AdvancedSerchModel = props => {
    const history = useHistory();
    const location = useLocation();

    const [show, setShow] = useState(true);
    const { searchJobs } = props.actions;

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
    /** Keep temp typed values */
    const [tempData, setTempData] = useState({
        location: props.searchParams.location,
        category: props.searchParams.q,
        type: props.searchParams.type
    });

    // OnChange handler to update states of the fields
    const onChangeSearchField = (field, value) => {
        const newSearchParam = { [field]: value };
        props.actions.updateSearchParam(newSearchParam);
    };

    const debounceSearchField = useCallback(debounce(onChangeSearchField, 400), []);

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

    /** for below filters => if any value is selected => that should be the label */
    const expericeLable =
        props.searchParams.experiencemin !== undefined && //explicit check with undefined => since when .experince is zero => return false
        props.searchParams.experiencemin !== "" &&
        props.searchParams.experiencemin !== "any"
            ? props.metaExperiences.filter(e => e.value === props.searchParams.experiencemin)[0].name
            : "Experience";

    return (
        <Fragment>
            <Modal
                bodyStyle={{ height: "600px" }}
                width="800px"
                height="800px"
                title={<div style={{ display: "flex", justifyContent: "center" }}> Search Jobs</div>}
                visible={show}
                footer={null}
                layout=""
                onOk={() => {}}
                okText={"Search"}
                onCancel={() => {
                    setShow(false);
                }}
            >
                <div className={styles.searchSection} gutter={20}>
                    <Form>
                        <Form.Item label="est">
                            <Input></Input>
                        </Form.Item>
                        <div xs={30} sm={30} md={30} lg={30} style={{ padding: "2px" }}>
                            <Form.Item
                                style={{ paddingBottom: "0px" }}
                                label={<FormItemLable text="Job tilte, company, keyword" />}
                            >
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
                                    onFocus={() => {}}
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
                                        // placeholder="Job Title, Keyword Or Company"
                                        prefix={<SearchOutlined className="certainCateOgoryIcon" />}
                                        onKeyPress={onKeyPress}
                                        allowClear={true}
                                        size="large"
                                    />
                                </AutoComplete>
                            </Form.Item>
                        </div>
                        <div
                            xs={60}
                            sm={60}
                            md={60}
                            lg={60}
                            style={{ padding: "2px", visibility: "visible" }}
                            className={styles.cityTransition}
                        >
                            <Form.Item label={<FormItemLable text="City" />}>
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    defaultValue={tempData.location}
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
                            </Form.Item>
                        </div>
                        <div
                            xs={60}
                            sm={60}
                            md={60}
                            lg={60}
                            style={{ padding: "2px", visibility: "visible" }}
                            className={styles.typeTransition}
                        >
                            <Form.Item label={<FormItemLable text="Industry" />}>
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
                                        <HighLightedText
                                            text="All Types"
                                            highlightText={tempData.type}
                                        ></HighLightedText>
                                    </Option>
                                    <Option value="Permanent">
                                        <HighLightedText
                                            text="Permanent"
                                            highlightText={tempData.type}
                                        ></HighLightedText>
                                    </Option>
                                    <Option value="Contract">
                                        <HighLightedText
                                            text="Contract"
                                            highlightText={tempData.type}
                                        ></HighLightedText>
                                    </Option>
                                    <Option value="Part time">
                                        <HighLightedText
                                            text="Part time"
                                            highlightText={tempData.type}
                                        ></HighLightedText>
                                    </Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div xs={24} sm={24} md={24} lg={3} style={{ paddingTop: "2px" }}>
                            <Form.Item label={<FormItemLable text="Experience" />}>
                                <Dropdown overlay={experinaceOptions}>
                                    <Button>
                                        {expericeLable}
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                        </div>
                        <div xs={24} sm={24} md={24} lg={3} style={{ paddingTop: "2px" }}>
                            <Form.Item label={<FormItemLable text="Salary" />}>
                                <Dropdown overlay={experinaceOptions}>
                                    <Button>
                                        Salary
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                        </div>
                        <div xs={24} sm={24} md={24} lg={3} style={{ paddingTop: "2px" }}>
                            <Form.Item label={<FormItemLable text="Salary" />}>
                                <Dropdown overlay={experinaceOptions}>
                                    <Button>
                                        Data Posted
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                        </div>
                        <div xs={24} sm={24} md={24} lg={3} style={{ paddingTop: "2px" }}>
                            <Form.Item label={<FormItemLable text="Type" />}>
                                <Dropdown overlay={experinaceOptions}>
                                    <Button>
                                        Type
                                        <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                        </div>
                        <div xs={24} sm={24} md={24} lg={3} style={{ paddingTop: "2px" }}>
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
                        </div>
                    </Form>
                </div>
            </Modal>
        </Fragment>
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
        searchParams: state.searchParamData,
        metaExperiences: state.metaData.metaExperiences,
        metaSalaries: state.metaData.metaSalaries,
        metaJobTypes: state.metaData.metaJobTypes,
        metaRoles: state.metaData.metaRoles,
        metaCreatedAtDates: state.metaData.metaCreatedAtDates
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSerchModel);
