import { combineReducers } from 'redux';

import commonReducer from './CommonReducer';
import jobDataReducer from './JobReducer';
import metaDataResucer from './MetaDataResucer';
import searchParamReducer from './SearchParamReducer';
import matrixDataReducer from './MatrixDataReducer';
import authDataReducer from './AuthDataReducer';

const rootReducer = combineReducers({
    jobData: jobDataReducer,
    commonData: commonReducer,
    metaData: metaDataResucer,
    searchParams: searchParamReducer,
    matrixData: matrixDataReducer,
    authData: authDataReducer
});

export default rootReducer;
