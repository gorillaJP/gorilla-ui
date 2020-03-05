/**
 * Should get called only at the application startup
 *
 * All the meta data is pre loaded performnace and to reuse metadata amoung components
 *
 * * */

import { metaAPI } from '../api/AutoCompleteApi';

import {
    META_SALARIES,
    META_CITIES,
    META_EXPERIANCE,
    META_POSTEDDATES,
    META_ROLES,
    META_JOBTYPES
} from '../actions/ActionTypes';

/* locations/citis meta data */
const loadMeta = store => {
    const metaMap = {
        metacities: META_CITIES,
        metasalaries: META_SALARIES,
        metaroles: META_ROLES,
        metaexperiences: META_EXPERIANCE,
        metaposteddates: META_POSTEDDATES,
        metajobtypes: META_JOBTYPES
    };

    for (const metaKey in metaMap) {
        metaAPI(metaKey, '').then(res => {
            if (res.data && res.data.payload) {
                store.dispatch({ type: metaMap[metaKey], payload: res.data.payload });
            }
        });
    }
};

// call each individual meta data loaders
export default store => {
    loadMeta(store);
};
