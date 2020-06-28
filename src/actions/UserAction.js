import { SET_AUTH_TOKEN, SET_USER_PROFILE, UNSET_USER_PROFILE } from './ActionTypes';
import { clearLocalStorage, setLocalStorage } from '../api/LocalStorage';
import { USERPROFILE, TOKEN } from '../constants/AppConstants';
import { clearSessionStorage } from '../api/SessionStorage';
import * as UserApi from '../api/UserApi';
import { useLocation } from 'react-router-dom';

export const setAccessToken = token => {
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

export const signInWithToken = token => {
    return async dispatch => {
        const response = await UserApi.signInWithToken(token);
        const { data } = response;
        if (data && data.status === 200) {
            const innerData = data.data;

            setLocalStorage(TOKEN, innerData.token);
            setLocalStorage(USERPROFILE, innerData.user);

            dispatch(setAccessToken(innerData.token));
            dispatch(setUserProfile(innerData.user));
        } else {
            console.log('redirecting');
            window.location.href = '/signin';
        }
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
