import { combineReducers } from "redux";

import jobDataReducer from "./JobReducer";
import metaDataResucer from "./MetaDataResucer";

const rootReducer = combineReducers({
    jobData: jobDataReducer,
    metaData: metaDataResucer
});

export default rootReducer;
