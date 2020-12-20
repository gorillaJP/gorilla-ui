import * as actions from './ActionTypes';
import * as JobApi from '../api/JobApi';
import * as Cache from '../api/LocalStorage';
import { loadingFinished, loadingStarted } from './CommonActions';

export const jobSearchSuccess = payload => {
    return {
        type: actions.SEARCH_JOB_SUCCESSFUL,
        payload: { jobList: payload.data, total: payload.meta.total }
    };
};

export const getSingleJobSuccess = payload => {
    return {
        type: actions.GET_SINGLE_JOB_SUCCESSFUL,
        payload: { job: payload }
    };
};

export const setSelectedJobId = jobId => {
    return {
        type: actions.SET_SELECTED_JOB_ID,
        payload: { jobId }
    };
};

export const saveJobSuccess = jobId => {
    return {
        type: actions.JOB_SAVE_SUCCESS,
        payload: { jobId }
    };
};

export const updateSearchParam = filterOptions => {
    return dispatch => {
        dispatch({ type: actions.SEARCH_PARAM_UPDATE, payload: filterOptions });
    };
};

export const searchJobs = (filterOptions, token) => {
    return dispatch => {
        JobApi.searchJobs(filterOptions, token).then(data => {
            dispatch(jobSearchSuccess(data.payload));
        });
    };
};

export const getSingleJob = (jobId, token) => {
    return dispatch => {
        JobApi.getSingleJob(jobId, token).then(data => {
            dispatch(getSingleJobSuccess(data.payload));
        });
    };
};

export const saveJob = (jobId, token) => {
    return async dispatch => {
        dispatch(loadingStarted());
        const saved = await JobApi.saveJob(jobId, token);
        if (saved) {
            dispatch(saveJobSuccess(jobId));
        }
        dispatch(loadingFinished());
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

export const jobApplySuccess = (jobId) => {
    return {
        type: actions.JOB_APPLY_SUCCESS,
        payload: { jobId: jobId }
    };
}


