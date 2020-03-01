import { combineReducers } from 'redux';

import commonReducer from './CommonReducer';
import jobDataReducer from './JobReducer';
import metaDataResucer from "./MetaDataResucer";

const rootReducer = combineReducers({
    jobData: jobDataReducer,
    commonData: commonReducer,
    metaData: metaDataResucer
});

export default rootReducer;
