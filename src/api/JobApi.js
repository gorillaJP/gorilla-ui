import axios from 'axios';

export const searchJobs = async filter => {

    if (!filter) {
        filter = ''
    }

    return await axios.get('http://159.89.161.233:443/api/jobadds?q=' + filter).then(res => {
        return res.data;
    });
};
