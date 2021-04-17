import { Space, Table, Input } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import moment from "moment";
import { loadingFinished, loadingStarted } from "../../../actions/CommonActions";
import { getEmployerJobAdds } from "../../../api/JobApi";
import { getJobMatrix } from "../../../api/MatrixApi";
import CategoryMatrix from "../../common/category-matrix/CategoryMatrix";
import { Container } from "../../common/container/Container";
import * as styles from "./Dashboard.module.css";

const { Search } = Input;

const EmployerDashboard = props => {
    let { jobCategory } = useParams();
    const history = useHistory();
    const [categoryKey, setCategoryKey] = useState("");
    const [jobData, setJobData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const categories = [
        { count: 10, displayText: "Inprogress Jobs", key: "inprogress" },
        { count: 10, displayText: "Draft Jobs", key: "draft" },
        { count: 10, displayText: "Expired Jobs", key: "expired" },
        { count: 10, displayText: "Deleted Jobs", key: "deleted" },
        { count: 10, displayText: "Pending to Publish", key: "pending" }
    ];

    useEffect(() => {
        if (jobCategory && props.token) {
            setCategoryKey();
            const fetchJobData = async () => {
                let response = await getEmployerJobAdds(jobCategory, props.token);
                const keyedResponse = response.map(row => {
                    return {
                        ...row,
                        key: row._id,
                        createdat: moment(row.createdat)
                            .utc()
                            .format("DD/MM/YYYY  h:mm"),

                        expireDate: moment(row.expireDate)
                            .utc()
                            .format("DD/MM/YYYY  h:mm")
                    };
                });
                setJobData([...keyedResponse]);
                setFilteredData([...keyedResponse]);
            };

            fetchJobData();
        }
    }, [jobCategory, props.token]);

    const columns = [
        {
            title: "Reference ID",
            dataIndex: "referenceId",
            key: "referenceId",
            sorter: (a, b) => a.referenceId.localeCompare(b.referenceId)
        },
        {
            title: "Job Title",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a.title.localeCompare(b.title)
        },
        {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            sorter: (a, b) => a.createdBy.localeCompare(b.createdBy)
        },
        {
            title: "Created Date",
            dataIndex: "createdat",
            key: "createdat",
            sorter: (a, b) => a.createdat.localeCompare(b.createdat)
        },
        {
            title: "Expired Date",
            dataIndex: "expireDate",
            key: "expireDate",
            sorter: (a, b) => a.expireDate.localeCompare(b.expireDate)
        },
        {
            title: "Candidates",
            dataIndex: "candidates",
            key: "candidates",
            sorter: (a, b) => a.candidates.localeCompare(b.candidates)
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            )
        }
    ];

    return (
        <Container>
            <div className={styles.categoryContainer}>
                <CategoryMatrix
                    categories={categories}
                    onClick={category => {
                        history.push(`/employer/dashboard/${category.key}`);
                    }}
                />
            </div>
            <div className={styles.searchContainer}>
                <Search
                    placeholder="Search By Reference ID"
                    onChange={event => {
                        const value = event.target.value;
                        const filteredData = jobData.filter(job => {
                            return job.referenceId.includes(value);
                        });

                        setFilteredData(filteredData);
                    }}
                    style={{ width: 250 }}
                />
            </div>
            <Table
                dataSource={filteredData}
                columns={columns}
                pagination={{ position: "bottomRight", defaultPageSize: 10, hideOnSinglePage: true, responsive: true }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashboard);
