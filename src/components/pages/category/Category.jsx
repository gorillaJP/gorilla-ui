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
import { VIEW_TYPE_GRID, VIEW_TYPE_LIST } from "../../../constants/AppConstants";
import { Collapse, Select } from "antd";
import CompanyMessage from "../../common/company-message/CompanyMessage";
import CategoryMatrix from "../../common/category-matrix/CategoryMatrix";
const { Option } = Select;
const { Panel } = Collapse;

const Category = props => {
    let { jobCategory } = useParams();
    const history = useHistory();
    const [jobs, setJobs] = useState([]);
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
            props.actions.getJobMatrix(props.token);
        }
    }, [props.token]);

    useEffect(() => {
        const fetchData = async () => {
            props.actions.loadingStarted();
            const data = await getJobsByCategory(categoryKey, props.token);
            setJobs(data);
            props.actions.loadingFinished();
        };

        if (categoryKey && props.token) {
            fetchData();
        }
    }, [categoryKey, props.actions, props.token]);

    useEffect(() => {
        if (categoryKey) {
            const category = props.jobsMatrix.find(matrix => {
                return matrix.key === categoryKey;
            });
            if (category) {
                setCategoryType(category.type);
                setJobs([]);
            }
        }
    }, [props.jobsMatrix, categoryKey]);

    const setJobCategory = key => {
        history.push(`/jobs/${key}`);
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
            <div>
                {viewType === VIEW_TYPE_GRID ? (
                    <div className={styles.jobAddContainer}>
                        {jobs.map((job, i) => {
                            let showMessage = false;
                            let message = "";
                            if (categoryKey === "candidatecontacted") {
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
                        {categoryKey === "candidatecontacted" ? (
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
                                {jobs.map((job, i) => {
                                    return (
                                        <Panel key={i} header={job.company} className={styles.listItem}>
                                            <CompanyMessage message={job.message} />
                                        </Panel>
                                    );
                                })}
                            </Collapse>
                        ) : (
                            <>
                                {jobs.map((job, i) => {
                                    return (
                                        <div key={i}>
                                            <JobAddCard job={job} />
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                ) : null}
                {/* {categoryType === "jobadd" ? (
                    <div className={viewType === VIEW_TYPE_GRID ? styles.jobAddContainer : styles.listContainer}>
                        {jobs.map(job => {
                            return (
                                <div key={job.jobId}>
                                    <JobAddCard job={job} />
                                </div>
                            );
                        })}
                    </div>
                ) : null}
                {categoryType === "company" ? (
                    <div className={viewType === VIEW_TYPE_GRID ? styles.jobAddContainer : styles.listContainer}>
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
                            <Panel header="This is panel header 1" key="1" className={styles.listItem}>
                                <CompanyMessage message="message" />
                            </Panel>
                            <Panel header="This is panel header 2" key="2">
                                <p>Text</p>
                            </Panel>
                            <Panel header="This is panel header 3" key="3">
                                <p>Text</p>
                            </Panel>
                        </Collapse>
                    </div>
                ) : null} */}
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        token: state.authData.token,
        jobsMatrix: state.matrixData.jobsMatrix
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
