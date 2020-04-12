import axios from 'axios';
import config from '../util/config';

export const metaAPI = async (type, value) => {
    return await axios.get(config.remote + 'api/meta/' + type + '?q=' + value);
};

export const sectorAutoComplete = async value => {
    return await axios.get(config.remote + 'api/autocomplete?q=' + value);
};

export const companyNamesAutoComplete = async value => {
    return await axios.get(config.remote + 'api/company?q=' + value);
};
