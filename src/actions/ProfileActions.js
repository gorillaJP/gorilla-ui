import * as ProfileApi from '../api/ProfileApi';
import { setUserProfile } from './UserAction';

export const SaveSkills = (skills, token) => {
    return async dispatch => {
        const response = await ProfileApi.saveSkills(skills, token);
        if (!response.data || response.error) {
            // Push error to store so we can show the error
        } else {
            const { data } = response;
            if (data && data.status === 'ok') {
                dispatch(setUserProfile(data.payload));
            }
        }
    };
};
