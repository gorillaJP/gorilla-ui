import { SET_AUTH_TOKEN, SET_USER_PROFILE, UNSET_USER_PROFILE } from './ActionTypes';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '../api/LocalStorage';
import { USERPROFILE, TOKEN } from '../constants/AppConstants';
import { clearSessionStorage, setSessionStorage } from '../api/SessionStorage';
import * as UserApi from '../api/UserApi';
import { useLocation } from 'react-router-dom';
import { loadingStarted, loadingFinished } from './CommonActions';

export const setAccessToken = token => {
    return {
        type: SET_AUTH_TOKEN,
        payload: token
    };
};

export const setUserProfile = profile => {
    if (getLocalStorage(TOKEN)) {
        setLocalStorage(USERPROFILE, profile);
    } else {
        setSessionStorage(USERPROFILE, profile);
    }
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

export const logOut = token => {
    return async dispatch => {
        dispatch(loadingStarted());
        const response = await UserApi.logout(token);
        dispatch(loadingFinished());
        if (response.data) {
            clearLocalStorage(TOKEN);
            clearSessionStorage(TOKEN);
            clearLocalStorage(USERPROFILE);
            clearSessionStorage(USERPROFILE);
            dispatch(clearProfile());
            dispatch(clearToken());
        }
    };
};

export const getUserProfile = token => {
    return async dispatch => {
        const response = await UserApi.getUserProfile(token);
        const { data } = response;
        if (data && data.status === 200) {
            dispatch(setUserProfile(data.data.user));
        } else {
            console.log('redirecting');
            window.location.href = '/signin';
        }
    };
};
