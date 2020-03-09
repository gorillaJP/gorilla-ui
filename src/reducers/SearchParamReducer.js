import initialState from './InitialState';
import * as actions from '../actions/ActionTypes';

export default function searchParamReducer(store = initialState.searchParams, action) {
    switch (action.type) {
        case actions.SEARCH_PARAM_UPDATE:
            return { ...store, ...{ ...action.payload } };
        default:
            return store;
    }
}
