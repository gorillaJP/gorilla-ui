import * as actions from './ActionTypes';

export const loadingStarted = () => {
    return {
        type: actions.LOADING,
        data: true
    };
};

export const loadingFinished = () => {
    return {
        type: actions.LOADING,
        data: false
    };
};
