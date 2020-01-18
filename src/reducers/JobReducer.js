import initialState from "./InitialState";
import * as actions from "../actions/ActionTypes";

// Below reducer to be changed when we have actual reducers
export default function jobDataReducer(state = initialState.jobData, action) {
    switch (action.type) {
    case actions.SEARCH_JOB_SUCCESSFUL:
        return { ...state, ...{ jobList: action.jobList } };
    default:
        return state;
    }
}
