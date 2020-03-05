import axios from 'axios';
import config from '../util/config';
import queryString from 'query-string';

export const searchJobs = async filter => {
    filter = filter ? filter : {};

    //fuzzy search
    filter.q = filter.q ? filter.q.trim() : '';

    //location => If 'If All Cities' are selected => Then do not include city in query
    filter.location =
        filter.location && Array.isArray(filter.location) && filter.location.includes('All Cities')
            ? []
            : filter.location;

    filter.type = filter.type && Array.isArray(filter.type) && filter.type.includes('All Types') ? [] : filter.type;

    let queryText = queryString.stringify(filter);

    queryText = queryText ? queryText.toLowerCase() : '';

    return await axios.get(config.remote + 'api/jobadds?' + queryText).then(res => {
        return res.data;
    });
};

export const postJob = async jobPost => {
    return await axios
        .post(config.remote + 'api/jobadds', jobPost)
        .then(res => {
            return true;
        })
        .catch(e => {
            return false;
        });
};
