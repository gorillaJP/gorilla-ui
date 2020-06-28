import axios from 'axios';
import config from '../util/config';

export const registerEmployer = async employerData => {
    return await axios
        .post(config.remote + 'api/employerprofile', employerData)
        .then(res => {
            return [];
        })
        .catch(e => {
            return e.response.data.payload;
        });
};

export const registerEmployee = async employeeData => {
    return await axios
        .post(config.remote + 'api/candidate/profile', employeeData)
        .then(res => {
            return [];
        })
        .catch(e => {
            return e.response.data.payload;
        });
};

export const signIn = async signInDetails => {
    return await axios
        .post(config.remote + 'api/login', signInDetails)
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

export const signInWithToken = async token => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return await axios
        .get(config.remote + 'api/loginwithtoken', ReqConfig)
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
