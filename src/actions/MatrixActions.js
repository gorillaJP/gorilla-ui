import * as actions from './ActionTypes';
import * as matrixApi from '../api/MatrixApi';

export const getTopHiringCompaniesSuccess = payload => {
    return {
        type: actions.TOP_HIRING_COMPANIES,
        payload: payload
    };
};

export const getFeaturedJobSuccess = payload => {
    return {
        type: actions.FEATURED_JOBS,
        payload: payload
    };
};

export const getJobsByCategorySuccess = payload => {
    return {
        type: actions.JOBS_BY_CATEGORY,
        payload: payload
    };
};

export const getTopHiringCompanies = () => {
    return async dispatch => {
        const response = await matrixApi.getTopHiringCompanies();
        dispatch(getTopHiringCompaniesSuccess(response));
    };
};

export const getFeaturedJobs = () => {
    return async dispatch => {
        const response = await matrixApi.getFeaturedJobs();
        dispatch(getFeaturedJobSuccess(response));
    };
};

export const getJobsByCategory = () => {
    return async dispatch => {
        const response = await matrixApi.getJobsByCategory();
        dispatch(getJobsByCategorySuccess(response));
    };
};
