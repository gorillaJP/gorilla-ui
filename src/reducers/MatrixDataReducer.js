import * as actions from '../actions/ActionTypes';
import initialState from './InitialState';

export default function matrixDataReducer(state = initialState.matrixData, action) {
    switch (action.type) {
        case actions.TOP_HIRING_COMPANIES:
            return { ...state, ...{ topHiringCompanies: action.payload } };
        case actions.FEATURED_JOBS:
            return { ...state, ...{ featuredJobs: action.payload } };
        case actions.JOBS_BY_CATEGORY:
            return { ...state, ...{ jobsByCategory: action.payload } };
        case actions.JOBS_BY_LOCATION:
            return { ...state, ...{ jobsByLocation: action.payload } };
        case actions.JOBS_BY_INDUSTRY:
            return { ...state, ...{ jobsByIndustry: action.payload } };
        default:
            return state;
    }
}
