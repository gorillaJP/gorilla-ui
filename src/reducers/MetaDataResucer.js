import * as actions from '../actions/ActionTypes';
import initialState from './InitialState';

export default function metaDataResucer(state = initialState.metaData, action) {
    switch (action.type) {
        case actions.META_CITIES:
            return { ...state, ...{ metaCities: action.payload } };
        case actions.META_EXPERIENCE:
            return { ...state, ...{ metaExperiences: action.payload } };
        case actions.META_SALARIES:
            return { ...state, ...{ metaSalaries: action.payload } };
        case actions.META_JOBTYPES:
            return { ...state, ...{ metaJobTypes: action.payload } };
        case actions.META_ROLES:
            return { ...state, ...{ metaRoles: action.payload } };
        case actions.META_SKILLS:
            return { ...state, ...{ metaSkills: action.payload } };
        case actions.META_LANGUAGES:
            return { ...state, ...{ metaLanguages: action.payload } };
        case actions.META_CURRENCIES:
            return { ...state, ...{ metaCurrencies: action.payload } };
        case actions.META_CREATEDDATES:
            return { ...state, ...{ metaCreatedAtDates: action.payload } };
        case actions.META_SET_USER_DOMAIN:
            return { ...state, ...{ domain: action.payload } };
        default:
            return state;
    }
}
