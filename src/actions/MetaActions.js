import { META_SET_USER_DOMAIN } from './ActionTypes';

export const setUserDomain = domain => {
    return {
        type: META_SET_USER_DOMAIN,
        payload: domain
    };
};
