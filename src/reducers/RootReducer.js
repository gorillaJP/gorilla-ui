import { combineReducers } from "redux";

import jobDataReducer from "./JobReducer";

const rootReducer = combineReducers({
    jobData: jobDataReducer
});

export default rootReducer;
