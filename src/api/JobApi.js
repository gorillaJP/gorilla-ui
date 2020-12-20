import axios from 'axios';
import config from '../util/config';
import queryString from 'query-string';

export const searchJobs = async (filter, token) => {  
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        ReqConfig.headers["Authorization"] = `Bearer ${token}`;
    }

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

    return await axios.get(config.remote + 'api/jobadds?' + queryText, ReqConfig).then(res => {
        return res.data;
    });
};

export const getSingleJob = async (jobId, token) => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
        }
    };

    return await axios.get(config.remote + 'api/jobadds/' + jobId, ReqConfig)
        .then(res => {
            return res.data;
        })
        .catch(e => {
            return [];
        });
}

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

export const easyApply = async (candidateDetails, token) => {
    const ReqConfig = {
        headers: {
             'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
        }
    };

    return await axios.post(config.remote + 'api/application', candidateDetails, ReqConfig)
        .then(res => {
            return true;
        })
        .catch(e => {
            return false;
        });
}

export const getQuestionnaire = async (questionnaireId, token) => {
    const ReqConfig = {
        headers: {
             'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
        }
    };

    return await axios
        .get(config.remote + 'api/questionnaire/' + questionnaireId, ReqConfig)
        .then(res => {
            return res.data.payload;
        })
        .catch(e => {
            return {};
        });
};


export const getJobsByCategory = async (category, token) => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
        }
    };

    return await axios.get(config.remote + `api/${category}/jobadd`, ReqConfig)
        .then(res => {
            return res.data.payload;
        })
        .catch(e => {
            return [];
        });
}

export const saveJob = async (jobId, token) => {
    const ReqConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
        }
    };

    return await axios.post(config.remote + `api/savedjob`, {jobId}, ReqConfig)
        .then(res => {
            return true;
        })
        .catch(e => {
            return false;
        });
}