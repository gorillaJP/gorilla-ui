import axios from 'axios';
import config from '../util/config';

export const registerEmployer = async jobPost => {
    return await axios
        .post(config.remote + 'api/employerprofile', jobPost)
        .then(res => {
            return [];
        })
        .catch(e => {
            return [e.response.data.payload];
        });
};
