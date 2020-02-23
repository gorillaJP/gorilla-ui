import * as actions from './ActionTypes';
import * as JobApi from '../api/JobApi';
import * as Cache from '../api/LocalStorage';

export const jobSearchSuccess = jobList => {
    return {
        type: actions.SEARCH_JOB_SUCCESSFUL,
        jobList
    };
};

export const searchJobs = filterOptions => {
    return dispatch => {
        JobApi.searchJobs(filterOptions).then(data => {
            dispatch(jobSearchSuccess(data.payload.data));
        });
    };
};

export const saveJobInCache = job => {
    Cache.setLocalStorage('draftJob', job);
};

export const getJobInCache = () => {
    return Cache.getLocalStorage('draftJob');
};

export const clearJobInCache = () => {
    Cache.clearLocalStorage('draftJob');
};
