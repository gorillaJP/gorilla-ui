import { EMPLOYEE } from '../constants/AppConstants';

export default {
    jobData: {
        jobList: [],
        total: 0,
        selectedJobId: ''
    },
    searchParams: {
        q: '',
        location: [],
        type: [],
        salarymax: '',
        experiencemin: '',
        createdat: '',
        limit: 10,
        offset: 0
    },
    metaData: {
        metaCities: [],
        metaExperiences: [],
        metaSalaries: [],
        metaJobTypes: [],
        metaRoles: [],
        metaCreatedAtDates: [],
        metaSkills: [],
        metaLanguages: [],
        metaCurrencies: [],
        domain: EMPLOYEE
    },
    commonData: {
        loading: false
    },
    matrixData: {
        topHiringCompanies: [],
        featuredJobs: [],
        jobsByCategory: [],
        jobsByLocation: [],
        jobsByIndustry: [],
        jobsMatrix: []
    },
    authData: {
        token: '',
        profile: {}
    }
};
