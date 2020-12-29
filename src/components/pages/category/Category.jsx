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

const Category = props => {
    let { jobCategory } = useParams();
    const history = useHistory();
    const [jobs, setJobs] = useState([]);
    const [categoryKey, setCategoryKey] = useState("");
    const [categoryType, setCategoryType] = useState("");

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
        const category = props.jobsMatrix.find(matrix => {
            return matrix.key === categoryKey;
        });
        if (category) {
            console.log(category);
            setCategoryType(category.type);
        }
    }, [props.jobsMatrix, categoryKey]);

    const setJobCategory = key => {
        history.push(`/jobs/${key}`);
    };

    return (
        <Container>
            <div className={styles.categories}>
                {props.jobsMatrix.map(matrix => {
                    return (
                        <div
                            className={styles.category}
                            onClick={() => {
                                setJobCategory(matrix.key);
                            }}
                        >
                            <span>{matrix.displayText}</span>
                            <span>{matrix.count}</span>
                        </div>
                    );
                })}
            </div>
            {categoryType === "jobadd" ? (
                <div className={styles.jobAddContainer}>
                    {jobs.map(job => {
                        return (
                            <div key={job.jobId}>
                                <JobAddCard job={job} />
                            </div>
                        );
                    })}
                </div>
            ) : null}
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
