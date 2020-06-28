import * as actions from './ActionTypes';
import * as JobApi from '../api/JobApi';
import * as Cache from '../api/LocalStorage';

export const jobSearchSuccess = payload => {
    return {
        type: actions.SEARCH_JOB_SUCCESSFUL,
        payload: { jobList: payload.data, total: payload.meta.total }
    };
};

export const setSelectedJobId = jobId => {
    return {
        type: actions.SET_SELECTED_JOB_ID,
        payload: { jobId }
    };
};

export const updateSearchParam = filterOptions => {
    return dispatch => {
        dispatch({ type: actions.SEARCH_PARAM_UPDATE, payload: filterOptions });
    };
};

export const searchJobs = filterOptions => {
    return dispatch => {
        JobApi.searchJobs(filterOptions).then(data => {
            dispatch(jobSearchSuccess(data.payload));
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
