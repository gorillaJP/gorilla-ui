import axios from 'axios';
import config from '../util/config';
import queryString from 'query-string';

export const getTopHiringCompanies = async () => {
    return await axios
        .get(config.remote + 'api/matrix/tophiringcompanies')
        .then(res => {
            return res.data.payload;
        })
        .catch(e => {
            return false;
        });
};

export const getJobsByCategory = async () => {
    return await axios
        .get(config.remote + 'api/matrix/industry')
        .then(res => {
            return res.data.payload;
        })
        .catch(e => {
            return false;
        });
};

export const getJobsByLocation = async () => {
    return await axios
        .get(config.remote + 'api/jobsummary/location')
        .then(res => {
            return res.data.payload;
        })
        .catch(e => {
            return [];
        });
};

export const getJobsByIndustry = async () => {
    return await axios
        .get(config.remote + 'api/jobsummary/industry')
        .then(res => {
            return res.data.payload;
        })
        .catch(e => {
            return [];
        });
};

export const getFeaturedJobs = async filter => {
    // return await axios
    //     .get(config.remote + 'api/matrix/featuredjobs')
    //     .then(res => {
    //         return res.data.payload;
    //     })
    //     .catch(e => {
    //         return false;
    //     });
    //do not mutate the original filter object
    filter = filter ? { ...filter } : {};

    //fuzzy search
    filter.q = filter.q ? filter.q.trim() : '';

    //location => If 'If All Cities' are selected => Then do not include city in query
    filter.location =
        filter.location &&
        Array.isArray(filter.location) &&
        (filter.location.includes('All Cities') || filter.location.includes('any'))
            ? []
            : filter.location;

    filter.type =
        filter.type && Array.isArray(filter.type) && (filter.type.includes('All Types') || filter.type.includes('any'))
            ? []
            : filter.type;

    filter.experience =
        filter.experience &&
        Array.isArray(filter.experience) &&
        (filter.experience.includes('All Types') || filter.experience.includes('any'))
            ? []
            : filter.experience;

    let queryText = queryString.stringify(filter);

    queryText = queryText ? queryText.toLowerCase() : '';

    return await axios.get(config.remote + 'api/jobadds?' + queryText).then(res => {
        return res.data.payload.data;
    });
};
