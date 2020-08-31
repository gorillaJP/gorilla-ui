import axios from 'axios';
import config from '../util/config';

export const saveSkills = async (token, skills) => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return await axios
        .post(config.remote + '/api/candidate/skill', ReqConfig)
        .then(res => {
            return {
                data: res
            };
        })
        .catch(e => {
            return {
                error: e.response.data.payload
            };
        });
};
