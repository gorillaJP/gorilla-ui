import { SET_AUTH_TOKEN, SET_USER_PROFILE, UNSET_USER_PROFILE } from './ActionTypes';
import { clearLocalStorage } from '../api/LocalStorage';
import { USERPROFILE, TOKEN } from '../constants/AppConstants';
import { clearSessionStorage } from '../api/SessionStorage';

export const setActionToken = token => {
    return {
        type: SET_AUTH_TOKEN,
        payload: token
    };
};

export const setUserProfile = profile => {
    return {
        type: SET_USER_PROFILE,
        payload: profile
    };
};

export const clearProfile = () => {
    return {
        type: UNSET_USER_PROFILE
    };
};

export const clearToken = () => {
    return {
        type: SET_AUTH_TOKEN
    };
};

export const logOut = () => {
    return dispatch => {
        clearLocalStorage(TOKEN);
        clearSessionStorage(TOKEN);
        clearLocalStorage(USERPROFILE);
        clearSessionStorage(USERPROFILE);
        dispatch(clearProfile());
        dispatch(clearToken());
    };
};
