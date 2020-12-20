import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { loadingFinished, loadingStarted } from "../../../actions/CommonActions";
import { getJobsByCategory } from "../../../api/JobApi";
import JobAddCard from "../../common/cards/job-add-card/JobAddCard";

import { Container } from "../../common/container/Container";
import * as styles from "./Category.module.css";

const Category = props => {
    let { jobCategory } = useParams();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            props.actions.loadingStarted();
            const data = await getJobsByCategory(jobCategory, props.token);
            setJobs(data);
            props.actions.loadingFinished();
        };

        if (jobCategory && props.token) {
            fetchData();
        }
    }, [jobCategory, props.actions, props.token]);

    return (
        <Container>
            <div className={styles.categories}>
                <div className={styles.category}>Recommended Jobs</div>
                <div className={styles.category}>Applied Jobs</div>
                <div className={styles.category}>Saved Jobs</div>
                <div className={styles.category}>Followed Companies</div>
                <div className={styles.category}>Viewed Your Profile</div>
                <div className={styles.category}>Contacted You</div>
            </div>
            <div className={styles.jobAddContainer}>
                {jobs.map(job => {
                    return (
                        <div key={job.jobId}>
                            <JobAddCard job={job} />
                        </div>
                    );
                })}
            </div>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        token: state.authData.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            loadingStarted: bindActionCreators(loadingStarted, dispatch),
            loadingFinished: bindActionCreators(loadingFinished, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
