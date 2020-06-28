import initialState from './InitialState';
import { SEARCH_JOB_SUCCESSFUL, SET_SELECTED_JOB_ID } from '../actions/ActionTypes';

// Below reducer to be changed when we have actual reducers
export default function jobDataReducer(state = initialState.jobData, action) {
    switch (action.type) {
        case SEARCH_JOB_SUCCESSFUL:
            return {
                ...state,
                ...{ jobList: action.payload.jobList, total: action.payload.total, offset: action.payload.offset }
            };
        case SET_SELECTED_JOB_ID:
            return {
                ...state,
                ...{ selectedJobId: action.payload.jobId }
            };
        default:
            return state;
    }
}
