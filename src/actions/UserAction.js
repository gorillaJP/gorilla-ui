import { SET_AUTH_TOKEN, SET_USER_PROFILE } from './ActionTypes';

export const setActionToken = token => {
    return {
        type: SET_AUTH_TOKEN,
        payload: token
    };
};

export const setUserProfile = token => {
    return {
        type: SET_USER_PROFILE,
        payload: token
    };
};
