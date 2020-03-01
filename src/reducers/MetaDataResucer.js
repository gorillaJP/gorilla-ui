
import * as actions from "../actions/ActionTypes";

const initMetaState = {
    metaCities: []

}

export default function jobDataReducer(state = initMetaState, action) {

    switch (action.type) {
        case actions.META_CITIES:
            return { ...state, ...{ metaCities: action.payload } };
        default:
            return state;
    }

}
