import * as actions from './ActionTypes';
import * as matrixApi from '../api/MatrixApi';
import { loadingStarted, loadingFinished } from './CommonActions';

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

export const getJobsByLocationSuccess = payload => {
    return {
        type: actions.JOBS_BY_LOCATION,
        payload: payload
    };
};

export const getJobsByIndustrySuccess = payload => {
    return {
        type: actions.JOBS_BY_INDUSTRY,
        payload: payload
    };
};

export const getJobMatrixSuccess = payload => {
    return {
        type: actions.JOBS_MATRIX,
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

export const getJobsByLocation = () => {
    return async dispatch => {
        dispatch(loadingStarted());
        const response = await matrixApi.getJobsByLocation();
        dispatch(loadingFinished());
        dispatch(getJobsByLocationSuccess(response));
    };
};

export const getJobsByIndustry = () => {
    return async dispatch => {
        dispatch(loadingStarted());
        const response = await matrixApi.getJobsByIndustry();
        dispatch(loadingFinished());
        dispatch(getJobsByIndustrySuccess(response));
    };
};

export const getJobMatrix = (key, token) => {
    return async dispatch => {
        dispatch(loadingStarted());
        const response = await matrixApi.getJobMatrix(key, token);
        dispatch(loadingFinished());
        dispatch(getJobMatrixSuccess(response));
    };
}
