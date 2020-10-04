import axios from 'axios';
import config from '../util/config';

export const saveSkills = async (skills, token) => {
    return saveData('skills', skills, token);
};

export const saveLanguages = async (languages, token) => {
    return saveData('languages', languages, token);
};

export const saveEducation = async (education, token) => {
    return saveData('education', education, token);
};

export const saveExperience = async (experience, token) => {
    return saveData('experience', experience, token);
};

export const savePersonalDetails = async (personalDetails, token) => {
    return saveData('personalinfo', personalDetails, token);
};

export const saveAward = async (award, token) => {
    return saveData('award', award, token);
};

const saveData = async (key, value, token) => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return await axios
        .post(config.remote + 'api/candidate/' + key, value, ReqConfig)
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

export const deleteEducation = async (id, token) => {
    return deleteData(id, token, 'education');
};

export const deleteAward = async (id, token) => {
    return deleteData(id, token, 'award');
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
