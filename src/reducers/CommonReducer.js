import initialState from './InitialState';
import * as actions from '../actions/ActionTypes';

export default function commonReducer(state = initialState.commonData, action) {
    switch (action.type) {
        case actions.LOADING:
            console.log(action);
            return { ...state, ...{ loading: action.data } };
        default:
            return state;
    }
}
