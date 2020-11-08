import React, { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { sectorAutoComplete } from "../../../../api/AutoCompleteApi";
import { debounce } from "../../../../util/Util";
import { useState, useEffect, useCallback } from "react";
import styles from "../search-comp/SearchComp.module.css";
import shortId from "shortid";
import { connect } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

import { searchJobs, updateSearchParam } from "../../../../actions/JobActions";
import { bindActionCreators } from "redux";
import { Modal, AutoComplete, Input, Select, Button, Form } from "antd";
import HighLightedText from "../../highlighted-text/HighLightedText";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const searchBoxStyles = {
    width: "100%",
    marginBottom: "10px"
};

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 }
};

const FormItemLable = props => {
    return <div style={{ fontWeight: "600", display: "inline" }}>{props.text}</div>;
};

const getMetaOptions = metaInfo => {
    return [{ name: "Any", order: "-1", value: "any" }, ...metaInfo]
        .filter(e => e && e.name)
        .sort((a, b) => {
            if (a.order && b.order) {
                return parseInt(a.order) > parseInt(b.order) ? 1 : -1;
            } else {
                return a.name > b.name ? 1 : -1;
            }
        })
        .map(val => {
            return (
                <Option vlaue={val.value} key={val.value}>
                    {val.name}
                </Option>
            );
        });
};

const AdvancedSerchModel = props => {
    // OnChange handler to update states of the fields
    const onChangeSearchField = (field, value) => {
        const newSearchParam = { [field]: value };
        props.actions.updateSearchParam(newSearchParam);
    };

    const history = useHistory();
    const location = useLocation();

    /** Keep temp typed values */
    const [tempData, setTempData] = useState({
        location: props.searchParams.location,
        salarymax: props.searchParams.salarymax,
        category: props.searchParams.q,
        type: props.searchParams.type,
        experiencemin: props.searchParams.experiencemin,
        createat: props.searchParams.createdat
    });

    useEffect(() => {
        props.actions.searchJobs(props.searchParams);
    }, [props.searchParams, searchJobs]); //search query should not be triggered auto for fuzzy search changers

    // Category contains the job titles, engineer, technician etc
    const [categorySuggestion, setCategorySuggestion] = useState([]);

    const debounceSearchField = useCallback(debounce(onChangeSearchField, 400), []);

    /** enter button  triggers, search actions. This is for fuzzy search*/
    const onKeyPress = event => {
        if (event.key === "Enter") {
            props.actions.searchJobs(props.searchParams);
        }
    };

    //The search API sohuld be called only if the area is changed. (Not for fuzzy string. With fuzy string an Enter key press or, a search button click is needed)

    const metaCityOptions = props.metaCities.map(e => {
        return <Option value={e.name}>{e.name}</Option>;
    });
    const metaCreatedAtDateOptions = getMetaOptions(props.metaCreatedAtDates);
    const metaSalaryOption = getMetaOptions(props.metaSalaries);
    const metaTypeOptions = getMetaOptions(props.metaJobTypes);
    const metaExperienceOptions = getMetaOptions(props.metaExperiences);

    return (
        <Fragment>
            <Modal
                bodyStyle={{ height: "600px" }}
                width="800px"
                height="800px"
                title={<div style={{ display: "flex", justifyContent: "center" }}> Search Jobs</div>}
                visible={true}
                footer={null}
                layout=""
                onOk={() => {}}
                okText={"Search"}
                onCancel={() => {
                    props.setShow(false);
                }}
            >
                <div className={styles.searchSection} gutter={20}>
                    <Form>
                        <div>
                            <Form.Item {...formItemLayout} label={<FormItemLable text="keyword" />}>
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
                                            props.actions.searchJobs(props.searchParams);
                                            //debounceSearchField("q", tempData.category, true);
                                        }
                                    }}
                                >
                                    <Input
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
                            <Form.Item {...formItemLayout} label={<FormItemLable text="City" />}>
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    defaultValue={tempData.location}
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
                            <Form.Item {...formItemLayout} label={<FormItemLable text="Industry" />}>
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    defaultValue={[]}
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
                            <Form.Item {...formItemLayout} label={<FormItemLable text="Experience" />}>
                                <Select
                                    style={{ width: "100%" }}
                                    defaultValue={
                                        tempData.experiencemin
                                            ? props.metaExperiences.filter(e => e.value == tempData.experiencemin)[0][
                                                  "name"
                                              ]
                                            : undefined
                                    }
                                    allowClear={true}
                                    onChange={val => {
                                        onChangeSearchField("experiencemin", val);
                                    }}
                                    size="large"
                                    onSearch={value => {
                                        setTempData({ ...tempData, experiencemin: value });
                                    }}
                                >
                                    {[...metaExperienceOptions]}
                                </Select>
                            </Form.Item>
                        </div>
                        <div xs={24} sm={24} md={24} lg={3} style={{ paddingTop: "2px" }}>
                            <Form.Item {...formItemLayout} label={<FormItemLable text="Salary" />}>
                                <Select
                                    style={{ width: "100%" }}
                                    defaultValue={
                                        tempData.salarymax
                                            ? props.metaSalaries.filter(e => e.value == tempData.salarymax)[0]["name"]
                                            : undefined
                                    }
                                    allowClear={true}
                                    onChange={val => {
                                        onChangeSearchField("salarymax", val);
                                    }}
                                    size="large"
                                    onSearch={value => {
                                        setTempData({ ...tempData, salarymax: value });
                                    }}
                                >
                                    {[...metaSalaryOption]}
                                </Select>
                            </Form.Item>
                        </div>
                        <div xs={24} sm={24} md={24} lg={3} style={{ paddingTop: "2px" }}>
                            <Form.Item {...formItemLayout} label={<FormItemLable text="Date Posted" />}>
                                <Select
                                    style={{ width: "100%" }}
                                    defaultValue={
                                        tempData.createat
                                            ? props.metaCreatedAtDates.filter(e => e.value == tempData.createat)[0][
                                                  "name"
                                              ]
                                            : undefined
                                    }
                                    allowClear={true}
                                    onChange={val => {
                                        onChangeSearchField("createdat", val);
                                    }}
                                    size="large"
                                    onSearch={value => {
                                        setTempData({ ...tempData, createat: value });
                                    }}
                                >
                                    {[...metaCreatedAtDateOptions]}
                                </Select>
                            </Form.Item>
                        </div>
                        <div xs={24} sm={24} md={24} lg={3} style={{ paddingTop: "2px" }}>
                            <Form.Item {...formItemLayout} label={<FormItemLable text="Type" />}>
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    defaultValue={tempData.type ? tempData.type : undefined}
                                    allowClear={true}
                                    onChange={val => {
                                        onChangeSearchField("type", val);
                                    }}
                                    size="large"
                                    onSearch={value => {
                                        setTempData({ ...tempData, type: value });
                                    }}
                                >
                                    {[...metaTypeOptions]}
                                </Select>
                            </Form.Item>
                        </div>
                        <div xs={24} sm={24} md={24} lg={3} style={{ textAlign: "center", paddingTop: "2px" }}>
                            <Button
                                style={{ width: "75%" }}
                                type="primary"
                                loading={false}
                                onClick={() => {
                                    props.actions.searchJobs(props.searchParams);

                                    // If the page is not job-details/search navigate to search page
                                    if (location.pathname !== "/job-details/search") {
                                        history.push("/job-details/search");
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
        searchParams: state.searchParams,
        metaExperiences: state.metaData.metaExperiences,
        metaSalaries: state.metaData.metaSalaries,
        metaJobTypes: state.metaData.metaJobTypes,
        metaRoles: state.metaData.metaRoles,
        metaCreatedAtDates: state.metaData.metaCreatedAtDates
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSerchModel);
