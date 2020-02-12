import * as actions from "./ActionTypes";
import * as JobSearchApi from "../api/JobSearchApi";

export const jobSearchSuccess = jobList => {
    return {
        type: actions.SEARCH_JOB_SUCCESSFUL,
        jobList
    };
};

export const searchJobs = filterOptions => {
    return dispatch => {
        JobSearchApi.searchJobs(filterOptions).then(data => {
            dispatch(jobSearchSuccess(data.payload.data));
        });
    };
};
