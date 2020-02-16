import React from "react";
import { Row, Col } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
        this.props.actions.searchJobs();
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.selectedJobAddId && props.jobAdds.length) {
            return {
                ...state,
                ...{
                    selectedJobAddId: props.jobAdds[0]._id,
                    selectedJob: props.jobAdds[0]
                }
            };
        } else {
            return null;
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
                                    jobDescription={job.company}
                                    key={job._id}
                                    onSelect={key => {
                                        let selectedJob = this.props.jobAdds.find(job => job._id == key);
                                        this.setState({
                                            selectedJobAddId: key,
                                            selectedJob: selectedJob
                                        });
                                    }}
                                    selected={this.state.selectedJobAddId === job._id}
                                    jobId={job._id}
                                />
                            );
                        })}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <JobDetailsCard job={this.state.selectedJob} />
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
