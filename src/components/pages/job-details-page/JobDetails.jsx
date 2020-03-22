import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Empty, Row, Col, Pagination } from "antd";

import AdvanceJobSearch from "../../common/job-search/advance-search/AdvanceJobSearch";
import styles from "./JobDetails.module.css";
import JobAddCard from "../../common/cards/job-add-card/JobAddCard";
import { searchJobs } from "../../../actions/JobActions";
import JobDetailsCard from "../../common/job-details-card/JobDetailsCard";

class JobDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobSearchOpened: false,
            selectedJobAddId: undefined,
            selectedJob: {}
        };
    }

    componentDidMount() {
        // Send request to search jobs if there are no jobs loaded already
        if (!this.props.jobAdds.length) {
            this.props.actions.searchJobs();
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.jobAdds.length && !state.selectedJobAddId) {
            return {
                ...state,
                ...{
                    selectedJobAddId: props.jobAdds[0]._id,
                    selectedJob: props.jobAdds[0]
                }
            };
        } else {
            return state;
        }
    }

    render() {
        return (
            <div className={styles.jobDetailsPageWrapper}>
                <div>
                    <AdvanceJobSearch />
                </div>
                <Row className={styles.jobDetailsWrapper}>
                    <Col xs={24} sm={24} md={24} lg={8} className={styles.leftPannel}>
                        {this.props.jobAdds.map(job => {
                            return (
                                <JobAddCard
                                    jobTitle={job.title}
                                    company={job.company}
                                    location={job.location}
                                    key={job._id}
                                    onSelect={key => {
                                        let selectedJob = this.props.jobAdds.find(job => job._id === key);
                                        this.setState({
                                            selectedJobAddId: key,
                                            selectedJob: selectedJob
                                        });
                                    }}
                                    skills={job.skills}
                                    salaryMin={job.salaryMin}
                                    salarymax={job.salarymax}
                                    selected={this.state.selectedJobAddId === job._id}
                                    jobId={job._id}
                                />
                            );
                        })}
                        {!this.props.jobAdds.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        {this.props.jobAdds.length ? <Pagination defaultCurrent={1} total={50} /> : null}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        {this.props.jobAdds.length ? (
                            <JobDetailsCard job={this.state.selectedJob} />
                        ) : (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <span>
                                        We haven't found exactly you are looking for. Please change the query and try
                                    </span>
                                }
                            />
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            searchJobs: bindActionCreators(searchJobs, dispatch)
        }
    };
};

const mapStateToProps = state => {
    return {
        jobAdds: state.jobData.jobList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
