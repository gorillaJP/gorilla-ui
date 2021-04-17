import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { loadingFinished, loadingStarted } from "../../../actions/CommonActions";
import { getJobsByCategory } from "../../../api/JobApi";
import { getJobMatrix } from "../../../actions/MatrixActions";
import JobAddCard from "../../common/cards/job-add-card/JobAddCard";

import { Container } from "../../common/container/Container";
import * as styles from "./Category.module.css";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
    CONTACTED_JOBS,
    FOLLOWED_JOBS,
    RECOMMENDED_JOBS,
    SAVED_JOBS,
    VIEWED_JOBS,
    VIEW_TYPE_GRID,
    VIEW_TYPE_LIST,
    APPLIED_JOBS,
    EMPLOYEE
} from "../../../constants/AppConstants";
import { Collapse, Select, List, Typography } from "antd";
import CompanyMessage from "../../common/company-message/CompanyMessage";
import CategoryMatrix from "../../common/category-matrix/CategoryMatrix";
import CompanyCard from "../../common/cards/company-card/CompanyCard";
const { Option } = Select;
const { Panel } = Collapse;

const Category = props => {
    let { jobCategory } = useParams();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [categoryKey, setCategoryKey] = useState("");
    const [categoryType, setCategoryType] = useState("");
    const [viewType, setViewType] = useState(VIEW_TYPE_GRID);
    const [filter, setFilter] = useState("date");

    useEffect(() => {
        setCategoryKey(jobCategory);
    }, [jobCategory]);

    useEffect(() => {
        if (props.token) {
            props.actions.getJobMatrix(props.domain, props.token);
        }
    }, [props.token]);

    useEffect(() => {
        const fetchData = async () => {
            props.actions.loadingStarted();
            const data = await getJobsByCategory(categoryKey, categoryType, props.token);
            setData(data);
            props.actions.loadingFinished();
        };

        if (categoryKey && categoryType && props.token) {
            fetchData();
        }
    }, [categoryKey, categoryType, props.token, props.actions]);

    useEffect(() => {
        if (categoryKey) {
            const category = props.jobsMatrix.find(matrix => {
                return matrix.key === categoryKey;
            });
            if (category) {
                console.log(category);
                setCategoryType(category.type);
                setData([]);
            }
        }
    }, [props.jobsMatrix, categoryKey]);

    const setJobCategory = key => {
        setCategoryType("");
        setCategoryKey("");
        history.push(`/jobs/${key}`);
    };

    const getMessage = job => {
        if (categoryKey === RECOMMENDED_JOBS || categoryKey === APPLIED_JOBS || categoryKey === SAVED_JOBS) {
            return `${job.title}  |  ${job.company}`;
        } else if (categoryKey === FOLLOWED_JOBS) {
            return job.company;
        } else if (categoryKey === VIEWED_JOBS) {
            return `${job.company} Viewed your profile`;
        } else if (categoryKey === CONTACTED_JOBS) {
            return `${job.company} Contacted you`;
        }
    };

    return (
        <Container>
            <CategoryMatrix
                categories={props.jobsMatrix}
                onClick={matrix => {
                    setJobCategory(matrix.key);
                }}
            />

            <div className={styles.options}>
                <span
                    className={styles.viewOption}
                    onClick={() => {
                        setViewType(VIEW_TYPE_GRID);
                    }}
                >
                    <AppstoreOutlined />
                </span>
                <span
                    className={styles.viewOption}
                    onClick={() => {
                        setViewType(VIEW_TYPE_LIST);
                    }}
                >
                    <UnorderedListOutlined />
                </span>
                <Select
                    defaultValue="date"
                    style={{ width: 120 }}
                    onChange={e => {
                        console.log(e);
                    }}
                >
                    <Option value="date">Posted Date</Option>
                    <Option value="company">Company Name</Option>
                </Select>
            </div>
            {categoryType === "jobadd" ? (
                <div>
                    {viewType === VIEW_TYPE_GRID ? (
                        <div className={styles.jobAddContainer}>
                            {data.map((job, i) => {
                                let showMessage = false;
                                let message = "";
                                if (categoryKey === CONTACTED_JOBS) {
                                    showMessage = true;
                                    message = job.message;
                                }
                                return (
                                    <div key={i}>
                                        <JobAddCard job={job} showMessage={showMessage} message={message} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                    {viewType === VIEW_TYPE_LIST ? (
                        <div className={styles.listContainer}>
                            {categoryKey === CONTACTED_JOBS ? (
                                <Collapse
                                    expandIconPosition="right"
                                    expandIcon={panelProps => {
                                        return (
                                            <span className={styles.listContainerIcon}>
                                                {panelProps.isActive ? "Hide Message" : "View Message"}
                                            </span>
                                        );
                                    }}
                                >
                                    {data.map((job, i) => {
                                        return (
                                            <Panel key={i} header={getMessage(job)} className={styles.listItem}>
                                                <CompanyMessage message={job.message} />
                                            </Panel>
                                        );
                                    })}
                                </Collapse>
                            ) : (
                                <List
                                    style={{ backgroundColor: "#fff" }}
                                    bordered
                                    dataSource={data}
                                    renderItem={item => {
                                        return <List.Item>{getMessage(item)}</List.Item>;
                                    }}
                                />
                            )}
                        </div>
                    ) : null}
                </div>
            ) : (
                <div>
                    {viewType === VIEW_TYPE_GRID ? (
                        <div className={styles.jobAddContainer}>
                            {data.map((companyData, i) => {
                                return (
                                    <div key={i}>
                                        <CompanyCard company={companyData.company} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                    {viewType === VIEW_TYPE_LIST ? <div className={styles.listContainer}></div> : null}
                </div>
            )}
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        token: state.authData.token,
        jobsMatrix: state.matrixData.jobsMatrix,
        domain: state.metaData.domain
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            loadingStarted: bindActionCreators(loadingStarted, dispatch),
            loadingFinished: bindActionCreators(loadingFinished, dispatch),
            getJobMatrix: bindActionCreators(getJobMatrix, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
