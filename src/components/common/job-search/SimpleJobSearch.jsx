import React from "react";
import { Row, Col, Input, Button, Select } from "antd";

import styles from "./SimpleJobSearch.module.css";

const { Search } = Input;
const { Option } = Select;

const SimpleJobSearch = props => {
    return (
        <div className={styles.simpleSeach}>
            <Row>
                <div className={styles.qouteSection}>
                    <span className={styles.qoute}>
            "Opportunities don't often come along, So when they do, you have to
            grab them."
                    </span>
                    <span className={styles.qouteBy}>-Audery Hepburn</span>
                </div>
            </Row>
            <Row className={styles.searchSection} gutter={10}>
                <Col xs={24} sm={24} md={7} lg={7}>
                    <Search
                        placeholder="Job Title, Keyword Or Company"
                        onSearch={value => {
                            console.log(value);
                        }}
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col xs={24} sm={24} md={7} lg={7}>
                    <Search
                        placeholder="Area, City or Town"
                        onSearch={value => {
                            console.log(value);
                        }}
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col xs={24} sm={24} md={7} lg={7}>
                    <Select
                        showSearch
                        placeholder="Job Category"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                        style={{ width: "100%" }}
                    >
                        <Option value="jack">Software Engineering</Option>
                        <Option value="lucy">Human Resource</Option>
                        <Option value="tom">Accounting</Option>
                    </Select>
                </Col>
                <Col xs={24} sm={24} md={3} lg={3}>
                    <Button type="primary" loading={false} style={{ width: "100%" }}>
            Search
                    </Button>
                </Col>
            </Row>
            <Row></Row>
        </div>
    );
};

export default SimpleJobSearch;
