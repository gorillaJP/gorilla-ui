import initialState from './InitialState';
import { GET_SINGLE_JOB_SUCCESSFUL, JOB_APPLY_SUCCESS, JOB_SAVE_SUCCESS, JOB_UN_SAVE_SUCCESS, SEARCH_JOB_SUCCESSFUL, SET_SELECTED_JOB_ID } from '../actions/ActionTypes';

// Below reducer to be changed when we have actual reducers
export default function jobDataReducer(state = initialState.jobData, action) {
    let jobId = '';
    let jobAddIndex = '';
    let updatedJobAdds = [];
    
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
            jobId = action.payload.jobId;
             jobAddIndex = state.jobList.findIndex(job => {
                return job._id === jobId;
            });

            updatedJobAdds = [...state.jobList];
            updatedJobAdds[jobAddIndex].hasApplied = true;
            return {
                ...state,
                jobList: updatedJobAdds
            };
        case JOB_SAVE_SUCCESS:
            jobId = action.payload.jobId;
            jobAddIndex = state.jobList.findIndex(job => {
                return job._id === jobId;
            });

            updatedJobAdds = [...state.jobList];
            if (jobAddIndex > -1) {
                updatedJobAdds[jobAddIndex].hasSaved = true;
            }
            return {
                ...state,
                jobList: updatedJobAdds
            };
        case JOB_UN_SAVE_SUCCESS:
            jobId = action.payload.jobId;
            jobAddIndex = state.jobList.findIndex(job => {
                return job._id === jobId;
            });

            updatedJobAdds = [...state.jobList];
            if (jobAddIndex > -1) {
                updatedJobAdds[jobAddIndex].hasSaved = false;
            }
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
