import * as actions from '../actions/ActionTypes';
import initialState from './InitialState';

export default function authDataReducer(state = initialState.authData, action) {
    switch (action.type) {
        case actions.SET_AUTH_TOKEN:
            return { ...state, ...{ token: action.payload } };
        case actions.SET_USER_PROFILE:
            return { ...state, ...{ profile: action.payload } };
        default:
            return state;
    }
}
