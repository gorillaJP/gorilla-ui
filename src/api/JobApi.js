import axios from 'axios';
import queryString from 'query-string'


export const searchJobs = async filter => {

    filter = filter ? filter : {}

    //fuzzy search
    filter.q = filter.q ? filter.q.trim() : ''

    //location => If 'If All Cities' are selected => Then do not include city in query
    filter.location = filter.location && Array.isArray(filter.location) && filter.location.includes('All Cities') ? [] : filter.location

    let queryText = queryString.stringify(filter)

    queryText = queryText ? queryText.toLowerCase() : ''

    return await axios.get('http://159.89.161.233:443/api/jobadds?' + queryText).then(res => {
        return res.data;
    })

}
