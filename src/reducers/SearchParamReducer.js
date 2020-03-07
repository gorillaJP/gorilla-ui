import initialState from './InitialState';
import * as actions from '../actions/ActionTypes';

export default function searchParamReducer(state = initialState.searchParams, action) {
    switch (action.type) {
        case actions.SEARCH_PARAM_UPDATE:
            return { ...state, ...{ ...action.payload } };
        default:
            return state;
    }
}
