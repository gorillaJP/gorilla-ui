import { combineReducers } from 'redux';

import commonReducer from './CommonReducer';
import jobDataReducer from './JobReducer';

const rootReducer = combineReducers({
    jobData: jobDataReducer,
    commonData: commonReducer
});

export default rootReducer;
