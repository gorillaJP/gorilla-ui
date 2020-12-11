import initialState from './InitialState';
import { GET_SINGLE_JOB_SUCCESSFUL, JOB_APPLY_SUCCESS, SEARCH_JOB_SUCCESSFUL, SET_SELECTED_JOB_ID } from '../actions/ActionTypes';

// Below reducer to be changed when we have actual reducers
export default function jobDataReducer(state = initialState.jobData, action) {
    switch (action.type) {
        case SEARCH_JOB_SUCCESSFUL:
            return {
                ...state,
                ...{ jobList: action.payload.jobList, total: action.payload.total, offset: action.payload.offset }
            };
        case GET_SINGLE_JOB_SUCCESSFUL:
            return {
                ...state,
                ...{ jobList: [action.payload.job], total: 1, offset: 0 }
            };
        case JOB_APPLY_SUCCESS:
            const jobId = action.payload.jobId;
            const jobAddIndex = state.jobList.findIndex(job => {
                return job._id === jobId;
            });

            const updatedJobAdds = [...state.jobList];
            updatedJobAdds[jobAddIndex].hasApplied = true;
            return {
                ...state,
                jobList: updatedJobAdds
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
