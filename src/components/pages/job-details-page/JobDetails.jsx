import React from "react";
import { Row, Col } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Empty } from "antd";

import AdvanceJobSearch from "../../common/job-search/advance-search/AdvanceJobSearch";
import styles from "./JobDetails.module.css";
import JobAddCard from "../../common/cards/job-add-card/JobAddCard";
import { searchJobs } from "../../../actions/JobActions";
import JobDetailsCard from "../../common/job-details-card/JobDetailsCard";
import { useState } from "react";

const JobDetails = props => {
    //selected job reference is at state. The selected Id is shared between multiple searches.
    //If the selected jobId is available in the new search as well (after searching)
    //That job will be
    const [selectedJobAddId, setSelectedJobId] = useState(undefined);

    // If the job list contains the selected jobId => show that job
    //otehrwise show first job
    let jobToShow = undefined;
    if (selectedJobAddId !== undefined) {
        const jobToShowList = props.jobAdds.filter(e => e._id === selectedJobAddId);
        if (jobToShowList.length > 0) {
            jobToShow = jobToShowList[0];
        } else {
            setSelectedJobId(undefined);
        }
    } else {
        jobToShow = props.jobAdds.length > 0 ? props.jobAdds[0] : undefined;
    }

    return (
        <div className={styles.jobDetailsPageWrapper}>
            <div>
                <AdvanceJobSearch />
            </div>
            <Row className={styles.jobDetailsWrapper}>
                <Col xs={24} sm={24} md={24} lg={8} className={styles.leftPannel}>
                    {props.jobAdds.map(job => {
                        return (
                            <JobAddCard
                                jobTitle={job.title}
                                company={job.company}
                                location={job.location}
                                key={job._id}
                                onSelect={key => {
                                    setSelectedJobId(key);
                                }}
                                skills={job.skills}
                                salaryMin={job.salaryMin}
                                salarymax={job.salarymax}
                                selected={jobToShow && jobToShow._id === job._id} //highlight the tile, for the job which is displayed
                                jobId={job._id}
                            />
                        );
                    })}
                    {!props.jobAdds.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                </Col>
                <Col xs={24} sm={24} md={24} lg={16}>
                    {jobToShow ? (
                        <JobDetailsCard job={jobToShow} />
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
};

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
