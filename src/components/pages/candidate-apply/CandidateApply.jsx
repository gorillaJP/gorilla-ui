import React, { useEffect } from "react";
import { connect } from "react-redux";
import DetailApply from "./detail-apply/DetailApply";
import { getSingleJob } from "../../../actions/JobActions";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";

const CandidateApply = props => {
    const { jobId } = useParams();
    useEffect(() => {
        if (props.token && jobId) {
            props.actions.getSingleJob(jobId, props.token);
        }
    }, [jobId, props.token]);

    if (props.jobList.length) {
        return (
            <>
                {props.jobList[0].isPitchRequired || props.jobList[0].questionnaireId ? (
                    <DetailApply job={props.jobList[0]} token={props.token} />
                ) : null}
            </>
        );
    } else {
        return null;
    }
};

const mapStateToProps = state => {
    return {
        jobList: state.jobData.jobList,
        token: state.authData.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getSingleJob: bindActionCreators(getSingleJob, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateApply);
