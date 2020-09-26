import axios from 'axios';
import config from '../util/config';

export const saveSkills = async (skills, token) => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return await axios
        .post(config.remote + 'api/candidate/skills', skills, ReqConfig)
        .then(res => {
            return {
                data: res.data.payload
            };
        })
        .catch(e => {
            return {
                error: e.response.data.payload
            };
        });
};

export const saveEducations = async (education, token) => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return await axios
        .post(config.remote + 'api/candidate/education', education, ReqConfig)
        .then(res => {
            return {
                data: res.data.payload
            };
        })
        .catch(e => {
            return {
                error: e.response.data.payload
            };
        });
};

export const saveExperience = async (experience, token) => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return await axios
        .post(config.remote + 'api/candidate/experience', experience, ReqConfig)
        .then(res => {
            return {
                data: res.data.payload
            };
        })
        .catch(e => {
            return {
                error: e.response.data.payload
            };
        });
};

export const deleteExperience = async (id, token) => {
    return deleteData(id, token, 'experience');
};

const deleteData = async (id, token, property) => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return await axios
        .delete(config.remote + `api/candidate/${property}/${id}`, ReqConfig)
        .then(res => {
            return {
                data: res.data.payload
            };
        })
        .catch(e => {
            return {
                error: e.response.data.payload
            };
        });
};
