
/**
 * Should get called only at the application startup 
 * 
 * All the meta data is pre loaded performnace and to reuse metadata amoung components
 * 
 * * */

import axios from 'axios'
import { cityAutoComplete } from '../api/AutoCompleteApi'

import {
    META_CITIES
} from '../actions/ActionTypes'


/* locations/citis meta data */
const loadCitis = (store) => {

    cityAutoComplete('').then(res => {

        if (res.data && res.data.payload) {
            store.dispatch({ type: META_CITIES, payload: res.data.payload })
        }
    })
}

// call each individual meta data loaders
export default (store) => {

    loadCitis(store);

}