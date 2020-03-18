import axios from 'axios';
import config from '../util/config';
import queryString from 'query-string';

export const searchJobs = async filter => {
    filter = filter ? filter : {};

    //fuzzy search
    filter.q = filter.q ? filter.q.trim() : '';

    //location => If 'If All Cities' are selected => Then do not include city in query
    filter.location =
        filter.location &&
        Array.isArray(filter.location) &&
        (filter.location.includes('All Cities') || filter.location.includes('any'))
            ? []
            : filter.location;

    filter.jobtype =
        filter.jobtype &&
        Array.isArray(filter.jobtype) &&
        (filter.jobtype.includes('All Types') || filter.jobtype.includes('any'))
            ? []
            : filter.jobtype;

    filter.experience =
        filter.experience &&
        Array.isArray(filter.experience) &&
        (filter.experience.includes('All Types') || filter.experience.includes('any'))
            ? []
            : filter.experience;

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
