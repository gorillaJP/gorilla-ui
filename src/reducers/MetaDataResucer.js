import * as actions from '../actions/ActionTypes';

const initMetaState = {
    metaCities: [],
    metaExperiances: [],
    metaSalaries: [],
    metaJobTypes: [],
    metaRoles: [],
    metaPostedDates: []
};

export default function jobDataReducer(state = initMetaState, action) {
    switch (action.type) {
        case actions.META_CITIES:
            return { ...state, ...{ metaCities: action.payload } };
        case actions.META_EXPERIANCE:
            return { ...state, ...{ metaExperiances: action.payload } };
        case actions.META_SALARIES:
            return { ...state, ...{ metaSalaries: action.payload } };
        case actions.META_JOBTYPES:
            return { ...state, ...{ metaJobTypes: action.payload } };
        case actions.META_ROLES:
            return { ...state, ...{ metaRoles: action.payload } };
        case actions.META_POSTEDDATES:
            return { ...state, ...{ metaPostedDates: action.payload } };
        default:
            return state;
    }
}
