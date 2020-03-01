import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { searchJobs } from "../../../../actions/JobActions";
import { connect } from "react-redux";
import { Row, Col, Input, Icon, Button, Select, AutoComplete } from "antd";


import {
    cityAutoComplete,
    sectorAutoComplete
} from "../../../../api/AutoCompleteApi";
import styles from "./SearchComp.module.css";
import { useEffect } from "react";

const { Option } = Select;

const searchBoxStyles = {
    width: "100%",
    marginBottom: "10px"
};

const SearchComp = props => {

    const searchJobs = props.actions.searchJobs

    /** enter button  triggers, search actions*/
    const onKeyPress = event => {
        if (event.key === 'Enter') {
            searchJobs(search)
        }
    }

    // State for the three fields
    const [search, setSearchValues] = useState({
        q: "",
        location: [],
        category: ""
    });

    //The search API sohuld be called only if the area is changed. (Not for fuzzy string. With fuzy string an Enter key press or, a searh button click is needed)
    useEffect(() => {
        searchJobs(search)
    }, [search.location])

    // Area suggestions contains the city, country etc
    const [areaSuggestion, setAreaSuggestions] = useState([]);

    // Category contains the job titles, engineer, technician etc
    const [categorySuggestion, setCategorySuggestion] = useState([]);

    // OnChange handler to update states of the fields
    const onChangeSearchField = (field, value) => {
        const nextState = { ...search, [field]: value };
        setSearchValues(nextState);
    };

    const metaCityOptions = ['All Cities', ...props.metaCities].map(city => { return <Option key={city}>{city}</Option> })

    return (
        <Row className={styles.searchSection} gutter={20}>
            <Col xs={24} sm={24} md={24} lg={7} style={{ padding: "2px" }}>
                <AutoComplete
                    placeholder="Job Title, Keyword Or Company"
                    onSearch={value => {
                        onChangeSearchField("q", value);

                        const timer = setTimeout(() => {
                            sectorAutoComplete(value).then(res => {
                                setCategorySuggestion(res.data.payload);
                            });
                        }, 1000);

                        return () => clearTimeout(timer);
                    }}
                    onFocus={() => {
                        props.setOpenedState && props.setOpenedState(true);
                    }}
                    onBlur={() => {
                        props.setOpenedState && props.setOpenedState(false);
                    }}

                    defaultActiveFirstOption={false}
                    style={searchBoxStyles}
                    dataSource={categorySuggestion}
                    className="certain-category-search"
                    dropdownClassName="certain-category-search-dropdown"
                >
                    <Input
                        suffix={<Icon type="search" className="certainCategoryIcon" />}
                        onKeyPress={onKeyPress}
                    />
                </AutoComplete>
            </Col>
            <Col xs={24} sm={24} md={24} lg={7} style={{ padding: "2px" }}>

                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={[]}
                    placeholder={'City'}
                    allowClear={true}
                    onChange={(val) => { onChangeSearchField('location', val) }}
                >
                    {[...metaCityOptions]}

                </Select>

            </Col>
            <Col xs={24} sm={24} md={24} lg={7} style={{ padding: "2px" }}>
                <Select
                    showSearch
                    placeholder="Job Category"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    }
                    style={searchBoxStyles}
                >
                    <Option value="jack">Software Engineering</Option>
                    <Option value="lucy">Human Resource</Option>
                    <Option value="tom">Accounting</Option>
                </Select>
            </Col>
            <Col xs={24} sm={24} md={24} lg={3} style={{ padding: "2px" }}>
                <Button type="primary" loading={false} style={{ width: "100%" }} onClick={() => {
                    searchJobs(search)
                }}>
                    Search
                </Button>
            </Col >
        </Row >
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            searchJobs: bindActionCreators(searchJobs, dispatch)
        }
    }
}

const mapStateToProps = state => {
    return {
        jobAdds: state.jobData.jobList,
        metaCities: state.metaData.metaCities
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchComp)
