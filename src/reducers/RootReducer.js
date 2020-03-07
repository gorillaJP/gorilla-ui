import { combineReducers } from 'redux';

import commonReducer from './CommonReducer';
import jobDataReducer from './JobReducer';
import metaDataResucer from './MetaDataResucer';
import searchParamReducer from './SearchParamReducer';

const rootReducer = combineReducers({
    jobData: jobDataReducer,
    commonData: commonReducer,
    metaData: metaDataResucer,
    searchParamData: searchParamReducer
});

export default rootReducer;
